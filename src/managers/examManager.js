import allowedCORSURL from "../constants/allowedCORSURL.js";
import dbQuery from "../mysql/index.js";

export const getExamStatistic = (req, res) => {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedCORSURL,
    })
    const limit = Number(req?.query?.limit) || 10
    const query = `select percentResult from FrontEndDB.examStatistic order by id desc limit ?;`;
    const params = [limit];
    dbQuery(query, params)
        .then(results => res.send(results.map(o => o.percentResult).reverse()))
        .catch(err => res.send(err, 'db getExamStatistic error'));
};

export const getExamAllResultsCount = (req, res) => {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedCORSURL,
    })
    const query = `select COUNT(*) as total from FrontEndDB.examStatistic`;
    dbQuery(query)
        .then(results => res.send(results[0]))
        .catch(err => res.send(err, 'db getExamAllResultsCount error'));
};

export const addExamStatisticRow = (req, res) => {
    if(!req?.body?.percentResult) {
        res.send({ error: 'wrong params'});
        return;
    }
    const query = `INSERT INTO FrontEndDB.examStatistic (percentResult)
                          VALUES ((?))`;
    const params = [Number(req.body.percentResult)];
    dbQuery(query, params)
        .then(results =>{
            res.send({
                status: 'ok',
            })
        })
        .catch(err => res.send(err, 'db createStatisticRow error'));
}