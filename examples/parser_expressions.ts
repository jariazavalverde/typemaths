import { ExprHandler, expression } from "../src/parser/expression.ts";

var handler:ExprHandler<number> = {
    fromNumber: x => x,
    fromOperation: (op, args) => {
        switch(op + "/" + args.length) {
            case "+/1": return args[0];
            case "+/2": return args[0]+args[1];
            case "-/1": return -args[0];
            case "-/2": return args[0]-args[1];
            case "*/2": return args[0]*args[1];
            case "//2": return args[0]/args[1];
            case "**/2":
            case "^/2": return Math.pow(args[0], args[1]);
            case "sin/1": return Math.sin(args[0]);
            case "cos/1": return Math.cos(args[0]);
            case "ln/1": return Math.log(args[0]);
            case "log/2": return Math.log(args[0]) / Math.log(args[1]);
        }
        throw "arithmetic exception: unknown operation " + op + "/" + args.length;
    }
};

console.log(expression(handler)("1+2+3")); // [[6,[]]]
console.log(expression(handler)("1*2+3*4")); // [[14,[]]]
console.log(expression(handler)("1*(2+3)*4")); // [[20,[]]]
console.log(expression(handler)("cos(0)")); // [[1,[]]]
console.log(expression(handler)("(cos(0)+1)^2")); // [[4,[]]]
console.log(expression(handler)("ln(cos(0)+1-1)")); // [[0,[]]]