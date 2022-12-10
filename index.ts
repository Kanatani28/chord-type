type NoteDef = {
    '0': 'C';
    '1': 'C#';
    '2': 'D';
    '3': 'D#';
    '4': 'E';
    '5': 'F';
    '6': 'F#';
    '7': 'G';
    '8': 'G#';
    '9': 'A';
    '10': 'A#';
    '11': 'B';
}

// ユーティリティ
type ValueOf<T> = T[keyof T]

type Note = ValueOf<NoteDef> 

type Num2NoteId<T extends number> = `${T}` extends keyof NoteDef ? `${T}` : never

type Num2Array<T extends number, Result extends any[] = []> = Result['length'] extends T
    ? Result
    : Num2Array<T, [...Result, any]>

type Sum<T extends number, K extends number> = [
    ...Num2Array<T>,
    ...Num2Array<K>
]['length']

type Num2String<T extends number> = `${T}`;


type Mod<A extends number, B extends number> = Num2Array<A> extends [...Num2Array<B>, ...infer R]
    ? Mod<R['length'], B>
    : A



// type NthNote<T extends number, N extends number> = NoteDef[Num2NoteId<
//   Sum<T, N> extends number ? Mod<Sum<T, N>, 12> : never
// >]

// type MajorCode<T extends number> = [NthNote<T, 0>, NthNote<T, 4>, NthNote<T, 7>]
// type MinorCode<T extends number> = [NthNote<T, 0>, NthNote<T, 3>, NthNote<T, 7>]
// type SeventhCode<T extends number> = [NthNote<T, 0>, NthNote<T, 4>, NthNote<T, 7>, NthNote<T, 11>]

type Flip<T extends Record<string, string>> =  { [P in keyof T as T[P]]: P }

type String2Num<T extends string> = T extends `${infer K extends number}` ? K : never;

type Note2NoteId = Flip<NoteDef>

type sss = String2Num<Note2NoteId["C"]>

type NthNote<T extends Note, N extends number> = NoteDef[Num2NoteId<
    Sum<String2Num<Note2NoteId[T]>, N> extends number ? Mod<Sum<String2Num<Note2NoteId[T]>, N>, 12> : never
>];

type MajorChord<T extends Note> = [NthNote<T, 0>, NthNote<T, 4>, NthNote<T, 7>]
type MinorChord<T extends Note> = [NthNote<T, 0>, NthNote<T, 3>, NthNote<T, 7>]
type SeventhChord<T extends Note> = [NthNote<T, 0>, NthNote<T, 4>, NthNote<T, 7>, NthNote<T, 11>]

type Asm = MinorChord<"A#">
type F = MajorChord<"F">

type Gm = MinorChord<"G">
type A = MajorChord<"A">
type Dm = MinorChord<"D">
type G = MajorChord<"G">

type As = MajorChord<"A#">

type Ds = MajorChord<"D#">

type E = MajorChord<"E">

type Fs = MajorChord<"F#">

type Gsm = MinorChord<"G#">

type Csm = MinorChord<"C#">
type Dsm = MinorChord<"D#">

type B = MajorChord<"B">

type Gs = MajorChord<"G#">

type Fsm = MinorChord<"F#">

type KickBack = [
    // イントロ
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    // Aメロ
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,
    Asm,
    F,

    // 
    Gm,
    A,
    Dm,
    G,
    As,
    Ds,
    G,
    E,
    Fs,
    Gsm,
    Csm,
    Dsm,
    Gsm,
    A,
    B,
    Gs,
    Fsm,
    Gs,

    // サビ
    null, // N.C
    Csm,
    Fsm,
    Gs,
    Csm,
    Fsm,
    E,
    A,
    B,
    Gs,
    Csm,
    Fsm,
    Gs,
    Csm,
    A,
    Gs,
    Csm,
    A,
    Gs,
    Csm,
    A,
    Gs,
    Csm,
    // 
    null // N.C
]



type ChordParser<T extends string> = T extends Note
    ? MajorChord<T>
    : T extends `${infer A}m`
    ? A extends Note
        ? MinorChord<A>
        : []
    : T extends `${infer A}m7`
    ? A extends Note
        ? MinorSeventhChord<A>
        : []
    : T extends `${infer A}M7`
    ? A extends Note
        ? MajorSeventhChord<A>
        : []
    : T extends `${infer A}7`
    ? A extends Note
        ? SeventhChord<A>
        : []
    : []