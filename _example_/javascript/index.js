import inkr from "inkr";

// Simple usage
console.log(inkr.style().colour("red").text("Red text"));

// Background and combined styles
console.log(
    inkr
        .style()
        .colour("white")
        .bgColour("blue")
        .weight("bold")
        .underline("single")
        .text("Styled text")
);

// RGB colours
console.log(inkr.style().colour([255, 128, 0]).text("Orange RGB text"));