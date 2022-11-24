import System.IO

strSplit :: Char -> String -> [String]
strSplit c = foldl (splitLinesInternal c) []

splitLinesInternal :: Char -> [String] -> Char -> [String]
splitLinesInternal delim [] c  
    | c == delim = [""]
    | c /= delim = [[c]]
splitLinesInternal delim acc c 
    | c == delim = acc ++ [""]
    | c /= delim = init acc ++ [last acc ++ [c]]

neededRibbon (l,w,h) = minimum [2*l+2*w, 2*l+2*h, 2*w+2*h] + l*w*h

listOfCharsToListOfNums :: (Num a, Read a) => [String] -> [a]
listOfCharsToListOfNums = map read

listToTuple l = (head l, l !! 1, l !! 2)

solve = sum . map (neededRibbon . listToTuple . listOfCharsToListOfNums . strSplit 'x') . strSplit '\n'
main = do 
    handle <- openFile "inputs/2015/day2/input" ReadMode  
    contents <- hGetContents handle
    print $ solve contents
    hClose handle