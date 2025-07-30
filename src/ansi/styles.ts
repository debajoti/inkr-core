import { ColourSupportLevel } from "../utils/support";
import { ColourSupportType, defColour, RGBColour, UnderlineStyle, Weight } from "../utils/types";

export function getTextColourCode(colour: defColour): string {
    const map: Record<defColour, string> = {
        black: "30",
        red: "31",
        green: "32",
        yellow: "33",
        blue: "34",
        magenta: "35",
        cyan: "36",
        white: "37",
    };
    return map[colour] ?? "";
}

export function getColourSupportMap(type: ColourSupportType): ColourSupportLevel {
    const map: Record<ColourSupportType, ColourSupportLevel> = {
        none: ColourSupportLevel.none,
        basic: ColourSupportLevel.basic,
        extended: ColourSupportLevel.extended,
        trueColour: ColourSupportLevel.trueColour,
    };
    return map[type] ?? ColourSupportLevel.trueColour;
}

export const colourMap: { colour: defColour; rgb: RGBColour }[] = [
    { colour: "black", rgb: [0, 0, 0], },
    { colour: "red", rgb: [255, 0, 0], },
    { colour: "green", rgb: [0, 255, 0], },
    { colour: "yellow", rgb: [255, 255, 0], },
    { colour: "blue", rgb: [0, 0, 255], },
    { colour: "magenta", rgb: [255, 0, 255], },
    { colour: "cyan", rgb: [0, 255, 255], },
    { colour: "white", rgb: [255, 255, 255], },
] as const;

export function getBgColourCode(colour: defColour): string {
    const map: Record<defColour, string> = {
        black: "40",
        red: "41",
        green: "42",
        yellow: "43",
        blue: "44",
        magenta: "45",
        cyan: "46",
        white: "47",
    };
    return map[colour] ?? "";
}

export function getWeightCode(style: Weight): string {
    const map: Record<Weight, string> = {
        dimmed: "2",
        normal: "22",
        bold: "1",
    }
    return map[style] ?? "";
}

export function getUnderlineCode(style: UnderlineStyle): string {
    const map: Record<UnderlineStyle, string> = {
        solid: "4",
        double: "21",
        dashed: "4:3",
        dotted: "4:4",
    };
    return map[style] ?? "";
}