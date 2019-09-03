const express = require('express')

const movie = require('./routes/movie')
const app = express();
app.use(movie)


app.listen(3001, () => {
    console.log('Listening on 3001');
})