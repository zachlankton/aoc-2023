import * as fs from "fs";

const dict = {
  one: { rest: "", val: 1 },
  two: { rest: "", val: 2 },
  thr: { rest: "ee", val: 3 },
  fou: { rest: "r", val: 4 },
  fiv: { rest: "e", val: 5 },
  six: { rest: "", val: 6 },
  sev: { rest: "en", val: 7 },
  eig: { rest: "ht", val: 8 },
  nin: { rest: "e", val: 9 },
};

const x = fs.readFileSync("input.txt");

const input = x.toString();

const lines = input.split("\n");

scanLines();

function scanLines() {
  let total = 0;
  lines.forEach((line) => {
    if (!line) return;
    const first = findFirstNumber(line);
    const last = findLastNumber(line);
    const num = Number(`${first}${last}`);
    total += num;
  });
  console.log(total);
}

function findFirstNumber(line) {
  const test = "xxx".split("");
  const lineLen = line.length;
  for (let i = 0; i < lineLen; i++) {
    const char = line[i];
    if (isCharNumber(char)) return char;

    test.push(char);
    test.shift();

    const nextTwo = line.slice(i + 1, i + 3);
    const wordNum = testWordNum(test, char, nextTwo);
    if (wordNum) return wordNum;
  }
}

function testWordNum(test, char, nextTwo) {
  const keyTest = test.join("");
  const keyExists = dict[keyTest];

  if (!keyExists) return false;
  if (keyExists && !keyExists.rest) return keyExists.val;

  const restLen = keyExists.rest.length;
  const nextCharsToConfirm = nextTwo.slice(0, restLen);
  if (keyExists && keyExists.rest == nextCharsToConfirm) return keyExists.val;
}

function findLastNumber(line) {
  const test = "xxx".split("");
  const lineLen = line.length - 1;
  for (let i = lineLen; i > -1; i--) {
    const char = line[i];
    if (isCharNumber(char)) return char;

    test.unshift(char);
    test.pop();

    const nextTwo = line.slice(i + 3, i + 5);
    const wordNum = testWordNum(test, char, nextTwo);
    if (wordNum) return wordNum;
  }
}

function isCharNumber(char) {
  const test = Number(char);
  return !isNaN(test);
}
