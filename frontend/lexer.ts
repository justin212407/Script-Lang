// Let x = 45 +( foo * bar)
// [LetToken, IdentifierTk, EqualTk, NumberTk]

export enum TokenType {
    Null,
    Number, 
    Identifier, 
    Equals,
    OpenParen, CloseParen, 
    BinaryOperator,
    Let,
    EOF, //Signifies the end of the file
}

const KEYWORDS : Record<string, TokenType> = {
    "let" : TokenType.Let,
    "null" : TokenType.Null,
};

export interface Token {
    value: string,
    type: TokenType,
}

function token (value = "", type: TokenType): Token {
    return {value, type};
}

function isalpha (src: string) {
    return src.toUpperCase() != src.toLowerCase();
}

function isint (str: string) {
    const c = str.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

function isskippable (str:string) {
    return str == ' ' || str =='\n'|| str == '\t';
}

export function tokenize (sourceCode: string): Token[] {
    const tokens: Token[] = [];
    const src = sourceCode.split("");
    //Build Each token until end of file 
    while (src.length > 0){
        if (src[0] == "("){
            tokens.push(token(src.shift(), TokenType.OpenParen))
        } else if (src[0] == ")"){
            tokens.push(token(src.shift(), TokenType.CloseParen))
        } else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/" || src[0] == "%"){
            tokens.push(token(src.shift(), TokenType.BinaryOperator))
        } else if (src[0] == "="){
            tokens.push(token(src.shift(), TokenType.Equals))
        } else {
            // Handle Multi Character Tokens

            //Build Number Token
            if (isint(src[0])){
                let num = "";
                while (src.length > 0 && isint(src[0])) {
                    num += src.shift();
                }

                tokens.push(token(num, TokenType.Number));
            } else if (isalpha(src[0])){
                let ident = "";// foo or let
                while (src.length > 0 && isalpha(src[0])) {
                    ident += src.shift();
                }
                //check for reserved keyword
                const reserved = KEYWORDS[ident];
                if (typeof reserved == "number") {
                    tokens.push(token(ident, TokenType.Identifier))
                } else{
                    tokens.push(token(ident, reserved));
                }
            } else if (isskippable(src[0])){
                src.shift(); //Skip the current character
            } else {
                console.log("Unrecognized character found in source", src[0]);
                Deno.exit(1)
            }
        }
    }
    tokens.push({type: TokenType.EOF, value: "EndOfFile"});
    return tokens;
}

