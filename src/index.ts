import { InkrStyles, InkrConfig } from "./config/default.js";
import Inkr from "./inkr.js";
import { InkrBuilder } from "./inkrBuilder.js";
export * from './utils/types.js';
export * from './config/default.js';

const inkr = Inkr.getInstance();
export default inkr;