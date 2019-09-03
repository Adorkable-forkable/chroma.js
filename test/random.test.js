require('es6-shim');
const vows = require('vows');
const assert = require('assert');
const chroma = require('../index');

const fakeRandom = [0.5, 0.1, 0.94];
var fakeRandomIndex = 0;
function fakeRandomFunction() {
    if (fakeRandomIndex >= fakeRandom.length) {
        fakeRandomIndex = 0;
    }
    return fakeRandom[fakeRandomIndex];
}
function resetFakeRandom() {
    fakeRandomIndex = 0;
}

vows
    .describe('Some tests for random colors')

    .addBatch({

        'random colors': {
            topic: chroma.random(),
            'valid hex code'(topic) { return assert(/^#[0-9a-f]{6}$/i.test(topic.hex())); },
        },

        'random colors with specified random function': {
            'deterministic results'() {
                resetFakeRandom();
                const firstResult = chroma.random(fakeRandomFunction).hex()
                const secondResult = chroma.random(fakeRandomFunction).hex()

                resetFakeRandom();
                assert.equal(firstResult, chroma.random(fakeRandomFunction).hex())
                assert.equal(secondResult, chroma.random(fakeRandomFunction).hex())
            } 
        }}).export(module);
