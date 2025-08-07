<img width="1000" height="250" alt="Untitled design (4)" src="https://github.com/user-attachments/assets/52470c0d-1b2f-4f66-b9ac-2f058fafdcec" />

# inkr-core

**inkr-core** is a zero-dependency, TypeScript-first library for richly stylized, colourized terminal output. Designed for clarity, flexibility, and performance.

## Features

- Advanced colour support: 16-colour, 256-colour (ANSI), and true RGB.
- Foreground and background styling, including custom RGB arrays.
- Text weights (bold, dim) and underline styles (single, double).
- Intuitive, chainable API for style composition.
- Automatic terminal colour detection.
- Reusable, themeable style definitions.
- Pure TypeScript with no external dependencies.

## Installation

```bash
npm install inkr-core
```

## Usage

```typescript
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
```

### Reusable Theme-Based Styles

```typescript
const error = inkr.style().colour("red").weight("bold");
console.log(error.text("Error: Operation failed"));

// another way
const success = inkr
  .configure({
    colour: "green",
    weight: "bold",
  })
  .style();
console.log(success.text("Server is running on port:8000"));
```

### Chained Outputs

```typescript
console.log(
  inkr.style().colour("red").text("Error: ") +
    inkr.style().colour("yellow").text("Details here.")
);
```

## API Summary

| Method             | Function                                          |
| :----------------- | :------------------------------------------------ |
| `style()`          | Start a new style chain                           |
| `colour(value)`    | Set text colour (name or [r,g,b] array)           |
| `bgColour(value)`  | Set background colour (name or [r,g,b] array)     |
| `weight(value)`    | Set text weight: `'bold'`, `'dim'`, `'normal'`    |
| `underline(value)` | Apply underline: `'single'`, `'double'`, `'none'` |
| `text(content)`    | Apply styles to a string                          |

inkr-core ensures beautiful output, adapts to your terminal, and keeps your CLI code elegant.

## Supportibility

- node >= 18
- Compatible with terminal colours & Browser Developer Console(ANSI)

**License:** MIT
