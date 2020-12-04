f = open('input')
s = f.read()
code = s.split(',')
for i in range(len(code)):
    code[i] = int(code[i])

def runCode(code):
    i = 0
    while i < len(code):
        if code[i] == 1:
            sum = code[code[i+1]] + code[code[i+2]]
            code[code[i+3]] = sum
        elif code[i] == 2:
            prod = code[code[i+1]] * code[code[i+2]]
            code[code[i+3]] = prod
        elif code[i] == 99:
            break
        i += 4

#Part 1
from copy import deepcopy
code1 = deepcopy(code)
code1[1] = 12
code1[2] = 2
runCode(code1)
print(code1[0])

# Part 2
from itertools import product
for params in product(range(100), range(100)):
    testCode = deepcopy(code)
    testCode[1] = params[0]
    testCode[2] = params[1]
    runCode(testCode)
    if testCode[0] == 19690720:
        print(params, 100 * params[0] + params[1])
        break
