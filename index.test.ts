import { serialize, deserialize } from "./index";

const BASIC_TEST_LIST = [
  4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 10, 10, 20, 120, 299,
];
const BASIC_SERIALIZED_TEST_STR =
  ",,,12,,,,,,2,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1,";

const EMPTY_SERIALIZATION_OUTPUT =
  ",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,";

describe("serialization", () => {
  test("basic case serialization", () => {
    const serializedString = serialize(BASIC_TEST_LIST);

    expect(serializedString).toBe(BASIC_SERIALIZED_TEST_STR);
  });

  test("empty list", () => {
    const serializedString = serialize([]);

    expect(serializedString).toBe(EMPTY_SERIALIZATION_OUTPUT);
  });

  test("out of range", () => {
    expect(() => serialize([301])).toThrow();
    expect(() => serialize([0])).toThrow();
    expect(() => serialize([-1])).toThrow();
  });
});

describe("deserialization", () => {
  test("basic case deserialization", () => {
    const deserializedString = deserialize(BASIC_SERIALIZED_TEST_STR);

    expect(deserializedString).toEqual(BASIC_TEST_LIST);
  });

  test("empty list", () => {
    const serializedString = deserialize("");

    expect(serializedString).toEqual([]);
  });

  test("out of range", () => {
    expect(() => deserialize("0f0")).toThrow();
    expect(() => deserialize("+")).toThrow();
  });
});
