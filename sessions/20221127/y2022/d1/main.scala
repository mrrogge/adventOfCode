import scala.io.Source

@main def main = {
    val v1 = Source.fromFile("input").getLines().toList

    def process(acc:List[List[String]], x:List[String]):List[List[String]] = {
        x match {
            case "" :: xs => process(List.empty :: acc, xs)
            case x :: xs => {
                acc match {
                    case accHead :: accTail => process((x :: accHead) :: accTail, xs)
                    case Nil => process((x :: List.empty) :: List.empty, xs)
                }
            }
            case Nil => acc
        }
    }

    val v2 = process(List.empty, v1)

    val v3 = v2.map(a => a.map(a => a.toInt).fold(0)((a,b)=>a+b)).max

    println("PART 1")
    println(v3)

    println("PART 2")

    val v4 = v2.map(_.map(_.toInt).sum).sorted.reverse.take(3).sum
    println(v4)

}