import { ColourSupportLevel, getColourSupport } from "../utils/support";
import { defColour, RGBColour } from "../utils/types";
import { colourMap, getBgColourCode, getTextColourCode } from "./styles";

export function RGBtoANSI256(input: RGBColour) {
    const [r, g, b] = input;
    const red = Math.round((r / 255) * 5);
    const green = Math.round((g / 255) * 5);
    const blue = Math.round((b / 255) * 5);
    return 16 + 36 * red + 6 * green + blue;
}

export function RGBtoBasic(rgb: RGBColour, isBg: boolean): string {
    let closest = colourMap[0];
    let minDistance = Number.MAX_VALUE;

    for (const colour of colourMap) {
        const dist = Math.sqrt(
            (rgb[0] - colour.rgb[0]) ** 2 +
            (rgb[1] - colour.rgb[1]) ** 2 +
            (rgb[2] - colour.rgb[2]) ** 2
        )
        if (dist < minDistance) {
            closest = colour;
            minDistance = dist;
        }
    }

    return isBg ? getBgColourCode(closest.colour) : getTextColourCode(closest.colour);
}

export function resolveColour(colour: defColour | RGBColour, isBg = false): string {
    const support = getColourSupport();
    const base = isBg ? 48 : 38;

    if (Array.isArray(colour)) {
        const [r, g, b] = colour;

        // RGB Supportability Fallbacks
        if (support >= ColourSupportLevel.trueColour) return `${base};2;${r};${g};${b}`;

        if (support >= ColourSupportLevel.extended) {
            const approxColour = RGBtoANSI256(colour);
            return `${base};5;${approxColour}`;
        }

        if (support >= ColourSupportLevel.basic) {
            return RGBtoBasic(colour, isBg);
        }

        return "";
    }

    return isBg ? getBgColourCode(colour) : getTextColourCode(colour);
}
