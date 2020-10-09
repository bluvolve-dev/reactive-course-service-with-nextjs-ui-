require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });

module.exports = {
    publicRuntimeConfig: {
        API_HOST: process.env.API_HOST,
    },
}