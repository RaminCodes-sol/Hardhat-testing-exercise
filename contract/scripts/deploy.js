
const hre = require("hardhat");

async function main() {

  const token = await hre.ethers.deployContract("Token");

  await token.waitForDeployment();

  console.log(
    `token deployed to ${token.target}`
  );
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512