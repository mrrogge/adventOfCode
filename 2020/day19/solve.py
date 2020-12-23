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

    def advanceRule(self, ruleNum, level):
        rule = self.rules[ruleNum]
        msgIdx = self.msgIdx
        initMsgIdx = msgIdx
        for branchIdx in range(len(rule)):
            branch = rule[branchIdx]
            print('checking branch', branchIdx, branch)
            for tokenIdx in range(len(branch)):
                token = branch[tokenIdx]
                print('checking token', tokenIdx, token)
                c = None
                try:
                    c = self.msg[msgIdx]
                except IndexError:
                    #there are more tokens than there are characters in the message, so this branch cannot work
                    print('exceeded msg length')
                    break
                print('checking c', msgIdx, c)
                if token == '"a"' or token == '"b"':
                    if f'"{c}"' == token:
                        print('c', c, 'matches token')
                        msgIdx += 1
                        continue
                    else:
                        #this token does not match the character, so this branch cannot work
                        print('c', c, 'does not match token', token)
                        break
                else:
                    try:
                        self.advanceRule(token, level+1)
                    except InterpretterError:
                        #the rule did not apply for the message, so this branch cannot work
                        print('token', token, 'failed')
                        break
            else:
                #all tokens matched with the message, so this branch worked
                print('finished branch', branchIdx, branch, 'success')
                self.msgIdx = msgIdx
                if True:
                    if msgIdx == len(self.msg):
                        print('end of message')
                        return True
                    else:
                        print('more message remaining, must continue checking')
                else:
                    self.msgIdx = msgIdx
                    return True
            #branch did not work, so reset msgIdx and try next one
            print('branch failed', branchIdx, branch)
            msgIdx = initMsgIdx
            continue
        else:
            #tried all branches and none worked, so this rule doesn't apply
            print('rule failed', ruleNum, rule)
            raise InterpretterError

        # while True:
        #     branch = None
        #     token = None
        #     c = None
        #     try:
        #         branch = rule[branchIdx]
        #     except IndexError:
        #         #checked all branches for this rule
        #         self.msgIdx = initMsgIdx
        #         raise InterpretterError()
        #     try:
        #         token = branch[ruleIdx]
        #     except IndexError:
        #         #checked all tokens for this branch

        #     try:
        #         c = self.msg[self.msgIdx]
        #         token = branch[ruleIdx]
        #     except IndexError:
        #         print('check', ruleIdx, branch, self.msgIdx)
        #         if ruleIdx >= len(branch)-1:
        #             return True
        #         else:
        #             branchIdx += 1
        #             ruleIdx = 0
        #             self.msgIdx = initMsgIdx
        #             continue
        #     print(ruleNum, rule, branchIdx, ruleIdx, token)
        #     print(self.msgIdx, c, initMsgIdx, self.msg, self.msg[self.msgIdx])
        #     # input()
        #     if token == '"a"' or token == '"b"':
        #         if f'"{c}"' == token:
        #             print('c matches token')
        #             self.msgIdx += 1
        #             if ruleIdx >= len(branch)-1:
        #                 return True
        #             else:
        #                 ruleIdx += 1
        #                 continue
        #         else:
        #             #msg does not match this rule
        #             print('does not match token')
        #             branchIdx += 1
        #             ruleIdx = 0
        #             self.msgIdx = initMsgIdx
        #             continue
        #     else:
        #         try:
        #             self.advanceRule(token)
        #         except InterpretterError:
        #             #this branch does not work for the msg
        #             print('branch does not work')
        #             branchIdx += 1
        #             ruleIdx = 0
        #             self.msgIdx = initMsgIdx
        #             continue
        #         else:
        #             ruleIdx += 1
        #             continue
    
    def run(self):
        self.advanceRule(0, 0)
        if self.msgIdx == len(self.msg):
            print('passed')
        else:
            print('failed')
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
    MAX_REC = 10
    rules[8] = []
    rules[11] = []
    for i in range(MAX_REC):
        rules[8].append([42]*(i+1))
        rules[11].append([42]*(i+1) + [31]*(i+1))
    # rules[8] = [[42], [42, 42], [42,42,42], [42,42,42,42], [42,42,42,42,42], [42,42,42,42,42,42], [42,42,42,42,42,42,42], [42,42,42,42,42,42,42,42], [42,42,42,42,42,42,42,42,42], [42,42,42,42,42,42,42,42,42,42], [42,42,42,42,42,42,42,42,42,42,42]]
    # rules[11] = [[42, 31], [42, 11, 31], [42,42,31,31], [42,42,42,31,31,31], [42,42,42,42,31,31,31,31], [42,42,42,42,42,31,31,31,31,31], [42,42,42,42,42,42,31,31,31,31,31,31], [42,42,42,42,42,42,42,31,31,31,31,31,31,31], [42,42,42,42,42,42,42,42,31,31,31,31,31,31,31,31], [42,42,42,42,42,42,42,42,42,31,31,31,31,31,31,31,31,31], [42,42,42,42,42,42,42,42,42,42,31,31,31,31,31,31,31,31,31,31]]
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
                