import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("FantasyOne", function () {
  let fantasyOneToken: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("FantasyOneToken");
    fantasyOneToken = await Token.deploy();
    await fantasyOneToken.deployed();
  });

  it("should mint tokens to a specified address", async function () {
    await fantasyOneToken
      .connect(owner)
      .mint(addr1.address, ethers.utils.parseEther("2"));
    expect(await fantasyOneToken.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseEther("2")
    );
  });

  it("should set claimable tokens for a user", async function () {
    await fantasyOneToken
      .connect(owner)
      .setClaimableTokens(addr1.address, 1, ethers.utils.parseEther("3"));
    expect(await fantasyOneToken.claimableTokens(addr1.address, 1)).to.equal(
      ethers.utils.parseEther("3")
    );
  });

  it("should claim tokens", async function () {
    await fantasyOneToken
      .connect(owner)
      .setClaimableTokens(addr1.address, 1, ethers.utils.parseEther("3"));
    await fantasyOneToken.connect(addr1).claimTokens(1);
    expect(await fantasyOneToken.balanceOf(addr1.address)).to.equal(
      ethers.utils.parseEther("3")
    );
  });

  it("should transfer tokens to the contract", async function () {
    await fantasyOneToken
      .connect(owner)
      .mint(addr1.address, ethers.utils.parseEther("2"));
    await fantasyOneToken
      .connect(addr1)
      .approve(fantasyOneToken.address, ethers.utils.parseEther("2"));
    await fantasyOneToken
      .connect(addr1)
      .transfer(fantasyOneToken.address, ethers.utils.parseEther("2"));
    expect(await fantasyOneToken.balanceOf(fantasyOneToken.address)).to.equal(
      ethers.utils.parseEther("2")
    );
  });

  it("should fail to transfer tokens to other than the contract", async function () {
    await fantasyOneToken
      .connect(owner)
      .mint(addr1.address, ethers.utils.parseEther("2"));
    await expect(
      fantasyOneToken
        .connect(addr1)
        .transfer(owner.address, ethers.utils.parseEther("2"))
    ).to.be.rejectedWith("Transfers are only allowed to this contract");
  });
});
