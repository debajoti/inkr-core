import { expect } from 'chai';
import inkr from '../src/index.ts';
import { describe, it } from 'node:test';

describe('Weight Feature', () => {
    it('should apply bold style', () => {
        const boldText = inkr.style().weight('bold').text("");
        expect(boldText).to.satisfy((output: string) => {
            return output.includes('1;') || output.includes('1m');
        });
    });

    it('should apply dim style', () => {
        const dimmed = inkr.style().weight('dimmed').text('');
        expect(dimmed).to.satisfy((output: string) => {
            return output.includes('2;') || output.includes('2m');
        });
    });

    it('should fallback to normal', () => {
        const normal = inkr.style().weight('normal').text("");
        expect(normal).to.satisfy((output: string) => {
            return output.includes('22;') || output.includes('22m');
        });
    });
});
