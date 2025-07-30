import { afterEach, describe, it } from "node:test";
import { _resetColorSupportForTests, ColourSupportLevel, detectTerminalSupport, getColourSupport } from "../src/utils/support";
import { expect } from "chai";


describe("Colour Supportibility Test", () => {
    it("Your Colour Supportibility is TRUECOLOR", () => {
        expect(detectTerminalSupport()).to.equal(ColourSupportLevel.trueColour)
    })
})

describe("Preference Changeability", () => {
    const originalEnv = { ...process.env };
    afterEach(() => {
        process.env = { ...originalEnv };
        _resetColorSupportForTests();
    });

    it("Should fallback to detected terminal support if preference is too high", () => {
        process.env.TERM = "xterm-256color";
        delete process.env.COLORTERM;
        _resetColorSupportForTests();
        expect(getColourSupport()).to.equal(ColourSupportLevel.extended);
    });

    it("Should fallback all the way to 'none' if nothing matches", () => {
        delete process.env.TERM;
        delete process.env.COLORTERM;
        delete process.env.NO_COLOR;
        delete process.env.FORCE_COLOR;
        _resetColorSupportForTests();

        expect(getColourSupport()).to.equal(ColourSupportLevel.none);
    });
});
