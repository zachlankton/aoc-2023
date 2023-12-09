import * as fs from "fs";

const x = fs.readFileSync("input.txt");

const input = x.toString();
// const input = `seeds: 79 14 55 13
//
// seed-to-soil map:
// 50 98 2
// 52 50 48
//
// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15
//
// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4
//
// water-to-light map:
// 88 18 7
// 18 25 70
//
// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13
//
// temperature-to-humidity map:
// 0 69 1
// 1 0 69
//
// humidity-to-location map:
// 60 56 37
// 56 93 4`;

const lines = input.split("\n\n");
const seeds = lines[0].split(": ")[1].split(" ").filter(Boolean);
const farmKeys = [];
lines.slice(1).forEach((line) => {
  const [label, data] = line.split(":\n");
  farmKeys.push(data.split("\n").map((n) => n.split(/\s+/)));
});

// console.log(farmKeys);

const seedLocations = [];
scanSeeds();

function scanSeeds() {
  seeds.forEach((seed, idx1) => {
    let results = seed;
    farmKeys.forEach((farmMap, idx2) => {
      results = getMapped(results, farmMap);
      // console.log({ idx1, idx2, seed, results });
    });
    seedLocations.push(results);
  });
  // seedLocations.sort();
  const min = Math.min(...seedLocations);
  console.log(min);
}

function getMapped(seed, map) {
  let output = null;
  const mapLen = map.length;
  for (let i = 0; i < mapLen; i++) {
    const [dest, src, rng] = map[i];
    if (+seed >= +src && +seed <= +src + +rng - 1) {
      const diff = +seed - +src;
      const newDest = +dest + diff;
      // console.log({ seed, src, rng, diff, dest, newDest });
      return newDest;
    } else {
      output = +seed;
    }
  }
  // console.log(output);
  return output;
}
