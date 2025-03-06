const demoUser = {
    username: 'Kike',
    password: 'Kike123'
};

exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.postLogin = (req, res) => {
    const { username, password, remember } = req.body;

    if (username === demoUser.username && password === demoUser.password) {
        req.session.isLoggedIn = true;
        req.session.username = username;

        if (remember) {
            res.cookie('rememberMe', username, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
        }

        res.redirect('/');
    } else {
        res.render('login', { error: 'Invalid username or password' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
        }
        res.clearCookie('rememberMe');
        res.redirect('/login');
    });
};

exports.isAuth = (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else if (req.cookies.rememberMe === demoUser.username) {
        req.session.isLoggedIn = true;
        req.session.username = demoUser.username;
        next();
    } else {
        res.redirect('/login');
    }
};

exports.setTheme = (req, res) => {
    const { theme } = req.body;
    res.cookie('theme', theme, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
    res.json({ success: true });
};