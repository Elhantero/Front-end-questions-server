import allowedCORSURL from "../constants/allowedCORSURL.js";
import connection from "../mysql/index.js";

export const getAllCategories = (req, res) => {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedCORSURL,
    })
    new Promise((resolve, reject) => {
        connection.query({
                sql: `select c.categoryId, c.categoryName, ct.nameUK as name from  FrontEndDB.categories as c
                        join FrontEndDB.categoriesTranslate as ct on c.categoryId = ct.categoryId;`,
                timeout: 3000,
            },
            [],
            function (error, results) {
                if(error) reject(error);
                resolve(results);
                return results;
            }
        );
    }).then(results => res.send(results))
        .catch(err => res.send(err, 'db getAllCategories error'));
};

export const updateCategory = (req, res) => {
    new Promise((resolve, reject) => {
        connection.query({
                sql: `UPDATE FrontEndDB.categoriesTranslate
                          SET nameUK = (?)
                          WHERE categoryId = (?);`,
                timeout: 3000,
            },
            [req.body.categoryName, req.body.categoryId],
            function (error, results) {
                if(error) reject(error);
                if(results.affectedRows) {
                    resolve({
                        status: 'ok',
                        categoryId: req.body.categoryId,
                        categoryName: req.body.categoryName,
                    });
                }
                return results;
            }
        );
    }).then(results => res.send(results))
        .catch(err => res.send(err, 'db updateCategory error'));
}