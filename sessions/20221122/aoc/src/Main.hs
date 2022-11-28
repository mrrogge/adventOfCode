import System.IO
import System.Environment
import qualified Aoc.Y2015.D1
import qualified Aoc.Y2015.D2
import qualified Aoc.Y2015.D3

selectPuzzle :: [String] -> Maybe (String -> String, String)
selectPuzzle ["2015","1","1"] = Just (Aoc.Y2015.D1.solve1, "inputs/2015/day1/input")
selectPuzzle ["2015","1","2"] = Just (Aoc.Y2015.D1.solve2, "inputs/2015/day1/input")
selectPuzzle ["2015","2","1"] = Just (Aoc.Y2015.D2.solve1, "inputs/2015/day2/input")
selectPuzzle ["2015","2","2"] = Just (Aoc.Y2015.D2.solve2, "inputs/2015/day2/input")
selectPuzzle ["2015","3","1"] = Just (Aoc.Y2015.D3.solve1, "inputs/2015/day3/input")
selectPuzzle ["2015","3","2"] = Just (Aoc.Y2015.D3.solve2, "inputs/2015/day3/input")
selectPuzzle [y, d, p] = Nothing
selectPuzzle [] = Nothing
selectPuzzle [x:xs] = Nothing


handleArgs :: Maybe (String -> String, String) -> IO ()
handleArgs Nothing = print "Invalid arguments. Usage: year day part"
handleArgs (Just (solver, path)) = do
    handle <- openFile path ReadMode  
    contents <- hGetContents handle
    print $ solver contents
    hClose handle

main = do
    args <- getArgs 
    handleArgs $ selectPuzzle args