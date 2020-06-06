import { RealFunction, Predicate } from "../src/types.ts";
import { map, filter, take, enumFrom } from "../src/generators.ts";

let f:RealFunction = x => x*x;
let p:Predicate<number> = x => x%2 == 0;
let gen = filter(p, map(f, enumFrom(1)));

// Take the 10 first even squares
console.log(take(10, gen)); // [4, 16, 36, 64, 100, 144, 196, 256, 324, 400]