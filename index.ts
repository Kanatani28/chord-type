import { MajorChord, MinorChord, SeventhChord } from "./libs";

type CMajor = MajorChord<"C"> // type CMajor = ["C", "E", "G"]

type CMinor = MinorChord<"C">

type CSeventh = SeventhChord<"C">