import { RealFunction } from "../src/types.ts";
import { bisection, newtonRaphson, secant, limit } from "../src/numerical_analysis.ts";

let f:RealFunction = Math.log;
let df:RealFunction = x => 1/x;

// Bisection method
let gen1 = bisection(f);
console.log("Bisection method for ln:");
console.log(limit(1e-3, gen1([0.5,2]))); // 0.9999999999719384
console.log(limit(1e-6, gen1([0.5,2]))); // 1

// Newton-Raphson method
let gen2 = newtonRaphson(f, df);
console.log("Newton-Raphson method for ln:");
console.log(limit(1e-3, gen2(2))); // 0.9999999999719384
console.log(limit(1e-6, gen2(2))); // 1

// Secant method
let gen3 = secant(f);
console.log("Secant method for ln:");
console.log(limit(1e-3, gen3([0.5,2]))); // 0.99999544427369
console.log(limit(1e-6, gen3([0.5,2]))); // 1.0000000000000036