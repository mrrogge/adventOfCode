import scala.io.Source

@main def main = {
    val lines = Source.fromFile("input").getLines().toList
    val v1 = lines.map(_.split(",").toList.map(_.split("-").toList).map(_ match {
        case x1 :: x2 :: xs => (x1.toInt, x2.toInt)
        case _ => throw new Exception
    }))
    .map(_ match {
        case x1 :: x2 :: xs => (x1, x2)
        case _ => throw new Exception
    })
    .map(a => (Set.range(a._1._1, a._1._2+1), Set.range(a._2._1, a._2._2+1)))
    .map(a => a._1.subsetOf(a._2) | a._2.subsetOf(a._1))
    .count(a => a)
    println(v1)

}