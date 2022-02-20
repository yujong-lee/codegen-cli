const cli = require('cac')()
const fs = require('fs/promises');
const stringify = require('./stringify');

cli.help()
cli.version('0.1.0')

const string = cli.command('string [...files]', 'string files').action(async (files, options) => {
    
    const promises = files.map((file) => stringify(file));
    const contents = await Promise.all(promises);

    await fs.writeFile('generated.ts', contents.join('\n'));
})

const example = [
    `const file = [`,
    `   \`const example = () => {\`,`,
    `   \`  console.log('hi'),\``,
    `   \`}\``,
    `]`
]

string.example(example.join('\n'));
string.usage('string file.ts');

const { args, options} = cli.parse();
