const Color = require('../Color');
const digits = '0123456789abcdef';

const {floor,random} = Math;

module.exports = (optionalRandomFunction) => {
    var randomFunction = undefined;
    if (optionalRandomFunction) {
        randomFunction = optionalRandomFunction;
    } else {
        randomFunction = random;
    }
    let code = '#';
    for (let i=0; i<6; i++) {
        code += digits.charAt(floor(randomFunction() * 16));
    }
    return new Color(code, 'hex');
}
