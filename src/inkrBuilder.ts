import { applyStyles } from "./ansi/formatter.js";
import { InkrConfig } from "./config/default.js";
import { defColour, RGBColour, StyleState, UnderlineStyle, Weight } from "./utils/types.js";

export class InkrBuilder {
    private state: StyleState;

    constructor(private readonly config: Readonly<InkrConfig>) {
        this.state = {
            colour: config.defaultStyle?.colour ?? null,
            bgColour: config.defaultStyle?.bgColour ?? null,
            weight: config.defaultStyle?.weight ?? null,
            underline: config.defaultStyle?.underline ?? null,
        };
    }

    public colour(colour: defColour | RGBColour): this {
        this.state.colour = colour;
        return this;
    }

    public bgColour(colour: defColour | RGBColour): this {
        this.state.bgColour = colour;
        return this;
    }

    public weight(weight: Weight): this {
        this.state.weight = weight;
        return this;
    }

    public underline(underline: UnderlineStyle): this {
        this.state.underline = underline;
        return this;
    }

    public text(content: string): string {
        const finalState: StyleState = {
            colour: this.config.defaultStyle?.colour ?? this.state.colour,
            bgColour: this.config.defaultStyle?.bgColour ?? this.state.bgColour,
            weight: this.config.defaultStyle?.weight ?? this.state.weight,
            underline: this.config.defaultStyle?.underline ?? this.state.underline
        }
        const result = applyStyles(content, finalState);
        return result;
    }

}