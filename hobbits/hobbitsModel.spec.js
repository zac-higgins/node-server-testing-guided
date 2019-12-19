const Hobbits = require('./hobbitsModel');
const db = require('../data/dbConfig');


describe('hobbits model', function () {
    beforeEach(async () => {
        await db('hobbits').truncate();
    })

    describe('insert()', function () {
        it('should add the hobbit to the database', async function () {
            await Hobbits.insert({ name: "Sam" });
            await Hobbits.insert({ name: "Gaffer" });

            const hobbits = await db('hobbits');
            expect(hobbits).toHaveLength(2);
        })
    })
})