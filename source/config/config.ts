const config = {
    saml: {
        // pilot flying j
        // cert: './source/config/saml-pfj.pem',
        // entryPoint: 'https://login.pilotflyingj.com/idp/SSO.saml2', //initiate single sign-on url (includes spEntityId = same as issuer ID)
        // issuer: 'https://localhost:1337', // from configuration tab
        // logout: 'https://auth.pingone.eu/3f30fced-cb88-4e96-a7a4-8de1eec01d75/saml20/idp/slo', // from configuration tab

        // PING
        cert: './source/certs/saml-ping.pem',
        entryPoint: 'https://auth.pingone.eu/3f30fced-cb88-4e96-a7a4-8de1eec01d75/saml20/idp/startsso?spEntityId=https://auth.pingone.eu/3f30fced-cb88-4e96-a7a4-8de1eec01d75', //initiate single sign-on url (includes spEntityId = same as issuer ID)
        issuer: 'https://auth.pingone.eu/3f30fced-cb88-4e96-a7a4-8de1eec01d75', // from configuration tab
        logout: 'https://auth.pingone.eu/3f30fced-cb88-4e96-a7a4-8de1eec01d75/saml20/idp/slo', // from configuration tab

        // One Login
        // cert: './source/config/saml.pem',
        // entryPoint: 'https://ri-dev.onelogin.com/trust/saml2/http-post/sso/e5515889-1c32-4fa7-9a1e-d4f4a6d1ab77',
        // issuer: 'https://app.onelogin.com/saml/metadata/e5515889-1c32-4fa7-9a1e-d4f4a6d1ab77',
        // logout: 'https://ri-dev.onelogin.com/trust/saml2/http-redirect/slo/1574005',
        options: {
            failureRedirect: '/login',
            failureFlash: true,
        }
    },
    server: {
        port: 1337
    },
    session: {
        resave: false,
        secret: 'supersecretamazingpassword',
        saveUninitialized: false
    }
};

export default config;
