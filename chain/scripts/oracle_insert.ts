import createLock from "./lock";

const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Deploy the Oracle contract
  const contract = await ethers.getContractFactory("Oracle");
  const oracle = await contract.attach(
    "0x6ECe3928B56d6a8A3EF9B557c2A9c50427e0C8a2"
  );

  // Connect to the contract with the owner account
  const owner = (await ethers.getSigners())[0];
  const oracleWithOwner = oracle.connect(owner);

  // Define the drivers, teams, and performance data
  const drivers = [
    { name: "M. Verstappen", points: 229, wins: 7, podiums: 9 },
    { name: "S. Pérez", points: 148, wins: 2, podiums: 5 },
    { name: "F. Alonso", points: 131, wins: 0, podiums: 6 },
    { name: "L. Hamilton", points: 106, wins: 0, podiums: 3 },
    { name: "C. Sainz Jr.", points: 82, wins: 0, podiums: 0 },
    { name: "C. Leclerc", points: 72, wins: 0, podiums: 2 },
    { name: "G. Russell", points: 72, wins: 0, podiums: 1 },
    { name: "L. Stroll", points: 44, wins: 0, podiums: 0 },
    { name: "E. Ocon", points: 31, wins: 0, podiums: 1 },
    { name: "L. Norris", points: 24, wins: 0, podiums: 0 },
    { name: "P. Gasly", points: 16, wins: 0, podiums: 0 },
    { name: "N. Hülkenberg", points: 9, wins: 0, podiums: 0 },
    { name: "A. Albon", points: 7, wins: 0, podiums: 0 },
    { name: "O. Piastri", points: 5, wins: 0, podiums: 0 },
    { name: "V. Bottas", points: 5, wins: 0, podiums: 0 },
    { name: "G.Y. Zhou", points: 4, wins: 0, podiums: 0 },
    { name: "Y. Tsunoda", points: 2, wins: 0, podiums: 0 },
    { name: "K. Magnussen", points: 2, wins: 0, podiums: 0 },
    { name: "L. Sargeant", points: 0, wins: 0, podiums: 0 },
    { name: "N. de Vries", points: 0, wins: 0, podiums: 0 },
  ];

  const teams = [
    "Red Bull",
    "Ferrari",
    "Aston Martin",
    "Mercedes",
    "Alpine",
    "McLaren",
    "Haas",
    "Williams",
    "Alfa Romeo",
    "Alpha Tauri",
  ];

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let nonce = 0;

  // Insert driver costs
  for (let i = 0; i < drivers.length; i++) {
    const driverNumber = i + 1;
    const driverCost = ethers.utils.parseEther((drivers.length - i).toString());
    console.log(`Inserting Driver: ${drivers[i].name} - Value: ${driverCost}`);
    await oracleWithOwner.setDriverCost(driverNumber, driverCost);
    await sleep(10000);
    const getValue = await oracleWithOwner.getDriverCost(driverNumber);
    console.log(getValue);
  }
  console.log("Inserted driver costs");

  // Insert team costs
  for (let i = 0; i < teams.length; i++) {
    const teamNumber = i + 1;
    const teamCost = ethers.utils.parseEther((teams.length - i).toString());
    console.log(`Inserting Team: ${teams[i]} - Value: ${teamCost}`);
    await oracleWithOwner.setTeamCost(teamNumber, teamCost);
    await sleep(10000);
  }
  console.log("Inserted team costs");

  // Insert driver ratings
  let minRating = Number.MAX_SAFE_INTEGER;
  let maxRating = Number.MIN_SAFE_INTEGER;
  let ratings = [];

  // First Pass: Compute raw ratings and find min and max
  for (let i = 0; i < drivers.length; i++) {
    const driver = drivers[i];
    const rating = driver.points * (driver.wins + 1) * (driver.podiums + 1);
    ratings.push(rating);
    minRating = Math.min(minRating, rating);
    maxRating = Math.max(maxRating, rating);
  }

  const ratingRange = maxRating - minRating;
  const desiredMin = 50;
  const desiredMax = 100;
  const desiredRange = desiredMax - desiredMin;

  // Second Pass: Normalize ratings and insert into contract
  for (let i = 0; i < drivers.length; i++) {
    const driverNumber = i + 1;
    let normalizedRating =
      ((ratings[i] - minRating) / ratingRange) * desiredRange + desiredMin;
    // Ensuring the ratings are integers.
    normalizedRating = Math.round(normalizedRating);
    console.log(
      `Inserting Driver Rating: ${drivers[i].name} - Value: ${normalizedRating}`
    );
    await oracleWithOwner.setDriverRating(driverNumber, normalizedRating);
    await sleep(10000);
  }

  console.log("Inserted driver ratings");
  const totalRaces = 11;

  // We'll use a range of 18 to 34 for the temperature.
  let temperatureData = Array(totalRaces)
    .fill("")
    .map(() => Math.floor(Math.random() * (34 - 18 + 1)) + 18);

  let conditionData = Array(totalRaces)
    .fill("")
    .map(() => (Math.random() < 0.75 ? 1 : 2));

  for (let raceNumber = 0; raceNumber < totalRaces; raceNumber++) {
    await oracleWithOwner.setTrackData(
      raceNumber + 1,
      temperatureData[raceNumber],
      conditionData[raceNumber]
    );
    await sleep(10000);
    console.log(
      `Inserted track data for race ${raceNumber + 1}: Temperature - ${
        temperatureData[raceNumber]
      }, Condition - ${conditionData[raceNumber]}`
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
