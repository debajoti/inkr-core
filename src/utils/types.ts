export type Colour = "red" | "green" | "blue" | "yellow" | "cyan" | "magenta" | "white" | "gray";
export type BgColour = "red" | "green" | "blue" | "yellow" | "cyan" | "magenta" | "white" | "gray";
export type Weight = "dimmed" | "normal" | "bold";
export type UnderlineStyle = "solid" | "dashed" | "dotted" | "double";

export interface StyleState {
    colour: Colour | null;
    bgColour: BgColour | null;
    weight: Weight | null;
    underline: UnderlineStyle | null;
}