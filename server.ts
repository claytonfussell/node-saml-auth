import http from 'http';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import config from './source/config/config';
import './passport';


const app = express();

/** Server Handling */
const httpServer = http.createServer(app);

/** Parse the body of the request / Passport */
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false })); // Replaces Body Parser
app.use(express.json()); // Replaces Body Parser

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Passport & SAML Routes */
app.get('/login', passport.authenticate('saml', config.saml.options), (req, res, next) => {
    console.log(req.body.user);
    return res.redirect('http://localhost:4200');
});

app.post('/login/callback', passport.authenticate('saml', config.saml.options), (req, res, next) => {
    console.log('response');
    let token = '1234567890';
    return res.redirect(`http://localhost:4200/site?token=${token}`);
});

app.get('/whoami', (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log('User not authenticated');
        return res.redirect('/login');
    } else {
        console.log('User authenticated');

        return res.status(200).json({ user: req.user });
    }
});


/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

httpServer.listen(config.server.port, () => console.log(`Server is running on port ${config.server.port}`));
