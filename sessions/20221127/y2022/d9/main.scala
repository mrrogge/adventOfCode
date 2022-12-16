import scala.io.Source

@main def main = {
    val moves = Source.fromFile("input").getLines().map(_.split(" "))
    .map(_.toList match {
        case x1 :: x2 :: Nil => (x1, x2.toInt)
        case _ => throw new Exception
    }).toList

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
        nodes: Vector[(Int, Int)]
    )

    val initState2 = State2(Set((0,0)), Vector.fill(10)((0,0)))

    def step2(state:State2, dir:String):State2 = {
        var visited = state.visited
        var nodes = state.nodes
        val prevHead = nodes(0)
        val newHead = dir match {
            case "L" => (prevHead._1-1, prevHead._2)
            case "R" => (prevHead._1+1, prevHead._2)
            case "U" => (prevHead._1, prevHead._2-1)
            case "D" => (prevHead._1, prevHead._2+1)
        }
        nodes = nodes.updated(0, newHead)
        for i <- 1 to 9 do {
            // println(s"$i, ${nodes(i)}, ${nodes(i-1)}")
            nodes = nodes.updated(i, follow(nodes(i), nodes(i-1)))
        }
        visited = visited + nodes(9)
        State2(visited, nodes)
    }

    def follow(orig:(Int, Int), newTarget:(Int, Int)):(Int, Int) = {
        val diff = (newTarget._1-orig._1, newTarget._2-orig._2)
        val absDiff = (Math.abs(diff._1), Math.abs(diff._2))
        if absDiff._1 > 2 | absDiff._2 > 2 then {
            throw new Exception(s"moved too far, ${orig}, ${newTarget}")
        }
        else if absDiff._1 == 2 & absDiff._2 == 2 then {
            (orig._1+diff._1-Math.signum(diff._1).toInt, orig._2+diff._2-Math.signum(diff._2).toInt)
        }
        else if absDiff._1 == 1 & absDiff._2 == 2 then {
            (orig._1+diff._1, orig._2+diff._2-Math.signum(diff._2).toInt)
        }
        else if absDiff._1 ==2 & absDiff._2 == 1 then {
            (orig._1+diff._1-Math.signum(diff._1).toInt, orig._2+diff._2)
        }
        else if absDiff._1 == 0 & absDiff._2 == 2 then {
            (orig._1, orig._2+diff._2-Math.signum(diff._2).toInt)
        }
        else if absDiff._1 == 2 & absDiff._2 == 0 then {
            (orig._1+diff._1-Math.signum(diff._1).toInt, orig._2)
        }
        else orig
    }

    val v3 = moves.foldLeft(initState2)((state, move) => {
        (0 until move._2).foldLeft(state)((state, _) => step2(state, move._1))
    })

    val v4 = v3.visited.count(_ => true)

    println(v4)

    // var v5 = initState2
    // var move = moves.head
    // var moveRem = moves.tail

    // for i <- 0 until 8 do {
    //     for j <- 0 until move._2 do {
    //         v5 = step2(v5, move._1)
    //         println(v5)
    //     }
    //     move = moveRem.head
    //     moveRem = moveRem.tail
    // }
}