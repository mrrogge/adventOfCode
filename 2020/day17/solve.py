offsetList = [-1,0,1]

def updatePos(space, x,y,z, val):
    #x is row, y is column, z is level
    space[x] = space.get(x) or {}
    space[x][y] = space[x].get(y) or {}
    space[x][y][z] = val

def updatePos2(space, x,y,z,w, val):
    #x is row, y is column, z is level, w is...time?
    space[x] = space.get(x) or {}
    space[x][y] = space[x].get(y) or {}
    space[x][y][z] = space[x][y].get(z) or {}
    space[x][y][z][w] = val


def advance(space):
    #expand the existing space out to each of the neighboring cubes. This allows us to check these cubes when iterating. Any cubes outside this range are guaranteed to be inactive.
    for x in list(space):
        for y in list(space[x]):
            for z in list(space[x][y]):
                for i in offsetList:
                    for j in offsetList:
                        for k in offsetList:
                            space[x+i] = space.get(x+i) or {}
                            space[x+i][y+j] = space[x+i].get(y+j) or {}
                            if space[x+i][y+j].get(z+k) is None:
                                space[x+i][y+j][z+k] = False
    #Loop through all the the previous space and update newSpace based on the ruleset. 
    newSpace = {}
    for x in space:
        newSpace[x] = newSpace.get(x) or {}
        for y in space[x]:
            newSpace[x][y] = newSpace[x].get(y) or {}
            for z in space[x][y]:
                count = 0
                for i in [-1,0,1]:
                    for j in [-1,0,1]:
                        for k in [-1,0,1]:
                            if i == 0 and j == 0 and k == 0:
                                continue
                            try:
                                if space[x+i][y+j][z+k]:
                                    count += 1
                            except KeyError:
                                #trying to look outside the previous space would always yield an inactive cube.
                                pass
                if space[x][y][z]:
                    if count == 2 or count == 3:
                        newSpace[x][y][z] = True
                    else:
                        newSpace[x][y][z] = False
                else:
                    if count == 3:
                        newSpace[x][y][z] = True
                    else:
                        newSpace[x][y][z] = False
    return newSpace

def advance2(space):
    #the first part of advance() was not optimal and caused the 4D algorithm to take too long. I changed my strategy to collecting the min/max at every dimension, then iterate over this range to make sure every position in space is filled with non-None values.
    xList = list(space)
    xMin = min(xList)
    xMax = max(xList)
    yMin = 0
    yMax = 0
    zMin = 0
    zMax = 0
    wMin = 0
    wMax = 0
    for x in xList:
        yList = list(space[x])
        yMin = min(yMin, min(yList))
        yMax = max(yMax, max(yList))
        for y in yList:
            zList = list(space[x][y])
            zMin = min(zMin, min(zList))
            zMax = max(zMax, max(zList))
            for z in zList:
                wList = list(space[x][y][z])
                wMin = min(wMin, min(wList))
                wMax = max(wMax, max(wList))
    for x in range(xMin-1, xMax+2):
        space[x] = space.get(x) or {}
        for y in range(yMin-1, yMax+2):
            space[x][y] = space[x].get(y) or {}
            for z in range(zMin-1, zMax+2):
                space[x][y][z] = space[x][y].get(z) or {}
                for w in range(wMin-1, wMax+2):
                    if space[x][y][z].get(w) is None:
                        space[x][y][z][w] = False


    #Loop through all the the previous space and update newSpace based on the ruleset. 
    newSpace = {}
    for x in space:
        newSpace[x] = newSpace.get(x) or {}
        for y in space[x]:
            newSpace[x][y] = newSpace[x].get(y) or {}
            for z in space[x][y]:
                newSpace[x][y][z] = newSpace[x][y].get(z) or {}
                for w in space[x][y][z]:
                    count = 0
                    for i in offsetList:
                        for j in offsetList:
                            for k in offsetList:
                                for l in offsetList:
                                    if i == 0 and j == 0 and k == 0 and l == 0:
                                        continue
                                    try:
                                        if space[x+i][y+j][z+k][w+l]:
                                            count += 1
                                    except KeyError:
                                        #trying to look outside the previous space would always yield an inactive cube.
                                        pass
                    if space[x][y][z][w]:
                        if count == 2 or count == 3:
                            newSpace[x][y][z][w] = True
                        else:
                            newSpace[x][y][z][w] = False
                    else:
                        if count == 3:
                            newSpace[x][y][z][w] = True
                        else:
                            newSpace[x][y][z][w] = False
    return newSpace

def countActive(space):
    count = 0
    for x in space:
        for y in space[x]:
            for z in space[x][y]:
                if space[x][y][z]:
                    count += 1
    return count

def countActive2(space):
    count = 0
    for x in space:
        for y in space[x]:
            for z in space[x][y]:
                for w in space[x][y][z]:
                    if space[x][y][z][w]:
                        count += 1
    return count
                        

def main():
    f = open('input')
    space = {}
    i = 0
    k = 0
    for line in f:
        j = 0
        for c in line.strip():
            if c == '#':
                updatePos(space, i, j, k, True)
            elif c == '.':
                updatePos(space, i, j, k, False)
            else:
                raise ValueError('parse error')
            j += 1
        i += 1
    for n in range(6):
        space = advance(space)
    print('answer 1: ', countActive(space))

def main2():
    f = open('input')
    space = {}
    i = 0
    k = 0
    l = 0
    for line in f:
        j = 0
        for c in line.strip():
            if c == '#':
                updatePos2(space, i, j, k, l, True)
            elif c == '.':
                updatePos2(space, i, j, k, l, False)
            else:
                raise ValueError('parse error')
            j += 1
        i += 1
    for n in range(6):
        print(n)
        space = advance2(space)
    print('answer 2: ', countActive2(space))

main2()
