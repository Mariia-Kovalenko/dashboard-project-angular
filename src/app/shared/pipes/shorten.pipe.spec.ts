import { ShortenPipe } from "./shorten.pipe";

describe('Shorten pipe', () => {
    let pipe: ShortenPipe;

    beforeEach(() => {
        pipe = new ShortenPipe();
    })

    it('should create an instance', () => {
        pipe = new ShortenPipe();
        expect(pipe).toBeTruthy();
    });

    describe('Transform long string', () => {
        let string = 'Hello, I am a long string';
        let resultString = 'Hello, I am a ...';

        it('should trim string to max length of 14 if it is longer than 14 characters', () => {
            let limit = 14;
            expect(pipe.transform(string, limit)).toEqual(resultString);
        })
    })
})