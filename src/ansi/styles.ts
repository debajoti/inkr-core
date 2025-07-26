export function getTextColourCode(colour: string): string {
    const map: Record<string, string> = {
        black: "30",
        red: "31",
        green: "32",
        yellow: "33",
        blue: "34",
        magenta: "35",
        cyan: "36",
        white: "37",
    };
    return map[colour] ?? "";
}

export function getBgColourCode(colour: string): string {
    const map: Record<string, string> = {
        black: "40",
        red: "41",
        green: "42",
        yellow: "43",
        blue: "44",
        magenta: "45",
        cyan: "46",
        white: "47",
    };
    return map[colour] ?? "";
}

export function getWeightCode(style: string): string {
    const map: Record<string, string> = {
        dimmed: "2",
        normal: "22",
        bold: "1",
    }
    return map[style] ?? "";
}

export function getUnderlineCode(style: string): string {
    const map: Record<string, string> = {
        solid: "4",
        double: "21",
        dashed: "4:3",
        dotted: "4:4",
    };
    return map[style] ?? "";
}