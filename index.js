import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {getQuestionByCategoryId, createQuestionWithParams, updateQuestion} from "./src/managers/questionsManager.js";
import { getAllCategories, updateCategory } from "./src/managers/categoriesManager.js";

const app = express();
const PORT = 5000

const allowCORSURL = 'http://localhost:3000';

app.use(cors());
app.use(bodyParser.json());

app.get('/categories',getAllCategories);
app.put('/categories', updateCategory);

app.get('/questions/:categoryId', getQuestionByCategoryId)
app.post('/questions', createQuestionWithParams);
app.put('/questions', updateQuestion);
app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));