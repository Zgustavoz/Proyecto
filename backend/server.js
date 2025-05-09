import {getConnection,mssql} from './src/dataBase/connection.js';
import usuarios_r from './src/routes/usuarios_r.js';

const getProducts = async () => {
    try {
        const pool =  await getConnection();
        const result = await pool.request().query('SELECT * FROM usuario');
        console.log(result);
        console.log('Empleados');
    }catch (error) {
        console.error(error);
    }
};

getProducts();