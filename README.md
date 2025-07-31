# inkr

A lightweight and flexible CLI colourizing tool for styled terminal output with TypeScript support.

## Features

- 🎨 3/4-bit Basic colours, 8bit colours (ANSI256) and true colour (RGB) support
- 🖌️ Background colours
- 💪 Text weights (bold, dim)
- ✍️ Multiple underline styles
- ⚡ Chainable API
- 🔄 Automatic terminal colour support detection
- 📦 Zero dependencies
- 🚀 TypeScript support

## Installation

```bash
npm install inkr-core
```

## Basic Inline Usage

```typescript
import inkr from "inkr";

// Basic colours
console.log(inkr.style().colour("red").text("This is red text"));
console.log(inkr.style().colour("blue").text("This is blue text"));

// Background colours
console.log(
  inkr.style().bgColour("yellow").text("Text with yellow background")
);

// Combining foreground and background
console.log(
  inkr
    .style()
    .colour("white")
    .bgColour("blue")
    .text("White text on blue background")
);
```

## Text Styling

```typescript
// Bold text
console.log(inkr.style().weight("bold").text("Bold text"));

// Underlined text
console.log(inkr.style().underline("single").text("Underlined text"));

// Combining multiple styles
console.log(
  inkr
    .style()
    .colour("red")
    .bgColour("white")
    .weight("bold")
    .underline("double")
    .text("Multi-styled text")
);
```

## RGB colours

```typescript
// Custom RGB colours
console.log(inkr.style().colour([255, 128, 0]).text("Custom orange text"));

// Custom RGB background
console.log(
  inkr.style().bgColour([100, 200, 150]).text("Text with custom background")
);
```

## Creating Reusable Theme-Styles

You can create reusable styles for consistent formatting:

```typescript
// Define your styles
const errorStyle = inkr.style().colour("red").weight("bold");
const warnStyle = inkr.style().colour("yellow");
const successStyle = inkr.style().colour("green");

// Use them throughout your application
console.log(errorStyle.text("Error: Operation failed"));
console.log(warnStyle.text("Warning: Disk space low"));
console.log(successStyle.text("Success: Data saved"));
```

## Chaining Multiple Outputs

```typescript
console.log(
  inkr.style().colour("red").text("Error: ") +
    inkr.style().colour("yellow").text("Something went wrong!")
);
```

## API Reference

### Colours

Available basic colours:

- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white
- gray
- [r,g,b] : Array

### Text Weights

- 'bold'
- 'dim'
- 'normal'

### Underline Styles

- 'single'
- 'double'
- 'none'

### Methods

#### `style()`

Creates a new style builder instance.

#### `colour(value)`

Sets the text colour. Accepts:

- Basic colour name (string)
- RGB Array `[ r: number, g: number, b: number ]`

#### `bgColour(value)`

Sets the background colour. Accepts same values as `colour()`.

#### `weight(value)`

Sets the text weight ('bold', 'dim', 'normal').

#### `underline(value)`

Sets the underline style ('single', 'double', 'none').

#### `text(content)`

Applies all styles to the provided text and returns the formatted string.

## Terminal Compatibility

inkr automatically detects your terminal's colour support level and adjusts output accordingly:

- True colour (16 million colours)
- 256 colours
- Basic (16 colours)

## License

MIT License
