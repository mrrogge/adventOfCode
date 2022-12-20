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

val initState = State(0, 1, 0)

@main def main = {
    val source = Source.fromFile("test").getLines().map(_.split(" ").toList)
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
                acc = acc + (if cycle == 20 | cycle-20 % 40 == 0 then cycle*x else 0)
            }
            case Inst.Addx(addx) => {
                cycle = cycle+1
                acc = acc + (if cycle == 20 | cycle-20 % 40 == 0 then cycle*x else 0)
                cycle = cycle+1
                x = x + addx
                acc = acc + (if cycle == 20 | cycle-20 % 40 == 0 then cycle*x else 0)
            } 
        }
        val newState = State(cycle, x, acc)
        println(newState)
        newState
    })

    println(v1.acc)
}