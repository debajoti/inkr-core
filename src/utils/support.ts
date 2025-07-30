import { defaultConfig } from "../config/default";
import { getColourSupportMap } from "../ansi/styles"

export enum ColourSupportLevel {
    none = 0,
    basic = 1,
    extended = 2,
    trueColour = 3
}

let cachedTerminalSupport: ColourSupportLevel | null = null;

export function detectTerminalSupport(): ColourSupportLevel {
    const env = process.env;

    if (env.COLORTERM === "truecolor" || env.COLORTERM === "24bit") {
        return ColourSupportLevel.trueColour;
    }

    if (env.TERM === "xterm-256color" || env.TERM?.includes("256")) {
        return ColourSupportLevel.extended;
    }

    if (env.TERM && /xterm|vt100|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return ColourSupportLevel.basic;
    }

    if ("NO_COLOR" in env || env.FORCE_COLOR === "0") {
        return ColourSupportLevel.none;
    }

    return ColourSupportLevel.none;
}

export function getColourSupport(): ColourSupportLevel {
    if (cachedTerminalSupport === null) {
        cachedTerminalSupport = detectTerminalSupport();
    }
    const userPreference = getColourSupportMap(defaultConfig.preferredColourSupport);
    if (userPreference !== undefined && userPreference <= cachedTerminalSupport) return userPreference;
    return cachedTerminalSupport
}

export function shouldApplyColor(): boolean {
    return getColourSupport() > ColourSupportLevel.none;
}

export function _resetColorSupportForTests() {
    cachedTerminalSupport = null;
}