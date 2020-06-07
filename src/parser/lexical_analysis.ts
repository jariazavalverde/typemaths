/**
 * @name Lexical analysis
 * @id parser / lexical_analysis
 * @type module
 * 
 * @introduction
 * **Lexical analysis** is the process of converting a sequence of characters
 * into a sequence of tokens.
 * 
 * @description
 * This module defines types and functions for lexical analysis.
 * 
 **/
export const __name = "lexical_analysis";
export const __alias = "tokenizer";

export interface Tokenizer {
    rules: Array<RegExp>,
    tokenize: (input:string) => Array<string>
};