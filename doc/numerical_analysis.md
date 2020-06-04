
# Numerical analysis
> **Numerical analysis** is the study of algorithms that use numerical
> approximation for the problems of mathematical analysis.

This module defines numerical algorithms to solve numerical problems.
```typescript
import {newtonRaphson, iterate, limit} from "/path/to/numerical_analysis.ts";
let f = newtonRaphson((x:number) => x*x, (x:number) => 2*x);
let gen = iterate(f);
console.log(limit(0.0005, gen(1))); // 0.00048828125
console.log(limit(0.000005, gen(1))); // 0.000003814697265625
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
returns the next approximation ![$x_{i+1}$](http://latex.codecogs.com/png.latex?x_%7Bi%2B1%7D)  using the Newton-Raphson method.
```typescript
export function newtonRaphson(f:RealFunction, df:RealFunction): RealFunction {
    return x => x - f(x)/df(x);
}
```

### All the iterations of a function
`iterate(f, x)` returns an infinite list (a generator) of repeated
applications of a real function `f` to a value `x`.
```typescript
export function iterate(f:RealFunction): (x:number) => Generator<number,never,number> {
    return function*(x0:number) {
        let xi:number = x0;
        while(true) {
            yield xi;
            xi = f(xi);
        }
    };
}
```

### Limit
Returns the first element of a generator within ![$\varepsilon$](http://latex.codecogs.com/png.latex?%5Cvarepsilon)  of its
predecessor.
```typescript
export function limit(epsilon:number, gen:Generator<number,never,number>): number {
    var xi:number, xj:number;
    xj = gen.next().value;
    do {
        xi = xj;
        xj = gen.next().value;
    } while(Math.abs(xj-xi) > epsilon);
    return xj;
}
```
