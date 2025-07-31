import { defaultConfig, InkrConfig, InkrStyles } from "./config/default";
import { InkrBuilder } from "./inkrBuilder";

export default class Inkr {
    private static instance: Inkr;
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
        this.config = {
            preferredColourSupport: "trueColour",
            defaultStyle: {
                colour: null,
                bgColour: null,
                weight: null,
                underline: null
            }
        };
    }

    public getConfig(): InkrConfig {
        return this.config;
    }

    public style(): InkrBuilder {
        const configCopy: InkrConfig = JSON.parse(JSON.stringify(this.config));
        return new InkrBuilder(configCopy);
    }
}