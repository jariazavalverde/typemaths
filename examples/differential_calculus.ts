import { read, constant, identity, mul, pow, ln, log } from "../src/calculus/differential.ts";

// f(x) = x^2-ln(x)/(sin(x)*cos(x))
let r1 = read("x^2-ln(x)/(sin(x)*cos(x))");
console.log(r1(0.5), r1.derivative()(0.5));

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

// h2(x) = log(x^2, e), h'(x) = 1/(x^2) * 2x
let h2 = log(pow(identity(), constant(2)), constant(Math.E));
let dh2 = h2.derivative();
console.log(h2(3), dh2(3)); // 2.1972245773362196 0.6666666666666667