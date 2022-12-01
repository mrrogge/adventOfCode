import scala.io.Source

@main def main = {
    val v1 = Source.fromFile("input").getLines().toList
    val lengths1 = v1.map(x => x.length())
    def evalLine(acc:Int, line:List[Char]):Int = {
        line match {
            case '\\' :: '\\' :: xs => evalLine(acc+1, xs)
            case '\\' :: '"' :: xs => evalLine(acc+1, xs)
            case '\\' :: 'x' :: x :: y :: xs => evalLine(acc+1, xs)
            case '"' :: xs => evalLine(acc, xs)
            case x :: xs => evalLine(acc+1, xs)
            case Nil => acc
        }
    }
    val lengths2 = v1.map(x => evalLine(0, x.toList))
    println(lengths1)
    println(lengths2)
    println(lengths1.zip(lengths2).map(x => x._1-x._2).fold(0)((a,b)=>a+b))
}