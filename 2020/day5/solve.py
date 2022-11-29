f = open('input')
import math

def getSeatId(s):
    minRow = 0
    maxRow = 127
    minCol = 0
    maxCol = 7
    for c in s:
        if c == 'F':
            maxRow = math.floor((maxRow+minRow)/2)
        elif c == 'B':
            minRow = math.ceil((maxRow+minRow)/2)
        elif c == 'L':
            maxCol = math.floor((maxCol+minCol)/2)
        elif c == 'R':
            minCol = math.ceil((maxCol+minCol)/2)
    assert minRow == maxRow and minCol == maxCol, f'{minRow}, {maxRow}, {minCol}, {maxCol}'
    return minRow*8 + minCol

maxSeatId = 0
for seat in f:
    id = getSeatId(seat)
    maxSeatId = max(maxSeatId, id)
print(maxSeatId)

# Part 2
f.seek(0)
seats = {}

def getSeatData(s):
    minRow = 0
    maxRow = 127
    minCol = 0
    maxCol = 7
    for c in s:
        if c == 'F':
            maxRow = math.floor((maxRow+minRow)/2)
        elif c == 'B':
            minRow = math.ceil((maxRow+minRow)/2)
        elif c == 'L':
            maxCol = math.floor((maxCol+minCol)/2)
        elif c == 'R':
            minCol = math.ceil((maxCol+minCol)/2)
    assert minRow == maxRow and minCol == maxCol, f'{minRow}, {maxRow}, {minCol}, {maxCol}'
    id = minRow*8 + minCol
    return {'row':minRow, 'col':minCol, 'id':id}

def addSeat(seat):
    seats[seat['row']] = seats.get(seat['row']) or {}
    seats[seat['row']][seat['col']] = seat

for s in f:
    addSeat(getSeatData(s))

foundFirst = False
for i in range(1,128):
    for j in range(7):
        if seats.get(i) is not None and seats[i].get(j) is not None:
            if not foundFirst:
                foundFirst = True
            continue
        else:
            if foundFirst:
                print(i,j, i*8 + j)
                raise SystemExit
            else:
                continue
