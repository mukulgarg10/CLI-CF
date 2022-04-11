const program = require('commander');
const credentials = require('../commands/credentials');

program
    .command('set')
    .description('Set credentials')
    .action(credentials.set);

program
    .command('show')
    .description('Show handle name')
    .action(credentials.show);

program
    .command('unset')
    .description('Unset credentials')
    .action(credentials.unset);


program.parse(process.argv);