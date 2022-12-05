import scala.io.Source
import scala.collection.mutable.ArrayBuffer

def stackLineToBlocks(acc:List[Option[Char]], rem:List[Char]):List[Option[Char]] = {
    rem match {
        case ' ' :: ' ' :: ' ' :: xs => stackLineToBlocks(None :: acc, xs)
        case '[' :: x :: ']' :: xs => stackLineToBlocks(Some(x) :: acc, xs)
        case ' ' :: xs => stackLineToBlocks(acc, xs)
        case x :: xs => stackLineToBlocks(acc, xs)
        case Nil => acc.reverse
    }
}

@main def main = {
    val lines = Source.fromFile("test").getLines().toList
    val stackLines = lines.takeWhile(_ != "")
    val moveLines = lines.dropWhile(_ != "")

    val NUM_STACKS = 3

    val blockRows = stackLines.map(_.toList).map(x => stackLineToBlocks(List.empty, x))
    .map(_.toVector)

    var stacks = new ArrayBuffer[List[Char]](NUM_STACKS)
    for i <- (0 until NUM_STACKS) do {
        stacks += List.empty
    }

    for blockRow <- blockRows.reverse do {
        for i <- (0 until blockRow.length) do {
            blockRow(i) match {
                case Some(c) => stacks(i) = c :: stacks(i)
                case None => {}
            }
        }
    }
    println(stacks)

}