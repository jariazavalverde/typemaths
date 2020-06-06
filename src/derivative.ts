import { RealFunction, ElementaryFunction } from "./types.ts";

/**
 * @name Differential calculus
 * @id derivative
 * @type module
 * @example derivative.ts
 * 
 * @introduction
 * **Differential calculus** is a subfield of calculus that studies the rates
 * at which quantities change.
 * 
 * @description
 * This module defines methods for computing the derivative of a real function.
 * 
 **/

export const __name = "derivative";
export const __alias = "derivative";

export interface Differentiable extends RealFunction {
    derivative: () => Differentiable
}

export function derivative(f:RealFunction, df:() => Differentiable): Differentiable {
    const g:Differentiable = x => f(x);
    g.derivative = df;
    return g;
}

export function identity(): Differentiable {
    return derivative(x => x, () => constant(1));
}

export function constant(k:number): Differentiable {
    return derivative(_x => k, () => constant(0));
}

export function add(f:Differentiable, g:Differentiable): Differentiable {
    return derivative(x => f(x)+g(x), () => add(
        f.derivative(),
        g.derivative()
    ));
}

export function sub(f:Differentiable, g:Differentiable): Differentiable {
    return derivative(x => f(x)-g(x), () => sub(
        f.derivative(),
        g.derivative()
    ));
}

export function mul(f:Differentiable, g:Differentiable): Differentiable {
    return derivative(x => f(x)*g(x), () => add(
        mul(f.derivative(), g),
        mul(f, g.derivative())
    ));
}

export function div(f:Differentiable, g:Differentiable): Differentiable {
    return derivative(x => f(x)/g(x), () => div(
        sub(
            mul(f.derivative(), g), 
            mul(f, g.derivative())
        ),
        pow(g, constant(2))
    ));
}

export function pow(f:Differentiable, g:Differentiable): Differentiable {
    return derivative(x => f(x)**g(x), () => mul(
        pow(f, g),
        add(
            mul(g.derivative(), ln(f)),
            mul(div(g, f), f.derivative())
        )
    ));
}

export function ln(f:Differentiable): Differentiable {
    return log(f, Math.E);
}

export function log(f:Differentiable, b:number): Differentiable {
    return derivative(x => Math.log(f(x))/Math.log(b), () => mul(
        div(constant(1), mul(f, ln(constant(b)))),
        f.derivative()
    ));
}

export function sin(f:Differentiable): Differentiable {
    return derivative(x => Math.sin(f(x)), () => mul(
        cos(f), f.derivative()
    ));
}

export function cos(f:Differentiable): Differentiable {
    return derivative(x => Math.cos(f(x)), () => mul(
        mul(constant(-1), cos(f)),
        f.derivative()
    ));
}