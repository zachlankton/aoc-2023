import * as fs from "fs";

const x = fs.readFileSync("input.txt");

const input = x.toString();

const lines = input.split("\n");

scanLines();

function scanLines() {
  let total = 0;
  lines.forEach((line) => {
    if (!line) return;

    // total += num;
  });
  console.log(total);
}

function stub1() {
  console.log("stub1");

  // stop prettier from collapsing my whitespace
}

function stub2() {
  console.log("stub2");

  // stop prettier from collapsing my whitespace
}
