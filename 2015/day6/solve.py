f = open('input')

def parseLine(line):
    parts = line.split(' ')
    inst = None
    startRange = None
    endRange = None
    if parts[0] == 'toggle':
        inst = 2
        startRange = tuple(parts[1].split(','))
        endRange = tuple(parts[3].split(','))
    else:
        if parts[1] == 'off':
            inst = 0
        elif parts[1] == 'on':
            inst = 1
        else:
            raise ValueError('bad input')
        startRange = tuple(parts[2].split(','))
        endRange = tuple(parts[4].split(','))
    startRange = (int(startRange[0]), int(startRange[1]))
    endRange = (int(endRange[0]), int(endRange[1]))
    return (inst, startRange, endRange)

lights = []
for i in range(1000):
    lights.append([])
    for j in range(1000):
        lights[i].append(False)

def action(inst, startRange, endRange):
    for i in range(startRange[0], endRange[0]+1):
        for j in range(startRange[1], endRange[1]+1):
            if inst == 0:
                lights[i][j] = False
            elif inst == 1:
                lights[i][j] = True
            elif inst == 2:
                lights[i][j] = not lights[i][j]
            else:
                raise ValueError('bad inst')

for line in f:
    t = parseLine(line)
    action(t[0], t[1], t[2])

lightCount = 0

for row in lights:
    for light in row:
        if light:
            lightCount += 1

print(lightCount)

# Part 2
lights = []
for i in range(1000):
    lights.append([])
    for j in range(1000):
        lights[i].append(0)

def action2(inst, startRange, endRange):
    for i in range(startRange[0], endRange[0]+1):
        for j in range(startRange[1], endRange[1]+1):
            if inst == 0:
                lights[i][j] = max(lights[i][j]-1, 0)
            elif inst == 1:
                lights[i][j] += 1
            elif inst == 2:
                lights[i][j] += 2
            else:
                raise ValueError('bad inst')

f.seek(0)
for line in f:
    t = parseLine(line)
    action2(t[0], t[1], t[2])

lightCount = 0

for row in lights:
    for light in row:
        lightCount += light

print(lightCount)