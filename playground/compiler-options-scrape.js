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
    let cmpToVal = {};
    $('.table-form select option').each((i,el) => {
        // cmpToVal[$(el).text().toString()] = $(el).attr('value');
        cmpToVal[$(el).attr('value').toString()] = $(el).text().toString();
    });
    console.log(cmpToVal);
})

const obj  = {
    'GNU GCC C11 5.1.0': '43',
    'Clang++17 Diagnostics': '52',
    'GNU G++11 5.1.0': '42',
    'GNU G++14 6.4.0': '50',
    'GNU G++17 7.3.0': '54',
    'Microsoft Visual C++ 2010': '2',
    'Microsoft Visual C++ 2017': '59',
    'GNU G++17 9.2.0 (64 bit, msys 2)': '61',
    'C# Mono 5.18': '9',
    'D DMD32 v2.091.0': '28',
    'Go 1.14': '32',
    'Haskell GHC 8.6.3': '12',
    'Java 11.0.5': '60',
    'Java 1.8.0_162': '36',
    'Kotlin 1.3.70': '48',
    'OCaml 4.02.1': '19',
    'Delphi 7': '3',
    'Free Pascal 3.0.2': '4',
    'PascalABC.NET 3.4.2': '51',
    'Perl 5.20.1': '13',
    'PHP 7.2.13': '6',
    'Python 2.7.15': '7',
    'Python 3.7.2': '31',
    'PyPy 2.7 (7.2.0)': '40',
    'PyPy 3.6 (7.2.0)': '41',
    'Ruby 2.0.0p645': '8',
    'Rust 1.42.0': '49',
    'Scala 2.12.8': '20',
    'JavaScript V8 4.8.0': '34',
    'Node.js 9.4.0': '55'
}

