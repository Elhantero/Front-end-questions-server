import connection from "../mysql/index.js";
import allowedCORSURL from "../constants/allowedCORSURL.js";

export const createQuestionWithParams = (req, res) => {
    new Promise((resolve, reject) => {
        connection.query({
                sql: `INSERT INTO FrontEndDB.questions (text, categoryId)
                          VALUES ((?), (?))`,
                timeout: 3000,
            },
            [req.body.text, req.body.categoryId],
            function (error, results) {
                if (error) reject(error);
                resolve({
                    status: 'ok',
                    categoryId: req.body.categoryId,
                });
                return results;
            }
        );
    }).then(results => res.send(results))
        .catch(err =>  res.send(err, 'db createQuestionWithParams error'));
}

export const getQuestionByCategoryId =  (req, res) => {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedCORSURL,
    })
    const { categoryId } = req.params;
    new Promise((resolve, reject) => {
        connection.query({
                sql: `select q.categoryId, q.questionId, q.text from  FrontEndDB.questions as q
                            where categoryId = (?)`,
                timeout: 3000,
            },
            [categoryId],
            function (error, results) {
                if(error) reject(error);
                resolve(results);
                return results;
            }
        );
    }).then(results => res.send(results))
        .catch(err => res.send(err, 'db getQuestionByCategoryId error'));
};

export const updateQuestion = (req, res) => {
    new Promise((resolve, reject) => {
        connection.query({
                sql: `UPDATE FrontEndDB.questions
                          SET text = (?)
                          WHERE questionId = (?);`,
                timeout: 3000,
            },
            [req.body.text, req.body.questionId],
            function (error, results) {
                if(error) reject(error);
                if(results.affectedRows) {
                    resolve({
                        status: 'ok',
                        questionId: req.body.questionId,
                    });
                }
                return results;
            }
        );
    }).then(results => res.send(results))
        .catch(err => res.send(err, 'db updateQuestion error'));
}