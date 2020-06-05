import { RealFunction } from "../src/types.ts";
import { newtonRaphson, iterate, limit } from "../src/numerical_analysis.ts";

let f:RealFunction = Math.log;
let df:RealFunction = x => 1/x;
let gen = iterate(newtonRaphson(f, df));
console.log(limit(1e-3, gen(2))); // 0.9999999999719384
console.log(limit(1e-6, gen(2))); // 1