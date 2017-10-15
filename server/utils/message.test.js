const expect = require('expect');
let {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {

        let from = 'Mario';
        let text = 'Sending a test message';
        let message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});


describe('generateLocationMessage', () => {
    it('should generate correct Location message object', () => {

        let from = 'Mario';
        let latitude = 1;
        let longitude = 1;
        let url = 'https://www.google.es/maps?q=1,1';
        let message = generateLocationMessage(from, latitude, longitude);

        // expect(message.from).toBe('Mario');
        expect(message.createdAt).toBeA('number');
        // expect(message.url).toBe(url);
        expect(message).toInclude({from, url});
    });
});