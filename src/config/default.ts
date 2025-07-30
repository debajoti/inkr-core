import { ColourSupportType, defColour, RGBColour, UnderlineStyle, Weight } from '../utils/types'

export interface InkrStyles {
    colour?: defColour | RGBColour | null;
    bgColour?: defColour | RGBColour | null;
    weight?: Weight | null;
    underline?: UnderlineStyle | null;
}
export interface InkrConfig {
    preferredColourSupport?: ColourSupportType;
    defaultStyle?: InkrStyles
}

export const defaultConfig: Required<InkrConfig> = {
    preferredColourSupport: "trueColour",
    defaultStyle: {}
}