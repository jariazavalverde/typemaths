import { Token, Tokenizer } from "./lexical_analysis.ts";
import { Parser, satisfy } from "./syntactic_analysis.ts";
import { many } from "../category_theory/alternative.ts";

/**
 * @name Expression
 * @id parser / expression
 * @type module
 * 
 * @introduction
 * A **mathematical expression** is a finite combination of symbols that is
 * well-formed according to rules that depend on the context. Mathematical
 * symbols can designate numbers (constants), variables, operations, functions,
 * brackets, punctuation, and grouping to help determine order of operations,
 * and other aspects of logical syntax. 
 * 
 * @description
 * This module defines tokenizer, parsers and functions for parsing mathematical
 * expressions.
 * 
 **/
export const __name = "expression";
export const __alias = "expr";

export interface ExprHandler<E> {
    fromNumber(n:number): E;
    fromOperation(id:string, args:Array<E>): E;
};

/**
 * @name tokenizer
 * @id tokenizer
 * @type Tokenizer
 * 
 * @description
 * Tokenizer for mathematical expressions.
 * 
 **/
export const tokenizer = new Tokenizer({
    "identifier": /^[a-zA-Z_][a-zA-Z0-9_]*/,
    "number": /^[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/,
    "operator": /^[\+\-\*\/\^\%]|\*\*/,
    "lparen": /^\(/,
    "rparen": /^\)/,
    "comma": /^,/,
    "whitespace": /^\s+/
});

/**
 * @name expression
 * @id expression
 * @type function
 * 
 * @description
 * Given a handler fot tokens, returns a parser for expressions.
 * 
 **/
export function expression<E>(handler:ExprHandler<E>): (input:string) => Array<[E, Array<Token>]> {
    return (input:string) => {
        const tokens = tokenizer.tokenize(input);
        return parse_expression(handler).runParser(tokens);
    };
}

/**
 * @name parse_expression
 * @id parse_expression
 * @type Parser
 * 
 * @description
 * Parser for mathematical expressions.
 * 
 **/
function parse_expression<E>(handler:ExprHandler<E>): Parser<Array<Token>, E> {
    return parse_term(handler).bind<E, Parser<Array<Token>, E>>(
        (term:E) => parse_expression_list(handler, term)
    );
}

function parse_expression_list<E>(handler:ExprHandler<E>, term1:E): Parser<Array<Token>, E> {
    return parse_operator(["+","-"]).bind<E, Parser<Array<Token>, E>>(
        (op:Token) => parse_term(handler).bind<E, Parser<Array<Token>, E>>(
            (term2:E) => parse_expression_list(handler, handler.fromOperation(op.text, [term1, term2]))
        )
    ).or(new Parser<Array<Token>, E>().pure(term1));
}

function parse_term<E>(handler:ExprHandler<E>): Parser<Array<Token>, E> {
    return parse_factor(handler).bind<E, Parser<Array<Token>, E>>(
        (factor:E) => parse_term_list(handler, factor)
    );
}

function parse_term_list<E>(handler:ExprHandler<E>, factor1:E): Parser<Array<Token>, E> {
    return parse_operator(["*","/","%"]).bind<E, Parser<Array<Token>, E>>(
        (op:Token) => parse_factor(handler).bind<E, Parser<Array<Token>, E>>(
            (factor2:E) => parse_term_list(handler, handler.fromOperation(op.text, [factor1, factor2]))
        )
    ).or(new Parser<Array<Token>, E>().pure(factor1));
}

function parse_factor<E>(handler:ExprHandler<E>): Parser<Array<Token>, E> {
    return parse_operator(["+","-"]).bind<E, Parser<Array<Token>, E>>(
        (op:Token) => parse_factor(handler).bind<E, Parser<Array<Token>, E>>(
            (factor:E) => parse_term_list(handler, handler.fromOperation(op.text, [factor]))
        )
    ).or(parse_base(handler).bind<E, Parser<Array<Token>, E>>(
        (base1:E) => parse_operator(["^","**"]).bind<E, Parser<Array<Token>, E>>(
            (op:Token) => parse_base(handler).bind<E, Parser<Array<Token>, E>>(
                (base2:E) => new Parser<Array<Token>, E>().pure(handler.fromOperation(op.text, [base1, base2]))
            )
        ).or(new Parser<Array<Token>, E>().pure(base1))
    ));
}

function parse_base<E>(handler:ExprHandler<E>): Parser<Array<Token>, E> {
    // <number>
    return parse_number(handler)
    // ( <expression> )
    .or(satisfy(
        (token:Token) => token.type === "lparen"
    ).bind<E, Parser<Array<Token>, E>>(
        (_lparen) => parse_expression(handler).bind<E, Parser<Array<Token>, E>>(
            (expr:E) => satisfy(
                (token:Token) => token.type === "rparen"
            ).bind<E, Parser<Array<Token>, E>>(
                (_rparen) => new Parser<Array<Token>, E>().pure(expr)
            )
        )
    // id(args...)
    )).or(satisfy(
        (token:Token) => token.type === "identifier"
    ).bind<E, Parser<Array<Token>, E>>(
        (id:Token) => satisfy(
            (token:Token) => token.type === "lparen"
        ).bind<E, Parser<Array<Token>, E>>(
            (_lparen) => parse_expression(handler).bind<E, Parser<Array<Token>, E>>(
                (expr:E) => many<E, Parser<Array<Token>, Array<E>>>(
                    satisfy(
                        (token:Token) => token.type === "comma"
                    ).bind<E, Parser<Array<Token>, E>>(
                        (_comma) => parse_expression(handler)
                    )
                ).bind<E, Parser<Array<Token>, E>>(
                    (args:Array<E>) => satisfy(
                        (token:Token) => token.type === "rparen"
                    ).bind<E, Parser<Array<Token>, E>>(
                        (_rparen) => new Parser<Array<Token>, E>().pure(
                            handler.fromOperation(id.text, [expr].concat(args))
                        )
                    )
                )
            )
        )
    ));
}

function parse_operator(operators:Array<string>): Parser<Array<Token>, Token> {
    return satisfy(
        (token:Token) => token.type === "operator" && operators.indexOf(token.text) !== -1
    );
}

function parse_number<E>(handler:ExprHandler<E>): Parser<Array<Token>, E> {
    return satisfy(
        (token:Token) => token.type === "number"
    ).fmap<E, Parser<Array<Token>, E>>(
        (token:Token) => handler.fromNumber(parseFloat(token.text))
    );
}