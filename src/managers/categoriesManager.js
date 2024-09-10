import allowedCORSURL from "../constants/allowedCORSURL.js";
import dbQuery from "../mysql/index.js";

export const getAllCategories = (req, res) => {
    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedCORSURL,
    })
    // поки відключу 11 і 13, тайпскріпт і ву
    const query = `select c.categoryId, c.categoryName, ct.nameUK as name from  FrontEndDB.categories as c
                        join FrontEndDB.categoriesTranslate as ct on c.categoryId = ct.categoryId
                        where c.disabled = 0;`;
    dbQuery(query)
        .then(results => res.send(results))
        .catch(err => res.send(err, 'db getAllCategories error'));
};