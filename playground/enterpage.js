const request = require('request');
const cheerio = require('cheerio');

request.get({url: 'https://codeforces.com/enter'}, (err,res,body) => {
    
    // console.log(body);
    // <form id="linkEnterForm" method="post" action="">
    //     <input type='hidden' name='csrf_token' value='471d1d77c1e164bc19372b7afa3c1f6f'/>
    //     <input type="hidden" name="ftaa" value="">
    //     <input type="hidden" name="bfaa" value="">
    // </form>

    const $ = cheerio.load(body);
    const csrf_token = $('input').attr('value');
    console.log(csrf_token);
});

// request.get({url: 'https://codeforces.com/enter'}, (e,res,body) => {
//     const $ = cheerio.load(body);
//     console.log(body);
//     console.log($('.lang-chooser a').eq(2).text());
// });