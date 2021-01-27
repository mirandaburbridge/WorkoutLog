let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');


router.get('/practice', validateSession, function (req, res) {
    res.send('Hey! This is a practice route!')
});

//*create
router.post('/create', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definitions: req.body.log.definitions,
        results: req.body.log.results,
        owner: req.user.id
    }
    Log.create(logEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
});

//*get all logs
router.get('/', (req, res) => {
    Log.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

//*get logs by id
router.get('/:id', validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner: userid }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

//*update
router.put('/:id', validateSession, (req, res) => {
    const updateLogEntry = {
        description: req.body.log.description,
        definitions: req.body.log.definitions,
        results: req.body.log.results
    };

    const query = { where: { id: req.params.id, owner: req.user.id } };

    Log.update(updateLogEntry, query)
        .then((logs) => res.status(200).json(logs))
        .catch((err) => res.status(500).json({ error: err }));
});

//*delete
router.delete('/:id', validateSession, (req, res) => {
    const query = { where: { id: req.params.id, owner: req.user.id } };

    Log.destroy(query)
        .then(() => res.status(200).json({ message: 'Journal Entry Removed' }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;