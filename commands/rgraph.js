const request = require('request');
const chalk = require('chalk');
const blessed = require('blessed');
const contrib = require('blessed-contrib');
const inquirer = require('inquirer');

const rgraph = {

    async readHandle(multi) {
        console.log(chalk.gray('[*] Invalid handles will throw error!'));
        const type = multi ? [
            {
                type: 'input',
                name: 'handle1',
                message: 'Handle 1'
            },
            {
                type: 'input',
                name: 'handle2',
                message: 'Handle 2'   
            }
        ] : [
            {
                type: 'input',
                name: 'handle',
                message: 'Handle'
            }
        ];
        const input = await inquirer.prompt(type);
        return {
            handle: input.handle,
            handle1: input.handle1,
            handle2: input.handle2
        };
    },

    bringGraphData(handle) {
        return new Promise ((resolve,reject) => {
            const url = `https://codeforces.com/api/user.rating?handle=${handle}`;
            const requestObject = {
                url,
                timeout: 10000,
                Referer: 'https://codeforces.com/apiHelp/methods',
                Host: 'codeforces.com'
            };
            request.get(requestObject, (e,res,body) => {
                if (e) return reject(e);
                const data = JSON.parse(body);
                if (data.status === 'FAILED') {
                    console.log(chalk.red(`[-] ${data.comment}`));
                    return reject();
                }
                const usefulData = data.result.map(elt => {
                    const info = {
                        time: elt.ratingUpdateTimeSeconds,
                        newRating: elt.newRating
                    }
                    return info;
                });
                resolve(usefulData);
            });
        });
    },

    showGraphSingle(handle1, data1) {
        const screen = blessed.screen();
        const heading = `${handle1}`;
        const line = contrib.line({
            style: { 
                line: "white", 
                text: "red", 
                baseline: "green"
            }, 
            xLabelPadding: 5,
            xPadding: 5,
            label: heading
        });
        const series = {
            title: `${handle1}`,
            style: { line: 'cyan' }
        };
        let x = [];
        let y = [];
        data1.forEach(element => {
            const x0 = new Date(element.time * 1000);
            x.push(x0.toDateString().split(' ')[3]);
            y.push(element.newRating);
        });
        series.x = x;
        series.y = y;
        screen.append(line);
        line.setData([ series ]);
        screen.key(['escape', 'q', 'C-c', 'enter', 'space'], function(ch, key) {
            return process.exit(0);
        });
        screen.render();
    },

    showGraphVersus(handle1, data1, handle2, data2) {
        const screen = blessed.screen();
        const heading = `${handle1} vs. ${handle2}`;
        const line = contrib.line({
            style: { 
                line: "white", 
                text: "red", 
                baseline: "green"
            }, 
            xLabelPadding: 5,
            xPadding: 5,
            label: heading
        });
        const series1 = {
            title: `${handle1}`,
            style: { line: 'cyan' }
        };
        const series2 = {
            title: `${handle2}`,
            style: { line: 'red' }
        };
        let x1 = [];
        let y1 = [];
        let x2 = [];
        let y2 = [];
        data1.forEach(element => {
            const x0 = new Date(element.time * 1000);
            x1.push(x0.toDateString().split(' ')[3]);
            y1.push(element.newRating);
        });
        series1.x = x1;
        series1.y = y1;
        data2.forEach(element => {
            const x0 = new Date(element.time * 1000);
            x2.push(x0.toDateString().split(' ')[3]);
            y2.push(element.newRating);
        });
        series2.x = x2;
        series2.y = y2;
        screen.append(line);
        line.setData([ series1, series2 ]);
        screen.key(['escape', 'q', 'C-c', 'enter', 'space'], function(ch, key) {
            return process.exit(0);
        });
        screen.render();
    }

};

module.exports = rgraph;