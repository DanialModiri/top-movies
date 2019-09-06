const express = require('express')

const movie = require('./routes/movie')
const app = express();

const cors = require('cors')
app.use(cors());
app.use(movie)


app.listen(3001, () => {
    console.log('Listening on 3001');
})