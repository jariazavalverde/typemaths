import { Applicative, liftA2 } from "./applicative.ts";

/**
 * @name Alternative
 * @id category_theory / alternative
 * @type module
 * 
 * @introduction
 * A monoid on applicative functors.
 * 
 * @description
 * This module defines functions and interfaces for alternatives.
 * 
 **/
export const __name = "alternative";
export const __alias = "alternative";

export interface Alternative<A> extends Applicative<A> {
    empty(): this;
    or(f:this): this;
};

/**
 * @name many
 * @id many
 * @type function
 * 
 * @description
 * Zero or more.
 * 
 **/
export function many<A,Fa extends Alternative<Array<A>>>(v:Alternative<A>): Fa {
    let some_v:any = {}, many_v:any = {};
    some_v.alt = liftA2((x:A,xs:Array<A>) => [x].concat(xs), v, many_v.alt);
    many_v.alt = some_v.alt.or(v.pure([]));
    return many_v.alt;
}

/**
 * @name some
 * @id some
 * @type function
 * 
 * @description
 * One or more.
 * 
 **/
export function some<A,Fa extends Alternative<Array<A>>>(v:Alternative<A>): Fa {
    let some_v:any = {}, many_v:any = {};
    some_v.alt = liftA2((x:A,xs:Array<A>) => [x].concat(xs), v, many_v.alt);
    many_v.alt = some_v.alt.or(v.pure([]));
    return some_v.alt;
}