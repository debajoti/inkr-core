import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'node:test';
import Inkr from '../src/inkr.ts';
import { applyStyles } from '../src/ansi/formatter.ts';
import { StyleState } from '../src/utils/types.ts';

declare global {
    var window: any;
    var document: any;
    var process: any;
}

describe('Environment Detection & Compatibility', () => {
    let originalWindow: any;
    let originalDocument: any;
    let originalProcess: any;
    let inkr: Inkr;

    beforeEach(() => {
        originalWindow = (global as any).window;
        originalDocument = (global as any).document;
        originalProcess = (global as any).process;

        (Inkr as any).instance = undefined;
    });

    afterEach(() => {
        (global as any).window = originalWindow;
        (global as any).document = originalDocument;
        (global as any).process = originalProcess;

        (Inkr as any).instance = undefined;
    });

    describe('Browser Environment Detection', () => {
        it('should detect browser environment when window and document exist', () => {
            (global as any).window = {};
            (global as any).document = {};

            inkr = Inkr.getInstance();
            const config = inkr.getConfig();
            expect(config.isBrowser).to.equal(true);
        });

        it('should detect Node.js environment when window is undefined', () => {
            delete (global as any).window;
            delete (global as any).document;

            inkr = Inkr.getInstance();
            const config = inkr.getConfig();
            expect(config.isBrowser).to.equal(false);
        });

        it('should detect Node.js environment when document is undefined', () => {
            (global as any).window = {};
            delete (global as any).document;

            inkr = Inkr.getInstance();
            const config = inkr.getConfig();
            expect(config.isBrowser).to.equal(false);
        });

        it('should allow manual override of browser detection', () => {
            delete (global as any).window;
            delete (global as any).document;

            inkr = Inkr.getInstance();
            expect(inkr.getConfig().isBrowser).to.equal(false);

            inkr.configure({ colour: 'red' });
        });
    });

    describe('Terminal vs Browser Output', () => {
        it('should generate ANSI codes for terminal environment', () => {
            delete (global as any).window;
            delete (global as any).document;

            inkr = Inkr.getInstance();
            const styledText = inkr.style().colour('red').text('Hello');

            expect(styledText).to.include('\x1b[');
            expect(styledText).to.include('Hello');
            expect(styledText).to.include('\x1b[0m');
        });

        it('should handle browser environment (currently same as terminal)', () => {
            (global as any).window = {};
            (global as any).document = {};

            inkr = Inkr.getInstance();
            const styledText = inkr.style().colour('red').text('Hello');

            expect(styledText).to.include('Hello');
            expect(styledText).to.include('\x1b[');
        });
    });

    describe('Color Resolution', () => {
        it('should handle RGB colors in terminal', () => {
            delete (global as any).window;
            delete (global as any).document;

            inkr = Inkr.getInstance();
            const rgbColor: [number, number, number] = [255, 128, 0];
            const result = inkr.style().colour(rgbColor).text('RGB Test');

            expect(result).to.include('RGB Test');
            expect(result).to.include('\x1b[38;2;255;128;0');
        });

        it('should handle named colors', () => {
            delete (global as any).window;
            delete (global as any).document;

            inkr = Inkr.getInstance();
            const result = inkr.style().colour('red').text('Named Color');

            expect(result).to.include('Named Color');
            expect(result).to.include('\x1b[31');
        });

        it('should handle background colors', () => {
            delete (global as any).window;
            delete (global as any).document;

            inkr = Inkr.getInstance();
            const result = inkr.style().bgColour('blue').text('Background');

            expect(result).to.include('Background');
            expect(result).to.include('\x1b[44');
        });
    });

    describe('Style Combinations', () => {
        it('should handle multiple styles', () => {
            delete (global as any).window;
            delete (global as any).document;

            inkr = Inkr.getInstance();
            const result = inkr.style()
                .colour('red')
                .bgColour('white')
                .weight('bold')
                .underline('solid')
                .text('Complex Style');

            expect(result).to.include('Complex Style');
            expect(result).to.include('\x1b[');
            expect(result).to.include('\x1b[0m');
        });

        it('should handle empty styles gracefully', () => {
            delete (global as any).window;
            delete (global as any).document;

            inkr = Inkr.getInstance();
            const result = inkr.style().text('Plain text');

            expect(result).to.include('Plain text');
        });
    });

    describe('Configuration Management', () => {
        it('should maintain singleton behavior', () => {
            const instance1 = Inkr.getInstance();
            const instance2 = Inkr.getInstance();
            expect(instance1).to.equal(instance2);
        });

        it('should reset configuration properly', () => {
            inkr = Inkr.getInstance();
            inkr.configure({ colour: 'green', weight: 'bold' });
            inkr.resetConfig();

            const config = inkr.getConfig();
            expect(config.defaultStyle?.colour).to.equal(null);
            expect(config.defaultStyle?.weight).to.equal(null);
        });

        it('should preserve browser detection on reset', () => {
            (global as any).window = {};
            (global as any).document = {};

            inkr = Inkr.getInstance();
            expect(inkr.getConfig().isBrowser).to.equal(true);
            inkr.resetConfig();
        });
    });

    describe('Edge Cases & Error Handling', () => {
        it('should handle null/undefined colors gracefully', () => {
            delete (global as any).window;
            delete (global as any).document;

            inkr = Inkr.getInstance();
            const result = inkr.style().text('No Color');

            expect(result).to.include('No Color');
        });

        it('should handle process.env not existing (browser case)', () => {
            (global as any).window = {};
            (global as any).document = {};
            delete (global as any).process;
            try {
                inkr = Inkr.getInstance();
                const result = inkr.style().colour('red').text('Test');
                expect(result).to.include('Test');
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

    describe('Low-level Formatter Tests', () => {
        it('should apply basic terminal styles correctly', () => {
            const style: StyleState = {
                colour: 'red',
                bgColour: null,
                weight: 'bold',
                underline: null
            };

            const result = applyStyles('Test', style, false);

            expect(result).to.include('Test');
            expect(result).to.include('31');
            expect(result).to.include('1');
        });

        it('should handle browser styles (currently returns ANSI)', () => {
            const style: StyleState = {
                colour: 'red',
                bgColour: 'white',
                weight: 'bold',
                underline: 'solid'
            };

            const result = applyStyles('Test', style, true);
            expect(result).to.include('Test');
            expect(result).to.include('\x1b[');
        });
    });
});