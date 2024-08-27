import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
    getQuestionByCategoryId,
    createQuestionWithParams,
    updateQuestion,
    deleteQuestion,
    getExamQuestions, getQuestionStatistic,
} from "./src/managers/questionsManager.js";
import { getAllCategories } from "./src/managers/categoriesManager.js";
import {addExamStatisticRow, getExamAllResultsCount, getExamStatistic} from "./src/managers/examManager.js";

const app = express();
const PORT = 5000

app.use(cors());
app.use(bodyParser.json());

app.get('/categories',getAllCategories);

app.get('/questions/exam', getExamQuestions);
app.get('/questions/statistic', getQuestionStatistic);
app.get('/questions/:categoryId', getQuestionByCategoryId)
app.post('/questions/create', createQuestionWithParams);
app.put('/questions/update', updateQuestion);
app.delete('/questions/delete', deleteQuestion);

app.get('/exam/statistic/count', getExamAllResultsCount);
app.get('/exam/statistic', getExamStatistic);
app.post('/exam/addNewResult', addExamStatisticRow);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));