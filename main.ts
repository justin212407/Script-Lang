import Parser from "./frontend/parser.ts";
import Environment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpretor.ts";
import { NumberVal } from "./runtime/values.ts";

repl();

function repl () {
    const parse = new Parser();
    const env = new Environment();
    env.declareVar("x", {value: 100, type: "number"} as NumberVal)
    console.log("\nrepl v0.1");
    while(true) {
        const input  = prompt (">");
        //Check for no user input or exit keyword
        if (!input || input.includes("exit")){
            Deno.exit(1);
        }

        const program = parse.produceAST(input);
        console.log(program);

        const result = evaluate(program, env);
        console.log(result)

        console.log("-----\n\n")
        
    }
    }