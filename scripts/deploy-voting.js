async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Voting = await ethers.getContractFactory("Voting");

  // ✅ Add your proposal names here
  const voting = await Voting.deploy(["A", "B", "C"]);

  console.log("Voting deployed to:", await voting.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
