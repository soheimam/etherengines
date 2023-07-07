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

  it("should set claimable tokens for a user", async function () {
    await token
      .connect(owner)
      .setClaimableTokens(1, ethers.utils.parseEther("3"), 1);
    expect(await token.claimableTokens(1, 1)).to.equal(
      ethers.utils.parseEther("3")
    );
  });

  it("should claim tokens", async function () {
    await token
      .connect(owner)
      .setClaimableTokens(1, ethers.utils.parseEther("3"), 1);
    await token.connect(addr1).claimTokens(1, 1);
    expect(await token.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseEther("3")
    );
  });

  // it("should transfer tokens to the contract", async function () {
  //   await token.connect(owner).mint(ethers.utils.parseEther("2"));
  //   await token
  //     .connect(addr1)
  //     .approve(token.address, ethers.utils.parseEther("2"));
  //   await token
  //     .connect(addr1)
  //     .transfer(token.address, ethers.utils.parseEther("2"));
  //   expect(await token.balanceOf(token.address)).to.equal(
  //     ethers.utils.parseEther("2")
  //   );
  // });

  // it("should fail to transfer tokens to other than the contract", async function () {
  //   await token.connect(owner).mint(ethers.utils.parseEther("2"));
  //   await expect(
  //     token.connect(addr1).transfer(owner.address, ethers.utils.parseEther("2"))
  //   ).to.be.rejectedWith("Transfers are only allowed to this contract");
  // });
});
