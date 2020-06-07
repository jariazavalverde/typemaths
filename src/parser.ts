/**
 * @name Parser
 * @id parser
 * @type module
 * 
 * @introduction
 * A **parser** is a software component that takes input data and builds a data
 * structure, giving a structural representation of the input while checking
 * for correct syntax.
 * 
 * @description
 * This module defines types and functions for parsing.
 * 
 **/
export const __name = "parser";
export const __alias = "parser";

export * from "./parser/syntactic_analysis.ts";
export * from "./parser/lexical_analysis.ts";