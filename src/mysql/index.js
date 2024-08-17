import mysql from 'mysql';

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'FrontEndDB'
});

export default async (sql = '', params = [], timeout = 3000) => {
    return new Promise((resolve, reject) => {
        connection.query(
            {
                sql,
                timeout,
            },
            params,
            function (error, results) {
                if(error) reject(error);
                resolve(results);
            }
        );
    })
};