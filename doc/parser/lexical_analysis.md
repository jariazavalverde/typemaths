
# Lexical analysis
> **Lexical analysis** is the process of converting a sequence of characters
> into a sequence of tokens.

This module defines types and functions for lexical analysis.
```typescript
export const __name = "lexical_analysis";
export const __alias = "tokenizer";
```

### Token
Interface to represent analyzed tokens. When the input text does not match
any regular expression of the tokenizer, the type of the token is set to
`null`.
```typescript
export interface Token {
    text: string;
    type: string | null;
    line_start: number;
    column_start: number;
    line_end: number;
    column_end: number;
};
```

### Tokenizer
Interface to represent tokenizers. A tokenizer contains a set of rules,
where each rule is a regular expression that parses the beginning of the
remaining text to be parsed.
```typescript
export interface Tokenizer {
    rules: Record<string, RegExp>;
    tokenize: (input:string) => Array<Token>;
};

export const Tokenizer = function(this:Tokenizer, rules:Record<string, RegExp>) {
    this.rules = rules;
} as any as {
    new (rules:Record<string, RegExp>): Tokenizer
};
```

### tokenize
`tokenize(xs)` receives an input string `xs`, and returns a list of tokens.
If at any time the remaining text cannot be analyzed by the tokenizer, this
text is added to a `null` token and the  process ends by returning all the
tokens analyzed so far.
```typescript
Tokenizer.prototype.tokenize = function(input:string): Array<Token> {
    let tokens:Array<Token> = [];
    let line = 1, column = 0;
    while(input.length > 0) {
        let token:Token = {
            text: input,
            type: null,
            line_start: line,
            column_start: column,
            line_end: -1,
            column_end: -1
        };
        for(let type in this.rules) {
            let match = this.rules[type].exec(input);
            if(match !== null && (token.type === null || token.text.length < match[0].length)) {
                token.text = match[0];
                token.type = type;
            }
        }
        let position = update_position(token.text, line, column);
        line = position[0];
        column = position[1];
        token.line_end = line;
        token.column_end = column;
        tokens.push(token);
        if(token.type === null)
            return tokens;
        input = input.substring(token.text.length);
    }
    return tokens;
};
```

### update_position
Updates the current line number and  the current column number.
```typescript
function update_position(text:string, line:number, column:number): [number,number] {
    for(let i = 0; i < text.length; i++) {
        if(text[i] === '\n') {
            line++;
            column = 0;
        } else {
            column++;
        }
    }
    return [line, column];
}
```
