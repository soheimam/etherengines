import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Token", function () {
  let token: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.deployed();
  });

  it("should mint tokens to a specified address", async function () {
    await token.connect(addr1).mint(ethers.utils.parseEther("2"));
    expect(await token.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseEther("2")
    );
  });
});
