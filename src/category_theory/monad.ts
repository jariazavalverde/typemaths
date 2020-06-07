import { id } from "../combinators.ts";
import { Functor } from "./functor.ts";

/**
 * @name Monad
 * @id category_theory / monad
 * @type module
 * 
 * @introduction
 * A **monad** is an endofunctor (a functor mapping a category to itself),
 * together with two natural transformations required to fulfill certain
 * coherence conditions.
 * 
 * @description
 * This module defines functions and interfaces for monads.
 * 
 **/
export const __name = "monad";
export const __alias = "monad";

export interface Monad<A> extends Functor<A> {
    pure: (x:A) => Monad<A>
    bind: <B>(f:(x:A) => Monad<B>) => Monad<B>
};

/**
 * @name Join operator
 * @id join
 * @type function
 * 
 * @description
 * The `join` function is the conventional monad join operator. It is used to
 * remove one level of monadic structure, projecting its bound argument into
 * the outer level.
 * 
 **/
export function join<A>(m:Monad<Monad<A>>): Monad<A> {
    return m.bind(id);
}