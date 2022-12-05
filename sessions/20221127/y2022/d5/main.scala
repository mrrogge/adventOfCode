import scala.io.Source
import scala.collection.mutable.ArrayBuffer

def stackLineToBlocks(acc:List[Option[Char]], rem:List[Char]):List[Option[Char]] = {
    rem match {
        case '[' :: x :: ']' :: xs => stackLineToBlocks(Some(x) :: acc, xs)
        case ' ' :: ' ' :: ' ' :: ' ' :: xs => stackLineToBlocks(None :: acc, xs)
        case ' ' :: xs => stackLineToBlocks(acc, xs)
        case x :: xs => stackLineToBlocks(acc, xs)
        case Nil => acc.reverse
    }
}

@main def main = {
    val lines = Source.fromFile("input").getLines().toList
    val stackLines = lines.takeWhile(_ != "")
    val moveLines = lines.dropWhile(_ != "").tail

    val NUM_STACKS = 9

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

    val moveInstrs = moveLines.map(_.split(" ").toList)
    .map(_ match {
        case "move" :: x1 :: "from" :: x2 :: "to" :: x3 :: xs => (x1.toInt, x2.toInt-1, x3.toInt-1)
        case _ => throw new Exception
    })

    def updateStacks(qty:Int, source:Int, dest:Int) = {
        stacks(dest) = stacks(source).take(qty).reverse ++ stacks(dest)
        stacks(source) = stacks(source).drop(qty)
    }

    moveInstrs.foreach((qty, source, dest) => {
        updateStacks(qty, source, dest)
        ()
    })

    println(stacks.map(x => x.head))

}