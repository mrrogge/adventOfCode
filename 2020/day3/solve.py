f = open('input')

trees = []

for line in f:
    ary = []
    for char in line:
        if char == '.':
            ary.append(False)
        elif char == '#':
            ary.append(True)
    trees.append(ary)

treeCount = 0
i = 0
j = 0

while i < len(trees):
    if trees[i][j]:
        treeCount += 1
    i += 1
    j += 3
    if i >= len(trees):
        break
    if j >= len(trees[i]):
        for n in range(i, len(trees), 1):
            trees[n] = trees[n] + trees[n]

print(treeCount)

# Part 2
def traverse(iStep, jStep):
    treeCount = 0
    i = 0
    j = 0
    while i < len(trees):
        if trees[i][j]:
            treeCount += 1
        i += iStep
        j += jStep
        if i >= len(trees):
            break
        if j >= len(trees[i]):
            for n in range(i, len(trees), 1):
                trees[n] = trees[n] + trees[n]
    return treeCount

print(traverse(1,1) * traverse(1,3) * traverse(1,5) * traverse(1,7) * traverse(2,1))
    