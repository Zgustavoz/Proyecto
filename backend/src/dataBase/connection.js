import mssql from 'mssql';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import {router} from '../routes/usuarios_r';

config();

const app = express();
const PORT = process.env.PORT;

const  connectionSettings = {
server: process.env.DB_SERVER,
database: process.env.DB_DATABASE,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
options: {
    encrypt: true, 
    trustServerCertificate: true,
  }
};
router.get('/usuario')

app.use(cors());
app.use(express.json())
app.use('/api/usuarios',usuarios_r);

export async function getConnection()  {
       try{
    return await mssql.connect(connectionSettings);
       } catch (error) {
 console.error(error);
       }
}






  // Iniciar servidor
  app.listen(PORT, function () {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  });


export { mssql};