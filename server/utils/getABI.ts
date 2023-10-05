const f = (fileName: string) => {
    const rawData = require('fs').readFileSync(`./src/abis/${fileName}.json`);
    return JSON.parse(rawData);
};

export default f;