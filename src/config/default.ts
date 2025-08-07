import { ColourSupportType, defColour, RGBColour, UnderlineStyle, Weight } from '../utils/types.js'

export interface InkrStyles {
    colour?: defColour | RGBColour | null;
    bgColour?: defColour | RGBColour | null;
    weight?: Weight | null;
    underline?: UnderlineStyle | null;
}
export interface InkrConfig {
    preferredColourSupport?: ColourSupportType;
    defaultStyle?: InkrStyles
    isBrowser?: boolean
}

export const defaultConfig: Required<InkrConfig> = {
    preferredColourSupport: "trueColour",
    defaultStyle: {},
    isBrowser: typeof window !== "undefined" && typeof document !== "undefined",
}