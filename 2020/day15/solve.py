MAXTURN1 = 2020
MAXTURN2 = 30000000
def main(maxTurn):
    f = open('input')
    # f = open('testInput')
    i = 1
    nums = {}
    turnHistory = []
    startingNums = f.readline().split(',')
    for startingNum in startingNums:
        n = int(startingNum)
        turnHistory.append(n)
        nums[n] = nums.get(n) or {}
        nums[n]['last'] = i
        i += 1
    while True:
        prevNum = turnHistory[-1]
        if nums[prevNum].get('2ndLast') is None:
            nums[0]['2ndLast'] = nums[0]['last']
            nums[0]['last'] = i
            turnHistory.append(0)
        else:
            newNum = nums[prevNum]['last'] - nums[prevNum]['2ndLast']
            nums[newNum] = nums.get(newNum) or {}
            try:
                nums[newNum]['2ndLast'] = nums[newNum]['last']
            except KeyError:
                pass
            nums[newNum]['last'] = i
            turnHistory.append(newNum)
        if i == maxTurn:
            print('answer: ', turnHistory[-1])
            break
        i += 1
        # print(turnHistory, nums)
        # input()

# main(MAXTURN1)
main(MAXTURN2)

        
