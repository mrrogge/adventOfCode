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

    println(lengths1.zip(lengths2).map(x => x._1-x._2).fold(0)((a,b)=>a+b))

    def shortToLongString(short:List[Char]):List[Char] = {
        ("\"" ++ shortToLongStringInner(List.empty, short) ++ "\"").toList
    }

    def shortToLongStringInner(acc:List[Char], line:List[Char]):List[Char] = {
        line match {
            case '"' :: xs => shortToLongStringInner(acc ++ "\\\"".toList, xs)
            case '\\' :: xs => shortToLongStringInner(acc ++ "\\\\".toList, xs)
            case x :: xs => shortToLongStringInner(acc :+ x, xs)
            case Nil => acc
        }
    }

    val v2 = v1.map(_.toList).map(shortToLongString).map(_.length)
    val v3 = v2.zip(lengths1)
    .map(x => x._1-x._2)
    .fold(0)(_+_)
    println(v3)
}