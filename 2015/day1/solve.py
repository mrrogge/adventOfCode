f = open('input')
data = f.readline()
floor = 0
for i in data:
    if i == '(':
        floor += 1
    elif i == ')':
        floor -= 1
print(floor)

# Part 2
pos = 0
floor = 0
for i in data:
    pos += 1
    if i == '(':
        floor += 1
    elif i == ')':
        floor -= 1
    if floor < 0:
        print(pos)
        break