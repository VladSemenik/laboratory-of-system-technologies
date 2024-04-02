const SERIALIZATIO_RANGE = { from: 1, to: 300 } as const;
const SERIALIZATION_SPLITER = ",";
const SERIALIZATION_COUNT_SPLITER = ":";

/**
 * @throws {Error}
 */
export const serialize = (arr: number[]) => {
  const bitMask = Array.from({ length: SERIALIZATIO_RANGE.to }, () => 0);

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];

    if (element < SERIALIZATIO_RANGE.from || element > SERIALIZATIO_RANGE.to) {
      throw new Error("Element is out of range");
    }

    bitMask[element - 1] = bitMask[element - 1] + 1;
  }

  return bitMask.map((e) => (e === 0 ? "" : e)).join(SERIALIZATION_SPLITER);
};

/**
 * @throws {Error}
 */
export const deserialize = (str: string) => {
  const arr = str.split(SERIALIZATION_SPLITER);
  const res: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element !== "") {
      if (isNaN(+element)) throw new Error("Invalid symbol");
      res.push(...new Array(+element).fill(i + 1));
    }
  }

  return res;
};

/**
 * @throws {Error}
 */
export const serialize1 = (arr: number[]) => {
  const dic = new Map<number, number>();

  for (let i = 0; i < arr.length; i++) {
    if (dic.has(arr[i])) {
      // @ts-expect-error
      dic.set(arr[i], dic.get(arr[i]) + 1);
    } else {
      dic.set(arr[i], 1);
    }
  }

  const a: string[] = [];

  dic.forEach((value, key) => {
    a.push(`${key}${SERIALIZATION_COUNT_SPLITER}${value}`);
  });

  return a.join(SERIALIZATION_SPLITER);
};

/**
 * @throws {Error}
 */
export const deserialize1 = (str: string) => {
  const arr = str.split(SERIALIZATION_SPLITER);
  const res: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const [element, count] = arr[i].split(SERIALIZATION_COUNT_SPLITER);
    if (element !== "" && count !== "") {
      if (isNaN(+element)) throw new Error("Invalid symbol");
      if (isNaN(+count)) throw new Error("Invalid count");
      res.push(...new Array(+count).fill(+element));
    }
  }

  return res;
};

// console.log(
//   serialize.name,
//   serialize([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 10, 20, 120, 299])
// );
// console.log(
//   deserialize.name,
//   deserialize(
//     serialize([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 10, 20, 120, 299])
//   )
// );

// console.log(
//   serialize1.name,
//   serialize1([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 10, 20, 120, 299])
// );
// console.log(
//   deserialize1.name,
//   deserialize1(
//     serialize1([4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 10, 20, 120, 299])
//   )
// );

const getRandomValue = ({ from, to }: { from: number; to: number }) => {
  return Math.round(Math.random() * (from - to)) + to;
};

//random 50 numbers
const random50 = () =>
  new Array(50).fill(0).map(() => getRandomValue({ from: 1, to: 300 }));
//random 100 numbers
const random100 = () =>
  new Array(100).fill(0).map(() => getRandomValue({ from: 1, to: 300 }));
//random 500 numbers
const random500 = () =>
  new Array(500).fill(0).map(() => getRandomValue({ from: 1, to: 300 }));
//random 1000 numbers
const random1000 = () =>
  new Array(1000).fill(0).map(() => getRandomValue({ from: 1, to: 300 }));
// 1-9 numbers
const oneTen = new Array(9).fill(0).map((_, i) => i + 1);
// 10-99 numbers
const tens = new Array(90).fill(0).map((_, i) => i + 10);
// 100-300 numbers
const hundreds = new Array(201).fill(0).map((_, i) => i + 100);
// 3x numbers
let x3 = new Array(300).fill(0).map((_, i) => i + 1);
x3 = x3.concat(...x3, ...x3);

const getRuns = (getArr: () => number[], c: number) => {
  return new Array(c).fill(undefined).map(() => {
    const arr = getArr();
    return {
      sourceStr: arr.join(","),
      serializedStr: serialize(arr),
      ratio: arr.join(",").length / serialize(arr).length,
      alternativeMethodRatio: arr.join(",").length / serialize1(arr).length,
    };
  });
};

const runs = [
  getRuns(random50, 1),
  getRuns(random100, 1),
  getRuns(random500, 1),
  getRuns(random1000, 1),
  getRuns(() => oneTen, 1),
  getRuns(() => tens, 1),
  getRuns(() => hundreds, 1),
  getRuns(() => x3, 1),
];

console.log(...runs);
console.log(
  "avarage ratio",
  runs.reduce((a, e) => a + e.reduce((a, e) => a + e.ratio, 0) / e.length, 0) /
    runs.length
);
