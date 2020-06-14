
# Alternative
> A monoid on applicative functors.

This module defines functions and interfaces for alternatives.
```typescript
export const __name = "alternative";
export const __alias = "alternative";

export interface Alternative<A> extends Applicative<A> {
    empty(): this;
    or(f:this): this;
};
```

### Many
Zero or more.
```typescript
export function many<A,Fa extends Alternative<Array<A>>>(v:Alternative<A>): Fa {
    let some_v:any = {}, many_v:any = {};
    some_v.alt = liftA2((x:A,xs:Array<A>) => [x].concat(xs), v, many_v.alt);
    many_v.alt = some_v.alt.or(v.pure([]));
    return many_v.alt;
}
```

### Some
One or more.
```typescript
export function some<A,Fa extends Alternative<Array<A>>>(v:Alternative<A>): Fa {
    let some_v:any = {}, many_v:any = {};
    some_v.alt = liftA2((x:A,xs:Array<A>) => [x].concat(xs), v, many_v.alt);
    many_v.alt = some_v.alt.or(v.pure([]));
    return some_v.alt;
}
```
