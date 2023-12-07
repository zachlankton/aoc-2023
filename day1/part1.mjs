import * as fs from "fs";

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
  const lineLen = line.length;
  for (let i = 0; i < lineLen; i++) {
    const char = line[i];
    if (isCharNumber(char)) return char;
  }
}

function findLastNumber(line) {
  const lineLen = line.length - 1;
  for (let i = lineLen; i > -1; i--) {
    const char = line[i];
    if (isCharNumber(char)) return char;
  }
}

function isCharNumber(char) {
  const test = Number(char);
  return !isNaN(test);
}
