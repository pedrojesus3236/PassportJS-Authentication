

module.exports = {

    Authenticated: (req, res, next) => {

        if (req.isAuthenticated()) {

            return next();
        }
    },

    NotAuthenticated: (req, res, next) => {

        if (!req.isAuthenticated()) {

            return next();
        }     
    }
};