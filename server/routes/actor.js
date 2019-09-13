const express = require('express');
const fs = require('fs')
const router = express.Router();
const path = require('path')


router.get('/:q', (req, res) => {
    const q = req.params.q
    if(q.length < 5)
        return res.send([])
    let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data.json')))
    const actors = {};
    data.movies.forEach(item => {
        (item.cast_list || []).forEach(actor => {
            const name = (actor.name.toLowerCase())
            if (name.toLowerCase().includes(q.toLowerCase()))
                actors[actor.id] = actor.name
        });
    });

    res.send(Object.keys(actors).map(key => ({ id: key, name: actors[key] })));

})

module.exports = router;