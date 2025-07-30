import { applyStyles } from "./ansi/formatter";
import { defaultConfig, InkrConfig, InkrStyles } from "./config/default";
import { defColour, RGBColour, StyleState, UnderlineStyle, Weight } from "./utils/types";

export class Inkr {
    private static instance: Inkr;
    private state: StyleState = this.resetState();
    private config: InkrConfig = { ...defaultConfig }

    public static getInstance(): Inkr {
        if (!Inkr.instance) {
            Inkr.instance = new Inkr();
        }
        return Inkr.instance;
    }

    public configure(userStyles: Partial<InkrStyles>): void {
        this.config.defaultStyle = { ...this.config.defaultStyle, ...userStyles };
    }

    public resetConfig(): void {
        this.config = { ...defaultConfig };
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
        this.state = this.resetState();
        return result;
    }

    private resetState(): StyleState {
        return {
            colour: null,
            bgColour: null,
            weight: null,
            underline: null,
        }
    }

    public getConfig(): InkrConfig {
        return this.config;
    }
}