import * as fs from "fs";

const x = fs.readFileSync("input.txt");

const input = x.toString();

const lines = input.split("\n");
const maxLineLen = lines[0].length - 1;

scanLines();

function scanLines() {
  let total = 0;
  const lineLen = lines.length;
  for (let i = 0; i < lineLen; i++) {
    const line = lines[i];
    const numbersOnLine = getNumbersOnLine(line, i);
    total += numbersOnLine;
    // console.log(numbersOnLine);
    // if (i > 10) break;
  }
  console.log(total);
}

function getNumbersOnLine(line, lineNo) {
  const lineLen = line.length;
  let numObjs = [];
  let num = "";
  let inNum = false;
  let isAdjacent = false;
  let lineTotal = 0;
  for (let i = 0; i < lineLen; i++) {
    const char = line[i];
    if (isCharNumber(char)) {
      if (!inNum) isAdjacent = isAdjacent || checkAdjacent(i - 1, lineNo);
      isAdjacent = isAdjacent || checkAdjacent(i, lineNo);
      num += char;
      inNum = true;
    } else {
      if (inNum) isAdjacent = isAdjacent || checkAdjacent(i, lineNo);
      if (inNum && isAdjacent) {
        numObjs.push(+num);
        lineTotal += +num;
      }
      num = "";
      isAdjacent = false;
      inNum = false;
    }
  }
  if (inNum && isAdjacent) {
    numObjs.push(+num);
    lineTotal += +num;
  }
  num = "";
  isAdjacent = false;
  inNum = false;

  numObjs.push(lineTotal);
  // console.log(numObjs.join(","));
  return lineTotal;
}

function checkAdjacent(i, lineNo) {
  const prevLine = Math.max(lineNo - 1, 0);
  const nextLine = Math.min(lineNo + 1, lines.length);

  i = i < 0 ? 0 : i;
  i = i >= maxLineLen ? maxLineLen - 1 : i;

  const prevLinePrevChar = lines[prevLine].slice(i, i + 1);
  const thisLinePrevChar = lines[lineNo].slice(i, i + 1);
  const nextLinePrevChar = lines[nextLine].slice(i, i + 1);
  // console.log(i, lineNo, prevLinePrevChar, thisLinePrevChar, nextLinePrevChar);

  if (isSymbol(prevLinePrevChar)) return true;
  if (isSymbol(thisLinePrevChar)) return true;
  if (isSymbol(nextLinePrevChar)) return true;
}

function isSymbol(char) {
  if (isCharNumber(char)) return false;
  if (char === ".") return false;
  return true;
}

function isCharNumber(char) {
  const test = Number(char);
  return !isNaN(test);
}
