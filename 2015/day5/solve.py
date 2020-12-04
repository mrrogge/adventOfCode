f = open('input')

import re
ptn1 = re.compile(r'.*[aeiou].*[aeiou].*[aeiou]')
ptn2 = re.compile(r'.*([a-z])\1.*')
ptn3 = re.compile(r'.*ab.*')
ptn4 = re.compile(r'.*cd.*')
ptn5 = re.compile(r'.*pq.*')
ptn6 = re.compile(r'.*xy.*')

def isNice(s):
    return (ptn1.match(s) is not None
        and ptn2.match(s) is not None
        and ptn3.match(s) is None
        and ptn4.match(s) is None
        and ptn5.match(s) is None
        and ptn6.match(s) is None)

test = 'ugknbfddgicrmopn'

i = 0
for line in f:
    if isNice(line):
        i += 1
print(i)

# Part 2
ptn1 = re.compile(r'.*([a-z][a-z]).*\1.*')
ptn2 = re.compile(r'.*([a-z])[a-z]\1.*')

def isNice2(s):
    return (ptn1.match(s) is not None and ptn2.match(s) is not None)

f.seek(0)
i = 0
for line in f:
    if isNice2(line):
        i += 1
print(i)
