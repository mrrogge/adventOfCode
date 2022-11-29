f = open('input')

insts = []

for line in f:
    parts = line.split(' ')
    inst = parts[0].strip()
    val = int(parts[1])
    insts.append({'inst':inst, 'val':val, 'cnt':0})

i = 0
acc = 0
while True:
    inst = insts[i]
    inst['cnt'] += 1
    if inst['cnt'] > 1:
        break
    if inst['inst'] == 'acc':
        acc += inst['val']
        i += 1
    elif inst['inst'] == 'jmp':
        i += inst['val']
    else:
        i += 1
    
print(acc)

# Part 2
def runInsts():
    for inst in insts:
        inst['cnt'] = 0
    i = 0
    acc = 0
    while i < len(insts):
        inst = insts[i]
        inst['cnt'] += 1
        if inst['cnt'] > 1:
            #infinite loop
            return -1
        if inst['inst'] == 'acc':
            acc += inst['val']
            i += 1
        elif inst['inst'] == 'jmp':
            i += inst['val']
        else:
            i += 1
    #completed
    return acc

i = 0
while i < len(insts):
    if insts[i]['inst'] == 'nop':
        insts[i]['inst'] = 'jmp'
        ret = runInsts()
        if ret >= 0:
            print(ret)
            break
        else:
            insts[i]['inst'] = 'nop'
    elif insts[i]['inst'] == 'jmp':
        insts[i]['inst'] = 'nop'
        ret = runInsts()
        if ret >= 0:
            print(ret)
            break
        else:
            insts[i]['inst'] = 'jmp'
    i += 1

    
            


