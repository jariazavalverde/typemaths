
# Category theory
> **Category theory** formalizes mathematical structure and its concepts in
> terms of a labeled directed graph called a category, whose nodes are called
> objects, and whose labelled directed edges are called arrows. A category has
> two basic properties: the ability to compose the arrows associatively, and
> the existence of an identity arrow for each object.

```typescript
export const __name = "category_theory";
export const __alias = "cat";

export * from "./category_theory/functor.ts";
export * from "./category_theory/monad.ts";
```
