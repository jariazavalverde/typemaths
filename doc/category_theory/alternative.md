
# Alternative
> A monoid on applicative functors.

This module defines functions and interfaces for alternatives.
```typescript
export const __name = "alternative";
export const __alias = "alternative";

export interface Alternative<A> extends Applicative<A> {
    empty(): this;
    or(f:this): this;
    many(): any;
    many<A, Fa extends Alternative<Array<A>>>(): Fa;
    some(): any;
    some<A, Fa extends Alternative<Array<A>>>(): Fa;
};
```
