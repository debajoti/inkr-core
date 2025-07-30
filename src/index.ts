
import { Inkr } from "./inkr";

const inkr = Inkr.getInstance();

inkr.configure({
    colour: [255, 0, 0],
    weight: "bold",
})
const red = inkr.style()

inkr.configure({
    colour: [0, 255, 0],
    weight: "bold",
    underline: "double"
})

const custom = inkr.style();

console.log(red.text("Here is my colour"));
console.log(custom.text("Hello there"))

export default inkr;
export { Inkr }; // shared instance if the advanced users want isolation