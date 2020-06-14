
# Monad
> A **monad** is an endofunctor (a functor mapping a category to itself),
> together with two natural transformations required to fulfill certain
> coherence conditions.

This module defines functions and interfaces for monads.
```typescript
export const __name = "monad";
export const __alias = "monad";

export interface Monad<A> extends Applicative<A> {
    bind<B>(f:(x:A) => Monad<B>): any;
    bind<B,C extends Monad<B>>(f:(x:A) => Monad<B>): C;
};
```

### Join operator
The `join` function is the conventional monad join operator. It is used to
remove one level of monadic structure, projecting its bound argument into
the outer level.
```typescript
export function join<A>(m:Monad<Monad<A>>): Monad<A> {
    return m.bind(id);
}
```
