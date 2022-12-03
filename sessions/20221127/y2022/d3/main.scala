import scala.io.Source

@main def main = {
    val lines = Source.fromFile("input").getLines().toList

    val v1 = lines.map(line => (line.substring(0, line.length()/2), line.substring(line.length()/2)))
    .map(x => (x._1.toList, x._2.toList))
    .map(x => {
        var result:Int = 0
        for c <- x._1 do {
            if x._2.contains(c) then {
                result = c match {
                    case c if 'a' to 'z' contains c => c.toInt - 96
                    case c if 'A' to 'Z' contains c => c.toInt - 38
                }
            }
        }
        result
    })
    println(v1.sum)

    val v2 = lines.grouped(3).toList
    .map(x => x match {
        case x1 :: x2 :: x3 :: xs => {
            var result:Int = 0
            for c <- x1 do {
                if x2.contains(c) & x3.contains(c) then {
                    result = c match {
                        case c if 'a' to 'z' contains c => c.toInt - 96
                        case c if 'A' to 'Z' contains c => c.toInt - 38
                    }
                }
            }
            result
        }
        case _ => throw new Exception
    })

    println(v2.sum)
}