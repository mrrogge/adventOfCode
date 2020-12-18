def writeVal(mem, mask, inst):
    addr = inst['addr']
    mem[addr] = mem.get(addr) or 0
    val = inst['val']
    maskedVal = 0
    for i in range(len(mask)):
        # print(i, len(mask)-1-i, mask[i], 2**(len(mask)-1-i), val & 2**(len(mask)-1-i), maskedVal)
        if mask[i] == '1':
            maskedVal += 1 * 2**(len(mask)-1-i)
        elif mask[i] == '0':
            pass
        elif mask[i] == 'X':
            maskedVal += val & 2**(len(mask)-1-i)
    mem[addr] = maskedVal

def writeVal2(mem, mask, inst):
    addr = bin(inst['addr'])[2:]
    addr = '0' * (36-len(addr)) + addr
    val = inst['val']
    maskedAddr = addr
    for i in range(len(mask)):
        if mask[i] == '0':
            pass
        elif mask[i] == '1':
            maskedAddr = maskedAddr[:i] + '1' + maskedAddr[i+1:]
        elif mask[i] == 'X':
            maskedAddr = maskedAddr[:i] + 'X' + maskedAddr[i+1:]
    addrs = [0]
    for i in range(len(maskedAddr)):
        for j in range(len(addrs)):
            if maskedAddr[i] == '1':
                addrs[j] += 2**(len(maskedAddr)-1-i)
            elif maskedAddr[i] == '0':
                pass
            elif maskedAddr[i] == 'X':
                addrs.append(addrs[j])
                addrs[j] += 2**(len(maskedAddr)-1-i)
    for addr in addrs:
        mem[addr] = val

def main():
    f = open('input')
    # f = open('testInput')
    insts = []
    for line in f:
        inst = {}
        if line[0:4] == 'mask':
            inst['type'] = 'mask'
            inst['mask'] = line[7:].strip()
        elif line[0:3] == 'mem':
            inst['type'] = 'mem'
            addrEndIdx = line.find(']')
            addr = int(line[4:addrEndIdx])
            inst['addr'] = addr
            inst['val'] = int(line[addrEndIdx+4:])
        insts.append(inst)
    mem = {}
    mask = ''

    for inst in insts:
        if inst['type'] == 'mask':
            mask = inst['mask']
        elif inst['type'] == 'mem':
            writeVal(mem, mask, inst)
        # print(mask, mem)
        # input()

    total = 0
    for k in mem:
        total += mem[k]

    print('part 1 answer: ', total)

def main2():
    f = open('input')
    # f = open('testInput2')
    insts = []
    for line in f:
        inst = {}
        if line[0:4] == 'mask':
            inst['type'] = 'mask'
            inst['mask'] = line[7:].strip()
        elif line[0:3] == 'mem':
            inst['type'] = 'mem'
            addrEndIdx = line.find(']')
            addr = int(line[4:addrEndIdx])
            inst['addr'] = addr
            inst['val'] = int(line[addrEndIdx+4:])
        insts.append(inst)
    mem = {}
    mask = ''

    for inst in insts:
        if inst['type'] == 'mask':
            mask = inst['mask']
        elif inst['type'] == 'mem':
            writeVal2(mem, mask, inst)
        # print(mask, mem)
        # input()

    total = 0
    for k in mem:
        total += mem[k]

    print('part 2 answer: ', total)

# main1()
main2()