const { body } = require('express-validator');

const create = [body('text').not().isEmpty()]

module.exports = {
    create
}