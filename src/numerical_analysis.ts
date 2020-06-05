import { RealFunction } from "./types.ts";

/**
 * @name Numerical analysis
 * @id numerical_analysis
 * @type module
 * 
 * @introduction
 * **Numerical analysis** is the study of algorithms that use numerical
 * approximation for the problems of mathematical analysis.
 * 
 * @description
 * This module defines numerical algorithms to solve numerical problems.
 * 
 * @example
 * import { RealFunction } from "/path/to/types.ts";
 * import { newtonRaphson, iterate, limit } from "/path/to/numerical_analysis.ts";
 * 
 * let f:RealFunction = Math.log;
 * let df:RealFunction = x => 1/x;
 * let gen = iterate(newtonRaphson(f, df));
 * console.log(limit(1e-3, gen(2))); // 0.9999999999719384
 * console.log(limit(1e-6, gen(2))); // 1
 * 
 **/
export const __name = "numerical_analysis";
export const __alias = "na";

/**
 * @name Newton–Raphson method
 * @id newtonRaphson
 * @type function
 * 
 * @introduction
 * **Newton–Raphson method** is a root-finding algorithm which produces
 * successively better approximations to the roots of a real-valued function.
 * 
 * The most basic version starts with a single-variable function $f$ defined
 * for a real variable $x$, the function's derivative $f'$, and an initial
 * guess $x_0$ for a root of $f$. If the function satisfies sufficient
 * assumptions and the initial guess is close, then
 * 
 * $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$
 * 
 * is a better approximation of the root than $x_n$. The process is repeated
 * until a sufficiently precise value is reached.
 * 
 * @description
 * `newtonRaphson(f, df)` returns a function that given a real value $x_i$,
 * returns the next approximation $x_{i+1}$ using the Newton-Raphson method.
 * 
 **/
export function newtonRaphson(f:RealFunction, df:RealFunction): RealFunction {
    return (x:number) => x - f(x)/df(x);
}

/**
 * @name All the iterations of a function
 * @id iterate
 * @type function
 * 
 * @description
 * `iterate(f, x)` returns an infinite list (a generator) of repeated
 * applications of a real function `f` to a value `x`. 
 * 
 **/
export function iterate(f:RealFunction): (x:number) => Generator<number,never,number> {
    return function*(x0:number) {
        let xi:number = x0;
        while(true) {
            yield xi;
            xi = f(xi);
        }
    };
}

/**
 * @name Limit
 * @id limit
 * @type function
 * 
 * @description
 * Returns the first element of a generator within $\varepsilon$ of its
 * predecessor.
 * 
 **/
export function limit(epsilon:number, gen:Generator<number,never,number>): number {
    var xi:number, xj:number;
    xj = gen.next().value;
    do {
        xi = xj;
        xj = gen.next().value;
    } while(Math.abs(xj-xi) > epsilon);
    return xj;
}