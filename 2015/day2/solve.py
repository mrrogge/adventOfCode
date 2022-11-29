f = open('input')
dims = []
for line in f:
    dim = line.split('x')
    dim = (int(dim[0]), int(dim[1]), int(dim[2]))
    dims.append(dim)

totalArea = 0
for dim in dims:
    l = dim[0]
    w = dim[1]
    h = dim[2]
    area = 2*l*w + 2*w*h + 2*h*l + min(l*w,w*h,h*l)
    totalArea += area

print(totalArea)

# Part 2
total = 0
for dim in dims:
    l = dim[0]
    w = dim[1]
    h = dim[2]
    ribbon = 2 * min(l+w, w+h, h+l) + l*w*h
    total += ribbon
print(total)