import Inkr from "./inkr";
export * from './inkr';
export * from './utils/types';
export * from './config/default';
export * from './ansi/styles';

const inkr = Inkr.getInstance();
export default inkr;
export { Inkr };