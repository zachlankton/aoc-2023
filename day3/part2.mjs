import * as fs from "fs";

const x = fs.readFileSync("input.txt");

const input = x.toString();

const lines = input.split("\n");
const maxLineLen = lines[0].length - 1;
const gearRatios = {};
let lastGearRatio = null;

scanLines();

function scanLines() {
  let total = 0;
  const lineLen = lines.length;
  for (let i = 0; i < lineLen; i++) {
    const line = lines[i];
    const numbersOnLine = getNumbersOnLine(line, i);
    total += numbersOnLine;
  }
  const ratioKeys = Object.keys(gearRatios);
  const _gears = ratioKeys.filter((key) => gearRatios[key].prod);
  const gears = _gears.map((key) => gearRatios[key].prod);
  const gearTotal = gears.reduce((acc, val) => acc + val, 0);

  console.log(gearTotal);
}

function getNumbersOnLine(line, lineNo) {
  const lineLen = line.length;
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
        if (!lastGearRatio.num) {
          lastGearRatio.num = +num;
        } else {
          lastGearRatio.prod = +num * lastGearRatio.num;
        }
      }
      num = "";
      isAdjacent = false;
      inNum = false;
    }
  }
  if (inNum && isAdjacent) {
    if (!lastGearRatio.num) {
      lastGearRatio.num = +num;
    } else {
      lastGearRatio.prod = +num * lastGearRatio.num;
    }
  }
  num = "";
  isAdjacent = false;
  inNum = false;

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

  if (isSymbol(prevLinePrevChar, prevLine, i)) return true;
  if (isSymbol(thisLinePrevChar, lineNo, i)) return true;
  if (isSymbol(nextLinePrevChar, nextLine, i)) return true;
}

function isSymbol(char, lineNo, i) {
  if (char !== "*") return false;
  gearRatios[`L${lineNo}I${i}`] = gearRatios[`L${lineNo}I${i}`] || {};
  lastGearRatio = gearRatios[`L${lineNo}I${i}`];
  return true;
}

function isCharNumber(char) {
  const test = Number(char);
  return !isNaN(test);
}
