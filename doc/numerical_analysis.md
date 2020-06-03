
## Newton–Raphson method
**Newton–Raphson method** is a root-finding algorithm which produces
successively better approximations to the roots of a real-valued function.

The most basic version starts with a single-variable function <img src="https://render.githubusercontent.com/render/math?math=f"> defined
for a real variable <img src="https://render.githubusercontent.com/render/math?math=x">, the function's derivative <img src="https://render.githubusercontent.com/render/math?math=f'">, and an initial
guess <img src="https://render.githubusercontent.com/render/math?math=x_0"> for a root of <img src="https://render.githubusercontent.com/render/math?math=f">. If the function satisfies sufficient
assumptions and the initial guess is close, then

<img src="https://render.githubusercontent.com/render/math?math=x_%7Bn%2B1%7D%20%3D%20x_n%20-%20%5Cfrac%7Bf(x_n)%7D%7Bf'(x_n)%7D">

is a better approximation of the root than <img src="https://render.githubusercontent.com/render/math?math=x_n">. The process is repeated
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

## limit
Given a limit <img src="https://render.githubusercontent.com/render/math?math=%5Cvarepsilon">, `limit` yields the result of applying a
single-variable function <img src="https://render.githubusercontent.com/render/math?math=f"> until <img src="https://render.githubusercontent.com/render/math?math=%7Cx_%7Bn%2B1%7D%20-%20x_n%7C%20%5Cleq%20%5Cvarepsilon"> holds.
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
