
# Types
> A **type** is an attribute of data which tells the compiler or interpreter
> how the programmer intends to use the data.

This module defines common types and interfaces used by other modules.

### Real-valued functions
> A real-valued function ![$f$](http://latex.codecogs.com/png.latex?f)  is a function whose values are real numbers. It is
> a function that assigns a real number to each member of its domain.

Type alias for real-valued functions.
```typescript
export type RealValuedFunction<Domain> = (x:Domain) => number;
```

### Real-valued functions of a real variable
> A real-valued function ![$f$](http://latex.codecogs.com/png.latex?f)  of a real variable is a mathematical function
> whose domain and codomain are contained in the set of real numbers denoted
> as ![$\mathbb{R}$](http://latex.codecogs.com/png.latex?%5Cmathbb%7BR%7D) .

Type alias for real-valued functions of a real variable.
```typescript
export type RealFunction = (x:number) => number;
```
