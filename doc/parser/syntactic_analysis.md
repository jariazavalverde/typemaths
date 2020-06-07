
# Syntactic analysis
> **Syntactic analysis** is the process of analyzing a string of symbols,
> either in natural language, computer languages or data structures,
> conforming to the rules of a formal grammar.

This module defines types and functions for syntactic analysis.
```typescript
export const __name = "syntactic_analysis";
export const __alias = "syntax";

export interface Parser<A> {
    runParser: (input:string) => Array<[A,string]>
};
```
