const router = require('express').Router();
const fs = require('fs')
const path = require('path')

const MOVIES_PER_PAGE = 7;

function isInt(n) {
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

//make query input "number" to number : for example "20" to 20
router.use((req, res, next) => {
    const query = req.query;
    Object.keys(query).forEach(item => {
        if (!isNaN(query[item]))
            if (isInt(query[item]))
                query[item] = parseInt(query[item])
            else if (isFloat)
                query[item] = parseFloat(query[item]);
    })

    next();
})

const filters = [
    'language',
    'genre',
    'country'
]

router.get('/filters', (req, res) => {
    let movies = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data.json'))).movies;
    const output = {};
    filters.forEach(filter => {
        const values = movies.reduce((total, movie) => total.concat(movie[filter]), []);
        output[filter] = [...new Set(values)];
    })
    res.send(output)
})

router.get('/', (req, res) => {
    const { sort = 'imdb_ratting_value', direction = -1, q, page = 1, fromYear, toYear, ...filters } = req.query;
    let movies = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data.json'))).movies;
    if (filters.actor)
        movies = movies.filter(item => (item.cast_list || []).map(actor => actor.name).includes(filters.actor));
    if (filters.director)
        movies = movies.filter(item => item.director.name === filters.director);
    //sorting movies
    if (filters.language) {
        if (typeof filters.language === 'string')
            filters.language = [filters.language]
        movies = movies.filter(item => (item.language || [])
            .filter(lang => filters.language.includes(lang)).length === filters.language.length);
    }
    if (filters.genre) {
        if (typeof filters.genre === 'string')
            filters.genre = [filters.genre];
        movies = movies.filter(movie => (movie.genre || [])
            .filter(gen => filters.genre.includes(gen)).length === filters.genre.length);
    }

    if (filters.country) {
        if (typeof filters.country === 'string')
            filters.country = [filters.country];
        movies = movies.filter(movie => (movie.country || [])
            .filter(count => filters.country.includes(count)).length === filters.country.length);
    }
    if (q)
        movies = movies.filter(item => item.title.toLowerCase().includes(q.toLowerCase()));
    if (movies.length > 0) {
        const firstfield = movies[0];
        let sortfunc;
        if (typeof firstfield[sort] === 'number')
            sortfunc = (a, b) => a[sort] - b[sort];
        if (typeof firstfield[sort] === 'string')
            sortfunc = (a, b) => a[sort].localeCompare(b[sort]);
        if (sortfunc) {
            const finalSortFunc = direction === -1 ? (a, b) => sortfunc(b, a) : sortfunc;
            movies.sort(finalSortFunc);
        }
    }

    const from = (page - 1) * MOVIES_PER_PAGE;
    const to = (page) * MOVIES_PER_PAGE;
    res.send({ movies: movies.slice(from, to), page, number: movies.length, perPage: MOVIES_PER_PAGE, });
});

router.post('/comment/:title', (req, res) => {

})

router.get('/search/:q', (req, res) => {
    const { page = 1 } = req.query;
    let movies = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data.json'))).movies;
    movies = movies.filter(item => item.title.includes(req.params.q));
    res.send({ movies: movies.slice(from, to), page, number: movies.length, perPage: MOVIES_PER_PAGE, });
})

router.get('/movie/:title', (req, res) => {
    const movies = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data.json'))).movies;
    const movie = movies.find(item => item.title === req.params.title);
    res.send(movie)
})

module.exports = router;