// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    mapping (uint256 => mapping(uint256 => uint256)) public claimableTokens;
    mapping (address => mapping(uint256 => uint256)) public addressToSeasonMintedMapping;
    uint256 public currentSeason;
    uint256 public maxMintAmount = 30 ether;

    constructor() ERC20("EtherEngines", "EE") {
        setSeason(1); // Default to starting the first season
    }

    function mint(uint256 _amount) public {
        require(_amount <= maxMintAmount, "Amount is over max amount allowed");
        require(addressToSeasonMintedMapping[msg.sender][currentSeason] <= maxMintAmount, "Sender already at max mint amount for season");
        addressToSeasonMintedMapping[msg.sender][currentSeason] += _amount;
        _mint(msg.sender, _amount);
    }

    function getPendingTokensForRace(uint256 _raceNumber, uint256 _canvasId) public view returns (uint256) {
        return claimableTokens[_canvasId][_raceNumber];
    }

    function getPendingTokensForAllRaces(uint256 _totalRaces, uint256 _canvasId) public view returns (uint256[] memory) {
        uint256[] memory pendingTokens = new uint256[](_totalRaces);
        
        for(uint256 i = 0; i < _totalRaces; i++) {
            pendingTokens[i] = claimableTokens[_canvasId][i];
        }
        
        return pendingTokens;
    }

    function claimTokens(uint256 _raceNumber, uint256 _canvasId) public {
        uint256 amount = claimableTokens[_canvasId][_raceNumber];
        require(amount > 0, "No tokens available to claim");
        claimableTokens[_canvasId][_raceNumber] = 0;
        _mint(msg.sender, amount);
    }

    function setClaimableTokens(uint256 _raceNumber, uint256 _amount, uint256 _canvasId) public onlyOwner {
        claimableTokens[_canvasId][_raceNumber] = _amount;
    }

    function setSeason(uint256 _season) public onlyOwner {
        currentSeason = _season;
    }


    // TODO later, disallow any sort of transfer of tokens

}
