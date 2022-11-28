module Aoc.Y2015.D3 (
solve1, solve2
)
where

import Aoc.Utils

import qualified Data.Map as Map

type HousesMap = Map.Map Int (Map.Map Int Bool)
type State = (HousesMap, (Int, Int))

insertHouse :: HousesMap -> (Int, Int) -> HousesMap
insertHouse houses (x,y) =  Map.insertWith (\new old -> Map.insert x True old) y (Map.fromList [(x, True)]) houses

f :: State -> Char -> State
f (houses, (x, y)) '^' = (insertHouse houses (x,y-1), (x,y-1))
f (houses, (x, y)) '<' = (insertHouse houses (x-1,y), (x-1,y))
f (houses, (x, y)) '>' = (insertHouse houses (x+1,y), (x+1,y))
f (houses, (x, y)) 'v' = (insertHouse houses (x,y+1), (x,y+1))
f houseMap c = houseMap

initState :: State
initState = (Map.fromList [(0, Map.fromList [(0, True)])], (0,0))

solve1 :: String -> String
solve1 = show . foldl (\acc row -> acc + Map.size row) 0 . fst . foldl f initState

--santa | robo-santa | false=next move is santa, true=next move is robo
type State2 = (HousesMap, (Int, Int), (Int, Int), Bool)

initState2 :: State2
initState2 = (Map.fromList [(0, Map.fromList [(0, True)])], (0,0), (0,0), False)

f2 :: State2 -> Char -> State2
f2 (houses, (x, y), robo, False) dir
    | dir == '^' = (insertHouse houses (x,y-1), (x,y-1), robo, True)
    | dir == '>' = (insertHouse houses (x+1,y), (x+1,y), robo, True)
    | dir == 'v' = (insertHouse houses (x,y+1), (x,y+1), robo, True)
    | dir == '<' = (insertHouse houses (x-1,y), (x-1,y), robo, True)
f2 (houses, santa, (x,y), True) dir
    | dir == '^' = (insertHouse houses (x,y-1), santa, (x,y-1), False)
    | dir == '>' = (insertHouse houses (x+1,y), santa, (x+1,y), False)
    | dir == 'v' = (insertHouse houses (x,y+1), santa, (x,y+1), False)
    | dir == '<' = (insertHouse houses (x-1,y), santa, (x-1,y), False)

solve2 :: String -> String
solve2 = show . foldl (\acc row -> acc + Map.size row) 0 . (\(a,_,_,_)->a) . foldl f2 initState2 