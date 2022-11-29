f = open('input')

nums = []

from itertools import combinations

for line in f:
    nums.append(int(line))

badIdx = None

for i in range(25, len(nums)):
    found = False
    for com in combinations(range(1, 26), 2):
        if nums[i-com[0]] + nums[i-com[1]] == nums[i]:
            break
    else:
        badIdx = i
        print('part 1 answer: ', nums[badIdx])
        found = True
    if found:
        break

# Part 2
for numRange in range (2, badIdx):
    for i in range(0, badIdx-numRange+1):
        subset = nums[i:i+numRange]
        if sum(subset) == nums[badIdx]:
            minNum = None
            maxNum = None
            for j in subset:
                minNum = minNum or j
                minNum = min(minNum, j)
                maxNum = maxNum or j
                maxNum = max(maxNum, j)
            print('part 2 answer: ', minNum+maxNum)
            raise SystemExit