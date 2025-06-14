// db.js
const mysql = require('mysql2/promise');

// Crear un pool de conexiones
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // pon tu contraseña si aplica
  database: 'db_softhealth',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificar conexión al iniciar (opcional pero útil)
pool.getConnection()
  .then(connection => {
    console.log('✅ Conectado al pool de MySQL correctamente');
    connection.release(); // liberar inmediatamente
  })
  .catch(err => {
    console.error('❌ Error al conectar al pool de MySQL:', err);
    process.exit(1); // detener ejecución si no conecta
  });

module.exports = pool;
