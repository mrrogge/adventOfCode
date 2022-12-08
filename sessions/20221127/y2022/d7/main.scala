import scala.io.Source

// sizes, currentPath, lastCmd
type FS = (Map[String, (String, Int)], String, String)

@main def main = {
    val moves = Source.fromFile("input").getLines().toList
    .map(_.split(" ").toList).drop(1)

    var fs:FS = (Map("/" -> ("dir", 0)), "/", "cd")

    fs = moves.foldLeft(fs)((fs, move) => {
        move match {
            case "$" :: "cd" :: ".." :: Nil => {
                (fs._1, fs._2.split("/").toList.dropRight(1).mkString("/")+"/", "cd")
            }
            case "$" :: "cd" :: path :: Nil => {
                (fs._1, s"${fs._2}${path}/", "cd")
            }
            case "$" :: "ls" :: Nil => {
                (fs._1, fs._2, "ls")
            }
            case x1 :: x2 :: Nil if fs._3 == "ls" => {
                if x1 == "dir" then {
                    (fs._1+(s"${fs._2}${x2}/" -> ("dir", 0)), fs._2, fs._3)
                }
                else {
                    val filePath = s"${fs._2}${x2}"
                    val parentSections = fs._2.split("/").toList
                    val parentList = parentSections.foldLeft((List[String](), parentSections))((acc, _) => {
                        val parentPath = acc._2.mkString("/")+"/"
                        (parentPath :: acc._1, acc._2.dropRight(1))
                    })._1
                    val sizes = (fs._1+(filePath -> ("file", x1.toInt)))
                        .map((path,spec) => {
                            (path, (spec._1, if parentList.contains(path) then spec._2+x1.toInt else spec._2))
                        })
                    (sizes, fs._2, fs._3)
                    

                    // (fs._1+(x2 -> fs._4), fs._2+(fs._4 -> (fs._2.applyOrElse(fs._4, _ => Set.empty)+x2)), fs._3+(x2 -> x1.toInt), fs._4, fs._5)
                }
            }
            case _ => throw new Exception
        }
    })
    println(fs._1)
    println(fs._1.values.filter(x => x._1 == "dir").map(_._2).filter(_<=100000).sum)

}