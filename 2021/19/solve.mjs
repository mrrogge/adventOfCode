import AOCTools from "../tools/AOCTools.mjs";

async function parse(path) {
    let input = await AOCTools.parseSectionsOfLines(path);
    let scanners = input.map(section=>section.slice(1))
        .map(section=>section.map(beacon=>beacon.split(",").map(e=>parseInt(e))));
    return scanners;
}

class Vector3 {
    x; y; z;
    constructor(x,y,z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static same(a,b) {
        return a.x === b.x && a.y === b.y && a.z === b.z;
    }

    static add(a,b) {
        return new Vector3(a.x+b.x, a.y+b.y, a.z+b.z);
    }

    static diff(a,b) {
        return new Vector3(a.x-b.x, a.y-b.y, a.z-b.z);
    }
}

class Scanner {
    pos = new Vector3(0,0,0);
    dir = 0;
    beacons = [];

    constructor(beacons) {
        beacons.forEach((beacon, i)=>{
            this.beacon[i] = new Vector3(beacon.x, beacon.y, beacon.z);
        });
    }

    toRotPos(pos) {
        if (pos === 0) {
            
        }
    }

    rotate(axis) {
        this.beacons.forEach((beacon)=>{
            if (axis === "x") {
                let newY = beacon.z;
                let newZ = -beacon.y;
                beacon.y = newY;
                beacon.z = newZ;
            }
            else if (axis === "y") {
                let newX = beacon.z;
                let newZ = -beacon.x;
                beacon.x = newX;
                beacon.z = newZ;
            }
            else if (axis === "z") {
                let newX = beacon.y;
                let newY = -beacon.x;
                beacon.x = newX;
                beacon.y = newY;
            }
        });
        return this;
    }

    static check(a,b) {
        let result = Scanner.checkInner(a,b);
        if (result) return [result, 0];
        b.rotate("x");
        result = Scanner.checkInner(a,b);
        if (result) {
            b.rotate("x").rotate("x").rotate("x"); 
            return [result, 1];
        }
        b.rotate("x");
        result = Scanner.checkInner(a,b);
        if (result) {
            b.rotate("x").rotate("x").rotate("x"); 
            return [result, 1];
        }
        
    }

    static checkInner(a,b) {
        /*
        treat a as though it is at 0,0,0. Check each orientation of b to see if 12 beacons line up with the A beacons.
        If scanners A and B have an overlapping beacon, then we can get their distance between each other by v_a - v_b. Then applying that offset to the rest of the beacon vals for B should give us what the offsets should be for A, and if there are 12 in common we have correct overlaps.
        */
        for (let i=0; i < a.beacons; i++) {
            let testBeaconA = a.beacons[i];
            for (let j=0; j < b.beacons; j++) {
                let testBeaconB = b.beacons[j];
                let testScanPosB = Vector3.diff(testBeaconA, testBeaconB);
                let matchMap = {};
                matchMap[i] = j;
                let matchCount = 1;
                for (let i2=0; i2 < a.beacons; i2++) {
                    if (i2 === i || matchMap[i2]) continue;
                    for (let j2=0; j2 < b.beacons; j2++) {
                        if (j2 === j) continue;
                        if (Vector3.same(a.beacons[i2], Vector3.diff(b.beacons[j2], testScanPosB))) {
                            matchMap[i2] = j2;
                            matchCount++;
                        }
                    }
                }
                if (matchCount >= 12) {
                    //these overlap
                    return testScanPosB;
                }
            }
        }
    }
}

function part1(input) {
    console.log(input);
    let scanners = input.map(scanner=>new Scanner(scanner));

}

function part2(input) {

}

try {
    // let path = "input";
    let path = "test";
    let input = await parse(path);
    part1(input);
    part2(input);
}
catch (e) {
    if (e instanceof AOCTools.SolutionFound) {}
    else throw e;
}