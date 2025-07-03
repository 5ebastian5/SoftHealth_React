const express = require('express');
const cors = require('cors');
const path = require("path");
const bcrypt = require('bcrypt'); 
const authRoutes = require('./routes/authRoutes');
const pool = require('./db');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 👈 Necesario para archivos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Tus rutas aquí (ej. auth, usuarios, etc.)
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});

app.use('/api', authRoutes);
// app.use('/api', medicoRoutes);
// app.use('/api', pacienteRoutes);
// app.use('/api', administrativoRoutes);

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// --------------------------------------
// ACTUALIZAR PROFILE
// --------------------------------------
app.put('/usuarios/:id', upload.single('imagenPerfil'), async (req, res) => {
  const documento = req.params.id;
  const { telefono, direccion } = req.body;
  const imagenPerfil = req.file ? req.file.filename : null;


  let connection;
  try {
    connection = await pool.getConnection();
    const campos = [];
    const valores = [];

    if (telefono) {
      campos.push('telefono = ?');
      valores.push(telefono);
    }

    if (direccion) {
      campos.push('direccion = ?');
      valores.push(direccion);
    }

    if (imagenPerfil) {
      campos.push('imagenPerfil = ?');
      valores.push(imagenPerfil);
    }

    if (campos.length === 0) {
      return res.status(400).json({ success: false, message: 'No hay campos para actualizar' });
    }

    valores.push(documento);

    const sql = `UPDATE Persona SET ${campos.join(', ')} WHERE documento = ?`;
    await connection.query(sql, valores);

    const [rows] = await connection.query('SELECT * FROM Persona WHERE documento = ?', [documento]);
    res.json(rows[0]);

  } catch (error) {
    console.error("❌ Error al actualizar perfil:", error);
    res.status(500).json({ success: false, message: 'Error al actualizar perfil' });
  } finally {
    if (connection) connection.release();
  }
});

// --------------------------------------
// LOGIN
// --------------------------------------
app.post("/api/login", async (req, res) => {
  const { documento, password } = req.body;
  let connection;

  try {
    connection = await pool.getConnection();
    console.log("🔐 Intento de login:", documento);

    const [users] = await connection.query(`
      SELECT 
        p.documento, p.nombre, p.apellido, p.correo, p.telefono, p.direccion, p.imagenPerfil,
        u.contrasena,
        r.rol_id,
        m.especialidad, m.cargo,
        a.hv

      FROM Persona p
      JOIN Usuario u ON p.documento = u.documento
      JOIN Rol r ON p.documento = r.documento
      LEFT JOIN Medico m ON p.documento = m.documento
      LEFT JOIN Administrativo a ON p.documento = a.documento
      WHERE p.documento = ?
    `, [documento]);

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    const user = users[0];

    const match = await bcrypt.compare(password, user.contrasena);
    if (!match) {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    const userData = {
      documento: user.documento,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      telefono: user.telefono,
      direccion: user.direccion,
      imagenPerfil: user.imagenPerfil || null,
      rol: user.rol_id,
      especialidad: user.especialidad || null,
      cargo: user.cargo || null,
      hv: user.hv || null,
    };


    res.json({
      success: true,
      message: "Login exitoso",
      user: userData
    });

  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  } finally {
    if (connection) connection.release();
  }
});

// --------------------------------------
// CREAR O ACTUALIZAR USUARIO
// --------------------------------------
app.post("/create", upload.single('imagenPerfil'), async (req, res) => {
  const imagenPerfil = req.file ? `/uploads/${req.file.filename}` : null;
  const {
    nombre,
    apellido,
    tipoDocumento,
    documento,
    correo,
    telefono,
    direccion,
    password,
    rol,
    especialidad,
    cargo,
    hv
  } = req.body;

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.query(
      'SELECT documento FROM Persona WHERE documento = ?', [documento]
    );

    const isUpdate = existing.length > 0;

    // ----------------------------
    // ✅ INSERT o UPDATE de Persona
    // ----------------------------
    if (isUpdate) {
      let updateFields = `
        nombre = ?, apellido = ?, tipoDocumento = ?, telefono = ?, correo = ?, direccion = ?
      `;
      let updateValues = [nombre, apellido, tipoDocumento, telefono, correo, direccion];

      if (imagenPerfil) {
        updateFields += `, imagenPerfil = ?`;
        updateValues.push(imagenPerfil);
      }

      updateValues.push(documento);

      await connection.query(`
        UPDATE Persona SET ${updateFields} WHERE documento = ?
      `, updateValues);

    } else {
      await connection.query(`
        INSERT INTO Persona (documento, nombre, apellido, tipoDocumento, telefono, correo, direccion, imagenPerfil)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [documento, nombre, apellido, tipoDocumento, telefono, correo, direccion, imagenPerfil]);
    }

    // ----------------------------
    // 🔒 Usuario
    // ----------------------------
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      if (isUpdate) {
        await connection.query(`UPDATE Usuario SET contrasena = ? WHERE documento = ?`, [hashedPassword, documento]);
      } else {
        await connection.query(`INSERT INTO Usuario (documento, contrasena, rol_id) VALUES (?, ?, ?)`, [documento, hashedPassword, rol]);
      }
    }

    // ----------------------------
    // 👥 Rol
    // ----------------------------
    if (isUpdate) {
      await connection.query(`UPDATE Rol SET rol_id = ? WHERE documento = ?`, [rol, documento]);
    } else {
      await connection.query(`INSERT INTO Rol (documento, rol_id) VALUES (?, ?)`, [documento, rol]);
    }

    // ----------------------------
    // 👨‍⚕️ Médico, 👨‍💼 Admin, 🧑‍🦽 Paciente
    // ----------------------------
    if (rol === 'A') {
      if (isUpdate) {
        await connection.query(`UPDATE Administrativo SET hv = ? WHERE documento = ?`, [hv, documento]);
      } else {
        await connection.query(`INSERT INTO Administrativo (documento, hv) VALUES (?, ?)`, [documento, hv]);
      }

    } else if (rol === 'M') {
      if (isUpdate) {
        await connection.query(`UPDATE Medico SET especialidad = ?, cargo = ? WHERE documento = ?`, [especialidad, cargo, documento]);
      } else {
        await connection.query(`INSERT INTO Medico (documento, especialidad, cargo) VALUES (?, ?, ?)`, [documento, especialidad, cargo]);
      }

    } else if (rol === 'P') {
      if (!isUpdate) {
        await connection.query(`INSERT INTO Paciente (documento) VALUES (?)`, [documento]);
        await connection.query(`INSERT INTO historialmedico (documento) VALUES (?)`, [documento]);
      }
    }

    await connection.commit();
    res.status(200).json({
      success: true,
      message: isUpdate ? "✅ Usuario actualizado correctamente" : "✅ Usuario registrado correctamente"
    });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error("❌ Error en /create:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  } finally {
    if (connection) connection.release();
  }
});

// ==========================================
// LISTAR AUXILIARES
// ==========================================
app.get('/auxiliares', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.query(`
      SELECT p.documento, p.nombre, p.apellido, p.tipoDocumento, p.correo, p.telefono, p.direccion
      FROM Persona p
      JOIN Rol r ON p.documento = r.documento
      WHERE r.rol_id = 'A'
    `);
    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Error en GET /auxiliares:", error);
    res.status(500).json({ success: false, message: 'Error al obtener los auxiliares' });
  } finally {
    if (connection) connection.release();
  }
});

// ==========================================
// ELIMINAR AUXILIAR
// ==========================================
app.delete('/auxiliares/:documento', async (req, res) => {
  const { documento } = req.params;
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    await connection.query('DELETE FROM Administrativo WHERE documento = ?', [documento]);
    await connection.query('DELETE FROM Usuario WHERE documento = ?', [documento]);
    await connection.query('DELETE FROM Rol WHERE documento = ?', [documento]);
    await connection.query('DELETE FROM Persona WHERE documento = ?', [documento]);

    await connection.commit();
    res.json({ success: true });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error("❌ Error al eliminar auxiliar:", error);
    res.status(500).json({ success: false, message: 'Error al eliminar el auxiliar' });
  } finally {
    if (connection) connection.release();
  }
});

// ==========================================
// LISTAR MÉDICOS
// ==========================================
app.get('/medicos', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.query(`
      SELECT p.documento, p.tipoDocumento, p.nombre, p.apellido, p.direccion, p.telefono, p.correo,
             m.especialidad, m.cargo
      FROM Persona p
      JOIN Rol r ON p.documento = r.documento
      JOIN Medico m ON p.documento = m.documento
      WHERE r.rol_id = 'M'
    `);
    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Error en GET /medicos:", error);
    res.status(500).json({ success: false, message: 'Error al obtener los médicos' });
  } finally {
    if (connection) connection.release();
  }
});

// ==========================================
// ELIMINAR MÉDICO
// ==========================================
app.delete("/medicos/:documento", async (req, res) => {
  const { documento } = req.params;
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [medico] = await connection.query(
      'SELECT documento FROM Medico WHERE documento = ?', [documento]
    );

    if (medico.length === 0) {
      return res.status(404).json({ success: false, message: "Médico no encontrado" });
    }

    await connection.query('DELETE FROM Medico WHERE documento = ?', [documento]);
    await connection.query('DELETE FROM Usuario WHERE documento = ?', [documento]);
    await connection.query('DELETE FROM Rol WHERE documento = ?', [documento]);
    await connection.query('DELETE FROM Persona WHERE documento = ?', [documento]);

    await connection.commit();
    res.status(200).json({ success: true, message: "Médico eliminado correctamente" });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error("❌ Error al eliminar médico:", error);
    res.status(500).json({ success: false, message: "Error interno al eliminar el médico" });
  } finally {
    if (connection) connection.release();
  }
});

// ==========================================
// LISTAR PACIENTES
// ==========================================
app.get("/pacientes", async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT p.tipoDocumento, p.documento, p.nombre, p.apellido, p.direccion, p.telefono, p.correo, pa.id_hc
      FROM Paciente pa
      JOIN Persona p ON pa.documento = p.documento
    `);
    res.json(rows);
  } catch (error) {
    console.error("❌ Error al leer pacientes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  } finally {
    if (connection) connection.release();
  }
});

// ==========================================
// ELIMINAR PACIENTE
// ==========================================
app.delete('/pacientes/:documento', async (req, res) => {
  const { documento } = req.params;
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [paciente] = await connection.query(
      'SELECT documento FROM Paciente WHERE documento = ?', [documento]
    );

    if (paciente.length === 0) {
      return res.status(404).json({ success: false, message: "Paciente no encontrado" });
    }

    await connection.query('DELETE FROM Paciente WHERE documento = ?', [documento]);
    await connection.query('DELETE FROM Usuario WHERE documento = ?', [documento]);
    await connection.query('DELETE FROM Rol WHERE documento = ?', [documento]);
    await connection.query('DELETE FROM Persona WHERE documento = ?', [documento]);

    await connection.commit();
    res.status(200).json({ success: true, message: "Paciente eliminado correctamente" });

  } catch (error) {
    if (connection) await connection.rollback();
    console.error("❌ Error al eliminar paciente:", error);
    res.status(500).json({ success: false, message: "Error al eliminar paciente." });
  } finally {
    if (connection) connection.release();
  }
});

app.post('/proceso-clinico', async (req, res) => {
  const {
    fecha, id_hc, tipoConsulta, anamnesis, examenFisico,
    diagnostico, tratamiento, nota,
    enfermedadesActuales, medicamentos, metodosAnticonceptivos, estadoMental,
    ta, fc, temp, frecuenciaRespiratoria, peso, talla, imc,
    examenesComplementarios, laboratorio, queEstudios, antecedentesFamiliares
  } = req.body;

  if (!fecha || !id_hc || !tipoConsulta) {
    return res.status(400).json({ message: "Faltan campos obligatorios: fecha, id_hc o tipoConsulta." });
  }

  let connection;

  try {
    connection = await pool.getConnection();

    const sql = `
      INSERT INTO ProcesoClinico (
        fecha, id_hc, tipoConsulta, anamnesis, examenFisico,
        diagnostico, tratamiento, nota,
        enfermedadesActuales, medicamentos, metodosAnticonceptivos, estadoMental,
        ta, fc, temp, frecuenciaRespiratoria, peso, talla, imc,
        examenesComplementarios, laboratorio, queEstudios, antecedentesFamiliares
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
      fecha, id_hc, tipoConsulta, anamnesis, examenFisico,
      diagnostico, tratamiento, nota,
      enfermedadesActuales, medicamentos, metodosAnticonceptivos, estadoMental,
      ta, fc, temp, frecuenciaRespiratoria, peso, talla, imc,
      examenesComplementarios, laboratorio, queEstudios, antecedentesFamiliares
    ];

    await connection.query(sql, valores);

    res.status(200).json({ message: "Proceso clínico guardado exitosamente." });

  } catch (error) {
    console.error("❌ Error en POST /proceso-clinico:", error);
    res.status(500).json({ message: "Error al guardar el proceso clínico." });
  } finally {
    if (connection) connection.release();
  }
});



app.get("/historial/:documento", async (req, res) => {
  const { documento } = req.params;
  let connection;

  try {
    connection = await pool.getConnection();

    // Buscar historial médico
    const [historialRows] = await connection.query(
      "SELECT id_hc FROM historialmedico WHERE documento = ?", [documento]
    );

    if (historialRows.length === 0) {
      return res.status(404).json({ message: "No se encontró historial." });
    }

    const id_hc = historialRows[0].id_hc;

    // Buscar procesos clínicos relacionados
    const [procesos] = await connection.query(
      "SELECT * FROM procesoclinico WHERE id_hc = ?", [id_hc]
    );

    // Respuesta combinada
    res.json({
      id_hc,
      procesos
    });

  } catch (err) {
    console.error("❌ Error en GET /historial/:documento:", err);
    res.status(500).json({ message: "Error en la base de datos." });
  } finally {
    if (connection) connection.release();
  }
});


// Ejemplo en Express.js
app.get('/procesos/:id_hc', async (req, res) => {
  const { id_hc } = req.params;
  let connection;

  try {
    connection = await pool.getConnection();

    const [procesos] = await connection.query(
      "SELECT * FROM ProcesoClinico WHERE id_hc = ?", [id_hc]
    );

    res.status(200).json(procesos); // incluso si es []

  } catch (error) {
    console.error("❌ Error en GET /procesos/:id_hc:", error);
    res.status(500).json({ message: "Error obteniendo procesos." });
  } finally {
    if (connection) connection.release();
  }
});

