const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting system", function () {
  it("deploys and allows voting", async function () {
    const [owner, voter1, voter2] = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(["A", "B"]);
    //  Remove: await voting.deployed(); (not needed in Ethers v6)

    await voting.connect(voter1).vote(0);
    await voting.connect(voter2).vote(1);

    const p0 = await voting.getProposal(0);
    const p1 = await voting.getProposal(1);

    expect(p0[1]).to.equal(1); // p0.voteCount
    expect(p1[1]).to.equal(1); // p1.voteCount
  });

  it("prevents double voting", async function () {
    const [, voter] = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy(["X", "Y"]);
    //  Remove: await voting.deployed();

    await voting.connect(voter).vote(0);
    await expect(voting.connect(voter).vote(1)).to.be.revertedWith("Already voted");
  });
});
