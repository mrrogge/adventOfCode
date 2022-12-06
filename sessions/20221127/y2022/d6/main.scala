import scala.io.Source

@main def main = {
    val v1 = Source.fromFile("input").mkString.toList
 
    def f(acc:Int, qty:Int, rem:List[Char]):Int = {
        if rem.take(qty).distinct.length == qty then acc
        else f(acc+1, qty, rem.drop(1))
    }

    println(f(4, 4, v1))
    println(f(14, 14, v1))
}