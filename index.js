import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {getQuestionByCategoryId, createQuestionWithParams, updateQuestion, deleteQuestion} from "./src/managers/questionsManager.js";
import { getAllCategories } from "./src/managers/categoriesManager.js";

const app = express();
const PORT = 5000

const allowCORSURL = 'http://localhost:3000';

app.use(cors());
app.use(bodyParser.json());

app.get('/categories',getAllCategories);

app.get('/questions/:categoryId', getQuestionByCategoryId)
app.post('/questions', createQuestionWithParams);
app.put('/questions', updateQuestion);
app.delete('/questions/delete', deleteQuestion);
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));