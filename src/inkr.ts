import { defaultConfig, InkrConfig, InkrStyles } from "./config/default.js";
import { InkrBuilder } from "./inkrBuilder.js";

export default class Inkr {
    private static instance: Inkr;
    private config: InkrConfig = { ...defaultConfig }

    private constructor() { };

    public static getInstance(): Inkr {
        if (!Inkr.instance) {
            Inkr.instance = new Inkr();
        }
        return Inkr.instance;
    }

    public configure(userStyles: Partial<InkrStyles>): this {
        this.config.defaultStyle = { ...this.config.defaultStyle, ...userStyles };
        return this;
    }

    public resetConfig(): this {
        this.config = {
            preferredColourSupport: "trueColour",
            defaultStyle: {
                colour: null,
                bgColour: null,
                weight: null,
                underline: null
            }
        };
        return this;
    }

    public getConfig(): InkrConfig {
        return this.config;
    }

    public style(): InkrBuilder {
        const configCopy: InkrConfig = {
            preferredColourSupport: this.config.preferredColourSupport,
            defaultStyle: { ...this.config.defaultStyle }
        };
        return new InkrBuilder(configCopy);
    }
}