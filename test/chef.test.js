const assert = require('chai').assert;
const Chef = require('../chef');

describe('Chef hotel test', () => {
    let chef = Chef;

    it('1. Check the dish has valid name', () => {
        assert.isString(chef.checkMenu(), 'string');
    });

    it('2. Check for the dish in menu', () => {
        let dish = chef.checkMenu();
        assert.oneOf(dish, chef.dishes);
    });

    it('3. Make sure check can feed more', () => {
        for (let i = 0; i < 7; i++) {
            chef.customersFed();
            assert.isAtLeast(chef.customers, 0);
        }
    })
})