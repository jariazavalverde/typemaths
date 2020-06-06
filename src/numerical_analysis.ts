import { RealFunction, RealValuedFunction } from "./types.ts";
import { map, iterate } from "./generators.ts";
import { snd, compose, curry2 } from "./combinators.ts";

/**
 * @name Numerical analysis
 * @id numerical_analysis
 * @type module
 * @example numerical_analysis.ts
 * 
 * @introduction
 * **Numerical analysis** is the study of algorithms that use numerical
 * approximation for the problems of mathematical analysis.
 * 
 * @description
 * This module defines numerical algorithms to solve numerical problems.
 * 
 **/
export const __name = "numerical_analysis";
export const __alias = "na";

/**
 * @name Bisection method
 * @id bisecion
 * @type function
 * 
 * @introduction
 * The **bisection method** is a root-finding method that applies to any
 * continuous functions for which one knows two values with opposite signs.
 * The method consists of repeatedly bisecting the interval defined by these
 * values and then selecting the subinterval in which the function changes
 * sign, and therefore must contain a root.
 * 
 * @description
 * `bisection(f)` returns a function that given a real interval `[a,b]` (a
 * tuple), returns the next approximations using the bisection method.
 * 
 **/
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
 * returns the next approximations using the Newton-Raphson method.
 * 
 **/
export function newtonRaphson(f:RealFunction, df:RealFunction): (x:number) => Generator<number> {
    return curry2(iterate)(
        (x:number) => x - f(x)/df(x)
    );
}

/**
 * @name Secant method
 * @id secant
 * @type function
 * 
 * @introduction
 * The **secant method** is a root-finding algorithm that uses a succession of
 * roots of secant lines to better approximate a root of a function f. The
 * secant method is defined by the fllowing recurrence relation:
 * 
 * $x_{n}=x_{n-1}-f(x_{n-1}){\frac {x_{n-1}-x_{n-2}}{f(x_{n-1})-f(x_{n-2})}}$
 * 
 * @description
 * `secant(f)` returns a function that given two initial values `[x0,x1]` (a
 * tuple), returns the next approximations using the secant method.
 * 
 **/
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
export function limit(epsilon:number, gen:Generator<number>): number {
    var xi:number, xj:number;
    xj = gen.next().value;
    do {
        xi = xj;
        xj = gen.next().value;
    } while(Math.abs(xj-xi) > epsilon);
    return xj;
}