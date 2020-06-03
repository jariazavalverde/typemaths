export const TypeMaths:any = {};

/**
 * @id
 * extend
 * 
 * @description
 * Adds a new module to the global object. Throws an exception if the global
 * object already defines a property or method with the same name.
 * 
 **/
TypeMaths.extend = function(long_name:string, short_name:string, methods:any): void {
	if(TypeMaths.hasOwnProperty(long_name))
		throw "The module \"" + long_name + "\" already exists";
	if(TypeMaths.hasOwnProperty(short_name))
		throw "The module \"" + short_name + "\" already exists";
	TypeMaths[long_name] = methods;
	TypeMaths[short_name] = methods;
};