/**
 * @name Types
 * @id types
 * @type module
 * 
 * @introduction
 * A **type** is an attribute of data which tells the compiler or interpreter
 * how the programmer intends to use the data.
 * 
 * @description
 * This module defines common types and interfaces used by other modules.
 * 
 **/
export const __name = "types";
export const __alias = "types";

/**
 * @name Real-valued functions
 * @id RealValuedFunction
 * @type alias
 * 
 * @introduction
 * A real-valued function $f$ is a function whose values are real numbers. It is
 * a function that assigns a real number to each member of its domain.
 * 
 * @description
 * Type alias for real-valued functions.
 * 
 **/
export type RealValuedFunction<Domain> = (x:Domain) => number;

/**
 * @name Real-valued functions of a real variable
 * @id RealFunction
 * @type alias
 * 
 * @introduction
 * A real-valued function $f$ of a real variable is a mathematical function
 * whose domain and codomain are contained in the set of real numbers denoted
 * as $\mathbb{R}$.
 * 
 * @description
 * Type alias for real-valued functions of a real variable.
 * 
 **/
export type RealFunction = (x:number) => number;