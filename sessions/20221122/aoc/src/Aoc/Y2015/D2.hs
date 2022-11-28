module Aoc.Y2015.D2 (
solve1, solve2
)
where

import Aoc.Utils

neededArea l w h = 2*l*w + 2*l*h + 2*w*h + minimum [l*w, l*h, w*h]

neededAreaFromTuple (l,w,h) = neededArea l w h

listOfCharsToListOfNums :: (Num a, Read a) => [String] -> [a]
listOfCharsToListOfNums = map read

listToTuple l = (head l, l !! 1, l !! 2)

solve1 = show . sum . map (neededAreaFromTuple . listToTuple . listOfCharsToListOfNums . strSplit 'x') . strSplit '\n'

neededRibbon (l,w,h) = minimum [2*l+2*w, 2*l+2*h, 2*w+2*h] + l*w*h

solve2 = show . sum . map (neededRibbon . listToTuple . listOfCharsToListOfNums . strSplit 'x') . strSplit '\n'