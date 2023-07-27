const path = require('path');
const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'image.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/openai', require('./routes/openaiRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
