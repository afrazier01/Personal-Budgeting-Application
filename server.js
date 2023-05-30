console.log('Server is up!')
const { urlencoded } = require('body-parser');
const express = require('express');
const path = require('path');
const sendFile = require('fs')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.get('/', (req,res) => {
    console.info(`${req.method} was received.`);

    res.sendFile(path.join(__dirname,'./public/index.html'))
});

app.get('/budget-calculator', (req,res) => {
    console.info(`${req.method} was received.`)
    res.sendFile(path.join(__dirname,'./public/budget-tool.html'))
});

app.get('*', (req,res) => {
    res.status(404).send('Page does not exist')
});

app.listen(PORT, () => console.log(`App 🚀 at http://localhost:${PORT}`))