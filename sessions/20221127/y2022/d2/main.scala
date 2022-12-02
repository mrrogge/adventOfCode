import scala.io.Source

@main def main = {
    val rounds = Source.fromFile("input").getLines().toList
    .map(_.split(" ").toList)
    .map(_ match {
        case a :: b :: xs => (a,b) 
        case _ => throw new Exception
    })

    val scores = rounds.map(x => (x match {
        case (_, "X") => 1
        case (_, "Y") => 2
        case (_, "Z") => 3
        case _ => 0
    })
    + (x match {
        case ("A", "X") => 3
        case ("A", "Y") => 6
        case ("A", "Z") => 0
        case ("B", "X") => 0
        case ("B", "Y") => 3
        case ("B", "Z") => 6
        case ("C", "X") => 6
        case ("C", "Y") => 0
        case ("C", "Z") => 3
    }))

    // println(scores)
    println(scores.foldLeft(0)(_+_))

    val scores2 = rounds.map(x => x match {
        case ("A", "X") => 3 + 0
        case ("A", "Y") => 1 + 3
        case ("A", "Z") => 2 + 6
        case ("B", "X") => 1 + 0
        case ("B", "Y") => 2 + 3
        case ("B", "Z") => 3 + 6
        case ("C", "X") => 2 + 0
        case ("C", "Y") => 3 + 3
        case ("C", "Z") => 1 + 6
    })

    println(scores2)
    println(scores2.foldLeft(0)(_+_))
}