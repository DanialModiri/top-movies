const router = require('express').Router();
const fs = require('fs')
const path = require('path')

const MOVIES_PER_PAGE = 10;

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


router.get('/', (req, res) => {
    const { sort = 'title', direction = 1, page = 1, fromYear, toYear, ...filters } = req.query;
    const movies = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data.json') )).movies;
    //sorting movies
    const firstfield = movies[0];
    let sortfunc;
    if (typeof firstfield[sort] === 'number')
        sortfunc = (a, b) => a[sort] - b[sort];
    if (typeof firstfield[sort] === 'string')
        sortfunc = (a, b) => a[sort].localeCompare(b[sort]);
    if (sortfunc) {
        const finalSortFunc = direction === -1 ? (a, b) => sortFunc(b, a) : sortfunc;
        movies.sort(finalSortFunc);
    }

    const from = (page - 1) * MOVIES_PER_PAGE;
    const to = (page) * MOVIES_PER_PAGE;
    res.send({ movies: movies.slice(from, to), page, perPage: MOVIES_PER_PAGE, });
});


module.exports = router;