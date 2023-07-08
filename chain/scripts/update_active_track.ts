const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Deploy the Oracle contract
  const contract = await ethers.getContractFactory("Canvas");
  const canvas = await contract.attach(
    "0xbE56E2377200c5756b763BFD2166a0Db3776D6b1"
  );

  // Connect to the contract with the owner account
  const owner = (await ethers.getSigners())[0];
  const oracleWithOwner = canvas.connect(owner);

  await oracleWithOwner.setActiveRace(2);
  console.log(`Race is set`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
