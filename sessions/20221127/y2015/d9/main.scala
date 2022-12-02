import scala.io.Source

@main def main = {
    val lines = Source.fromFile("input").getLines().toList

    def lineToDist(line:String):(Set[String], Int) = {
        line.split(" ").toList match {
            case one :: "to" :: two :: "=" :: dist :: _ => {
                (Set(one, two), dist.toInt)
            }
            case _ => throw new Exception
        }
    }

    val dists = lines.map(lineToDist).toMap

    def gatherLocations(dists:Map[Set[String], Int]):Set[String] = {
        dists.foldLeft(Set.empty)((acc,next) => {
            acc ++ next._1
        })
    }

    val locations = gatherLocations(dists)

    def pathToPairs(acc:List[(String, String)], next:List[String]):List[(String, String)] = {
        next match {
            case one :: two :: xs => {
                pathToPairs((one, two) :: acc, two :: xs)
            }
            case _ => acc
        }
    }

    def gatherPaths(acc:Int, rem:List[String]):Int = {
        rem match {
            case one :: two :: xs => {
                gatherPaths(acc + dists.apply(Set(one, two)), two :: xs)
            }
            case _ => acc
        }
    }

    val paths = locations.toList.permutations.toList
    .map(locList => {
        gatherPaths(0, locList)
    })

    println(paths.min)
    println(paths.max)

    
}