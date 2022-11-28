module Aoc.Y2015.D4 (
solve1, solve2
)
where

import Aoc.Utils
import Data.List
import Crypto.Hash

md5 :: String -> String
md5 s = s

solve1 :: String -> String
solve1 s = do 
    let digest = Crypto.Hash.
    show $ map (hashlazy :: Digest MD5 . \a -> s ++ show a) [0..1]

solve2 :: String -> String
solve2 s = s