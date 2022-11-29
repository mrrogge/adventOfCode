f = open('input')

validCount = 0

for line in f:
    splitLine = line.split(' ')
    range_ = splitLine[0]
    letter = splitLine[1][0]
    password = splitLine[2]
    rangeSplit = range_.split('-')
    minOccur = int(rangeSplit[0])
    maxOccur = int(rangeSplit[1])
    count = password.count(letter)
    if minOccur <= count and count <= maxOccur:
        validCount += 1

print(validCount)

# Part 2
f.close()
f = open('input')
validCount = 0
for line in f:
    splitLine = line.split(' ')
    positions = splitLine[0]
    letter = splitLine[1][0]
    password = splitLine[2].strip()
    posSplit = positions.split('-')
    pos1 = int(posSplit[0]) - 1
    pos2 = int(posSplit[1]) - 1
    foundPos1 = len(password) > pos1 and password[pos1] == letter
    foundPos2 = len(password) > pos2 and password[pos2] == letter
    if foundPos1 ^ foundPos2:
        validCount += 1
    else:
        print(password, len(password), pos1, pos2, letter)
print(validCount)