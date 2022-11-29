key = "ckczppom"
# key = 'abcdef'
from hashlib import md5
i = 1
while True:
    h = md5(bytes(key+str(i), 'utf-8')).hexdigest()
    if h[0:5] == '00000':
        print(i)
        break
    i += 1

# Part 2
i = 1
while True:
    h = md5(bytes(key+str(i), 'utf-8')).hexdigest()
    if h[0:6] == '000000':
        print(i)
        break
    i += 1