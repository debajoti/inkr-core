export type defColour = "red" | "green" | "blue" | "yellow" | "cyan" | "magenta" | "white" | "black";
export type RGBColour = [number, number, number];

export type Weight = "dimmed" | "normal" | "bold";
export type UnderlineStyle = "solid" | "dashed" | "dotted" | "double";
export type ColourSupportType = "none" | "basic" | "extended" | "trueColour";

export interface StyleState {
    colour: defColour | RGBColour | null;
    bgColour: defColour | RGBColour | null;
    weight: Weight | null;
    underline: UnderlineStyle | null;
}