import scala.io.Source
import scala.annotation.tailrec

// parents, children, sizes, currentPath, lastCmd
type FS = (Map[String, String], Map[String, Set[String]], Map[String, Int], String, String)


@main def main = {
    val moves = Source.fromFile("test").getLines().toList
    .map(_.split(" ").toList)

    var fs:FS = (Map("/" -> "#"), Map("/" -> Set.empty), Map("/" -> 0), "/", "")

    fs = moves.foldLeft(fs)((fs, move) => {
        move match {
            case "$" :: "cd" :: path :: Nil => {
                (fs._1, fs._2, fs._3, path, "cd")
            }
            case "$" :: "ls" :: Nil => {
                (fs._1, fs._2, fs._3, fs._4, "ls")
            }
            case x1 :: x2 :: Nil if fs._5 == "ls" => {
                if x1 == "dir" then {
                    (fs._1+(x2 -> fs._4), fs._2+(fs._4 -> (fs._2.applyOrElse(fs._4, _ => Set.empty)+x2)), fs._3+(x2 -> 0), fs._4, fs._5)
                }
                else {
                    (fs._1+(x2 -> fs._4), fs._2+(fs._4 -> (fs._2.applyOrElse(fs._4, _ => Set.empty)+x2)), fs._3+(x2 -> x1.toInt), fs._4, fs._5)
                }
            }
            case _ => throw new Exception
        }
    })

    def getDirSize(fs:FS, path:String):Int = {
        if !fs._2.contains(path) then {
            fs._3(path)
        }
        else {
            fs._2(path).toList.map(x => getDirSize(fs, x)).sum
        }
    }

    fs = (fs._1, fs._2, fs._3.map((k,_) => (k, getDirSize(fs, k))), fs._4, fs._5)

    val v1 = fs._2.map((k,_)=>fs._3(k)).filter(_<=100000).sum
    println(v1)
}