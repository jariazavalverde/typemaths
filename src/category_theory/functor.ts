import { constant } from "../combinators.ts";

/**
 * @name Functor
 * @id category_theory / functor
 * @type module
 * 
 * @introduction
 * A **functor** is a map between categories.
 * 
 * @description
 * This module defines functions and interfaces for functors.
 * 
 **/
export const __name = "functor";
export const __alias = "functor";

export interface Functor<A> {
    fmap<B>(f:(x:A) => B): any;
    fmap<B, Fb extends Functor<B>>(f:(x:A) => B): Fb;
};

/**
 * @name Replace all
 * @id replaceAll
 * @type function
 * 
 * @description
 * Replace all locations in the input with the same value.
 * 
 **/
export function replaceAll<A,B>(f:Functor<A>, x:B): Functor<B> {
    return f.fmap(constant(x));
}