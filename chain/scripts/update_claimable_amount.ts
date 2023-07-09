import { parseEther } from "ethers/lib/utils";

const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Deploy the Oracle contract
  const contract = await ethers.getContractFactory("Token");
  const token = await contract.attach(
    "0xc21A904117530E34D44cca524496EfDf41022B22"
  );

  // Connect to the contract with the owner account
  const owner = (await ethers.getSigners())[0];
  const oracleWithOwner = token.connect(owner);

  // uint256 _raceNumber, uint256 _amount, uint256 _tokenId
  await oracleWithOwner.setClaimableTokens(1, parseEther("10"), 2);
  console.log(`Claimable amount set`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
