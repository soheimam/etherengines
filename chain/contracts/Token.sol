// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FantasyOneToken is ERC20, Ownable {
    mapping (address => mapping(uint256 => uint256)) public claimableTokens;
    mapping (address => uint256) public mintedTokens;

    constructor() ERC20("FantasyOneToken", "FAN") {}

    function mint(address to, uint256 amount) public {
        mintedTokens[to] += amount;
        _mint(to, amount);
    }

    function getPendingTokensForRace(uint256 raceNumber) public view returns (uint256) {
        return claimableTokens[msg.sender][raceNumber];
    }

    function getPendingTokensForAllRaces(uint256 totalRaces) public view returns (uint256[] memory) {
        uint256[] memory pendingTokens = new uint256[](totalRaces);
        
        for(uint256 i = 0; i < totalRaces; i++) {
            pendingTokens[i] = claimableTokens[msg.sender][i];
        }
        
        return pendingTokens;
    }

    function claimTokens(uint256 raceNumber) public {
        uint256 amount = claimableTokens[msg.sender][raceNumber];
        require(amount > 0, "No tokens available to claim");
        claimableTokens[msg.sender][raceNumber] = 0;
        _mint(msg.sender, amount);
    }

    function setClaimableTokens(address user, uint256 raceNumber, uint256 amount) public onlyOwner {
        claimableTokens[user][raceNumber] = amount;
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(recipient == address(this), "Transfers are only allowed to this contract");
        return super.transfer(recipient, amount);
    }

}
