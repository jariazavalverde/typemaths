/**
 * @name Generators
 * @id generators
 * @type module
 * 
 * @introduction
 * **Generator functions** allow you to define an iterative algorithm by writing
 * a single function whose execution is not continuous.
 * 
 * @description
 * This module defines common operations over generators used by other modules.
 * 
 **/
export const __name = "generators";
export const __alias = "gen";

/**
 * @name Map
 * @id map
 * @type function
 * 
 * @description
 * `map(f, xs)` is the generator obtained by applying `f` to each element of
 * `xs`.
 * 
 **/
export function *map<A,B>(f:(x:A) => B, xs:Generator<A>): Generator<B> {
    for(const x of xs) {
        yield f(x);
    }
}

/**
 * @name All the iterations of a function
 * @id iterate
 * @type function
 * 
 * @description
 * `iterate(f, x)` returns a generator of repeated applications of a function
 * `f` to a value `x`. 
 * 
 **/
export function *iterate<A>(f:(x:A) => A, x0:A): Generator<A> {
    let xi:A = x0;
    while(true) {
        yield xi;
        xi = f(xi);
    }
}