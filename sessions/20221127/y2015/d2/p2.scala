import scala.io.Source

def neededRibbon(l:Int, w:Int, h:Int):Int = List(2*l+2*w, 2*l+2*h, 2*w+2*h).min + l*w*h

val f1 = (a:String) => a.split("x").toList

val f2 = f1 andThen (_ map(a => a.toInt))

val f3 = f2 andThen (_ match
    case l :: w :: h :: _ => Some(l,w,h)
    case _ => None
)

def f4(a:List[Option[(Int,Int,Int)]]):List[Int] =
    a.map(_ match
        case Some((l,w,h)) => neededRibbon(l,w,h)
        case None => 0
    )

@main def main() = 
    val input = Source.fromFile("input").getLines().toList
    val input2 = input.map(f3)
    val input3 = f4(input2).sum
    print(input3)
