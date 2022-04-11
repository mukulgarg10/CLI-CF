function headerObject(extraValues) {
    return Object.assign({
        'Host': 'codeforces.com',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Upgrade-Insecure-Requests': 1
    }, extraValues);
};

module.exports = headerObject;


//accept   application/json, text/javascript, */*; q=0.01
//acclang  en-US,en;q=0.5
// agent   Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:75.0) Gecko/20100101 Firefox/75.0