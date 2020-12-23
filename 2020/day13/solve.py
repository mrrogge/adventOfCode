f = open('input')

buses = []

departTime = int(f.readline())

busesStr = f.readline()
busesStrParts = busesStr.split(',')
for part in busesStrParts:
    if part == 'x':
        continue
    buses.append(int(part))

t = departTime
while True:
    done = False
    for bus in buses:
        if t % bus == 0:
            print('part 1 answer: ', bus * (t-departTime))
            done = True
            break
    if done:
        break
    t += 1

#part 2
from os import system
buses = []
f.seek(0)
f.readline()
busesStr = f.readline()
busesStrParts = busesStr.split(',')
i = 0
for part in busesStrParts:
    if part != 'x':
        buses.append({'id':int(part), 'slot':i, 'inSlot':False})
    i += 1

t = 100000000000000
# t = 0
step = 1
while True:
    done = False
    for i in range(len(buses)):
        print(i, t, step, buses[i]['id'], buses[i]['slot'])
        # input()
        # so basically, we need to find the least common multiple of all the bus ids. Once we find a multiple of the first bus, we only need to check future multiples of that for the rest of the buses, which cuts down on execution time. When we find a number that is also a multiple of the 2nd bus, then we can further increase our step size by multiplying it by the id of that bus, and so on and so on until we find the answer.
        if (t+buses[i]['slot']) % buses[i]['id'] == 0:
            if not buses[i]['inSlot']:
                step *= buses[i]['id']
                buses[i]['inSlot'] = True
            continue
        else:
            break
    else:
        print('part 2 answer: ', t)
        done = True
    if done:
        break
    t += step
    system('clear')
    print(t)



    