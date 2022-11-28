import scala.io.Source

def neededArea(l:Int, w:Int, h:Int):Int = 2*l*w + 2*l*h + 2*w*h + List(l*w, l*h, w*h).min

val f1 = (a:String) => a.split("x").toList

val f2 = f1 andThen (_ map(a => a.toInt))

val f3 = f2 andThen (_ match
    case l :: w :: h :: _ => Some(l,w,h)
    case _ => None
)

def f4(a:List[Option[(Int,Int,Int)]]):List[Int] =
    a.map(_ match
        case Some((l,w,h)) => neededArea(l,w,h)
        case None => 0
    )

@main def main() = 
    val input = Source.fromFile("input").getLines().toList
    val input2 = input.map(f3)
    val input3 = f4(input2).sum
    print(input3)
