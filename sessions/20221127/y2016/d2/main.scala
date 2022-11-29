import scala.io.Source

@main def main = {
    val v1 = Source.fromFile("input").getLines().toList

    val nums = (1 to 9).toBuffer

    def move(current:Int, dir:Char):Int = {
        dir match {
            case 'U' => if current-3 < 1 then current else current-3
            case 'D' => if current+3 > 9 then current else current+3
            case 'L' => if current == 1 then 1
                else if current == 4 then 4
                else if current == 7 then 7
                else current-1
            case 'R' => if current == 3 then 3
                else if current == 6 then 6
                else if current == 9 then 9
                else current+1
            case _ => throw new Exception
        }
    }

    println("PART 1")
    for line <- v1 do
        print(line.toList.foldLeft(5)((acc,dir)=>move(acc,dir)))

    println("\nPART 2")

    def move2(current:Int, dir:Char):Int = {
        dir match {
            case 'U' => current match {
                case 5|2|1|4|9 => current
                case 3|13 => current-2
                case _ => current - 4
            }
            case 'D' => current match {
                case 5|10|13|12|9 => current
                case 1|11 => current + 2
                case _ => current + 4
            }
            case 'L' => current match {
                case 1|2|5|10|13 => current
                case _ => current - 1
            }
            case 'R' => current match {
                case 1|4|9|12|13 => current
                case _ => current + 1
            }
            case _ => throw new Exception
        }
    }

    for line <- v1 do
        print(line.toList.foldLeft(5)((acc,dir)=>move2(acc,dir)))
        print('|')
}