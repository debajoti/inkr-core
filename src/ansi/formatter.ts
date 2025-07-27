import { StyleState } from "../utils/types";
import { getBgColourCode, getTextColourCode, getUnderlineCode, getWeightCode } from "./styles";

export function applyStyles(text: string, style: StyleState): string {
    let prefix = "\x1b[";
    const suffix = "\x1b[0m";

    if (style.colour) prefix += getTextColourCode(style.colour) + ";";
    if (style.bgColour) prefix += getBgColourCode(style.bgColour) + ";";
    if (style.weight) prefix += getWeightCode(style.weight) + ";";
    if (style.underline) prefix += getUnderlineCode(style.underline) + ";";

    if (prefix.charAt(prefix.length - 1) === '[') prefix = "";
    if (prefix.charAt(prefix.length - 1) === ';') prefix = prefix.slice(0, -1) + 'm';
    // console.log(JSON.stringify(`${prefix}${text}${suffix}`))

    return `${prefix}${text}${suffix}`
}