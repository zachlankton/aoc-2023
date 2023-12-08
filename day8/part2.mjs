import * as fs from "fs";

const x = fs.readFileSync("input.txt");

const input = x.toString();

const lines = input.split("\n");
const instructions = lines.shift().split("");
lines.shift();
const whatever = {};
const startNodes = [];

scanLines();

function scanLines() {
  let total = 0;
  lines.forEach((line) => {
    if (!line) return;
    const spl = line.split(" = ");
    const loc = spl[0];
    const [L, R] = spl[1].slice(1, 9).split(", ");
    whatever[loc] = { L, R };
    if (loc[2] === "A") startNodes.push({ loc, currentNode: loc });
  });

  const instrLen = instructions.length;
  let currentInstrIndex = 0;
  let count = 0;

  const zIntervals = [];
  while (zIntervals.length !== 6) {
    count += 1;
    if (currentInstrIndex === instrLen) currentInstrIndex = 0;
    let currentInstruction = instructions[currentInstrIndex];
    for (let i = 0; i < 6; i++) {
      const node = startNodes[i];
      node.currentNode = whatever[node.currentNode][currentInstruction];
      const lastLetter = node.currentNode[2];
      if (lastLetter === "Z") {
        zIntervals.push(count);
      }
    }
    currentInstrIndex += 1;
  }

  const zLen = zIntervals.length - 1;
  let largest = zIntervals.at(-1);
  for (let i = 0; i < zLen; i++) {
    largest = lcm(zIntervals[i], largest);
  }

  console.log(largest);
}

// chatGPT gave me these two functions below
function gcd(a, b) {
  // Calculate the Greatest Common Divisor (GCD) of two numbers
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

function lcm(a, b) {
  // Calculate the Least Common Multiple (LCM) of two numbers
  return Math.abs(a * b) / gcd(a, b);
}
