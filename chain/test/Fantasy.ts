import { ethers } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("FantasyOne", function () {
  let fantasyOne: Contract;
  let token: Contract;
  let oracle: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const Oracle = await ethers.getContractFactory("Oracle");
    oracle = await Oracle.deploy();
    await oracle.deployed();

    const Token = await ethers.getContractFactory("FantasyOneToken");
    token = await Token.deploy();
    await token.deployed();

    const FantasyOne = await ethers.getContractFactory("FantasyOne");
    fantasyOne = await FantasyOne.deploy(
      oracle.address,
      token.address,
      "https://api.example.com/token/"
    );
    await fantasyOne.deployed();

    // Mint tokens to FantasyOne contract
    await token
      .connect(owner)
      .mint(fantasyOne.address, ethers.utils.parseEther("50"));
  });

  it("should set the correct base URI", async function () {
    await fantasyOne
      .connect(owner)
      .setBaseURI("https://api.example.com/token/");
    expect(await fantasyOne.baseURI()).to.equal(
      "https://api.example.com/token/"
    );
  });

  it("should mint a token if the sender has enough balance and allowance", async function () {
    await token
      .connect(addr1)
      .approve(token.address, ethers.utils.parseEther("2"));

    await fantasyOne.connect(addr1).mint(1, 2, 3);
    expect(await fantasyOne.balanceOf(addr1.address)).to.equal(1);
  });

  it("should mint a token if the sender has enough balance and allowance", async function () {
    await token
      .connect(addr1)
      .approve(token.address, ethers.utils.parseEther("2"));

    await fantasyOne.connect(addr1).mint(1, 2, 3);
    expect(await fantasyOne.balanceOf(addr1.address)).to.equal(1);
  });

  it("should return the correct token URI for other team/driver mint", async function () {
    await fantasyOne.connect(addr2).mint(6, 6, 5);
    expect(await fantasyOne.tokenURI(1)).to.equal(
      "https://api.example.com/token/1.json"
    );
  });

  it("should return the correct token URI for other team/driver mint", async function () {
    await fantasyOne.connect(addr2).mint(8, 2, 4);
    await fantasyOne.connect(addr2).mint(1, 2, 4);

    expect(await fantasyOne.tokenURI(2)).to.equal(
      "https://api.example.com/token/2.json"
    );
  });

  it("should return the correct driver rating", async function () {
    // Assuming the oracle returns a rating of 85 for driver 1 (currently 0)
    expect(await fantasyOne.getDriverRating(1)).to.equal(0);
  });
});
