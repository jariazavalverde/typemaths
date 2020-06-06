import { RealFunction } from "../src/types.ts";
import { compose } from "../src/combinators.ts";

let succ:RealFunction = x => x+1;
let doubleMe:RealFunction = x => x*2;
let h = compose(doubleMe, succ);
console.log(h(3)); // 8
console.log(h(5)); // 12