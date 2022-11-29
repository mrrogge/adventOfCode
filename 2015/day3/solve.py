f = open('input')
line = f.readline()
houses = {0:{0:1}}
i = 0
j = 0
housesCount = 1
for char in line:
    if char == '<':
        j -= 1
    elif char == '^':
        i -= 1
    elif char == '>':
        j += 1
    elif char == 'v':
        i += 1
    else:
        raise ValueError('bad input')
    houses[i] = houses.get(i) or {}
    houses[i][j] = houses[i].get(j) or 0
    if houses[i][j] == 0:
        housesCount += 1
    houses[i][j] += 1
print(housesCount)

# Part 2
houses = {0:{0:2}}
i1 = 0
j1 = 0
i2 = 0
j2 = 0
toggle = False
housesCount = 1
for char in line:
    if char == '<':
        if not toggle:
            j1 -= 1
        else:
            j2 -= 1
    elif char == '^':
        if not toggle:
            i1 -= 1
        else:
            i2 -= 1
    elif char == '>':
        if not toggle:
            j1 += 1
        else:
            j2 += 1
    elif char == 'v':
        if not toggle:
            i1 += 1
        else:
            i2 += 1
    else:
        raise ValueError('bad input')
    if not toggle:
        houses[i1] = houses.get(i1) or {}
        houses[i1][j1] = houses[i1].get(j1) or 0
        if houses[i1][j1] == 0:
            housesCount += 1
        houses[i1][j1] += 1
    else:
        houses[i2] = houses.get(i2) or {}
        houses[i2][j2] = houses[i2].get(j2) or 0
        if houses[i2][j2] == 0:
            housesCount += 1
        houses[i2][j2] += 1
    toggle = not toggle
print(housesCount)