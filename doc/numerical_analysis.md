
### Newton–Raphson method
**Newton–Raphson method** is a root-finding algorithm which produces
successively better approximations to the roots of a real-valued function.

The most basic version starts with a single-variable function ![$f$](http://latex.codecogs.com/png.latex?f)  defined
for a real variable ![$x$](http://latex.codecogs.com/png.latex?x) , the function's derivative ![$f'$](http://latex.codecogs.com/png.latex?f') , and an initial
guess ![$x_0$](http://latex.codecogs.com/png.latex?x_0)  for a root of ![$f$](http://latex.codecogs.com/png.latex?f) . If the function satisfies sufficient
assumptions and the initial guess is close, then

![$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$](http://latex.codecogs.com/png.latex?x_%7Bn%2B1%7D%20%3D%20x_n%20-%20%5Cfrac%7Bf(x_n)%7D%7Bf'(x_n)%7D) 

is a better approximation of the root than ![$x_n$](http://latex.codecogs.com/png.latex?x_n) . The process is repeated
until a sufficiently precise value is reached.
```typescript
function newton_raphson(f:(x:number) => number, df:(x:number) => number): (x0:number) => Generator<number,never,number> {
	return function*(x0:number) {
		let xi:number = x0;
		while(true) {
			yield xi;
			xi = xi - f(xi)/df(xi);
		}
	};
}
```

### limit
Given a limit ![$\varepsilon$](http://latex.codecogs.com/png.latex?%5Cvarepsilon) , `limit` yields the result of applying a
single-variable function ![$f$](http://latex.codecogs.com/png.latex?f)  until ![$|x_{n+1} - x_n| \leq \varepsilon$](http://latex.codecogs.com/png.latex?%7Cx_%7Bn%2B1%7D%20-%20x_n%7C%20%5Cleq%20%5Cvarepsilon)  holds.
```typescript
function limit(epsilon:number, gen:Generator<number,never,number>): number {
	var xi:number, xj:number;
	xj = gen.next().value;
	do {
		xi = xj;
		xj = gen.next().value;
	} while(Math.abs(xj-xi) > epsilon);
	return xj;
}
```
