
# Lexical analysis
> **Lexical analysis** is the process of converting a sequence of characters
> into a sequence of tokens.

This module defines types and functions for lexical analysis.
```typescript
export const __name = "lexical_analysis";
export const __alias = "tokenizer";

export interface Tokenizer {
    rules: Array<RegExp>,
    tokenize: (input:string) => Array<string>
};
```
