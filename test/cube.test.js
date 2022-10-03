const Cube = require('../cube').Cube;
const expect = require('chai').expect;

describe('Testing the Cube', () => {
    it('1. The side of length of Cube', (done) => {
        let c1 = new Cube(3);
        expect(c1.getSideLength()).to.equal(3);
        done();
    });
    it('2. The surface are of Cube', (done) => {
        let c2 = new Cube(5);
        expect(c2.getSurfaceArea()).to.equal(150);
        done();
    });
    it('3. The volume of Cube', (done) => {
        let c3 = new Cube(6);
        expect(c3.getVolume()).to.equal(216);
        done();
    })
});