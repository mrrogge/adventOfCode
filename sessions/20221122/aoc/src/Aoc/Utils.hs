module Aoc.Utils
( strSplit
) where

strSplit :: Char -> String -> [String]
strSplit c = foldl (splitLinesInternal c) []

splitLinesInternal :: Char -> [String] -> Char -> [String]
splitLinesInternal delim [] c  
    | c == delim = [""]
    | c /= delim = [[c]]
splitLinesInternal delim acc c 
    | c == delim = acc ++ [""]
    | c /= delim = init acc ++ [last acc ++ [c]]