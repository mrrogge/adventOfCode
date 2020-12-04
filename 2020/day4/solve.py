f =open('input')

passports = [{}]
i = 0
for line in f:
    if line == '\n':
        passports.append({})
        i += 1
    else:
        parts = line.split(' ')
        for part in parts:
            entry = part.split(':')
            passports[i][entry[0].strip()] = entry[1].strip()

i = 0
for passport in passports:
    try:
        passport['byr']
        passport['iyr']
        passport['eyr']
        passport['hgt']
        passport['hcl']
        passport['ecl']
        passport['pid']
    except KeyError:
        continue
    else:
        i += 1
print(i)

# Part 2
import re
hclPtn = re.compile('#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]')
eclPtn = re.compile('^amb$|^blu$|^brn$|^gry$|^grn$|^hzl$|^oth$')
pidPtn = re.compile('^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$')
# ^ This had me stuck for a while...originally I didn't have the anchors and there was one uncaught entry because it had more than 9 digits.

import string

def passportStr(p):
    a = []
    for k in sorted(p):
        a.append(str((k, p[k])))
    return ','.join(a)

i = 0
for passport in passports:
    try:
        passport['byr']
        passport['iyr']
        passport['eyr']
        passport['hgt']
        passport['hcl']
        passport['ecl']
        passport['pid']
    except KeyError:
        continue
    else:
        # input()
        byr = int(passport['byr'])
        iyr = int(passport['iyr'])
        eyr = int(passport['eyr'])
        hgt = passport['hgt'].strip()
        hcl = passport['hcl'].strip()
        ecl = passport['ecl'].strip()
        pid = passport['pid'].strip()
        if not (1920 <= byr and byr <= 2002):
            print('bad byr', passportStr(passport))
            continue
        if not (2010 <= iyr and iyr <= 2020):
            print('bad iyr', passportStr(passport))
            continue
        if not (2020 <= eyr and eyr <= 2030):
            print('bad eyr', passportStr(passport))
            continue
        units = hgt[-2:]
        if units == 'cm':
            try:
                n = int(hgt[0:3])
                if not (150 <= n and n <= 193):
                    print('bad hgt range', passportStr(passport))
                    continue
            except ValueError:
                print('bad hgt range', passportStr(passport))
                continue
        elif units == 'in':
            try:
                n = int(hgt[0:2])
                if not (59 <= n and n <= 76):
                    print('bad hgt range', passportStr(passport))
                    continue
            except ValueError:
                print('bad hgt range', passportStr(passport))
                continue
        else:
            print('bad hgt invalid unit', passportStr(passport))
            continue
        if hclPtn.match(hcl) is None:
            print('bad hcl', passportStr(passport))
            continue
        if eclPtn.match(ecl) is None:
            print('bad ecl', passportStr(passport))
            continue
        if pidPtn.match(pid) is None:
            print('bad pid', passportStr(passport))
            continue
        print(passportStr(passport))
        i += 1
print(i)