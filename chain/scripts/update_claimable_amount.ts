import { parseEther } from "ethers/lib/utils";

const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Deploy the Oracle contract
  const contract = await ethers.getContractFactory("Token");
  const token = await contract.attach(
    "0xaB79931EfF8b8C151F4f89D7Eb096718455786aA"
  );

  // Connect to the contract with the owner account
  const owner = (await ethers.getSigners())[0];
  const oracleWithOwner = token.connect(owner);

  // uint256 _raceNumber, uint256 _amount, uint256 _tokenId
  await oracleWithOwner.setClaimableTokens(1, parseEther("10"), 7);
  console.log(`Claimable amount set`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
