
# Applicative
> An **applicative functor** is a structure intermediate between functors and
> monads, in that they allow sequencing of functorial computations
> (unlike plain functors) but without deciding on which computation to perform
> on the basis of the result of a previous computation (unlike monads).

This module defines functions and interfaces for applicative functors.
```typescript
export const __name = "applicative";
export const __alias = "applicative";

export interface Applicative<A> extends Functor<A> {
    pure<B>(x:B): any;
    pure<B,Fb extends Applicative<B>>(x:B): Fb;
    ap<B>(this:Applicative<(x:A) => B>, f:Applicative<A>): any;
    ap<B,Fb extends Applicative<B>>(this:Applicative<(x:A) => B>, f:Applicative<A>): Fb;
};
```

### liftA2
Lift a binary function to actions.
```typescript
export function liftA2<A, B, C, Fc extends Applicative<C>>(f:(x:A, y:B) => C, u:Applicative<A>, v:Applicative<B>): Fc {
    // @ts-ignore
    return u.fmap<(y:B) => C, Applicative<(y:B) => C>>(curry2(f)).ap<C, Fc>(v);
}
```
