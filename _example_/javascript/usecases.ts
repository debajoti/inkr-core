import inkr from "../../src";

// Basic color examples
console.log(inkr.style().colour('red').text('red'));
console.log(inkr.style().colour('blue').text('blue'));
console.log(inkr.style().colour('green').text('green'));

// Background colors
console.log(inkr.style().bgColour('yellow').text('text with yellow background'));
console.log(inkr.style().colour('white').bgColour('blue').text('white text on blue'));

// Text styling
console.log(inkr.style().weight('bold').text('bold text'));
console.log(inkr.style().underline("solid").text('underlined text'));

// Combining multiple styles
console.log(
    inkr.style()
        .colour('red')
        .bgColour('white')
        .weight('bold')
        .underline('double')
        .text('Styled text')
);

// RGB colors
console.log(inkr.style().colour([255, 128, 0]).text('Custom orange'));
console.log(inkr.style().bgColour([100, 200, 150]).text('Custom bg color'));

// Chaining multiple text outputs
console.log(
    inkr.style().colour('red').text('Error: ')
    + inkr.style().colour('yellow').text('Warning message')
);

// Theme-like usage
const errorStyle = inkr.style().colour('red').weight('bold');
const warnStyle = inkr.style().colour('yellow');
const successStyle = inkr.style().colour('green');

console.log(errorStyle.text('Error message'));
console.log(warnStyle.text('Warning message'));
console.log(successStyle.text('Success message'));