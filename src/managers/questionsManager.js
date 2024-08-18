import connection from "../mysql/index.js";
import allowedCORSURL from "../constants/allowedCORSURL.js";
import dbQuery from "../mysql/index.js";

export const getQuestionByCategoryId =  (req, res) => {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedCORSURL,
    })
    const { categoryId } = req.params;
    const query = `select * from FrontEndDB.questions as q
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
    const { questionId, ...otherParams } = req.body;
    if(!questionId) {
        res.send({ error: 'wrong questionId'});
        return;
    }
    const params = Object.keys(otherParams);
    const values = params.map(key => otherParams[key]);
    values.push(questionId);
    const paramsStr = params.map(key => `SET ${key}=(?)`).join(',');
    const query = `UPDATE FrontEndDB.questions
                          ${paramsStr}
                          WHERE questionId = (?);`;
    dbQuery(query, values)
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