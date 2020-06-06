
# Types
> A **type** is an attribute of data which tells the compiler or interpreter
> how the programmer intends to use the data.

This module defines common types and interfaces used by other modules.

### Real-valued functions
> A **real-valued function** ![$f$](http://latex.codecogs.com/png.latex?f)  is a function whose values are real numbers.
> It is a function that assigns a real number to each member of its domain.

Type alias for real-valued functions.
```typescript
export type RealValuedFunction<Domain> = (x:Domain) => number;
```

### Real-valued functions of a real variable
> A **real-valued function** ![$f$](http://latex.codecogs.com/png.latex?f)  **of a real variable** is a mathematical
> function whose domain and codomain are contained in the set of real numbers
> denoted as ![$\mathbb{R}$](http://latex.codecogs.com/png.latex?%5Cmathbb%7BR%7D) .

Type alias for real-valued functions of a real variable.
```typescript
export type RealFunction = (x:number) => number;
```

### Predicates
> A **predicate** is commonly understood to be a Boolean-valued function
> ![$P: X \rightarrow \{true, false\}$](http://latex.codecogs.com/png.latex?P%3A%20X%20%5Crightarrow%20%5C%7Btrue%2C%20false%5C%7D) , called a predicate on ![$X$](http://latex.codecogs.com/png.latex?X) .

Type alias for predicates.
```typescript
export type Predicate<Domain> = (x:Domain) => boolean;
```

### Elementary functions
> An elementary function is a function of a single variable composed of
> particular simple functions. Elementary functions are typically defined as a
> sum, product, and/or composition of finitely many polynomials, rational
> functions, trigonometric and exponential functions, and their inverse
> functions.

Enumeration for elementary functions.
```typescript
export enum ElementaryFunction {
    Addition, Substraction, Multiplication, Division, 
    Constant, Power, Root, Exponential, Logarithm,
    Sine, Cosine, Tangent, Cosecant, Secant, Cotangent,
    Arcsine, Arccosine, Arctangent, Arccosecant, Arcsecant, Arccotangent,
    Sineh, Cosineh, Tangenth, Cosecanth, Secanth, Cotangenth,
    Arcsineh, Arccosineh, Arctangenth, Arccosecanth, Arcsecanth, Arccotangenth
};
```
