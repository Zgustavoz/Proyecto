import mssql from 'mssql';
import { config } from 'dotenv';

config();

const connectionSettings = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
};

//conexion a la base de datos
export async function getConnection() {
  try {
    const pool = await mssql.connect(connectionSettings);
    console.log('Conexión a DB exitosa');
    return pool;
  } catch (error) {
    console.error('Error de conexión a DB:', error);
    throw error;
  }
}

  export { mssql };