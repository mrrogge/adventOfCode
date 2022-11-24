import System.IO
import Data.Char (toUpper)

myTraverse acc '(' = acc + 1
myTraverse acc ')' = acc - 1
myTraverse acc c = acc

main = do 
    handle <- openFile "inputs/2015/day1/input" ReadMode  
    contents <- hGetContents handle
    print $ foldl myTraverse 0 contents
    hClose handle