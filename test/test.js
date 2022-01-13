const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WETH", function () {
  it("should be able to convert ETH to WETH", async function () {
    const WETH = await ethers.getContractFactory("WETH");
    const weth = await WETH.deploy();
    await weth.deployed();

    const user = (await ethers.getSigners())[0]
    const address = user.address
    let wethBalance = await weth.balanceOf(address)

    let ethBalance = (await ethers.provider.getBalance(weth.address))
    expect(wethBalance).to.equal(0);
    expect(ethBalance).to.equal(0);

    await (await user.sendTransaction({
      to: weth.address,
      value: ethers.utils.parseEther("1.0")
    })).wait()

    wethBalance = await weth.balanceOf(address)
    expect(wethBalance).to.equal(ethers.utils.parseEther("1.0"));

    ethBalance = (await ethers.provider.getBalance(weth.address))
    expect(ethBalance).to.equal(ethers.utils.parseEther("1.0"));

    await (await weth.withdraw(ethers.utils.parseEther("1.0"))).wait()

    wethBalance = await weth.balanceOf(address)
    expect(wethBalance).to.equal(ethers.utils.parseEther("0"));

    ethBalance = (await ethers.provider.getBalance(weth.address)).toString()
    expect(ethBalance).to.equal(ethers.utils.parseEther("0"));
  });
});
