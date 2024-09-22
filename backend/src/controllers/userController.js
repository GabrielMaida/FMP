const { createUser, returnUser } = require('../services/userService');

const user = createUser();

const getUser = (req, res) => {
    res.status(200).json(returnUser());
};

module.exports = {
    getUser,
};
