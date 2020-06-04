import {newtonRaphson, iterate, limit} from "../src/modules/numerical_analysis.ts";

let f = newtonRaphson((x:number) => x*x, (x:number) => 2*x);
let gen = iterate(f);
console.log(limit(0.000005, gen(1)));