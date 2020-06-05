
# Generators
> **Generator functions** allow you to define an iterative algorithm by writing
> a single function whose execution is not continuous.

This module defines common operations over generators used by other modules.

### Map
`map(f, xs)` is the generator obtained by applying `f` to each element of
`xs`.
```typescript
export function *map<A,B>(f:(x:A) => B, xs:Generator<A>): Generator<B> {
    for(const x of xs) {
        yield f(x);
    }
}
```

### All the iterations of a function
`iterate(f, x)` returns a generator of repeated applications of a function
`f` to a value `x`.
```typescript
export function *iterate<A>(f:(x:A) => A, x0:A): Generator<A> {
    let xi:A = x0;
    while(true) {
        yield xi;
        xi = f(xi);
    }
}
```
