import { expect } from 'chai';
import { Inkr } from '../src/inkr';
import { describe, it } from 'node:test';

describe('Highlighter (chainable)', () => {
    it('should apply multiple styles chainably', () => {
        const text = new Inkr()
            .colour('red')
            .weight('bold')
            .text('Hello World')

        expect(text).to.include('\x1b[');
        expect(text).to.include('Hello');
    });

    it('should return plain text when no style is applied', () => {
        const text = new Inkr().text('test');
        expect(text).to.include('test');
    });
});
