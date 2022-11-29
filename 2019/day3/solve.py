f = open('input')
# f = open('shortTest')
wires = []
for line in f:
    wires.append(line.split(','))

# Grid is a 2D dict of ints. 0=no wire, 1=wire0 only, 2=wire1 only, 3=both
grid = {0:{0:3}}

def updatePos(i, j, wireNum):
    grid[i] = grid.get(i) or {}
    grid[i][j] = grid[i].get(j) or 0
    if grid[i][j] == 0 and wireNum == 0:
        grid[i][j] = 1
    elif grid[i][j] == 0 and wireNum == 1:
        grid[i][j] = 2
    elif grid[i][j] == 1 and wireNum == 1:
        grid[i][j] = 3
    elif grid[i][j] == 2 and wireNum == 0:
        grid[i][j] = 3

def applyToGrid(iInit, jInit, wireNum, seg):
    # each segment is a letter U/D/L/R and a distance integer. i/j are the starting point.
    # print(iInit, jInit, wireNum, seg)
    updatePos(iInit,jInit,wireNum)
    dir = seg[0]
    dist = int(seg[1:])
    iFinal = iInit
    jFinal = jInit
    if dir == 'U':
        for i in range(iInit-1, iInit-dist-1, -1):
            updatePos(i, jInit, wireNum)
        iFinal = iInit-dist
    elif dir == 'L':
        for j in range(jInit-1, jInit-dist-1, -1):
            updatePos(iInit, j, wireNum)
        jFinal = jInit-dist
    elif dir == 'D':
        for i in range(iInit+1, iInit+dist+1, 1):
            updatePos(i, jInit, wireNum)
        iFinal = iInit+dist
    elif dir == 'R':
        for j in range(jInit+1, jInit+dist+1, 1):
            updatePos(iInit, j, wireNum)
        jFinal = jInit+dist
    return (iFinal, jFinal)

def main():
    for wireNum in range(len(wires)):
        i = 0
        j = 0
        for seg in wires[wireNum]:
            nextPos = applyToGrid(i, j, wireNum, seg)
            i = nextPos[0]
            j = nextPos[1]

    minCrossDist = None
    minCrossPos = (0,0)
    for i, row in grid.items():
        for j, val in row.items():
            if grid[i][j] == 3 and not (i == 0 and j == 0):
                dist = abs(i) + abs(j)
                if minCrossDist is None or dist < minCrossDist:
                    minCrossDist = dist
                    minCrossPos = (i,j)

    print(minCrossDist, minCrossPos)

# Part 2
# For this part, each point on the grid will have a tuple that keeps track of the shortest signal delay at each point. Index 0 in the tuple is for the first wire, and 1 for the second. A value of None means that wire has not been to that spot yet.

grid = {0:{0:(0,0)}}

def updatePos2(i,j,wireNum,delay):
    grid[i] = grid.get(i) or {}
    grid[i][j] = grid[i].get(j) or (None, None)
    if wireNum == 0 and grid[i][j][0] is None:
        grid[i][j] = (delay, grid[i][j][1])
    elif wireNum == 1 and grid[i][j][1] is None:
        grid[i][j] = (grid[i][j][0], delay)

def applyToGrid2(iInit, jInit, delayInit, wireNum, seg):
    # print(iInit, jInit, delayInit, wireNum, seg)
    dir = seg[0]
    dist = int(seg[1:])
    iFinal = iInit
    jFinal = jInit
    delayFinal = delayInit+dist
    delayInc = 0
    if dir == 'U':
        for i in range(iInit-1, iInit-dist-1, -1):
            delayInc += 1
            updatePos2(i, jInit, wireNum, delayInit+delayInc)
        iFinal = iInit-dist
    elif dir == 'L':
        for j in range(jInit-1, jInit-dist-1, -1):
            delayInc += 1
            updatePos2(iInit, j, wireNum, delayInit+delayInc)
        jFinal = jInit-dist
    elif dir == 'D':
        for i in range(iInit+1, iInit+dist+1, 1):
            delayInc += 1
            updatePos2(i, jInit, wireNum, delayInit+delayInc)
        iFinal = iInit+dist
    elif dir == 'R':
        for j in range(jInit+1, jInit+dist+1, 1):
            delayInc += 1
            updatePos2(iInit, j, wireNum, delayInit+delayInc)
        jFinal = jInit+dist
    return (iFinal, jFinal, delayFinal)

def main2():
    for wireNum in range(len(wires)):
        i = 0
        j = 0
        delay = 0
        for seg in wires[wireNum]:
            nextPos = applyToGrid2(i, j, delay, wireNum, seg)
            i = nextPos[0]
            j = nextPos[1]
            delay = nextPos[2]

    minDelaySum = None
    minDelayCrossPos = (0,0)
    for i, row in grid.items():
        for j, val in row.items():
            if grid[i][j][0] is not None and grid[i][j][1] is not None and not (i == 0 and j == 0):
                delay = grid[i][j][0] + grid[i][j][1]
                if minDelaySum is None or delay < minDelaySum:
                    minDelaySum = delay
                    minDelayCrossPos = (i,j)

    print(minDelaySum, minDelayCrossPos)

main2()