import * as fs from "fs";

const x = fs.readFileSync("input.txt");

const input = x.toString();

const lines = input.split("\n");
const instructions = lines.shift().split("");
lines.shift();
const whatever = {};

scanLines();

function scanLines() {
  let total = 0;
  lines.forEach((line) => {
    if (!line) return;
    const spl = line.split(" = ");
    const loc = spl[0];
    const [L, R] = spl[1].slice(1, 9).split(", ");
    whatever[spl[0]] = { L, R };
  });

  const instrLen = instructions.length;
  let currentNode = "AAA";
  let currentInstrIndex = 0;
  let count = 0;
  while (currentNode != "ZZZ") {
    count += 1;
    if (currentInstrIndex === instrLen) currentInstrIndex = 0;
    let currentInstruction = instructions[currentInstrIndex];
    currentNode = whatever[currentNode][currentInstruction];
    currentInstrIndex += 1;
  }

  console.log(count);
}
