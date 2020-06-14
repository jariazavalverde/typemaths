import { Functor } from "./functor.ts";
import { curry2, compose } from "../combinators.ts";
/**
 * @name Applicative
 * @id category_theory / applicative
 * @type module
 * 
 * @introduction
 * An **applicative functor** is a structure intermediate between functors and
 * monads, in that they allow sequencing of functorial computations
 * (unlike plain functors) but without deciding on which computation to perform
 * on the basis of the result of a previous computation (unlike monads). 
 * 
 * @description
 * This module defines functions and interfaces for applicative functors.
 * 
 **/
export const __name = "applicative";
export const __alias = "applicative";

export interface Applicative<A> extends Functor<A> {
    pure<B>(x:B): any;
    pure<B,Fb extends Applicative<B>>(x:B): Fb;
    ap<B>(this:Applicative<(x:A) => B>, f:Applicative<A>): any;
    ap<B,Fb extends Applicative<B>>(this:Applicative<(x:A) => B>, f:Applicative<A>): Fb;
};

/**
 * @name liftA2
 * @id liftA2
 * @type function
 * 
 * @description
 * Lift a binary function to actions.
 * 
 **/
export function liftA2<A, B, C, Fc extends Applicative<C>>(f:(x:A, y:B) => C, u:Applicative<A>, v:Applicative<B>): Fc {
    // @ts-ignore
    return u.fmap<(y:B) => C, Applicative<(y:B) => C>>(curry2(f)).ap<C, Fc>(v);
}