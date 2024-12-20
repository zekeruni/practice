import express from 'express';
import 'dotenv/config';
import logger from './logger.js';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3],
            };
            logger.info(JSON.stringify(logObject));
        },
    }
}));

let teaData = [];
let nextId = 1;

app.post('/test', (req, res) => {
    logger.info("Post request to create a new JSON in the array");
    const {name, price} = req.body;
    const newTea = {id: nextId++, name, price};
    teaData.push(newTea);
    res.status(201).json(newTea);
});

app.get('/test', (req, res) => {
    res.status(200).json(teaData);
});

app.get('/test/:id', (req, res) => {
    const tea = res.status(200).json(teaData.find(tea => tea.id === parseInt(req.params.id)));
    if (!tea) {
        return res.status(404).send("Tea not found");
    };
    return tea;
});

app.put('/test/:id', (req, res) => {
    const teaId = req.params.id;
    const tea = teaData.find(tea => tea.id === parseInt(teaId));
    if (!tea) {
        return res.status(404).send("Tea not found");
    };
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).json(tea);
});

app.delete('/test/:id', (req, res) => {
    const teaId = req.params.id;
    const index = teaData.findIndex(tea => tea.id === parseInt(teaId));
    if (index === -1) {
        return res.status(404).send("Tea not found");
    };
    teaData.splice(index, 1);
    return res.status(204).send('Deleted');
});

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`);
});