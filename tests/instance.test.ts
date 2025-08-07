import { expect } from 'chai';
import inkr from '../src/index.ts';
import { describe, it } from 'node:test';

describe('Inkr Singleton (from index)', () => {
    it('should always return the same instance', () => {
        const instance1 = inkr;
        const instance2 = inkr;
        expect(instance1).to.equal(instance2); // Compare inkr with itself
    });

    it('should allow configuration changes on singleton', () => {
        inkr.configure({ weight: 'bold' });
        const config = inkr.getConfig();
        expect(config.defaultStyle?.weight).to.equal('bold');
    });

    it('should reset to default config', () => {
        inkr.configure({ colour: 'green' });
        inkr.resetConfig();
        const config = inkr.getConfig();
        expect(config.defaultStyle?.colour).to.equal(null);
    });

    it('should return fresh builder with current config', () => {
        inkr.configure({ colour: 'red' });
        const builder = inkr.style();
        const styledText = builder.text('Red text');
        expect(styledText).to.include('Red text');
        expect(styledText).to.satisfy((out: string) =>
            out.includes('red') || out.includes('[31m') || out.includes('\x1b[38;2;255;0;0m')
        );
    });
});