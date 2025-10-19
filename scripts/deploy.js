// scripts/deploy.js

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("SimpleToken");

  // For Ethers v6, parseUnits is top-level, not in utils
  const initialSupply = ethers.parseUnits("1000000", 18);

  const token = await Token.deploy(initialSupply);

  // In v6, you don't need token.deployed()
  console.log("SimpleToken deployed to:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
