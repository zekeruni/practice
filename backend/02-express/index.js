import express from 'express';

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

app.post('/test', (req, res) => {
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