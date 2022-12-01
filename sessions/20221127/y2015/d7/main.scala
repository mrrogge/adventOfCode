import scala.io.Source

enum SigSource {
    case Signal(x:Int)
    case Wire(id:String)
}

object SigSource {
    def fromString(s:String):SigSource = s.toIntOption match {
        case None => SigSource.Wire(s)
        case Some(signal) => SigSource.Signal(signal)
    }
}

enum SignalExpr {
    case Set(source:SigSource, dest:String)
    case And(left:SigSource, right:SigSource, dest:String)
    case Or(left:SigSource, right:SigSource, dest:String)
    case LShift(source:SigSource, by:Int, dest:String)
    case RShift(source:SigSource, by:Int, dest:String)
    case Not(source:SigSource, dest:String)
}

type Wires = scala.collection.mutable.Map[String, Int]

def processGate(wires:Wires, left:SigSource, right:SigSource, dest:String, gate:((Int, Int) => Int)):Wires = {
    (left, right) match {
        case (SigSource.Signal(left), SigSource.Signal(right)) => {
            wires + (dest -> gate(left, right))
        }
        case (SigSource.Wire(left), SigSource.Signal(right)) => {
            if wires.contains(left) then {
                wires + (dest -> gate(wires.apply(left), right))
            }
            else wires
        }
        case (SigSource.Signal(left), SigSource.Wire(right)) => {
            if wires.contains(right) then {
                wires + (dest -> gate(left, wires.apply(right)))
            }
            else wires
        }
        case (SigSource.Wire(left), SigSource.Wire(right)) => {
            if wires.contains(left) & wires.contains(right) then {
                wires + (dest -> gate(wires.apply(left), wires.apply(right)))
            }
            else wires
        }
        case _ => wires
    }
}

@main def main = {
    val v1 = Source.fromFile("input").getLines().toList
    val exprs = v1.map(_.split(" ").toList).map(list => list match {
        case source :: "->" :: dest :: _ => {
            SignalExpr.Set(SigSource.fromString(source), dest)
        }
        case "NOT" :: source :: "->" :: dest :: _ => {
            SignalExpr.Not(SigSource.fromString(source), dest)
        }
        case left :: "AND" :: right :: "->" :: dest :: _ => {
            SignalExpr.And(SigSource.fromString(left), 
                SigSource.fromString(right), dest)
        }
        case left :: "OR" :: right :: "->" :: dest :: _ => {
            SignalExpr.Or(SigSource.fromString(left), 
                SigSource.fromString(right), dest)
        }
        case source :: "LSHIFT" :: by :: "->" :: dest :: _ => {
            SignalExpr.LShift(SigSource.fromString(source), 
                by.toInt, dest)
        }
        case source :: "RSHIFT" :: by :: "->" :: dest :: _ => {
            SignalExpr.RShift(SigSource.fromString(source), 
                by.toInt, dest)
        }
        case _ => throw new Exception
    })

    var wires:Wires = scala.collection.mutable.Map()
    for _ <- (1 to 1000).toList do {
        for expr <- exprs do {
            expr match {
                case SignalExpr.Set(source, dest) => {
                    source match {
                        case SigSource.Signal(x) => wires = wires + (dest -> x)
                        case SigSource.Wire(id) => {
                            if wires.contains(id) then {
                                wires = wires + (dest -> wires.apply(id))
                            }
                        }
                    }
                }
                case SignalExpr.And(left, right, dest) => {
                    wires = processGate(wires, left, right, dest, ((a,b) => a & b))
                }
                case SignalExpr.Or(left, right, dest) => {
                    wires = processGate(wires, left, right, dest, ((a,b) => a | b))
                }
                case SignalExpr.LShift(source, by, dest) => {
                    wires = processGate(wires, source, SigSource.Signal(by), dest, ((a,b) => a << b))
                }
                case SignalExpr.RShift(source, by, dest) => {
                    wires = processGate(wires, source, SigSource.Signal(by), dest, ((a,b) => a >> b))
                }
                case SignalExpr.Not(source, dest) => {
                    source match {
                        case SigSource.Signal(x) => wires = wires + (dest -> (65535-x))
                        case SigSource.Wire(id) => {
                            if wires.contains(id) then {
                                wires = wires + (dest -> (65535 - wires.apply(id)))
                            }
                        }
                    }
                }
            }
        }
    }

    println(wires.apply("a"))

    val v2 = Source.fromFile("input2").getLines().toList
    val exprs2 = v2.map(_.split(" ").toList).map(list => list match {
        case source :: "->" :: dest :: _ => {
            SignalExpr.Set(SigSource.fromString(source), dest)
        }
        case "NOT" :: source :: "->" :: dest :: _ => {
            SignalExpr.Not(SigSource.fromString(source), dest)
        }
        case left :: "AND" :: right :: "->" :: dest :: _ => {
            SignalExpr.And(SigSource.fromString(left), 
                SigSource.fromString(right), dest)
        }
        case left :: "OR" :: right :: "->" :: dest :: _ => {
            SignalExpr.Or(SigSource.fromString(left), 
                SigSource.fromString(right), dest)
        }
        case source :: "LSHIFT" :: by :: "->" :: dest :: _ => {
            SignalExpr.LShift(SigSource.fromString(source), 
                by.toInt, dest)
        }
        case source :: "RSHIFT" :: by :: "->" :: dest :: _ => {
            SignalExpr.RShift(SigSource.fromString(source), 
                by.toInt, dest)
        }
        case _ => throw new Exception
    })

    var wires2:Wires = scala.collection.mutable.Map()
    for _ <- (1 to 1000).toList do {
        for expr <- exprs2 do {
            expr match {
                case SignalExpr.Set(source, dest) => {
                    source match {
                        case SigSource.Signal(x) => wires2 = wires2 + (dest -> x)
                        case SigSource.Wire(id) => {
                            if wires2.contains(id) then {
                                wires2 = wires2 + (dest -> wires2.apply(id))
                            }
                        }
                    }
                }
                case SignalExpr.And(left, right, dest) => {
                    wires2 = processGate(wires2, left, right, dest, ((a,b) => a & b))
                }
                case SignalExpr.Or(left, right, dest) => {
                    wires2 = processGate(wires2, left, right, dest, ((a,b) => a | b))
                }
                case SignalExpr.LShift(source, by, dest) => {
                    wires2 = processGate(wires2, source, SigSource.Signal(by), dest, ((a,b) => a << b))
                }
                case SignalExpr.RShift(source, by, dest) => {
                    wires2 = processGate(wires2, source, SigSource.Signal(by), dest, ((a,b) => a >> b))
                }
                case SignalExpr.Not(source, dest) => {
                    source match {
                        case SigSource.Signal(x) => wires2 = wires2 + (dest -> (65535-x))
                        case SigSource.Wire(id) => {
                            if wires2.contains(id) then {
                                wires2 = wires2 + (dest -> (65535 - wires2.apply(id)))
                            }
                        }
                    }
                }
            }
        }
    }

    println(wires2.apply("a"))
}