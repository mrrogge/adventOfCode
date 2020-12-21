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

class InterpretterError(Exception):
    pass

class Interpretter(object):
    def __init__(self, rules, msg):
        self.rules = rules
        self.msg = msg
        self.msgIdx = 0

    def advanceRule(self, ruleNum):
        rule = self.rules[ruleNum]
        initMsgIdx = self.msgIdx
        ruleIdx = 0
        branchIdx = 0
        while True:
            branch = None
            token = None
            c = None
            try:
                branch = rule[branchIdx]
            except IndexError:
                #checked all branches for this rule
                raise InterpretterError()
            try:
                token = branch[ruleIdx]
            except IndexError:
                #completed tokens for this rule
                return True
            try:
                c = self.msg[self.msgIdx]
            except IndexError:
                # print('msg too short')
                raise InterpretterError
            # print(ruleNum, rule, branchIdx, ruleIdx, token)
            # print(self.msgIdx, c, initMsgIdx, self.msg)
            # input()
            if token == '"a"' or token == '"b"':
                if f'"{c}"' == token:
                    # print('c matches token')
                    ruleIdx += 1
                    self.msgIdx += 1
                    continue
                else:
                    #msg does not match this rule
                    # print('does not match token')
                    raise InterpretterError
            else:
                try:
                    self.advanceRule(token)
                except InterpretterError:
                    #this branch does not work for the msg
                    # print('branch does not work')
                    branchIdx += 1
                    ruleIdx = 0
                    self.msgIdx = initMsgIdx
                else:
                    ruleIdx += 1
    
    def run(self):
        self.advanceRule(0)
        if self.msgIdx == len(self.msg):
            print('passed')
        else:
            # print('failed')
            raise InterpretterError('failed')

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
    t = parseInput2('testInput')
    rules = t[0]
    #this is kind of cheating but oh well, I can't figure it out the normal way.
    rules[8] = [[42], [42, 42], [42,42,42], [42,42,42,42], [42,42,42,42,42], [42,42,42,42,42,42], [42,42,42,42,42,42,42], [42,42,42,42,42,42,42,42], [42,42,42,42,42,42,42,42,42], [42,42,42,42,42,42,42,42,42,42]]
    rules[11] = [[42, 31], [42, 11, 31], [42,42,31,31], [42,42,42,31,31,31], [42,42,42,42,31,31,31,31], [42,42,42,42,42,31,31,31,31,31], [42,42,42,42,42,42,31,31,31,31,31,31], [42,42,42,42,42,42,42,31,31,31,31,31,31,31], [42,42,42,42,42,42,42,42,31,31,31,31,31,31,31,31], [42,42,42,42,42,42,42,42,42,31,31,31,31,31,31,31,31,31], [42,42,42,42,42,42,42,42,42,42,31,31,31,31,31,31,31,31,31,31]]
    messages = t[1]
    count = 0
    for msg in messages:
        interpretter = Interpretter(rules, msg)
        try:
            interpretter.run()
        except InterpretterError:
            pass
        else:
            count += 1
    print('answer 2: ', count)

# main()
main2()
                