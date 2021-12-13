/*
Three pirates were on an island. They had a pile of coconuts.  They
decided to divide the coconuts the next morning

During the night, one pirate woke up, divided the pile into three
equal piles, had one extra coconut which he gave to a monkey, hid his
pile, and went back to sleep.

Then the second pirate woke up, divided the remaining pile into three
equal piles, had one extra coconut which he gave to a monkey, hid his
pile, and went back to sleep.

Then the third pirate did the same thing.

In the morning, they divided the pile into three equal piles, had one
extra coconut which they gave to a monkey.

How many coconuts were in the original pile?
*/

/*
There are infinite answers to this problem without providing more information...assuming we want the minimum, the answer is 79:
* 79/3 = 26 1/3, pirate 1 takes 26, monkey gets 1, leaving 26*2=52.
* 52/3 = 17 1/3, pirate 2 takes 17, mokey gets 1, leaving 17*2=34.
* 34/3 = 11 1/3, pirate 3 takes 11, monkey gets 1, leaving 11*2=22.
* 22/3 = 7 1/3, each pirate takes 7, monkey gets 1.

Other numbers that work: 160, 241, 322, ...
*/


for (let i=0; i<100; i++) {
    //i=size of equal piles after all the pirate shenanigans
    let total = i*3 + 1;
    console.log(i, total);
    //total = (3*rem + 3 - 1)/2
    //total*2 = 3*rem + 3 - 1)
    //total = 3/2*rem + 3/2 - 1/2
    //after 3 iters, each total must be a whole number
    total = total*3/2 + 3/2 - 1/2
    console.log(i, total);
    if (total - Math.floor(total) !== 0) continue;
    total = total*3/2 + 3/2 - 1/2
    console.log(i, total);
    if (total - Math.floor(total) !== 0) continue;
    total = total*3/2 + 3/2 - 1/2
    console.log(i, total);
    if (total - Math.floor(total) !== 0) continue;
    console.log('valid', i, total);
    // break;
}