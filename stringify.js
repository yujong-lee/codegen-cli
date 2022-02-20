const fs = require('fs/promises');

async function stringify(path) {
    const fileName = path.replace(/[^a-zA-Z0-9]/g, '');

    const source = (await fs.readFile(path)).toString();

    // /(?<!\\)`/ = \` (X) ` (O) 
    const lines =  source.replace(/(?<!\\)`/g, '\\`').split('\n');

    return lines.reduce((acc, line) => {
        const tab = ' '.repeat(4);
        
        return acc + tab + `\`${line}\`,\n`
    }, `const ${fileName} = [\n`) + ']\n';
}

module.exports = stringify;
