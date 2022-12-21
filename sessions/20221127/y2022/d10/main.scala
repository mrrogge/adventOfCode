import scala.io.Source
import scala.compiletime.ops.boolean

enum Inst {
    case Nop
    case Addx(x:Int)
}

case class State (
    cycle:Int,
    x:Int,
    acc:Int
)

val initState = State(1, 1, 0)

case class State2 (
    cycle:Int,
    x:Int,
    pixels:Vector[Vector[Char]]
)

val initState2 = State2(0, 1, Vector.fill(6)(Vector.fill(40)('.')))

@main def main = {
    val source = Source.fromFile("input").getLines().map(_.split(" ").toList)
        .map(_ match {
            case x :: Nil => Inst.Nop
            case x1 :: x2 :: Nil => Inst.Addx(x2.toInt)
            case _ => throw new Exception
        })
        .toList

    val v1 = source.foldLeft(initState)((state, inst) => {
        var cycle = state.cycle
        var x = state.x
        var acc = state.acc
        inst match {
            case Inst.Nop => {
                cycle = cycle+1
                acc = acc + (if cycle == 20 | (cycle-20) % 40 == 0 then cycle*x else 0)
            }
            case Inst.Addx(addx) => {
                cycle = cycle+1
                acc = acc + (if cycle == 20 | (cycle-20) % 40 == 0 then cycle*x else 0)
                cycle = cycle+1
                x = x + addx
                acc = acc + (if cycle == 20 | (cycle-20) % 40 == 0 then cycle*x else 0)
            } 
        }
        val newState = State(cycle, x, acc)
        println(newState)
        newState
    })

    println(v1.acc)

    val v2 = source.foldLeft(initState2)((state, inst) => {
        var cycle = state.cycle
        var x = state.x
        var pixels = state.pixels
        inst match {
            case Inst.Nop => {
                val row = cycle / 40
                val col = cycle % 40
                if x-1 == col | x == col | x+1 == col then {
                    pixels = pixels.updated(row, pixels(row).updated(col, '#'))
                }
                cycle = cycle+1
            }
            case Inst.Addx(addx) => {
                var row = cycle / 40
                var col = cycle % 40
                if x-1 == col | x == col | x+1 == col then {
                    pixels = pixels.updated(row, pixels(row).updated(col, '#'))
                }
                cycle = cycle+1
                row = cycle / 40
                col = cycle % 40
                if x-1 == col | x == col | x+1 == col then {
                    pixels = pixels.updated(row, pixels(row).updated(col, '#'))
                }
                cycle = cycle+1
                x = x + addx
            }
        }
        val newState = State2(cycle, x, pixels)
        newState
    })

    v2.pixels.foreach(row => {
        row.foreach(col => print(col))
        println("")
    })
}