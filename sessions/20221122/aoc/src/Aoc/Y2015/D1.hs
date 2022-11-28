module Aoc.Y2015.D1 (
    solve1,
    solve2
)
where

f :: Integer -> Char -> Integer
f acc '(' = acc + 1
f acc ')' = acc - 1
f acc c = acc

solve1 :: String -> String
solve1 = show . foldl f 0

firstBasement acc (head:levels)
    | head < 0 = acc
    | head >= 0 = firstBasement (acc + 1) levels

solve2 :: String -> String
solve2 = show . firstBasement 0 . scanl f 0