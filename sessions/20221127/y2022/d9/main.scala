import scala.io.Source

@main def main = {
    val moves = Source.fromFile("input").getLines().map(_.split(" "))
    .map(_.toList match {
        case x1 :: x2 :: Nil => (x1, x2.toInt)
        case _ => throw new Exception
    })

    case class State (
        cells: Map[Int, Map[Int, Boolean]],
        head: (Int, Int),
        tail: (Int, Int)
    )

    val initState = State(
        Map(0 -> Map(0 -> true)),
        (0,0),
        (0,0)
    )

    def step(state:State, dir:String):State = {
        val prevHead = state.head
        val newHead = dir match {
            case "L" => (prevHead._1-1, prevHead._2)
            case "R" => (prevHead._1+1, prevHead._2)
            case "U" => (prevHead._1, prevHead._2-1)
            case "D" => (prevHead._1, prevHead._2+1)
        }
        val diff = (Math.abs(newHead._1-state.tail._1), Math.abs(newHead._2-state.tail._2))
        val newTail = if diff._1 > 1 | diff._2 > 1 then prevHead else state.tail
        val newCells1 = state.cells + (newHead._2 -> state.cells.applyOrElse(newHead._2, (_ => Map.empty)))
        val newCells2 = newCells1 + (newHead._2 -> (newCells1(newHead._2) + (newHead._1 -> newCells1(newHead._2).applyOrElse(newHead._1, (_ => false)))))
        val newCells3 = newCells2 + (newTail._2 -> (newCells2(newTail._2) + (newTail._1 -> true)))
        State(newCells3, newHead, newTail)
    }

    val v1 = moves.foldLeft(initState)((state, move) => {
        (0 until move._2).foldLeft(state)((state, _) => step(state, move._1))
    })

    val v2 = v1.cells.map((y, row) => row.count((x, visited) => visited)).sum

    println(v2)
}