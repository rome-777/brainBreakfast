const path = require('path');
const express = require('express');
const app = express();

// constants
const PORT = process.env.PORT || 8090;
const DIST_PATH = path.join(__dirname, '../../dist');
const PUBLIC_PATH = path.join(__dirname, '../../public');

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// serve static files
app.use(express.static(DIST_PATH));
app.use(express.static(PUBLIC_PATH));

// serve index.html
app.get('*', (req, res) => {
    res.send(path.join(__dirname, '../../public/index.html'));
});

// error handlilng middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

