import { applyStyles } from "./ansi/formatter";
import { BgColour, Colour, StyleState, UnderlineStyle, Weight } from "./utils/types";

export class inkr {
    private state: StyleState = this.resetState();
    colour(colour: Colour): this {
        this.state.colour = colour;
        return this;
    }
    bgColour(colour: BgColour): this {
        this.state.bgColour = colour;
        return this;
    }
    weight(weight: Weight): this {
        this.state.weight = weight;
        return this;
    }
    underline(underline: UnderlineStyle): this {
        this.state.underline = underline;
        return this;
    }

    text(content: string): string {
        console.log(this)
        const result = applyStyles(content, this.state);
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
}