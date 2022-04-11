const program = require('commander');
const rgraph = require('../commands/rgraph');

program
    .command('check')
    .description('Check rating graph for single handle')
    .action(async function() {
        const {handle} = await rgraph.readHandle();
        const data = await rgraph.bringGraphData(handle);
        rgraph.showGraphSingle(handle, data);
    });

program
    .command('compare')
    .description('Compare two rating graphs')
    .action(async function() {
        const {handle1, handle2} = await rgraph.readHandle(multi=true);
        const data1 = await rgraph.bringGraphData(handle1);   
        const data2 = await rgraph.bringGraphData(handle2);   
        rgraph.showGraphVersus(handle1, data1, handle2, data2);
    });

program.parse(process.argv);