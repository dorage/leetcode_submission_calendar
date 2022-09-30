const express = require('express');
const { getSubmissionCalendar } = require('./src/controllers');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('hello, world!');
});
app.get('/:userId', getSubmissionCalendar);

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
