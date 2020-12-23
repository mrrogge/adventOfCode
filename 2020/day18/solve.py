def lexer(line):
    #convert input line into list of tokens
    tokens = []
    #luckily all the numbers are single digit so this makes our lexer much simpler
    for c in line:
        tokenType = None
        val = None
        if str.isnumeric(c):
            tokenType = 'num'
            val = int(c)
        elif c == '+' or c == '*':
            tokenType = 'op'
            val = c
        elif c == '(':
            tokenType = 'lparen'
        elif c == ')':
            tokenType = 'rparen'
        elif str.isspace(c):
            continue
        else:
            raise ValueError('lexer error')
        tokens.append((tokenType, val))
    return tokens

class Interpretter(object):
    def __init__(self, tokens):
        self.tokens = tokens
        self.i = 0

    def reset(self):
        self.i = 0

    def current(self):
        try:
            return self.tokens[self.i]
        except IndexError:
            return None

    def advance(self, tokenType):
        if self.current()[0] != tokenType:
            raise ValueError(f'interpretter error @{self.i}: expected {tokenType} got {self.current()[0]} {self.current()[1]}')
        self.i += 1

    def term(self):
        if self.current()[0] == 'num':
            result = self.current()[1]
            self.advance('num')
            print('found term', result)
            return result
        elif self.current()[0] == 'lparen':
            self.advance('lparen')
            result = self.expr()
            self.advance('rparen')
            print('found term', result)
            return result
        else:
            raise ValueError('interpretter error')

    def expr(self):
        result = self.term()
        while self.current() and self.current()[0] == 'op':
            op = self.current()[1]
            self.advance('op')
            if op == '+':
                result += self.term()
            elif op == '*':
                result *= self.term()
            else:
                raise ValueError(f'interpretter error: unknown operator {op}')
            print('expr', result)
            print(result)
        return result

    def run(self):
        # expr: term (OP term)*
        # term: NUM | (LPAREN expr RPAREN)
        return self.expr()

class Interpretter2(Interpretter):
    # expr: term (PROD term)*
    # term: term2 (PLUS term2)*
    # term2: NUM | (LPAREN expr RPAREN)

    def expr(self):
        result = self.term()
        while self.current() and self.current()[0] == 'op' and self.current()[1] == '*':
            self.advance('op')
            result *= self.term()
        return result

    def term(self):
        result = self.term2()
        while self.current() and self.current()[0] == 'op' and self.current()[1] == '+':
            self.advance('op')
            result += self.term2()
        return result

    def term2(self):
        if self.current()[0] == 'num':
            result = self.current()[1]
            self.advance('num')
            return result
        else:
            self.advance('lparen')
            result = self.expr()
            self.advance('rparen')
            return result

def main():
    f = open('input')
    result = 0
    for line in f:
        tokens = lexer(line)
        result += Interpretter(tokens).run()
    print('answer 1: ', result)

def main2():
    f = open('input')
    result = 0
    for line in f:
        tokens = lexer(line)
        result += Interpretter2(tokens).run()
    print('answer 2: ', result)

# main()
main2()