import { expect } from 'chai';
import inkr from '../src/index';
import { describe, it } from 'node:test';

describe('Inkr Colour', () => {
    it('should apply RGB colour', () => {
        const styled = inkr.style().colour([255, 0, 0]).text('Red RGB');
        expect(styled).to.include("255;0;0");
    });
});
