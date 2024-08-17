import connection from "../mysql/index.js";
import allowedCORSURL from "../constants/allowedCORSURL.js";
import dbQuery from "../mysql/index.js";

export const getQuestionByCategoryId =  (req, res) => {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedCORSURL,
    })
    const { categoryId } = req.params;
    const query = `select q.categoryId, q.questionId, q.text from  FrontEndDB.questions as q
                            where categoryId = (?)`;
    const params = [categoryId];
    dbQuery(query, params)
    .then(results => res.send(results))
    .catch(err => res.send(err, 'db getQuestionByCategoryId error'));
};

export const createQuestionWithParams = (req, res) => {
    if(!req?.body?.text || !req.body.categoryId) {
        res.send({ error: 'wrong params'});
        return;
    }
    const query = `INSERT INTO FrontEndDB.questions (text, categoryId)
                          VALUES ((?), (?))`;
    const params = [req.body.text, req.body.categoryId];
    dbQuery(query, params)
        .then(results =>{
            res.send({
                status: 'ok',
                text: req.body.text,
                questionId: results?.insertId,
                categoryId: req.body.categoryId,
            })
        })
        .catch(err => res.send(err, 'db createQuestionWithParams error'));
    }



export const updateQuestion = (req, res) => {
    if(!req?.body?.text) {
        res.send({ error: 'wrong params'});
        return;
    }
    // MYSQL Language
    const query = `UPDATE FrontEndDB.questions
                          SET text = (?)
                          WHERE questionId = (?);`;
    const params = [req.body.text, req.body.questionId];
    dbQuery(query, params)
        .then(() => {
            res.send({
                status: 'ok',
                questionId: req.body.questionId,
            })
        })
        .catch(err => res.send(err, 'db updateQuestion error'))
};

export const deleteQuestion = (req, res) => {
    const query = `delete from  FrontEndDB.questions where questionId = (?);`;
    const params = [req.body.questionId];
    dbQuery(query, params)
        .then(() => {
            res.send({
                status: 'ok',
                questionId: req.body.questionId,
            })
        })
        .catch(err =>  res.send(err, 'db deleteQuestion error'));
};