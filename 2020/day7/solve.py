f = open('input')
# f = open('testInput')

rules = {}

def parseRule(line):
    parts = line.split(' ')
    subject = ' '.join(parts[0:2]).strip()
    containStr = ' '.join(parts[4:])
    contains = {}
    if containStr.find(',') >= 0:
        containParts = containStr.split(',')
        for part in containParts:
            part = part.strip()
            qtyParts = part.split(' ')
            qty = int(qtyParts[0])
            desc = ' '.join(qtyParts[1:3]).strip()
            contains[desc] = qty
    else:
        containParts = containStr.split(' ')
        try:
            qty = int(containParts[0])
        except ValueError:
            #contains no other bags
            pass
        else:
            desc = ' '.join(containParts[1:3]).strip()
            contains[desc] = qty
    rule = (subject, contains)
    return rule

for line in f:
    rule = parseRule(line)
    rules[rule[0]] = rule[1]

def canContainMine(desc):
    contains = rules[desc]
    for innerDesc in contains:
        if innerDesc == 'shiny gold':
            return True
        if canContainMine(innerDesc):
            return True
    else:
        return False

i = 0
for desc in rules:
    if canContainMine(desc):
        i += 1
print(i)

# Part 2

def countInnerBags(desc):
    i = 0
    contains = rules[desc]
    for innerDesc in contains:
        qty = contains[innerDesc]
        i += qty
        i += qty * countInnerBags(innerDesc)
    return i

print(countInnerBags('shiny gold'))
