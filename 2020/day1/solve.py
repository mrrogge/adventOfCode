f = open('input')
line = None
lines = []
for line in f:
    lines.append(int(line))

from itertools import combinations

for pair in combinations(lines, 2):
    if pair[0] + pair[1] == 2020:
        print(pair[0], pair[1], pair[0]*pair[1])
        break

for pair in combinations(lines, 3):
    if pair[0] + pair[1] + pair[2] == 2020:
        print(pair[0], pair[1], pair[2], pair[0]*pair[1]*pair[2])
        break