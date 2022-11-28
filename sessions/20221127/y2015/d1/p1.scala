import scala.io.Source

@main def main() =
    println(
        Source.fromFile("input").getLines().next().toCharArray()
        .foldLeft(0)((a, b) => b match 
            case '(' => a+1
            case ')' => a-1
            case _ => a
        )
    )