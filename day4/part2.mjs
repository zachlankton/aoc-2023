import * as fs from "fs";

const x = fs.readFileSync("input.txt");

const input = x.toString();

const lines = input.split("\n");

scanLines();

function scanLines() {
  let total = 0;
  const copies = {};
  lines.forEach((line, gameIdx) => {
    if (!line) return;

    copies[gameIdx] = copies[gameIdx] || 1;
    const totalCopiesOfThisCard = copies[gameIdx];

    const [card, data] = line.split(": ");
    const [winningNumStr, gameCardStr] = data.split(" | ");
    const winningNums = winningNumStr.split(/\s+/).filter(Boolean);
    const winningDict = {};
    winningNums.forEach((num) => (winningDict[num] = true));

    const gameNums = gameCardStr.split(/\s+/).filter(Boolean);
    gameNums.reduce((acc, cur) => {
      if (winningDict[cur]) {
        const newAcc = acc + 1;
        copies[gameIdx + newAcc] = copies[gameIdx + newAcc] || 1;
        copies[gameIdx + newAcc] += 1 * totalCopiesOfThisCard;
        return newAcc;
      }
      return acc;
    }, 0);
  });
  const copiesKeys = Object.keys(copies);
  total = copiesKeys.reduce((acc, cur) => acc + copies[cur], 0);
  console.log(total);
}
