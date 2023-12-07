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
      const power = parseGames(games);
      total += power;
    } catch (e) {
      console.error(e);
    }
  });
  console.log(total);
}

function parseGames(games) {
  const minCubes = {};
  games.forEach((games) => {
    const cubes = games.split(", ");
    parseCubes(cubes, minCubes);
  });
  return minCubes.blue * minCubes.red * minCubes.green;
}

function parseCubes(cubes, minCubes) {
  cubes.forEach((cube) => {
    const [count, color] = cube.split(" ");
    if (minCubes[color]) {
      minCubes[color] = +count > minCubes[color] ? +count : minCubes[color];
    } else {
      minCubes[color] = +count;
    }
  });
}
