
# Numerical analysis
> **Numerical analysis** is the study of algorithms that use numerical
> approximation for the problems of mathematical analysis.

This module defines numerical algorithms to solve numerical problems.
```typescript
numerical_analysis.ts
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
