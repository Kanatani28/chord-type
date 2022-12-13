type NoteDef = {
    0 : 'C';
    1: 'C#';
    2: 'D';
    3: 'D#';
    4: 'E';
    5: 'F';
    6: 'F#';
    7: 'G';
    8: 'G#';
    9: 'A';
    10: 'A#';
    11: 'B';
}

// ユーティリティ
type ValueOf<T> = T[keyof T]

type Num2Array<T extends number, Result extends any[] = []> = Result['length'] extends T
    ? Result
    : Num2Array<T, [...Result, any]>

type Sum<T extends number, K extends number> = [
    ...Num2Array<T>,
    ...Num2Array<K>
]['length']

type Mod<A extends number, B extends number> = Num2Array<A> extends [...Num2Array<B>, ...infer R]
    ? Mod<R['length'], B>
    : A

type Flip<T extends Record<string, string>> =  { [P in keyof T as T[P]]: P }

type Note = ValueOf<NoteDef> 

type Num2NoteId<T extends number> = T extends keyof NoteDef ? T : never

type Note2NoteId = Flip<NoteDef>

type NthNote<T extends Note, N extends number> = NoteDef[Num2NoteId<
    Sum<Note2NoteId[T], N> extends number ? Mod<Sum<Note2NoteId[T], N>, 12> : never
>];

export type MajorChord<T extends Note> = [NthNote<T, 0>, NthNote<T, 4>, NthNote<T, 7>]
export type MinorChord<T extends Note> = [NthNote<T, 0>, NthNote<T, 3>, NthNote<T, 7>]
export type SeventhChord<T extends Note> = [NthNote<T, 0>, NthNote<T, 4>, NthNote<T, 7>, NthNote<T, 11>]

// type ChordParser<T extends string> = T extends Note
//     ? MajorChord<T>
//     : T extends `${infer A}m`
//     ? A extends Note
//         ? MinorChord<A>
//         : []
//     // : T extends `${infer A}m7`
//     // ? A extends Note
//     //     ? MinorSeventhChord<A>
//     //     : []
//     // : T extends `${infer A}M7`
//     // ? A extends Note
//     //     ? MajorSeventhChord<A>
//     //     : []
//     : T extends `${infer A}7`
//     ? A extends Note
//         ? SeventhChord<A>
//         : []
//     : []