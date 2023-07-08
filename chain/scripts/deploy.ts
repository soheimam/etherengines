import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

async function main() {
  let canvas: Contract;
  let token: Contract;
  let oracle: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  [owner, addr1, addr2] = await ethers.getSigners();

  const Oracle = await ethers.getContractFactory("Oracle");
  oracle = await Oracle.deploy();
  await oracle.deployed();
  console.log(`Oracle Deployed to -> ${oracle.address}`);

  const Token = await ethers.getContractFactory("Token");
  token = await Token.deploy(oracle.address);
  await token.deployed();
  console.log(`Token Deployed to -> ${token.address}`);

  const Canvas = await ethers.getContractFactory("Canvas");
  canvas = await Canvas.deploy(
    oracle.address,
    token.address,
    "https://api.metafuse.me/assets/3ac14127-abd6-43ef-be99-c9fc635088cf/"
  );
  await canvas.deployed();
  console.log(`Canvas Deployed to -> ${canvas.address}`);
  token.setCanvasContract(canvas.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
