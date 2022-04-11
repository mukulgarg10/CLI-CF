const request = require('request');
const cheerio = require('cheerio');
const toughcookie = require('tough-cookie-filestore');

const headerObject = require('../lib/headerObject');
const {cookiePath} = require('../lib/datafilePaths')
const CredentialsManager = require('../lib/CredentialsManager');

const enterURL = 'https://codeforces.com/enter';
const timeout = 15000;

const login = {

    checkLoginStatus() {
        return new Promise( (resolve, reject) => {
            const requestObject = {
                url: enterURL,
                headers: headerObject(),
                jar: request.jar(new toughcookie(cookiePath)),
                timeout
            }
            request.get(requestObject, (e,res,body) => {
                if (e) return reject(e);
                const $ = cheerio.load(body);
                const who = $('.lang-chooser a').eq(2).text();
                resolve(who);
            });
        })
    },

    
    obtainCSRF() {
        return new Promise( (resolve, reject) => {
            const requestObject = {
                url: enterURL,
                headers: headerObject(),
                jar: request.jar(new toughcookie(cookiePath)),
                timeout
            }
            request.get(requestObject, (e,res,body) => {
                if (e) return reject(e);
                const $ = cheerio.load(body);
                const CSRF_key = $('input').attr('value');
                if (!CSRF_key || CSRF_key.length<20)
                    return reject(new Error('Unable to get CSRF Key'));
                resolve(CSRF_key);
            });
        })
    },


    signIn(CSRF_key) {
        return new Promise( (resolve, reject) => {

            // Get credentials form CredentialManager
            const credentialsManager = new CredentialsManager();
            let handle, password;
            try {
                handle = credentialsManager.getHandle();
                password = credentialsManager.getPassword();
            } catch (e) {
                return reject(new Error('Setup credentials to log in'));
            }

            // Create Request
            const extraHeaderDetails = {
                Origin : 'https://codeforces.com',
                Referer : 'https://codeforces.com/enter?back=%2F'
            }
            const headers = headerObject(extraHeaderDetails);
            const jar = request.jar(new toughcookie(cookiePath));

            // Create Form
            const form = {
                handleOrEmail: handle,
                password,
                csrf_token: CSRF_key,
                action: 'enter'
            };

            const requestObject = {
                url: enterURL,
                headers,
                jar,
                form,
                timeout
            }

            // Post request
            request.post(requestObject, (e,res,body) => {
                if (e) return reject(e);
                if (body) return reject('Credentials failed to login');
                resolve(handle);
            });
        })
    }

}

module.exports = login;


