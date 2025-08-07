import { StyleState } from "../utils/types.js";
import { resolveColour } from "./colourResolver.js";
import { getUnderlineCode, getWeightCode } from "./styles.js";

export function applyStyles(text: string, style: StyleState, isBrowser: boolean): string {
    let prefix = "\x1b[";
    const suffix = "\x1b[0m";

    if (style.colour) prefix += resolveColour(style.colour, false, isBrowser) + ";";
    if (style.bgColour) prefix += resolveColour(style.bgColour, true, isBrowser) + ";";
    if (style.weight) prefix += getWeightCode(style.weight) + ";";
    if (style.underline) prefix += getUnderlineCode((isBrowser) ? "solid" : style.underline) + ";";

    if (prefix.charAt(prefix.length - 1) === '[') prefix = "";
    if (prefix.charAt(prefix.length - 1) === ';') prefix = prefix.slice(0, -1) + 'm';

    return `${prefix}${text}${suffix}`
}