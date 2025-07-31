import { expect } from 'chai';
import inkr, { Inkr } from '../src/index';
import { describe, it } from 'node:test';

describe('Inkr Singleton (from index)', () => {
    it('should always return the same instance', () => {
        const instanceFromDefault = inkr;
        const instanceFromClass = Inkr.getInstance();

        expect(instanceFromDefault).to.equal(instanceFromClass);
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
        if (config.defaultStyle?.colour !== null) {
            throw new Error(`Expected config.defaultStyle.colour to be null after reset, but got ${config.defaultStyle?.colour}`);
        }
    });

    it('should return fresh builder with current config', () => {
        inkr.configure({ colour: 'red' });
        const builder = inkr.style();
        const styledText = builder.text('Red text');

        expect(styledText).to.include('Red text');
        expect(styledText).to.satisfy(out =>
            out.includes('red') || out.includes('[31m') || out.includes('\x1b[38;2;255;0;0m')
        );
    });
});
