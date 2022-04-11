const request = require('request');
const cheerio = require('cheerio');
const toughcookie = require('tough-cookie-filestore');
const fs = require('fs')

const headerObject = require('../lib/headerObject');
const {cookiePath} = require('../lib/datafilePaths');

const enterURL = 'https://codeforces.com/enter';
const baseURL = 'https://codeforces.com';
const timeout = 15000;

const logout = {

    getLogoutSuffix() {
        return new Promise ((resolve, reject) => {
            const requestObject = {
                url: enterURL,
                headers: headerObject(),
                jar: request.jar(new toughcookie(cookiePath)),
                timeout
            };
            request.get(requestObject, (e,res,body) => {
                if (e) return reject(e);
                const $ = cheerio.load(body);
                const logoutSuffix = $('.lang-chooser a').eq(3).attr('href');
                resolve(logoutSuffix);
            });
        });
    },

    logoutWithSuffix(logoutSuffix) {
        return new Promise ((resolve, reject) => {
            const url = baseURL + logoutSuffix;
            const requestObject = {
                url,
                headers: headerObject(),
                jar: request.jar(new toughcookie(cookiePath)),
                timeout
            };
            request.get(requestObject, (e,res,body) => {
                if (e) return reject(e);
                resolve();
            });
        });
    },

    destroyCookie() {
        return new Promise ((resolve, reject) => {
            try {
                fs.unlinkSync(cookiePath);
                fs.writeFileSync(cookiePath, '');
            } catch(e) {
                return reject(e);
            }
            resolve();
        });
    }

}

module.exports = logout;