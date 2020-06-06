import { RealFunction } from "../src/types.ts";
import { bisection, newtonRaphson, limit } from "../src/numerical_analysis.ts";

// Bisection method
let f:RealFunction = Math.log;
let gen1 = bisection(f);
console.log("Bisection method for ln:");
console.log(limit(1e-3, gen1([0.5,2]))); // 0.9999999999719384
console.log(limit(1e-6, gen1([0.5,2]))); // 1

// Newton-Raphson method
let g:RealFunction = Math.log;
let dg:RealFunction = x => 1/x;
let gen2 = newtonRaphson(g, dg);
console.log("Newton-Raphson method for ln:");
console.log(limit(1e-3, gen2(2))); // 0.9999999999719384
console.log(limit(1e-6, gen2(2))); // 1