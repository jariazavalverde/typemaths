
# Combinators
> **Combinatory logic** is a notation to eliminate the need for quantified
> variables in mathematical logic. It is based on **combinators** which were
> introduced by Schönfinkel in 1920 with the idea of providing an analogous
> way to build up functions.

This module defines common combinators used by other modules.
```typescript
import { RealFunction } from "/path/to/types.ts";
import { compose } from "/path/to/combinators.ts";

let succ:RealFunction = x => x+1;
let doubleMe:RealFunction = x => x*2;
let h = compose(doubleMe, succ);
console.log(h(3)); // 8
console.log(h(5)); // 12
```

### Identity function
> An **identity function** is a function that always returns the same value
> that was used as its argument. That is, for ![$f$](http://latex.codecogs.com/png.latex?f)  being identity, the equality
> ![$f(x) = x$](http://latex.codecogs.com/png.latex?f(x)%20%3D%20x)  holds for all ![$x$](http://latex.codecogs.com/png.latex?x) .

Identity function.
```typescript
export function id<A>(x:A): A {
    return x;
}
```

### Function composition
> **Function composition** is an operation that takes two functions ![$f$](http://latex.codecogs.com/png.latex?f)  and ![$g$](http://latex.codecogs.com/png.latex?g) 
> and produces a function ![$h$](http://latex.codecogs.com/png.latex?h)  such that ![$h(x) = g(f(x))$](http://latex.codecogs.com/png.latex?h(x)%20%3D%20g(f(x))) . In this operation,
> the function ![$g$](http://latex.codecogs.com/png.latex?g)  is applied to the result of applying the function ![$f$](http://latex.codecogs.com/png.latex?f)  to
> ![$x$](http://latex.codecogs.com/png.latex?x) . That is, the functions ![$f:X \rightarrow Y$](http://latex.codecogs.com/png.latex?f%3AX%20%5Crightarrow%20Y)  and ![$g:Y \rightarrow Z$](http://latex.codecogs.com/png.latex?g%3AY%20%5Crightarrow%20Z)  are
> composed to yield a function that maps ![$x$](http://latex.codecogs.com/png.latex?x)  in ![$X$](http://latex.codecogs.com/png.latex?X)  to ![$g(f(x))$](http://latex.codecogs.com/png.latex?g(f(x)))  in ![$Z$](http://latex.codecogs.com/png.latex?Z) . The
> resulting composite function is denoted ![$g \circ f:X \rightarrow Z$](http://latex.codecogs.com/png.latex?g%E2%80%89%5Ccirc%E2%80%89f%3AX%20%5Crightarrow%20Z) .

`compose(g, f)` returns the composite function ![$g \circ f$](http://latex.codecogs.com/png.latex?g%20%5Ccirc%20f) .
```typescript
export function compose<A,B,C>(g:(y:B) => C, f:(x:A) => B): (x:A) => C {
    return x => g(f(x));
}
```

### Flip arguments
`flip(f)` takes its two arguments in the reverse order of `f`.
```typescript
export function flip<A,B,C>(f:(x:A, y:B) => C): (y:B, x:A) => C {
    return (y,x) => f(x,y);
}
```
