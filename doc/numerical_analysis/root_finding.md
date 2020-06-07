
# Root-finding algorithms
> A **root-finding** algorithm is an algorithm for finding zeroes, also called
> **roots**, of continuous functions. A zero of a function ![$f$](http://latex.codecogs.com/png.latex?f)  is a number ![$x$](http://latex.codecogs.com/png.latex?x) 
> such that ![$f(x) = 0$](http://latex.codecogs.com/png.latex?f(x)%20%3D%200) . As, generally, the zeroes of a function cannot be
> computed exactly nor expressed in closed form, root-finding algorithms
> provide approximations to zeroes, expressed either as floating point numbers
> or as small isolating intervals.

This module defines numerical algorithms to find roots.
```typescript
export const __name = "root_finding";
export const __alias = "rf";
```
```typescript
import { RealFunction } from "../src/types.ts";
import { bisection, newtonRaphson, secant, limit } from "../src/numerical_analysis/root_finding.ts";

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
```

### Bisection method
> The **bisection method** is a root-finding method that applies to any
> continuous functions for which one knows two values with opposite signs.
> The method consists of repeatedly bisecting the interval defined by these
> values and then selecting the subinterval in which the function changes
> sign, and therefore must contain a root.

`bisection(f)` returns a function that given a real interval `[a,b]` (a
tuple), returns the next approximations using the bisection method.
```typescript
export function bisection(f:RealFunction): (interval:[number,number]) => Generator<number> {
    const mean = ([a,b]:[number,number]) => (a+b)/2;
    return compose(
        curry2(map)(mean),
        curry2(iterate)(([a,b]:[number,number]) => {
            let c = mean([a,b]), fc = f(c);
            if(fc === 0)
                return [c,c];
            else if(Math.sign(fc) === Math.sign(f(a)))
                return [c,b];
            else
                return [a,c];
        })
    );
}
```

### Newton–Raphson method
> **Newton–Raphson method** is a root-finding algorithm which produces
> successively better approximations to the roots of a real-valued function.
> 
> The most basic version starts with a single-variable function ![$f$](http://latex.codecogs.com/png.latex?f)  defined
> for a real variable ![$x$](http://latex.codecogs.com/png.latex?x) , the function's derivative ![$f'$](http://latex.codecogs.com/png.latex?f') , and an initial
> guess ![$x_0$](http://latex.codecogs.com/png.latex?x_0)  for a root of ![$f$](http://latex.codecogs.com/png.latex?f) . If the function satisfies sufficient
> assumptions and the initial guess is close, then
> 
> ![$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$](http://latex.codecogs.com/png.latex?x_%7Bn%2B1%7D%20%3D%20x_n%20-%20%5Cfrac%7Bf(x_n)%7D%7Bf'(x_n)%7D) 
> 
> is a better approximation of the root than ![$x_n$](http://latex.codecogs.com/png.latex?x_n) . The process is repeated
> until a sufficiently precise value is reached.

`newtonRaphson(f, df)` returns a function that given a real value ![$x_i$](http://latex.codecogs.com/png.latex?x_i) ,
returns the next approximations using the Newton-Raphson method.
```typescript
export function newtonRaphson(f:RealFunction, df:RealFunction): (x:number) => Generator<number> {
    return curry2(iterate)(
        (x:number) => x - f(x)/df(x)
    );
}
```

### Secant method
> The **secant method** is a root-finding algorithm that uses a succession of
> roots of secant lines to better approximate a root of a function ![$f$](http://latex.codecogs.com/png.latex?f) . The
> secant method is defined by the following recurrence relation
> 
> ![$x_{n}=x_{n-1}-f(x_{n-1}){\frac{x_{n-1}-x_{n-2}}{f(x_{n-1})-f(x_{n-2})}} \ $](http://latex.codecogs.com/png.latex?x_%7Bn%7D%3Dx_%7Bn-1%7D-f(x_%7Bn-1%7D)%7B%5Cfrac%7Bx_%7Bn-1%7D-x_%7Bn-2%7D%7D%7Bf(x_%7Bn-1%7D)-f(x_%7Bn-2%7D)%7D%7D%20%5C%20) 
> 
> that requires two initial values, ![$x_0$](http://latex.codecogs.com/png.latex?x_0)  and ![$x_1$](http://latex.codecogs.com/png.latex?x_1) , which should ideally be
> chosen to lie close to the root.

`secant(f)` returns a function that given two initial values `[x0,x1]` (a
tuple), returns the next approximations using the secant method.
```typescript
export function secant(f:RealFunction): (inital:[number,number]) => Generator<number> {
    return compose(
        curry2(map)(<RealValuedFunction<[number,number]>>snd),
        curry2(iterate)(
            ([x0,x1]:[number,number]) => {
                let x2 = x0-f(x0)*((x0-x1)/(f(x0)-f(x1)));
                return [x1,x2];
            }
        )
    );
}
```

### Limit
Returns the first element of a generator within ![$\varepsilon$](http://latex.codecogs.com/png.latex?%5Cvarepsilon)  of its
predecessor.
```typescript
export function limit(epsilon:number, gen:Generator<number>): number {
    var xi:number, xj:number;
    xj = gen.next().value;
    do {
        xi = xj;
        xj = gen.next().value;
    } while(Math.abs(xj-xi) > epsilon);
    return xj;
}
```
