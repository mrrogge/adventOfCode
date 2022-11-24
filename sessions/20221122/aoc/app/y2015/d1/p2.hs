import System.IO
import Data.Char (toUpper)

myTraverse acc '(' = acc + 1
myTraverse acc ')' = acc - 1
myTraverse acc c = acc

firstBasement acc (head:levels)
    | head < 0 = acc
    | head >= 0 = firstBasement (acc + 1) levels

main = do 
    handle <- openFile "inputs/2015/day1/input" ReadMode  
    contents <- hGetContents handle
    print $ firstBasement 0 $ scanl myTraverse 0 contents
    hClose handle