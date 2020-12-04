f = open('input')
lines = []
for line in f:
    lines.append(int(line))

sum = 0
import math

for line in lines:
    sum += (math.floor(line/3) - 2)

print(sum)

#Part 2
fuelTotal = 0

for moduleMass in lines:
    fuelNeed = (math.floor(moduleMass/3) - 2)
    if fuelNeed > 0:
        while fuelNeed > 0:
            fuelTotal += fuelNeed
            fuelNeed = (math.floor(fuelNeed/3) - 2)

print(fuelTotal)

