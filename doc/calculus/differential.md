
# Differential calculus
> **Differential calculus** is a subfield of calculus that studies the rates
> at which quantities change.

This module defines methods for computing the derivative of a real function.
```typescript
export const __name = "differential";
export const __alias = "diff";
```
```typescript
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

### Read a differentiable function from a string
Given a string representation of a function and a variable, returns a
differentiable function.
```typescript
function mkHandler(variable?:string): ExprHandler<Differentiable> {
    return {
        fromNumber: (n:number) => constant(n),
        fromOperation: (op:string, args:Array<Differentiable>) => {
            switch(op + "/" + args.length) {
                case "+/1": return args[0];
                case "+/2": return add(args[0], args[1]);
                case "-/1": return mul(constant(-1), args[0]);
                case "-/2": return sub(args[0], args[1]);
                case "*/2": return mul(args[0], args[1]);
                case "//2": return div(args[0], args[1]);
                case "**/2":
                case "^/2": return pow(args[0], args[1]);
                case "sin/1": return sin(args[0]);
                case "cos/1": return cos(args[0]);
                case "tan/1": return tan(args[0]);
                case "cosec/1": return div(constant(1), sin(args[0]));
                case "sec/1": return div(constant(1), cos(args[0]));
                case "cotan/1": return div(constant(1), tan(args[0]));
                case "asin/1": return asin(args[0]);
                case "acos/1": return acos(args[0]);
                case "atan/1": return atan(args[0]);
                case "acosec/1": return asin(div(constant(1),args[0]));
                case "asec/1": return sub(constant(Math.PI/2), asin(div(constant(1),args[0])));
                case "acotan/1": return sub(constant(Math.PI/2), atan(args[0]));
                case "sinh/1": return sinh(args[0]);
                case "cosh/1": return cosh(args[0]);
                case "tanh/1": return tanh(args[0]);
                case "cosech/1": return div(constant(1), sinh(args[0]));
                case "sech/1": return div(constant(1), cosh(args[0]));
                case "cotanh/1": return div(constant(1), tanh(args[0]));
                case "asinh/1": return asinh(args[0]);
                case "acosh/1": return acosh(args[0]);
                case "atanh/1": return atanh(args[0]);
                case "acosech/1": return asinh(div(constant(1), args[0]));
                case "asech/1": return acosh(div(constant(1), args[0]));
                case "acotanh/1": return atanh(div(constant(1), args[0]));
                case "ln/1": return ln(args[0]);
                case "log/2": return log(args[0], args[1]);
                case "sqrt/1": return sqrt(args[0]);
                case "root/2": return root(args[0], args[1]);
                case "E/0": return constant(Math.E);
                case "PI/0": return constant(Math.PI);
            }
            if(args.length === 0 && (variable === op || variable === undefined)) {
                variable = op;
                return identity();
            }
            throw "differentiable exception: unknown operation " + op + "/" + args.length;
        }
    };
};

export function read(fn:string, variable?:string): Differentiable {
    let handler = mkHandler(variable);
    let parser = mkExpression(handler);
    let result = parser(fn);
    if(result.length === 0 || result[0][1].length !== 0)
        throw "differentiable exception: unknown function " + fn;
    return result[0][0];
}
```

### Make differentiable functions
Given a real function ![$f$](http://latex.codecogs.com/png.latex?f)  and its derivative ![$f'$](http://latex.codecogs.com/png.latex?f') , returns a differentiable
function.
```typescript
function makeDerivative(f:RealFunction, df:() => Differentiable): Differentiable {
    const g:Differentiable = x => f(x);
    g.derivative = df;
    return g;
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

// f(x) = ln(g(x)), f'(x) = g'(x)/(g(x))
export function ln(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.log(f(x)), () => div(f.derivative(), f));
}

// f(x) = log_{h(x)}(g(x)), f'(x) = (g(x)*f'(x)*ln(g(x)) - f(x)*g'(x)*ln(f(x))) / (ln(g(x))**2*f(x)*g(x))
export function log(f:Differentiable, b:Differentiable): Differentiable {
    return makeDerivative(x => Math.log(f(x))/Math.log(b(x)), () => div(
        sub(
            mul(b, mul(f.derivative(), ln(b))),
            mul(f, mul(b.derivative(), ln(f)))
        ),
        mul(mul(ln(b),ln(b)), mul(f,b))
    ));
}

// f(x) = sqrt(g(x)), f'(x) = 1/2 * g(x)^(-1/2) * g'(x)
export function sqrt(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.sqrt(f(x)), () => mul(
        constant(0.5), mul(pow(f, constant(-0.5)), f.derivative())
    ));
}

// f(x) = root(g(x),h(x)), f'(x) = (g(x)^(1(h(x))))'
export function root(f:Differentiable, g:Differentiable): Differentiable {
    return pow(f, div(constant(1), g));
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

// f(x) = tan(g(x)), f'(x) = g'(x) / (cos(g(x)))^2 
export function tan(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.tan(f(x)), () => div(
        f.derivative(),
        mul(cos(f), cos(f))
    ));
}

// f(x) = asin(g(x)), f'(x) = g'(x) / sqrt(1-g(x)^2)
export function asin(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.asin(f(x)), () => div(
        f.derivative(),
        sqrt(sub(constant(1), mul(f, f)))
    ));
}

// f(x) = acos(g(x)), f'(x) = -g'(x) / sqrt(1-g(x)^2)
export function acos(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.acos(f(x)), () => mul(
        constant(-1),
        div(
            f.derivative(),
            sqrt(sub(constant(1), mul(f, f)))
        )
    ));
}

// f(x) = atan(g(x)), f'(x) = g'(x) / (1 + g(x)^2)
export function atan(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.atan(f(x)), () => div(
        f.derivative(),
        sqrt(add(constant(1), mul(f, f)))
    ));
}

// f(x) = sinh(g(x)), f'(x) = cosh(g(x)) * g'(x)
export function sinh(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.sinh(f(x)), () => mul(
        cosh(f), f.derivative()
    ));
}

// f(x) = cosh(g(x)), f'(x) = sinh(g(x)) * g'(x)
export function cosh(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.cosh(f(x)), () => mul(
        sinh(f), f.derivative()
    ));
}

// f(x) = tanh(g(x)), f'(x) = g'(x) / (cosh(g(x)))^2
export function tanh(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.tanh(f(x)), () => div(
        f.derivative(),
        cosh(mul(f, f))
    ));
}

// f(x) = asinh(g(x)), f'(x) = g'(x) / sqrt(g(x)^2 + 1)
export function asinh(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.asinh(f(x)), () => div(
        f.derivative(),
        sqrt(add(mul(f, f), constant(1)))
    ));
}

// f(x) = acosh(g(x)), f'(x) = g'(x) / sqrt(g(x)^2 - 1)
export function acosh(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.acosh(f(x)), () => div(
        f.derivative(),
        sqrt(sub(mul(f, f), constant(1)))
    ));
}

// f(x) = atanh(g(x)), f'(x) = g'(x) / (1 - (g(x))^2)
export function atanh(f:Differentiable): Differentiable {
    return makeDerivative(x => Math.atanh(f(x)), () => div(
        f.derivative(),
        sub(constant(1), mul(f, f))
    ));
}
```
