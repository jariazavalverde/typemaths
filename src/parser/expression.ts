import { Token, Tokenizer } from "./lexical_analysis.ts";
import { Parser, satisfy } from "./syntactic_analysis.ts";

/**
 * @name Parsing mathematical expressions
 * @id parser / expression
 * @type module
 * @example parser_expressions.ts
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

/**
 * @name Interface for expression handlers
 * @id ExprHandler
 * @type interface
 * 
 * @description
 * Interface for expression handlers.
 * 
 **/
export interface ExprHandler<E> {
    fromNumber(n:number): E;
    fromOperation(id:string, args:Array<E>): E;
};

/**
 * @name Tokenizer for mathematical expressions
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
 * @name Make a parser for mathematical expressions
 * @id mkExpression
 * @type function
 * 
 * @description
 * Given a handler for tokens, returns a parser for expressions.
 * 
 **/
export function mkExpression<E>(handler:ExprHandler<E>): (input:string) => Array<[E, Array<Token>]> {
    return (input:string) => {
        const tokens = tokenizer.tokenize(input).filter(
            (token:Token) => token.type !== "whitespace"
        );
        return parse_expression(handler).runParser(tokens);
    };
}

/**
 * @name Grammar for mathematical expressions
 * @id parse_expression / parse_expression_list / parse_term / parse_term_list /
 *     parse_factor / parse_base / parse_operator / parse_number
 * @type Parser
 * 
 * @description
 * Parsers for mathematical expressions.
 * 
 **/

// <expr> -> <term> <expr'>
function parse_expression<E>(handler:ExprHandler<E>): Parser<Array<Token>, E> {
    return parse_term(handler).bind<E, Parser<Array<Token>, E>>(
        (term:E) => parse_expression_list(handler, term)
    );
}

// <expr'> -> + <expr'> | - <expr'> | epsilon
function parse_expression_list<E>(handler:ExprHandler<E>, term1:E): Parser<Array<Token>, E> {
    return parse_operator(["+","-"]).bind<E, Parser<Array<Token>, E>>(
        (op:Token) => parse_term(handler).bind<E, Parser<Array<Token>, E>>(
            (term2:E) => parse_expression_list(handler, handler.fromOperation(op.text, [term1, term2]))
        )
    ).or(new Parser<Array<Token>, E>().pure(term1));
}

// <term> -> <factor> <factor'>
function parse_term<E>(handler:ExprHandler<E>): Parser<Array<Token>, E> {
    return parse_factor(handler).bind<E, Parser<Array<Token>, E>>(
        (factor:E) => parse_term_list(handler, factor)
    );
}

// <term'> -> * <term'> | / <term'> | % <term'> | epsilon
function parse_term_list<E>(handler:ExprHandler<E>, factor1:E): Parser<Array<Token>, E> {
    return parse_operator(["*","/","%"]).bind<E, Parser<Array<Token>, E>>(
        (op:Token) => parse_factor(handler).bind<E, Parser<Array<Token>, E>>(
            (factor2:E) => parse_term_list(handler, handler.fromOperation(op.text, [factor1, factor2]))
        )
    ).or(new Parser<Array<Token>, E>().pure(factor1));
}

// <factor> -> + <factor> | - <factor> | <base> ^ <base> | <base> ** <base> | <base>
function parse_factor<E>(handler:ExprHandler<E>): Parser<Array<Token>, E> {
    return parse_operator(["+","-"]).bind<E, Parser<Array<Token>, E>>(
        (op:Token) => parse_factor(handler).bind<E, Parser<Array<Token>, E>>(
            (factor:E) => new Parser<Array<Token>, E>().pure(handler.fromOperation(op.text, [factor]))
        )
    ).or(parse_base(handler).bind<E, Parser<Array<Token>, E>>(
        (base1:E) => parse_operator(["^","**"]).bind<E, Parser<Array<Token>, E>>(
            (op:Token) => parse_base(handler).bind<E, Parser<Array<Token>, E>>(
                (base2:E) => new Parser<Array<Token>, E>().pure(handler.fromOperation(op.text, [base1, base2]))
            )
        ).or(new Parser<Array<Token>, E>().pure(base1))
    ));
}

// <base> -> number | identifier ( args... ) | identifier | ( <expr> )
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
    // identifier(args...)
    )).or(satisfy(
        (token:Token) => token.type === "identifier"
    ).bind<E, Parser<Array<Token>, E>>(
        (id:Token) => satisfy(
            (token:Token) => token.type === "lparen"
        ).bind<E, Parser<Array<Token>, E>>(
            (_lparen) => parse_expression(handler).bind<E, Parser<Array<Token>, E>>(
                (expr:E) =>
                    satisfy(
                        (token:Token) => token.type === "comma"
                    ).bind<E, Parser<Array<Token>, E>>(
                        (_comma) => parse_expression(handler)
                    ).many<E, Parser<Array<Token>, Array<E>>>()
                .bind<E, Parser<Array<Token>, E>>(
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
    )).or(satisfy(
        (token:Token) => token.type === "identifier"
    ).bind<E, Parser<Array<Token>, E>>(
        (id:Token) => new Parser<Array<Token>, E>().pure(
            handler.fromOperation(id.text, [])
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