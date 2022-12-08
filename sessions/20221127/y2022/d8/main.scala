import scala.io.Source

@main def main = {
    val trees = Source.fromFile("test").getLines().toArray
    .map(_.toArray.map(_.asDigit))

    def visible(x:Int, y:Int):Boolean = {
        trees(y).slice(0, x).foldLeft(true)((acc, t) => {
            acc & (t < trees(y)(x))
        })
        | trees(y).drop(x+1).foldLeft(true)((acc,t) => {
            acc & (t < trees(y)(x))
        })
        | trees.slice(0, y).map(_(x)).foldLeft(true)((acc,t)=>{
            acc & (t < trees(y)(x))
        })
        | trees.drop(y+1).map(_(x)).foldLeft(true)((acc,t)=>{
            acc & (t < trees(y)(x))
        })
    }


    var count = 0
    for y <- 0 to trees.length-1 do {
        for x <- 0 to trees(y).length-1 do {
            if visible(x, y) then count+=1;
        }
    }

    println(count)

    def score(x:Int, y:Int):Int = {
        //left
        trees(y).slice(0, x).reverse.foldLeft((0, true))((acc, t)=>{
            if acc._2 then {
                (acc._1+1, t < trees(y)(x))
            }
            else acc
        })._1
        * trees(y).drop(x+1).foldLeft((0, true))((acc, t)=>{
            if acc._2 then {
                (acc._1+1, t < trees(y)(x))
            }
            else acc
        })._1
        * trees.slice(0, y).map(_(x)).reverse.foldLeft((0, true))((acc, t)=>{
            if acc._2 then {
                (acc._1+1, t < trees(y)(x))
            }
            else acc
        })._1
        * trees.drop(y+1).map(_(x)).foldLeft((0, true))((acc, t)=>{
            if acc._2 then {
                (acc._1+1, t < trees(y)(x))
            }
            else acc
        })._1
    }

    var scores:List[Int] = List.empty
    for y <- 0 to trees.length-1 do {
        for x <- 0 to trees(y).length-1 do {
            scores = score(x, y) :: scores
        }
    }
    println(scores.max)
}