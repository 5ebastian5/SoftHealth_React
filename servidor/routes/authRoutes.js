const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db'); // usa el pool correcto

// ✅ Forgot Password
router.post('/forgot-password', async (req, res) => {
  const { correo } = req.body;
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000); // 1 hora

  let connection;
  try {
    connection = await pool.getConnection();

    const [result] = await connection.query(`
      UPDATE usuario 
      SET reset_token = ?, reset_expires = ? 
      WHERE documento = (
        SELECT documento FROM persona WHERE correo = ?
      )
    `, [token, expires, correo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Correo no encontrado' });
    }

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    console.log('🔗 Enlace de recuperación:', resetLink);

    res.json({
      success: true,
      message: 'Correo de recuperación enviado (simulado)',
      link: resetLink // ← esto es lo que recibe el frontend
    });

  } catch (err) {
    console.error('❌ Error en forgot-password:', err);
    res.status(500).json({ message: 'Error de servidor' });
  } finally {
    if (connection) connection.release();
  }
});

// ✅ Reset Password
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  let connection;

  try {
    connection = await pool.getConnection();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await connection.query(`
      UPDATE usuario 
      SET contrasena = ?, reset_token = NULL, reset_expires = NULL 
      WHERE reset_token = ? AND reset_expires > NOW()
    `, [hashedPassword, token]);

    if (result.affectedRows === 0) {
      return res.status(400).json({ success: false, message: 'Token inválido o expirado' });
    }

    console.log("✅ Contraseña actualizada con token:", token);
    res.json({ success: true, message: 'Contraseña actualizada correctamente' });

  } catch (err) {
    console.error("❌ Error en reset-password:", err);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  } finally {
    if (connection) connection.release();
  }
});

module.exports = router;
