const { body } = require("express-validator");

const create = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("The email field is required"),
  body("password").not().isEmpty().withMessage("The password is required"),
];

module.exports = {
  create,
};
