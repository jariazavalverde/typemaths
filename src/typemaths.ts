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

/**
 * @name TypeMaths
 * @id TypeMaths
 * @type object
 * 
 * @description
 * Global object that contains all the logic of TypeMaths.
 * 
 **/
export const TypeMaths:any = {};
module.exports = TypeMaths;

/**
 * @name Load a module
 * @id load
 * @type function
 * 
 * @description
 * Loads a TypeMaths module from a file.
 * 
 **/
TypeMaths.load = function(path:string): void {
    const module = require(path);
    TypeMaths.extend(module);
};

/**
 * @name Extend global object
 * @id extend
 * @type function
 * 
 * @description
 * Adds a new module to the global object.
 * 
 **/
TypeMaths.extend = function(module:any): void {
    let methods = {};
    if(module.__name)
        TypeMaths[module.__name] = methods;
    if(module.__alias)
        TypeMaths[module.__alias] = methods;
    for(let prop in module)
        if(prop.substring(2) !== "__" && module.hasOwnProperty(prop))
            methods[prop] = module[prop];
};