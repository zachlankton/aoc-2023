import * as fs from "fs";

const x = fs.readFileSync("input.txt");

const input = x.toString();

const lines = input.split("\n");

scanLines();

function scanLines() {
  let total = 0;
  lines.forEach((line) => {
    if (!line) return;

    const [card, data] = line.split(": ");
    const [winningNumStr, gameCardStr] = data.split(" | ");
    const winningNums = winningNumStr.split(/\s+/).filter(Boolean);
    const winningDict = {};
    winningNums.forEach((num) => (winningDict[num] = true));

    const gameNums = gameCardStr.split(/\s+/).filter(Boolean);
    const score = gameNums.reduce((acc, cur) => {
      if (winningDict[cur]) return acc === 0 ? 1 : acc * 2;
      return acc;
    }, 0);

    total += score;
  });
  console.log(total);
}
