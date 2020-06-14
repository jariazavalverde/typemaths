
# Functor
> A **functor** is a map between categories.

This module defines functions and interfaces for functors.
```typescript
export const __name = "functor";
export const __alias = "functor";

export interface Functor<A> {
    fmap<B>(f:(x:A) => B): any;
    fmap<B, Fb extends Functor<B>>(f:(x:A) => B): Fb;
};
```

### Replace all
Replace all locations in the input with the same value.
```typescript
export function replaceAll<A,B>(f:Functor<A>, x:B): Functor<B> {
    return f.fmap(constant(x));
}
```
