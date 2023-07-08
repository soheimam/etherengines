const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Deploy the Oracle contract
  const contract = await ethers.getContractFactory("Canvas");
  const canvas = await contract.attach(
    "0x23C32F481b58CE43b772a68E637113a210f4d437"
  );

  // Connect to the contract with the owner account
  const owner = (await ethers.getSigners())[0];
  const oracleWithOwner = canvas.connect(owner);

  await oracleWithOwner.setActiveRace(1);
  console.log(`Race is set`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
