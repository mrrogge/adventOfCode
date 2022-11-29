import scala.io.Source
import scala.util.Success

@main def main = {
    val v1 = Source.fromFile("input").getLines().next()
    val v2 = v1.split(",").toList.map(a => a.trim()).map(_.toList)
        .map(_ match {
            case a :: b => (a, b.mkString.toInt)
            case _ => throw new Exception
        })

    def advance(x:Int, y:Int, dir:Char, turn:Char, dist:Int):(Int,Int,Char) = 
        dir match
            case 'N' => turn match {
                case 'L' => (x-dist,y,'W')
                case 'R' => (x+dist,y,'E')
                case _ => (x,y,'N')
            }
            case 'S' => turn match {
                case 'L' => (x+dist,y,'E')
                case 'R' => (x-dist,y,'W')
                case _ => (x,y,'S')
            }
            case 'W' => turn match {
                case 'L' => (x,y+dist,'S')
                case 'R' => (x,y-dist,'N')
                case _=> (x,y,'W')
            }
            case 'E' => turn match {
                case 'L' => (x,y-dist,'N')
                case 'R' => (x,y+dist,'S')
                case _ => (x,y,'E')
            }
            case _ => throw new Exception

    val v3 = v2.foldLeft((0,0,'N'))((a,b) => advance(a._1, a._2, a._3, b._1, b._2))

    val part1Solution = Math.abs(v3._1) + Math.abs(v3._2)

    println(part1Solution)

    type State = (Houses, Int, Int, Char, Boolean)

    type Houses = List[(Int,Int)]

    val initState = (List((0,0)), 0, 0, 'N', false)

    def insertHouse(state:State, x:Int, y:Int):State = {
        val (houses, cx, cy, dir, done) = state
        if done then
            state
        else if houses.contains(x,y) then
            (houses, x, y, dir, true)
        else 
            ((x,y) :: houses, x, y, dir, false)
    }

    def rotate(state:State, turnDir:Char):State = {
        val (houses, x, y, dir, done) = state
        if done then state else 
            val newDir = (dir, turnDir) match
                case ('N', 'L') => 'W'
                case ('N', 'R') => 'E'
                case ('N', 'F') => 'N'
                case ('S', 'L') => 'E'
                case ('S', 'R') => 'W'
                case ('S', 'F') => 'S'
                case ('W', 'L') => 'S'
                case ('W', 'R') => 'N'
                case ('W', 'F') => 'W'
                case ('E', 'L') => 'N'
                case ('E', 'R') => 'S'
                case ('E', 'F') => 'E'
                case _ => throw new Exception 
            (houses, x, y, newDir, done)
    }

    def step(state:State, turn:Char, dist:Int):State = {
        val (houses,x,y,dir,done) = state
        if done then state
        else 
            (dir, turn) match
                case ('N', 'L') => insertHouse(rotate(state, turn), x-dist, y)
                case ('N', 'R') => insertHouse(rotate(state, turn), x+dist, y)
                case ('N', 'F') => insertHouse(rotate(state, turn), x, y-dist)
                case ('S', 'L') => insertHouse(rotate(state, turn), x+dist, y)
                case ('S', 'R') => insertHouse(rotate(state, turn), x-dist, y)
                case ('S', 'F') => insertHouse(rotate(state, turn), x, y+dist)
                case ('W', 'L') => insertHouse(rotate(state, turn), x, y+dist)
                case ('W', 'R') => insertHouse(rotate(state, turn), x, y-dist)
                case ('W', 'F') => insertHouse(rotate(state, turn), x-dist, y)
                case ('E', 'L') => insertHouse(rotate(state, turn), x, y-dist)
                case ('E', 'R') => insertHouse(rotate(state, turn), x, y+dist)
                case ('E', 'F') => insertHouse(rotate(state, turn), x+dist, y)
                case _ => throw new Exception 
    }

    val v4 = v2.foldLeft(initState)((state,item) => {
        val (turn, dist) = item
        if dist == 1 then 
            step(state, turn, dist)
        else
            (2 to dist).toList.foldLeft(step(state, turn, 1))((state, _) => step(state, 'F', 1))
        
    })

    println(v4)
    println(Math.abs(v4._2) + Math.abs(v4._3))

}