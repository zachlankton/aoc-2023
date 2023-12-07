import * as fs from "fs";

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const x = fs.readFileSync("input.txt");

const input = x.toString();

const lines = input.split("\n");

scanLines();

function scanLines() {
  let total = 0;
  lines.forEach((line) => {
    if (!line) return;
    const gameHeaderSplit = line.split(": ");
    const gameIdSplit = gameHeaderSplit[0].split(" ");
    const gameId = gameIdSplit[1];
    const games = gameHeaderSplit[1].split("; ");
    try {
      parseGames(games);
      total += +gameId;
    } catch (e) {}
  });
  console.log(total);
}

function parseGames(games) {
  games.forEach((games) => {
    const cubes = games.split(", ");
    parseCubes(cubes);
  });
}

function parseCubes(cubes) {
  cubes.forEach((cube) => {
    const [count, color] = cube.split(" ");
    if (count > maxCubes[color]) throw "Invalid Game";
  });
}
