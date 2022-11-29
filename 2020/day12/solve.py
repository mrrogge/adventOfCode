f = open('input')

insts = []

posX = 0
posY = 0
direct = 'E'

for line in f:
    insts.append({'dir':line[0], 'dist':int(line[1:])})

for inst in insts:
    #these if conditions aren't optimal but they get the job done...
    if inst['dir'] == 'N':
        posY -= inst['dist']
    elif inst['dir'] == 'S':
        posY += inst['dist']
    elif inst['dir'] == 'W':
        posX -= inst['dist']
    elif inst['dir'] == 'E':
        posX += inst['dist']
    elif inst['dir'] == 'L':
        if direct == 'N':
            if inst['dist'] == 90:
                direct = 'W'
            elif inst['dist'] == 180:
                direct = 'S'
            elif inst['dist'] == 270:
                direct = 'E'
            else:
                raise ValueError('unexpected degree value')
        elif direct == 'W':
            if inst['dist'] == 90:
                direct = 'S'
            elif inst['dist'] == 180:
                direct = 'E'
            elif inst['dist'] == 270:
                direct = 'N'
            else:
                raise ValueError('unexpected degree value')
        elif direct == 'S':
            if inst['dist'] == 90:
                direct = 'E'
            elif inst['dist'] == 180:
                direct = 'N'
            elif inst['dist'] == 270:
                direct = 'W'
            else:
                raise ValueError('unexpected degree value')
        elif direct == 'E':
            if inst['dist'] == 90:
                direct = 'N'
            elif inst['dist'] == 180:
                direct = 'W'
            elif inst['dist'] == 270:
                direct = 'S'
            else:
                raise ValueError('unexpected degree value')
        else:
            raise ValueError('unexpected direction')
    elif inst['dir'] == 'R':
        if direct == 'N':
            if inst['dist'] == 90:
                direct = 'E'
            elif inst['dist'] == 180:
                direct = 'S'
            elif inst['dist'] == 270:
                direct = 'W'
            else:
                raise ValueError('unexpected degree value')
        elif direct == 'W':
            if inst['dist'] == 90:
                direct = 'N'
            elif inst['dist'] == 180:
                direct = 'E'
            elif inst['dist'] == 270:
                direct = 'S'
            else:
                raise ValueError('unexpected degree value')
        elif direct == 'S':
            if inst['dist'] == 90:
                direct = 'W'
            elif inst['dist'] == 180:
                direct = 'N'
            elif inst['dist'] == 270:
                direct = 'E'
            else:
                raise ValueError('unexpected degree value')
        elif direct == 'E':
            if inst['dist'] == 90:
                direct = 'S'
            elif inst['dist'] == 180:
                direct = 'W'
            elif inst['dist'] == 270:
                direct = 'N'
            else:
                raise ValueError('unexpected degree value')
        else:
            raise ValueError('unexpected direction')
    elif inst['dir'] == 'F':
        if direct == 'N':
            posY -= inst['dist']
        elif direct == 'W':
            posX -= inst['dist']
        elif direct == 'S':
            posY += inst['dist']
        elif direct == 'E':
            posX += inst['dist']
        else:
            raise ValueError('unexpected direction')
    else:
        raise ValueError('unexpected instruction')

print('part 1 answer: ', abs(posX) + abs(posY))

# Part 2
posX = 0
posY = 0
wayX = 10
wayY = -1

for inst in insts:
    #again not optimal but it works...
    if inst['dir'] == 'N':
        wayY -= inst['dist']
    elif inst['dir'] == 'S':
        wayY += inst['dist']
    elif inst['dir'] == 'W':
        wayX -= inst['dist']
    elif inst['dir'] == 'E':
        wayX += inst['dist']
    elif inst['dir'] == 'L':
        if inst['dist'] == 90:
            newX = wayY
            newY = -wayX
            wayX = newX
            wayY = newY
        elif inst['dist'] == 180:
            wayX = -wayX
            wayY = -wayY
        elif inst['dist'] == 270:
            newX = -wayY
            newY = wayX
            wayX = newX
            wayY = newY
        else:
            raise ValueError('unexpected degree value')
    elif inst['dir'] == 'R':
        if inst['dist'] == 90:
            newX = -wayY
            newY = wayX
            wayX = newX
            wayY = newY
        elif inst['dist'] == 180:
            wayX = -wayX
            wayY = -wayY
        elif inst['dist'] == 270:
            newX = wayY
            newY = -wayX
            wayX = newX
            wayY = newY
        else:
            raise ValueError('unexpected degree value')
    elif inst['dir'] == 'F':
        posX += wayX * inst['dist']
        posY += wayY * inst['dist']
    else:
        raise ValueError('unexpected instruction')

print('part 2 answer: ', abs(posX) + abs(posY))