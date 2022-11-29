from os import system, name

def isSameState(a,b):
    for i in a:
        for j in a[i]:
            if b[i][j] != a[i][j]:
                return False
    return True

def advance(s):
    s2 = {}
    for i in s:
        s2[i] = s2.get(i) or {}
        for j in s[i]:
            # count adjacent
            adjCount = 0
            if s.get(i-1) and s[i-1][j] == '#':
                adjCount += 1
            if s.get(i-1) is not None and s[i-1].get(j-1) is not None and s[i-1][j-1] == '#':
                adjCount += 1
            if s[i].get(j-1) is not None and s[i][j-1] == '#':
                adjCount += 1
            if s.get(i+1) is not None and s[i+1].get(j-1) is not None and s[i+1][j-1] == '#':
                adjCount += 1
            if s.get(i+1) is not None and s[i+1][j] == '#':
                adjCount += 1
            if s.get(i+1) is not None and s[i+1].get(j+1) is not None and s[i+1][j+1] == '#':
                adjCount += 1
            if s[i].get(j+1) is not None and s[i][j+1] == '#':
                adjCount += 1
            if s.get(i-1) is not None and s[i-1].get(j+1) is not None and s[i-1][j+1] == '#':
                adjCount += 1
            if s[i][j] == '.':
                s2[i][j] = '.'
            elif s[i][j] == '#':
                if adjCount >= 4:
                    s2[i][j] = 'L'
                else:
                    s2[i][j] = '#'
            elif s[i][j] == 'L':
                if adjCount == 0:
                    s2[i][j] = '#'
                else:
                    s2[i][j] = 'L'
            else:
                raise ValueError()
    return s2

def countOccupied(s):
    count = 0
    for i in s:
        for j in s[i]:
            if s[i][j] == '#':
                count += 1
    return count

def stateToString(s):
    lines = []
    for i in s:
        lines.append(''.join(s[i].values()))
    return '\n'.join(lines)

def main():
    s = {}
    sPrev = None
    i = 0
    j = 0
    f = open('input')
    for line in f:
        s[i] = s.get(i) or {}
        for c in line:
            if c == '\n':
                j = 0
                continue
            s[i][j] = c
            j += 1
        i += 1
    print(f'occupied seats: {countOccupied(s)}')
    print(stateToString(s))
    while True:
        sPrev = s
        s = advance(sPrev)
        _ = system('clear')
        done = isSameState(s, sPrev)
        if done:
            print(f'occupied seats: {countOccupied(s)}  DONE!')
        else:
            print(f'occupied seats: {countOccupied(s)}')
        print(stateToString(s))
        if done:
            break
        # input()

def advance2(s):
    s2 = {}
    for i in s:
        s2[i] = s2.get(i) or {}
        for j in s[i]:
            # count adjacent
            adjCount = 0

            #up
            i2 = i
            j2 = j
            while True:
                i2 -= 1
                try:
                    if s[i2][j2] == '#':
                        adjCount += 1
                        break
                    elif s[i2][j2] == 'L':
                        break
                except KeyError:
                    break

            #up left
            i2 = i
            j2 = j
            while True:
                i2 -= 1
                j2 -= 1
                try:
                    if s[i2][j2] == '#':
                        adjCount += 1
                        break
                    elif s[i2][j2] == 'L':
                        break
                except KeyError:
                    break

            #left
            i2 = i
            j2 = j
            while True:
                j2 -= 1
                try:
                    if s[i2][j2] == '#':
                        adjCount += 1
                        break
                    elif s[i2][j2] == 'L':
                        break
                except KeyError:
                    break

            #down left
            i2 = i
            j2 = j
            while True:
                i2 += 1
                j2 -= 1
                try:
                    if s[i2][j2] == '#':
                        adjCount += 1
                        break
                    elif s[i2][j2] == 'L':
                        break
                except KeyError:
                    break

            #down
            i2 = i
            j2 = j
            while True:
                i2 += 1
                try:
                    if s[i2][j2] == '#':
                        adjCount += 1
                        break
                    elif s[i2][j2] == 'L':
                        break
                except KeyError:
                    break

            #down right
            i2 = i
            j2 = j
            while True:
                i2 += 1
                j2 += 1
                try:
                    if s[i2][j2] == '#':
                        adjCount += 1
                        break
                    elif s[i2][j2] == 'L':
                        break
                except KeyError:
                    break

            #right
            i2 = i
            j2 = j
            while True:
                j2 += 1
                try:
                    if s[i2][j2] == '#':
                        adjCount += 1
                        break
                    elif s[i2][j2] == 'L':
                        break
                except KeyError:
                    break

            #up right
            i2 = i
            j2 = j
            while True:
                i2 -= 1
                j2 += 1
                try:
                    if s[i2][j2] == '#':
                        adjCount += 1
                        break
                    elif s[i2][j2] == 'L':
                        break
                except KeyError:
                    break

            if s[i][j] == '.':
                s2[i][j] = '.'
            elif s[i][j] == '#':
                if adjCount >= 5:
                    s2[i][j] = 'L'
                else:
                    s2[i][j] = '#'
            elif s[i][j] == 'L':
                if adjCount == 0:
                    s2[i][j] = '#'
                else:
                    s2[i][j] = 'L'
            else:
                raise ValueError()
    return s2

def main2():
    s = {}
    sPrev = None
    i = 0
    j = 0
    f = open('input')
    for line in f:
        s[i] = s.get(i) or {}
        for c in line:
            if c == '\n':
                j = 0
                continue
            s[i][j] = c
            j += 1
        i += 1
    print(f'occupied seats: {countOccupied(s)}')
    print(stateToString(s))
    while True:
        sPrev = s
        s = advance2(sPrev)
        _ = system('clear')
        done = isSameState(s, sPrev)
        if done:
            print(f'occupied seats: {countOccupied(s)}  DONE!')
        else:
            print(f'occupied seats: {countOccupied(s)}')
        print(stateToString(s))
        if done:
            break
        # input()

main2()