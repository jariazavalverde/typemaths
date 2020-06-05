/**
 * @name Combinators
 * @id combinators
 * @type module
 * 
 * @introduction
 * **Combinatory logic** is a notation to eliminate the need for quantified
 * variables in mathematical logic. It is based on **combinators** which were
 * introduced by Schönfinkel in 1920 with the idea of providing an analogous
 * way to build up functions.
 * 
 * @description
 * This module defines common combinators used by other modules.
 * 
 * @example
 * import { RealFunction } from "/path/to/types.ts";
 * import { compose } from "/path/to/combinators.ts";
 * 
 * let succ:RealFunction = x => x+1;
 * let doubleMe:RealFunction = x => x*2;
 * let h = compose(doubleMe, succ);
 * console.log(h(3)); // 8
 * console.log(h(5)); // 12
 * 
 **/
export const __name = "combinators";
export const __alias = "combinators";

/**
 * @name Identity function
 * @id id
 * @type function
 * 
 * @introduction
 * An **identity function** is a function that always returns the same value
 * that was used as its argument. That is, for $f$ being identity, the equality
 * $f(x) = x$ holds for all $x$. 
 * 
 * @description
 * Identity function.
 * 
 **/
export function id<A>(x:A): A {
    return x;
}

/**
 * @name Function composition
 * @id compose
 * @type function
 * 
 * @introduction
 * **Function composition** is an operation that takes two functions $f$ and $g$
 * and produces a function $h$ such that $h(x) = g(f(x))$. In this operation,
 * the function $g$ is applied to the result of applying the function $f$ to
 * $x$. That is, the functions $f:X \rightarrow Y$ and $g:Y \rightarrow Z$ are
 * composed to yield a function that maps $x$ in $X$ to $g(f(x))$ in $Z$. The
 * resulting composite function is denoted $g \circ f:X \rightarrow Z$.
 * 
 * @description
 * `compose(g, f)` returns the composite function $g \circ f$.
 * 
 **/
export function compose<A,B,C>(g:(y:B) => C, f:(x:A) => B): (x:A) => C {
    return x => g(f(x));
}

/**
 * @name Flip arguments
 * @id flip
 * @type function
 * 
 * @description
 * `flip(f)` takes its two arguments in the reverse order of `f`.
 * 
 **/
export function flip<A,B,C>(f:(x:A, y:B) => C): (y:B, x:A) => C {
    return (y,x) => f(x,y);
}