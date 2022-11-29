# f = open('testInput')
f = open('input')

questions = {}
count = 0
for line in f:
    # print('line', line, len(questions.keys()), count, questions)
    if line == '\n':
        # end of group
        count += len(questions.keys())
        questions = {}
        # print('end of group', line, len(questions.keys()), count, questions)
        # input()
        continue
    for c in line:
        if c == '\n':
            continue
        questions[c] = True
else:
    count += len(questions.keys())

print(count)
    
# Part 2
f.seek(0)
groupQuestions = {}
count = 0
groupSize = 0
for line in f:
    # print('line', line, count, groupQuestions)
    lineQuestions = {}
    if line == '\n':
        # end of group
        for k in groupQuestions:
            if groupQuestions[k] == groupSize:
                count += 1
        groupSize = 0
        # print('end of group', line, count, groupQuestions)
        # input()
        groupQuestions = {}
        continue
    for c in line:
        if c == '\n':
            continue
        lineQuestions[c] = True
    else:
        groupSize += 1
        for k in lineQuestions:
            groupQuestions[k] = groupQuestions.get(k) or 0
            groupQuestions[k] += 1
else:
    for k in groupQuestions:
        if groupQuestions[k] == groupSize:
            count += 1
print(count)