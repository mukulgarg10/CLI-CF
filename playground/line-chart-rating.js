const blessed = require('blessed');
const contrib = require('blessed-contrib');

const screen = blessed.screen();
const line = contrib.line({
    style: { 
        line: "white", 
        text: "red", 
        baseline: "green"
    }, 
    xLabelPadding: 10, 
    xPadding: 10, 
    label: 'Rating Graph'
});

const data = {
    x: ['t1', 't2', 't3', 't4'],
    y: [1500, 1570, 1700, 1590]
};

screen.append(line) //must append before setting data
line.setData([data])

screen.key(['escape', 'q', 'C-c', 'enter', 'space'], function(ch, key) {
    return process.exit(0);
});

screen.render()