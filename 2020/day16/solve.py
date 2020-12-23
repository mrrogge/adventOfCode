#This one was a pain in the ass...probably my ugliest solution so far, but at least I got it. I used a lot of print() checks to help me figure out bugs.

import re

def parse(fields, myTicket, otherTickets):
    # f = open('testInput')
    f = open('input')
    fieldPtn = re.compile(r'(.+): (\d+)-(\d+) or (\d+)-(\d+)')
    sections = ['fields', 'myTicket', 'otherTickets']
    sectionIdx = 0
    for line in f:
        if line == '\n':
            sectionIdx += 1
            continue
        if line == 'your ticket:\n':
            continue
        if line == 'nearby tickets:\n':
            continue
        if sections[sectionIdx] == 'fields':
            fieldMatch = fieldPtn.search(line)
            fieldName = fieldMatch.group(1)
            fields[fieldName] = {'a':int(fieldMatch.group(2)), 
                'b':int(fieldMatch.group(3)),
                'c':int(fieldMatch.group(4)),
                'd':int(fieldMatch.group(5))}
        elif sections[sectionIdx] == 'myTicket':
            parts = line.split(',')
            for partIdx in range(len(parts)):
                myTicket[partIdx] = int(parts[partIdx])
        elif sections[sectionIdx] == 'otherTickets':
            parts = line.split(',')
            ticket = {}
            otherTickets.append(ticket)
            for partIdx in range(len(parts)):
                ticket[partIdx] = int(parts[partIdx])
        else:
            raise ValueError('parse error')
    return (fields, myTicket, otherTickets)

def isValidForFieldRule(val, field):
    return ((field['a'] <= val and val <= field['b'])
        or (field['c'] <= val and val <= field['d']))

def main():
    fields = {}
    myTicket = {}
    otherTickets = []
    parse(fields, myTicket, otherTickets)

    badValSum = 0
    for ticket in otherTickets:
        for k in ticket:
            valid = False
            for field in fields.values():
                validForField = ((field['a'] <= ticket[k] 
                    and ticket[k] <= field['b'])
                    or (field['c'] <= ticket[k] and ticket[k] <= field['d']))
                if validForField:
                    valid = True
                    break
            if not valid:
                badValSum += ticket[k]
    
    print('answer 1: ', badValSum)

def main2():
    fields = {}
    myTicket = {}
    otherTickets = []
    parse(fields, myTicket, otherTickets)

    def ticketFilter(ticket):
        #remove ticket if any of its column values do not satisfy all of the field rules.
        for colNum in ticket:
            val = ticket[colNum]
            valid = True
            for field in fields.values():
                if isValidForFieldRule(val, field):
                    #this val is valid for this field rule, therefore this column value is valid
                    break
            else:
                #value is not valid for ALL field rules, therefore this ticket is invalid
                return False
        #all column values passed validation, so the ticket is valid
        return True


    # print(len(otherTickets))
    otherTickets = list(filter(ticketFilter, otherTickets))
    # print(len(otherTickets))
    # input()

    #keep track of which fields are possible for a given column number
    validFieldsForColNum = {}
    for colNum in myTicket:
        validFieldsForColNum[colNum] = {}
        for field in fields:
            validFieldsForColNum[colNum][field] = True

    colsRemainingToMap = True
    while colsRemainingToMap:
        # print(validFieldsForColNum)
        colsRemainingToMap = False
        for colNum in myTicket:
            if len(validFieldsForColNum[colNum]) <= 1:
                #this colNum can only be one field. We can remove this field from all other columns
                field = list(validFieldsForColNum[colNum])[0]
                # print('col', colNum, 'is solved', field)
                for innerColNum in validFieldsForColNum:
                    if innerColNum == colNum:
                        continue
                    validFieldsForColNum[innerColNum].pop(field, None)
                # print(validFieldsForColNum)
                continue
            #There are still more fields that this col can be, so set colsRemainingToMap to True.
            colsRemainingToMap = True
            # print('checking col', colNum)
            for field in list(validFieldsForColNum[colNum]):
                # print('checking field', field)
                for ticketIdx in range(len(otherTickets)):
                    ticket = otherTickets[ticketIdx]
                    if not isValidForFieldRule(ticket[colNum], fields[field]):
                        #this col cannot be this field, so remove it
                        del validFieldsForColNum[colNum][field]
                        # print('col', colNum, 'cannot be field', field)
                        # input()
                        break
        # input()
    #At this point, validFieldsForColNum should only have one key/val pair for each colNum. Update my ticket keys to be these field values instead of colNums.
    # print(myTicket)
    for colNum in validFieldsForColNum:
        field = list(validFieldsForColNum[colNum])[0]
        myTicket[field] = myTicket[colNum]
        del myTicket[colNum]
    # print(myTicket)

    #now, just get the product of all "departure" fields
    prod = 1
    for field in myTicket:
        if len(field) >= len('departure') and field.find('departure') >= 0:
            prod *= myTicket[field]
    
    print('answer 2:', prod)

main2() 