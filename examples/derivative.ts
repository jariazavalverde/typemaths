import { constant, identity, mul, pow, ln } from "../src/derivative.ts";

// f(x) = 4x, f'(x) = 4
let f = mul(constant(4), identity());
let df = f.derivative();
console.log(f(3), df(3)); // 12 4

// g(x) = 4x^2, g'(x) = 8x
let g = mul(constant(4), pow(identity(), constant(2)));
let dg = g.derivative();
console.log(g(3), dg(3)); // 36 24

// h(x) = ln(x^2), h'(x) = 1/(x^2) * 2x
let h = ln(pow(identity(), constant(2)));
let dh = h.derivative();
console.log(h(3), dh(3)); // 2.1972245773362196 0.6666666666666666