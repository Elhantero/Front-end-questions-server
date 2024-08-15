import mysql from 'mysql';
export default mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'FrontEndDB'
});