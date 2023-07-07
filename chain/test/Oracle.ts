import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Oracle } from "../typechain-types";

describe("Oracle", function () {
  let oracle: Oracle;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    const Oracle = await ethers.getContractFactory("Oracle");
    [owner, addr1] = await ethers.getSigners();
    oracle = (await Oracle.deploy()) as Oracle;
    await oracle.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await oracle.owner()).to.equal(owner.address);
    });

    it("Should have zero drivers, teams and tracks initially", async function () {
      expect(await oracle.getDriverCost(1)).to.equal(0);
      expect(await oracle.getTeamCost(1)).to.equal(0);
      expect(await oracle.getDriverRating(1)).to.equal(0);
      const trackData = await oracle.getTrackData(1);
      expect(trackData.temperature).to.equal(0);
      expect(trackData.conditions).to.equal(0);
    });
  });

  describe("Transactions", function () {
    it("Should allow owner to set values", async function () {
      await oracle.connect(owner).setDriverCost(1, 1000);
      expect(await oracle.getDriverCost(1)).to.equal(1000);

      await oracle.connect(owner).setTeamCost(1, 2000);
      expect(await oracle.getTeamCost(1)).to.equal(2000);

      await oracle.connect(owner).setDriverRating(1, 90);
      expect(await oracle.getDriverRating(1)).to.equal(90);

      await oracle.connect(owner).setTrackData(1, 30, 2);
      const trackData = await oracle.getTrackData(1);
      expect(trackData.temperature).to.equal(30);
      expect(trackData.conditions).to.equal(2);
    });

    it("Should not allow non-owner to set values", async function () {
      await expect(
        oracle.connect(addr1).setDriverCost(1, 1000)
      ).to.be.rejectedWith("Ownable: caller is not the owner");
      await expect(
        oracle.connect(addr1).setTeamCost(1, 2000)
      ).to.be.rejectedWith("Ownable: caller is not the owner");
      await expect(
        oracle.connect(addr1).setDriverRating(1, 90)
      ).to.be.rejectedWith("Ownable: caller is not the owner");
      await expect(
        oracle.connect(addr1).setTrackData(1, 30, 2)
      ).to.be.rejectedWith("Ownable: caller is not the owner");
    });
  });
});
