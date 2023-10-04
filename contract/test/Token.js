
const { expect } = require("chai");


describe("Token Contract", function () {
  let token, owner, addr1, addr2, addrs

  beforeEach(async function () {
    token = await hre.ethers.deployContract("Token");
    await token.waitForDeployment();

    [owner, addr1, addr2, ...addrs] = await hre.ethers.getSigners()
  })

  /*------- describe - Development -------*/
  describe("Development", function () {
    it("Should set the right owner", async function () {
      console.log('Owner Address:', owner.address)
      expect(await token.owner()).to.equal(owner.address)
    })

    it("Should assign the total supply of tokens to the owner", async function () {
      const totalSupply = await token.totalSupply()
      console.log("Total Supply:", totalSupply)
      
      expect(await token.balanceOf(owner.address)).to.equal(totalSupply)
    })
  })


  /*------- describe - Transaction -------*/
  describe("Transaction", function () {

    /*----Should transfer token between accounts----*/
    it("Should transfer token between accounts", async function () {
      const ownerBalancBefore = await token.balanceOf(owner.address)
      const addr1BalanceBefore = await token.balanceOf(addr1.address)
      const addr2BalanceBefore = await token.balanceOf(addr2.address)
      
      console.log('Owner Balance Before:', ownerBalancBefore)
      console.log('addr1 Balance Before:', addr1BalanceBefore)
      console.log('addr2 Balance Before:', addr2BalanceBefore)

      // Send Token from owner to addr1
      const responseTx1 = await token.connect(owner).transfer(addr1.address, 10)
      await responseTx1.wait()
      expect(await token.balanceOf(owner.address)).to.equal(BigInt(ownerBalancBefore) - BigInt(10))
      expect(await token.balanceOf(addr1.address)).to.equal(10)

      // Send Token from addr1 to addr2
      const responseTx2 = await token.connect(addr1).transfer(addr2.address, 4)
      await responseTx2.wait()
      expect(await token.balanceOf(addr2.address)).to.equal(4)
      

      const ownerBalanceAfter = await token.balanceOf(owner.address)
      const addr1BalanceAfter = await token.balanceOf(addr1.address)
      const addr2BalanceAfter = await token.balanceOf(addr2.address)
      
      console.log('Owner Balance after:', ownerBalanceAfter)
      console.log('addr1 Balance after:', addr1BalanceAfter)
      console.log('addr2 Balance after:', addr2BalanceAfter)
    
      expect(await token.balanceOf(owner.address)).to.equal(ownerBalanceAfter)
      expect(await token.balanceOf(addr1.address)).to.equal(addr1BalanceAfter)
      expect(await token.balanceOf(addr2.address)).to.equal(addr2BalanceAfter)
      
    })

    /*----Should fail if sender does not have enough balance----*/
    it("Should fail if sender doesn't have enough balance", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address)
      await expect(token.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith('not enough balance')
      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance)
    })

    /*----Should update balances after transfers----*/
    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await token.balanceOf(owner.address)
      console.log("initialOwnerBalance:", initialOwnerBalance)

      const responseTx1 = await token.transfer(addr1.address, 15)
      await responseTx1.wait()
      expect(await token.balanceOf(addr1.address)).to.equal(15)

      const responseTx2 = await token.transfer(addr2.address, 5)
      await responseTx2.wait()
      expect(await token.balanceOf(addr2.address)).to.equal(5)

      expect(await token.balanceOf(owner.address)).to.equal(BigInt(initialOwnerBalance) - BigInt(20))
      console.log('finalOwnerBalance:', await token.balanceOf(owner.address))
    })

  })
})



// describe('Token Contract ', function () {

//   /*--------it--------*/
//   it("Deployment should assign the total supply of token", async function () {
//     const token = await hre.ethers.deployContract("Token");
//     await token.waitForDeployment();

//     const [owner] = await hre.ethers.getSigners()

//     const totalSupply = await token.connect(owner).totalSupply()
//     console.log("total supply:", totalSupply)
    
//     const ownerBalance = await token.connect(owner).balanceOf(owner.address)
//     console.log("ownerBalance:", ownerBalance)

//     expect(await ownerBalance).to.equal(totalSupply)
//   })
  
//   /*--------it--------*/
//   it("Should transfer tokens between accounts", async function () {
//     const token = await hre.ethers.deployContract("Token")
//     await token.waitForDeployment()

//     const [owner, addr1, addr2] = await hre.ethers.getSigners()

//     const ownerBalanceBefore = await token.connect(owner).balanceOf(owner.address)
//     console.log('owner balance before:', ownerBalanceBefore)

//     const addr1BalanceBefore = await token.connect(addr1).balanceOf(addr1.address)
//     console.log('addr1 balance before:', addr1BalanceBefore)

//     const addr2BalanceBefore = await token.connect(addr2).balanceOf(addr2.address)
//     console.log('addr2 balance before:', addr2BalanceBefore)
    
//     // responseTx1
//     const responseTx1 = await token.connect(owner).transfer(addr1.address, 10);
//     await responseTx1.wait()

//     // responseTx2
//     const responseTx2 = await token.connect(addr1).transfer(addr2.address, 5)
//     await responseTx2.wait()
    
//     const ownerBalanceAfter = await token.connect(owner).balanceOf(owner.address)
//     console.log('owner balance after:', ownerBalanceAfter)
  
//     const addr1BalanceAfter = await token.connect(addr1).balanceOf(addr1.address)
//     console.log('addr1 balance after:', addr1BalanceAfter)

//     const addr2BalanceAfter = await token.connect(addr2).balanceOf(addr2.address)
//     console.log('addr2 balance after:', addr2BalanceAfter)
    
//     expect(await token.balanceOf(addr1.address)).to.equal(5)
//     expect(await token.balanceOf(addr2.address)).to.equal(5)
//   })

// })
