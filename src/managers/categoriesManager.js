import allowedCORSURL from "../constants/allowedCORSURL.js";
import dbQuery from "../mysql/index.js";

export const getAllCategories = (req, res) => {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedCORSURL,
    })
    const query = `select c.categoryId, c.categoryName, ct.nameUK as name from  FrontEndDB.categories as c
                        join FrontEndDB.categoriesTranslate as ct on c.categoryId = ct.categoryId;`;
    dbQuery(query)
        .then(results => res.send(results))
        .catch(err => res.send(err, 'db getAllCategories error'));
};