import {TypeMaths} from "../typemaths";

/**
 * @name
 * Newton–Raphson method
 * 
 * @id
 * newton_raphson
 * 
 * @test
 * limit(0.0005, TypeMaths.na.newton_raphson(x=>x*x, x=>2*x), 1.0);
 * 
 * @description
 * **Newton–Raphson method** is a root-finding algorithm which produces
 * successively better approximations to the roots of a real-valued function.
 * 
 * The most basic version starts with a single-variable function $f$ defined
 * for a real variable $x$, the function's derivative $f'$, and an initial
 * guess $x_0$ for a root of $f$. If the function satisfies sufficient
 * assumptions and the initial guess is close, then
 * 
 * $x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$
 * 
 * is a better approximation of the root than $x_n$. The process is repeated
 * until a sufficiently precise value is reached.
 * 
 **/
function newton_raphson(f:(x:number) => number, df:(x:number) => number): (x0:number) => Generator<number,never,number> {
	return function*(x0:number) {
		let xi:number = x0;
		while(true) {
			yield xi;
			xi = xi - f(xi)/df(xi);
		}
	};
}

/**
 * @name
 * limit
 * 
 * @id
 * limit
 * 
 * @description
 * Given a limit $\varepsilon$, `limit` yields the result of applying a
 * single-variable function $f$ until $|x_{n+1} - x_n| \leq \varepsilon$ holds.
 * 
 **/
function limit(epsilon:number, gen:Generator<number,never,number>): number {
	var xi:number, xj:number;
	xj = gen.next().value;
	do {
		xi = xj;
		xj = gen.next().value;
	} while(Math.abs(xj-xi) > epsilon);
	return xj;
}

/**
 * @nodoc
 * @description
 * Extends TypeMaths global object.
 * 
 **/
TypeMaths.extend("numerical_analysis", "na", {
	newton_raphson: newton_raphson,
	limit: limit
});