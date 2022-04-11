const request = require('request');
const cheerio = require('cheerio');
const toughcookie = require('tough-cookie-filestore');

const headerObject = require('../lib/headerObject');
const {cookiePath} = require('../lib/datafilePaths')

const url = 'https://codeforces.com/problemset/problem/432/D'

const requestObject = {
    url,
    headers: headerObject({
        Origin: 'https://codeforces.com',
        Referer: 'https://codeforces.com/problemset/submit'
    }),
    jar: request.jar(new toughcookie(cookiePath)),
    timeout: 15000
};

request.get(requestObject, (e,res,body) => {
    const $ = cheerio.load(body);
    const sz = $('.sample-tests').length
    for (let i=0; i<=sz; i++) {
        console.log($('.sample-test .input pre').eq(i).text());    
        console.log($('.sample-test .output pre').eq(i).text());    
    }
    // console.log($('.sample-test .input pre').text());
    // $('.sample-test').each((i,el) => {
    //     console.log(el);
    //     console.log('Input: ');
    //     console.log($(el).find($('input pre')).text());
    //     console.log('Output: ');
    //     console.log($(el).find('output pre').text());
    // });
})
