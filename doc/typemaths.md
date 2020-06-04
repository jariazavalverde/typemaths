
### Real-valued functions of a real variable
> A real-valued function ![$f$](http://latex.codecogs.com/png.latex?f)  of a real variable is a mathematical function
> whose domain and codomain are contained in the set of real numbers denoted
> as ![$\mathbb{R}$](http://latex.codecogs.com/png.latex?%5Cmathbb%7BR%7D) .

Type alias for real-valued functions of a real variable.
```typescript
export type RealFunction = (x:number) => number;
```

### TypeMaths
Global object that contains all the logic of TypeMaths.
```typescript
export const TypeMaths:any = {};
module.exports = TypeMaths;
```

### Load a module
Loads a TypeMaths module from a file.
```typescript
TypeMaths.load = function(path:string): void {
    const module = require(path);
    TypeMaths.extend(module);
};
```

### Extend global object
Adds a new module to the global object.
```typescript
TypeMaths.extend = function(module:any): void {
    let methods = {};
    if(module.__name)
        TypeMaths[module.__name] = methods;
    if(module.__alias)
        TypeMaths[module.__alias] = methods;
    for(let prop in module)
        if(prop.substring(2) !== "__" && module.hasOwnProperty(prop))
            methods[prop] = module[prop];
};
```
