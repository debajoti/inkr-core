import { StyleState } from "../utils/types.js";
import { resolveColour } from "./colourResolver.js";
import { getBgColourCode, getTextColourCode, getUnderlineCode, getWeightCode } from "./styles.js";

export function applyStyles(text: string, style: StyleState): string {
    let prefix = "\x1b[";
    const suffix = "\x1b[0m";

    if (style.colour) prefix += resolveColour(style.colour, false) + ";";
    if (style.bgColour) prefix += resolveColour(style.bgColour, true) + ";";
    if (style.weight) prefix += getWeightCode(style.weight) + ";";
    if (style.underline) prefix += getUnderlineCode(style.underline) + ";";

    if (prefix.charAt(prefix.length - 1) === '[') prefix = "";
    if (prefix.charAt(prefix.length - 1) === ';') prefix = prefix.slice(0, -1) + 'm';

    return `${prefix}${text}${suffix}`
}