import scala.io.Source

def firstBasement(acc:Int, levels:List[Int]):Int =
    levels match
        case head :: next if head < 0 => acc
        case head :: next => firstBasement(acc+1, next)
        case Nil => acc
    

@main def main() =
    print(
        firstBasement(0, Source.fromFile("input").getLines().next().toList
            .scanLeft(0)((a, b) => b match 
                case '(' => a+1
                case ')' => a-1
                case _ => a
            )
        )
    )