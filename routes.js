module.exports = (app, passport) => {
    app.get('/', isLoggedIn, (req, res) => {
        res.render('index.ejs'); 
    });

    /**
     * Login, logout, signup
     */

    app.get('/login', (req, res) => {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post("/login", passport.authenticate("local-login", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }));

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

    app.get('/signup', (req, res) => {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup', 
        failureFlash: true
    }));
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }

    res.redirect('/login');
}