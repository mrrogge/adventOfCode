#I had a really hard time with this one. For whatever reason I couldn't get the right answer for part 2. I started solving the problem by writing an interpretter that checks the validity of the message while iterating through the rules, but this gave me lots of problems. In the end I went with a regex solution. I also cheesed it a little by replacing the recursive rules with a hardcoded number of recursion levels. Ah! It feels so good to finally be done with this stupid puzzle!

def parseInput(fname):
    rules = {}
    messages = []
    f = open(fname)
    for line in f:
        if str.isspace(line):
            continue
        if line[0] == 'a' or line[0] == 'b':
            messages.append(line.strip())
        else:
            rule = {}
            ruleNum = int(line[0:line.find(':')])
            rules[ruleNum] = rule
            if line.find('|') >= 0:
                ruleParts = line.strip()[line.find(':')+2:].split('|')
                rule['option1'] = []
                ruleParts[0] = ruleParts[0].strip()
                for ruleSubPart in ruleParts[0].split(' '):
                    rule['option1'].append(int(ruleSubPart))
                rule['option2'] = []
                ruleParts[1] = ruleParts[1].strip()
                for ruleSubPart in ruleParts[1].split(' '):
                    rule['option2'].append(int(ruleSubPart))
            else:
                ruleParts = line.strip()[line.find(':')+2:].split(' ')
                rule['option1'] = []
                for rulePart in ruleParts:
                    try:
                        rule['option1'].append(int(rulePart))
                    except ValueError:
                        rule['option1'].append(rulePart[1])
    return (rules, messages)

def parseInput2(fname):
    rules = {}
    messages = []
    f = open(fname)
    for line in f:
        if str.isspace(line):
            continue
        if line[0] == 'a' or line[0] == 'b':
            messages.append(line.strip())
        else:
            rule = [[]]
            ruleNum = int(line[0:line.find(':')])
            rules[ruleNum] = rule
            for part in line.strip()[line.find(':')+2:].split(' '):
                if part == '|':
                    rule.append([])
                else:
                    try:
                        rule[-1].append(int(part))
                    except ValueError:
                        rule[-1].append(part)
    return (rules, messages)

def advance(rules, ruleNum, s):
    """
    Advances string s based on ruleNum (recursive).
    Returns a new string that is s after the rule is applied, or None if the rule did not match.
    """
    rule = rules[ruleNum]
    option1Result = None
    option2Result = False
    s1 = s
    s2 = s
    if rule['option1'][0] == 'a' or rule['option1'][0] == 'b':
        try:
            option1Result = s[0] == rule['option1'][0]
            s1 = s[1:]
        except IndexError:
            option1Result = False
            s1 = ''
    else:
        for rulePart in rule['option1']:
            s1 = advance(rules, rulePart, s1)
            if s1 is None:
                break
        option1Result = s1 is not None
    if rule.get('option2'):
        if rule['option2'][0] == 'a' or rule['option2'][0] == 'b':
            try:
                option2Result = s[0] == rule['option2'][0]
                s2 = s[1:]
            except IndexError:
                option2Result = False
                s2 = ''
        else:
            for rulePart in rule['option2']:
                s2 = advance(rules, rulePart, s2)
                if s2 is None:
                    break
            option2Result = s2 is not None
    if option1Result:
        return s1
    elif option2Result:
        return s2
    else:
        return None

import re

def getRegexStr(rules, ruleNum):
    s = ''
    firstBranch = True
    for branch in rules[ruleNum]:
        s1 = ''
        for token in branch:
            if token == '"a"' or token == '"b"':
                s1 += token[1]
            else:
                s1 += f'({getRegexStr(rules, token)})'
        if firstBranch:
            s += s1
            firstBranch = False
        else:
            s += '|'
            s += s1
    return s

def checkMsg(msg, regexStr):
    regex = re.compile(regexStr)
    if regex.fullmatch(msg) is not None:
        return True
    else:
        return False

def main():
    t = parseInput('input')
    rules = t[0]
    messages = t[1]
    count = 0
    for msg in messages:
        if advance(rules, 0, msg) == '':
            count += 1
    print('answer 1: ', count)

def main2():
    t = parseInput2('input2')
    rules = t[0]
    #this is kind of cheating but oh well, I can't figure it out the normal way.
    MAX_REC = 10
    rules[8] = []
    rules[11] = []
    for i in range(MAX_REC):
        rules[8].append([42]*(i+1))
        rules[11].append([42]*(i+1) + [31]*(i+1))
    messages = t[1]
    s = getRegexStr(rules, 0)
    count = 0
    for msg in messages:
        if checkMsg(msg, s):
            count += 1
    print('answer 2: ', count)

# main()
main2()
                