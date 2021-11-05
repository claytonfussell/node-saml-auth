import fs from 'fs';
import passport from 'passport';
import { Strategy } from 'passport-saml';
import config from './source/config/config';

const savedUsers: Express.User[] = [];

passport.serializeUser<Express.User>((expressUser, done) => {
    done(null, expressUser);
});

passport.deserializeUser<Express.User>((expressUser, done) => {
    done(null, expressUser);
});

passport.use(
    new Strategy(
        {
            issuer: config.saml.issuer,
            protocol: 'http://',
            path: '/login/callback',
            logoutUrl: config.saml.logout,        
            entryPoint: config.saml.entryPoint,
            cert: fs.readFileSync(config.saml.cert, 'utf-8'),
        },
        (expressUser: any, done: any) => {
            if (!savedUsers.includes(expressUser)) {
                savedUsers.push(expressUser);
            }

            return done(null, expressUser);
        }
    )
);
