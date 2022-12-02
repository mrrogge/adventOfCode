import scala.io.Source

@main def main = {
    val input = "1113122113".toList
    .map(_.asDigit)

    type State = (Int, List[Int])

    def process(acc:State, rem:List[Int]):State = {
        rem match {
            case x1 :: x2 :: xs => {
                if x1 == x2 then {
                    process((acc._1+1, acc._2), x2 :: xs)
                }
                else {
                    process((1, x1 :: acc._1 :: acc._2), x2 :: xs)
                }
            }
            case x1 :: xs => {
                process((1, x1 :: acc._1 :: acc._2), xs)
            }
            case _ => (acc._1, acc._2.reverse)
        }
    }

    var result = input

    for i <- (1 to 40).toList do {
        result = process((1, List.empty), result)._2
        println(s"$i: ${result.length}")
    }

    var result2 = input

    for i <- (1 to 50).toList do {
        result2 = process((1, List.empty), result2)._2
        println(s"$i: ${result2.length}")
    }


}