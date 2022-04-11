const program = require('commander');
const compiler = require('../commands/compiler');

program
    .command('set')
    .description('Set compiler')
    .action(compiler.set);

program
    .command('show')
    .description('Show set compiler')
    .action(compiler.show);


program.parse(process.argv);