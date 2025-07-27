export type defColour = "red" | "green" | "blue" | "yellow" | "cyan" | "magenta" | "white" | "gray";
export type RGBColour = [number, number, number];
export type ColourInput = defColour | RGBColour;

export type Weight = "dimmed" | "normal" | "bold";
export type UnderlineStyle = "solid" | "dashed" | "dotted" | "double";

export interface StyleState {
    colour: ColourInput | null;
    bgColour: ColourInput | null;
    weight: Weight | null;
    underline: UnderlineStyle | null;
}