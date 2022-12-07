import scala.io.Source

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
            fs._2(path).foldLeft(0)((size, x) => size + getDirSize(fs, x))
        }
    }

    fs = (fs._1, fs._2, fs._3.map((k,_) => (k, getDirSize(fs, k))), fs._4, fs._5)

    def getSumOfSmallDirs(fs:FS, acc:Int, path:String):Int = {
        println(path)
        acc 
        + (if fs._3(path) <= 100000 then {
            fs._3(path)
            + (if fs._2.contains(path) then {
                fs._2(path).map(path => getSumOfSmallDirs(fs, 0, path)).sum
            }
            else 0)
        }
        else 0)
    }

    println(fs._3)
    println(getSumOfSmallDirs(fs, 0, "/"))
}