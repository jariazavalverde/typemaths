/**
 * @name Generators
 * @id generators
 * @type module
 * @example generators.ts
 * 
 * @introduction
 * **Generator functions** allow you to define an iterative algorithm by writing
 * a single function whose execution is not continuous.
 * 
 * @description
 * This module defines common operations over ES6 generators used by other
 * modules.
 * 
 **/
export const __name = "generators";
export const __alias = "gen";

/**
 * @name Map
 * @id map
 * @type function
 * 
 * @introduction
 * Higher-order function that applies a given function to each element of a
 * functor.
 * 
 * @description
 * `map(f, xs)` is the generator obtained by applying `f` to each element of
 * `xs`.
 * 
 **/
export function *map<A,B>(f:(x:A) => B, xs:Generator<A>): Generator<B> {
    for(let x of xs)
        yield f(x);
}

/**
 * @name Filter
 * @id filter
 * @type function
 * 
 * @introduction
 * Higher-order function that processes a data structure to produce a new data
 * structure containing exactly those elements of the original data structure
 * for which a given predicate succeeds. 
 * 
 * @description
 * `filter` applied to a predicate and a generator, returns the generator of
 * those elements that satisfy the predicate.
 * 
 **/
export function *filter<A>(p:(x:A) => boolean, xs:Generator<A>): Generator<A> {
    for(let x of xs)
        if(p(x))
            yield x;
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

/**
 * @name Take first elements
 * @id take
 * @type function
 * 
 * @description
 * `take(n, xs)`, applied to a generator `xs`, returns the prefix of `xs` of
 * length `n`.
 * 
 **/
export function take<A>(n:number, xs:Generator<A>): Array<A> {
    let elems = [];
    for(let i = 0; i < n; i++) {
        let x = xs.next().value;
        if(x === undefined)
            return elems;
        elems.push(x);
    }
    return elems;
}

/**
 * @name Enumerations
 * @id enumFrom / enumFromTo
 * @type function
 * 
 * @introduction
 * An **enumeration** is a complete, ordered listing of all the items in a
 * collection.
 * 
 **/
export function *enumFrom(from:number): Generator<number> {
    let x = from;
    while(true) {
        yield x;
        x++;
    }
}

export function *enumFromTo(from:number, to:number): Generator<number> {
    for(let x = from; x <= to; x++)
        yield x;
}

export function *enumFromThen(from:number, then:number): Generator<number> {
    let distance = then-from;
    let x = from;
    while(true) {
        yield x;
        x += distance;
    }
}

export function *enumFromThenTo(from:number, then:number, to:number): Generator<number> {
    let distance = then-from;
    for(let x = from; x <= to; x += distance)
        yield x;
}