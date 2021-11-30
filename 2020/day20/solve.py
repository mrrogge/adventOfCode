def parse(fname):
    tileData = {}
    with open(fname) as f:
        tiles_s = f.read().split('\n\n')
        for tile_s in tiles_s:
            lines = tile_s.split('\n')
            tileId = int(lines.[0].strip()[5:-1])
            rows = []
            for line in lines[1:]:
                cols = []
                rows.append(cols)
                for c in line.strip():
                    cols.append(c)
            tileData[tileId] = rows
    return tileData

def getEdge(tile, edge):
    

def main():
    tiles = parse('input')
    layout = {}
main()