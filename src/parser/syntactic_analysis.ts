import { Predicate } from "../types.ts";
import { Monad } from "../category_theory/monad.ts";
import { Alternative } from "../category_theory/alternative.ts";

/**
 * @name Syntactic analysis
 * @id parser / syntactic_analysis
 * @type module
 * 
 * @introduction
 * **Syntactic analysis** is the process of analyzing a string of symbols,
 * either in natural language, computer languages or data structures,
 * conforming to the rules of a formal grammar.
 * 
 * @description
 * This module defines types and functions for syntactic analysis.
 * 
 **/
export const __name = "syntactic_analysis";
export const __alias = "syntax";

/**
 * @name Parser
 * @id Parser
 * @type interface
 * 
 * @description
 * Interface to represent parsers. A parser contains a function that receives
 * the input and returns the structured information.
 * 
 **/
export interface Parser<S, A> extends Monad<A>, Alternative<A> {
    runParser: (input:S) => Array<[A,S]>;
};

export const Parser = function<S, A>(this:Parser<S, A>, runParser?:(input:S) => Array<[A,S]>) {
    this.runParser = runParser || (_ => []);
} as any as {
    new <S, A>(runParser?:(input:S) => Array<[A,S]>): Parser<S, A>
};

/**
 * @name Functor interface
 * @id functor
 * @type interface_implementation
 * 
 * @description
 * Functor interface for parsers.
 * 
 **/
Parser.prototype.fmap = function<S, A, B>(this:Parser<S, A>, f:(x:A) => B): Parser<S, B> {
    return new Parser(input =>
        this.runParser(input).map(([x,s]:[A,S]) => [f(x),s])
    );
};

/**
 * @name Applicative interface
 * @id applicative
 * @type interface_implementation
 * 
 * @description
 * Applicative interface for parsers.
 * 
 **/
Parser.prototype.pure = function<S, A, B>(this:Parser<S, A>, x:B): Parser<S, B> {
    return new Parser(input => [[x,input]]);
};

Parser.prototype.ap = function<S, A, B>(this:Parser<S, (x:A) => B>, f:Parser<S, A>): Parser<S, B> {
    return new Parser(input => {
        let xs = this.runParser(input);
        let ys:Array<[B,S]> = [];
        for(let i = 0; i < xs.length; i++) {
            Array.prototype.push.apply(ys, f.fmap<B, Parser<S, B>>(xs[i][0]).runParser(xs[i][1]));
        }
        return ys;
    });
};

/**
 * @name Monad interface
 * @id monad
 * @type interface_implementation
 * 
 * @description
 * Monad interface for parsers.
 * 
 **/
Parser.prototype.bind = function<S, A, B>(this:Parser<S, A>, f:(x:A) => Parser<S, B>): Parser<S, B> {
    return new Parser(input => {
        let xs = this.runParser(input);
        let ys:Array<[B,S]> = [];
        for(let i = 0; i < xs.length; i++) {
            Array.prototype.push.apply(ys, f(xs[i][0]).runParser(xs[i][1]));
        }
        return ys;
    });
};

/**
 * @name Alternative interface
 * @id alternative
 * @type interface_implementation
 * 
 * @description
 * Alternative interface for parsers.
 * 
 **/
Parser.prototype.empty = function<S, A>(this:Parser<S, A>): Parser<S, A> {
    return new Parser(_input => []);
};

Parser.prototype.or = function<S, A>(this:Parser<S, A>, f:Parser<S, A>): Parser<S, A> {
    return new Parser(input => {
        let xs = this.runParser(input);
        if(xs.length > 0)
            return xs;
        return f.runParser(input);
    });
};

/**
 * @name satisfy
 * @id satisfy
 * @type function
 * 
 * @description
 * Consumes and returns the next character, if it satisfies the specified
 * predicate.
 * 
 **/
export function satisfy<A>(p: Predicate<A>): Parser<Array<A>, A> {
    return new Parser(input => {
        if(input.length > 0 && input[0] && p(input[0])) {
            return [[input[0], input.slice(1)]];
        } else {
            return [];
        }
    });
};