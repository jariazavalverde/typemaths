
# Differential calculus
> **Differential calculus** is a subfield of calculus that studies the rates
> at which quantities change.

This module defines methods for computing the derivative of a real function.
```typescript
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
```

### Differentiable functions
> A **differentiable function** of one real variable is a function whose
> derivative exists at each point in its domain.

Interface for differentiable functions. A real function ![$f$](http://latex.codecogs.com/png.latex?f)  that implements
the `derivative` method, which returns the derivative ![$f'$](http://latex.codecogs.com/png.latex?f') .
```typescript
export interface Differentiable extends RealFunction {
    derivative: () => Differentiable
}
```

### Differentiable elementary functions
Differentiable version of elementary functions.
```typescript
// f(x) = x, f'(x) = 1
export function identity(): Differentiable {
    return makeDerivative(x => x, () => constant(1));
}

// f(x) = c, f'(x) = 0
export function constant(c:number): Differentiable {
    return makeDerivative(_x => c, () => constant(0));
}

// f(x) = g(x) + h(x), f'(x) = g'(x) + h'(x)
export function add(f:Differentiable, g:Differentiable): Differentiable {
    return makeDerivative(x => f(x)+g(x), () => add(
        f.derivative(),
        g.derivative()
    ));
}

// f(x) = g(x) - h(x), f'(x) = g'(x) - h'(x)
export function sub(f:Differentiable, g:Differentiable): Differentiable {
    return makeDerivative(x => f(x)-g(x), () => sub(
        f.derivative(),
        g.derivative()
    ));
}

// f(x) = g(x) * h(x), f'(x) = g(x) * h'(x) + g'(x) * h(x)
export function mul(f:Differentiable, g:Differentiable): Differentiable {
    return makeDerivative(x => f(x)*g(x), () => add(
        mul(f.derivative(), g),
        mul(f, g.derivative())
    ));
}

// f(x) = g(x) / h(x), f'(x) = (g'(x)*h(x) - g(x)*h'(x)) / (h(x)^2)
export function div(f:Differentiable, g:Differentiable): Differentiable {
    return makeDerivative(x => f(x)/g(x), () => div(
        sub(
            mul(f.derivative(), g), 
            mul(f, g.derivative())
        ),
        pow(g, constant(2))
    ));
}

// f(x) = g(x)^(h(x)), f'(x) = g(x)^(h(x)) * (h'(x) * ln(g(x)) + h(x)/g(x) * g'(x))
export function pow(f:Differentiable, g:Differentiable): Differentiable {
    return makeDerivative(x => f(x)**g(x), () => mul(
        pow(f, g),
        add(
            mul(g.derivative(), ln(f)),
            mul(div(g, f), f.derivative())
        )
    ));
}

// f(x) = ln(g(x)), f'(x) = 1/(g(x)) * g'(x)
export function ln(f:Differentiable): Differentiable {
    return log(f, Math.E);
}

// f(x) = log_b(g(x)), f'(x) = 1/(g(x) * ln(b)) * g'(x)
export function log(f:Differentiable, b:number): Differentiable {
    return makeDerivative(x => Math.log(f(x))/Math.log(b), () => mul(
        div(constant(1), mul(f, ln(constant(b)))),
        f.derivative()
    ));
}

// f(x) = sin(g(x)), f'(x) = cos(g(x)) * g'(x)
export function sin(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.sin(f(x)), () => mul(
        cos(f), f.derivative()
    ));
}

// f(x) = cos(g(x)), f'(x) = -sin(g(x)) * g'(x)
export function cos(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.cos(f(x)), () => mul(
        mul(constant(-1), cos(f)),
        f.derivative()
    ));
}
```
