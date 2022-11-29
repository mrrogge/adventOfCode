f =  open('input')

adapters = []

for line in f:
    adapters.append(int(line))

def sortAdapters(a,b):
    return a < b

#add the charging outlet (0)
adapters.append(0)
adapters = sorted(adapters)
#add your device at the end
adapters.append(adapters[-1]+3)

diffs = {0:0,1:0,2:0,3:0}

for i in range(1, len(adapters)):
    diff = adapters[i] - adapters[i-1]
    assert 0 <= diff and diff <= 3
    diffs[diff] += 1

print('part 1 answer: ', diffs[1] * diffs[3])

# Part 2
count = 0

# We can re-interpet the question as "how many different ways can you leave out adapters without breaking the chain?" 
# 
# To solve this, I will split the adapters into "skippable groups". Each group is a set of adapters that have some number of ways to skip adapters. Each adapter can only belong to one group. This way, we can find the number of skip options for each group, then find the sum of permutations of these with every other group.
# For example, take the series [0,1,2,3,4,7,8]. The first group will start at 0. The first non-skippable adapter is 4, because 7-3=4 which is >3. So the first group is from 0 to 4. In this group, you can skip none, 1, 2, 3, 1 and 2, 1 and 3, and 2 and 3 (but NOT 1,2, and 3). 7 total possible sets of skippable adapters for this group. The next group will start with 8. If there were only two groups and group 2 had 5 possible ways to skip adapters, then the total possible ways would be 7*5=35.

from math import factorial
def comCount(n,r):
    return factorial(n) / factorial(r) / factorial(n-r)

#each group will have a startIdx, endIdx, and ways count.
skipGroups = []

#figure out the groups
i = 0
while i < len(adapters):
    startIdx = i
    endIdx = None
    lookAhead = 1
    while True:
        diff = None
        try:
            diff = adapters[startIdx+lookAhead] - adapters[startIdx+lookAhead-1]
        except IndexError:
            #at the end of the list
            break
        if diff >= 3:
            break
        endIdx = startIdx+lookAhead
        lookAhead += 1
    if endIdx is None:
        i += 1
        continue
    group = {'startIdx':startIdx, 'endIdx':endIdx, 'ways':0}
    skipGroups.append(group)
    i = endIdx + 1

#calculate the num of ways to skip adapters for each group. This is a hack with hardcoded values, and I made a few assumptions:
# 1. the groups never exceed 6 adapters.
# 2. the differences between any adapters are either 1 or 3 (never 2).
# 3. all adapter values are unique.
# Luckily, the assumptions hold for our data, so I was able to manually set the number of ways for a given number of adapters in the group. If this wasn't the case, I would have to do a bit extra work to figure out the number of ways for each group.
for group in skipGroups:
    innerCount = group['endIdx'] - group['startIdx'] - 1
    if innerCount == 0:
        group['ways'] = 1
    elif innerCount == 1:
        group['ways'] = 2
    elif innerCount == 2:
        group['ways'] = 4
    elif innerCount == 3:
        group['ways'] = 7
    elif innerCount == 4:
        group['ways'] = 11
    else:
        raise ValueError('larger group than expected')

#Finally, just multiply each of the ways of each group to get all the possible combinations of skipped adapters.
totalCount = 1
for group in skipGroups:
    totalCount *= group['ways']

print('part 2 answer: ', totalCount)