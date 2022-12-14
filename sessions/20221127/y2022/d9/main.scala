import scala.io.Source

@main def main = {
    val moves = Source.fromFile("test2").getLines().map(_.split(" "))
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

    case class State2 (
        visited: Set[(Int, Int)],
        nodes: Vector[(Int, Int)],
        prevNodes: Vector[(Int, Int)]
    )

    val initState2 = State2(Set((0,0)), Vector.fill(9)((0,0)), Vector.fill(9)((0,0)))

    def step2(state:State2, dir:String):State2 = {
        var prevNodes = state.prevNodes.updated(0, state.nodes(0))
        var visited = state.visited
        val prevHead = prevNodes(0)
        val newHead = dir match {
            case "L" => (prevHead._1-1, prevHead._2)
            case "R" => (prevHead._1+1, prevHead._2)
            case "U" => (prevHead._1, prevHead._2-1)
            case "D" => (prevHead._1, prevHead._2+1)
        }
        var nodes = state.nodes.updated(0, newHead)
        (1 to 8).foreach(i => {
            prevNodes = prevNodes.updated(i, nodes(i))
            nodes.updated(i, follow(nodes(i), prevNodes(i-1), nodes(i-1)))
        })
        visited = visited + nodes(8)
        State2(state.visited, nodes, prevNodes)
    }

    def follow(orig:(Int, Int), prevTarget:(Int, Int), newTarget:(Int, Int)):(Int, Int) = {
        val diff = (Math.abs(newTarget._1-orig._1), Math.abs(newTarget._2-orig._2))
        if diff._1 > 1 | diff._2 > 1 then prevTarget else orig
    }

    val v3 = moves.foldLeft(initState2)((state, move) => {
        (0 until move._2).foldLeft(state)((state, _) => step2(state, move._1))
    })

    val v4 = v3.visited.count(_ => true)

    println(v4)

}