const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

// 1. Definido em Maiúsculas: "Items"
const Items = [
    { id: 1, name: 'Item1' }, 
    { id: 2, name: 'Item2' } 
];

app.get('/api/items', (req, res) => {
    // ERRO 1 CORRIGIDO: mudado de "items" para "Items"
    res.json(Items); 
});

app.get('/api/items/:id', (req, res) => { 
    const id = Number(req.params.id);
    const item = Items.find(item => item.id === id);

    // ERRO 2 CORRIGIDO: mudado de "if(item)" para "if(!item)"
    if (!item) { 
        return res.status(404).json({ error: 'Item não encontrado' });
    }

    res.json(item);
});

app.post('/api/items', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'O campo "name" é obrigatório' });
    }

    const newItem = {
        id: Items.length ? Math.max(...Items.map(item => item.id)) + 1 : 1,
        name
    };

    // ERRO 1 CORRIGIDO: mudado de "items" para "Items"
    Items.push(newItem); 

    // ERRO 3 CORRIGIDO: mudado de "nemItem" para "newItem"
    res.status(201).json(newItem); 
});

app.listen(PORT, () => {
    console.log(`API a executar em http://localhost:${PORT}`);
});