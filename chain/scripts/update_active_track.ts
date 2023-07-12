const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Deploy the Oracle contract
  const contract = await ethers.getContractFactory("Canvas");
  const canvas = await contract.attach(
    "0x5Ce48f7832dD9CC53c099b70D86A4339cD8a8E9C"
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
