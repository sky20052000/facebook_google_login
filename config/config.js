require("dotenv").config();

module.exports = {
    PORT: process.env.port,
    HOST: process.env.host_url,
    GOOGLE_CLIENT_ID: process.env.clientId,
    GOOGLE_CLIENT_SECRET: process.env.clientSecretKey,
    FACEBOOK_CLIENT_ID: process.env.clientIdFb,
    FACEBOOK_CLIENT_SECRET: process.env.clientSecretFb
}