// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IOracle {
    function getDriverCost(uint8 driverNumber) external view returns (uint256);
}

interface ICanvas {
    function storeDriverData(
        address _address, 
        uint256 _tokenId, 
        uint8 driverMain, 
        uint8 driverSecondary, 
        uint8 teamNumber
    ) external;
    function getOwnerOf(uint256 tokenId) external view returns (address);
}


contract Token is ERC20, Ownable {
    mapping(uint256 => mapping(uint256 => uint256)) public claimableTokens;
    mapping(address => mapping(uint256 => uint256)) public addressToSeasonMintedMapping;
    uint256 public currentSeason;
    uint256 public maxMintAmount = 30 ether;
    IOracle public oracle;
    ICanvas public canvasContract;

    constructor(address _oracle) ERC20("PitstopProtocol", "PP") {
        setSeason(1); // Default to starting the first season
        oracle = IOracle(_oracle);
    }

    function setClaimableTokens(uint256 _raceNumber, uint256 _amount, uint256 _tokenId) public onlyOwner {
        claimableTokens[_tokenId][_raceNumber] = _amount;
    }

    function claimTokens(uint256 _raceNumber, uint256 _tokenId) public {
        uint256 amount = claimableTokens[_tokenId][_raceNumber];
        require(amount > 0, "No tokens available to claim");
        claimableTokens[_tokenId][_raceNumber] = 0;
        _mint(msg.sender, amount);
    }

    function getPendingTokensForRace(uint256 _raceNumber, uint256 _tokenId) public view returns (uint256) {
        return claimableTokens[_tokenId][_raceNumber];
    }

    function getPendingTokensForAllRaces(uint256 _totalRaces, uint256 _tokenId) public view returns (uint256[] memory) {
        uint256[] memory pendingTokens = new uint256[](_totalRaces);
        
        for(uint256 i = 0; i < _totalRaces; i++) {
            pendingTokens[i] = claimableTokens[_tokenId][i];
        }
        
        return pendingTokens;
    }

    function mint(uint256 _amount, address _receiver) public {
        require(_amount <= maxMintAmount, "Amount is over max amount allowed");
        require(addressToSeasonMintedMapping[_receiver][currentSeason] + _amount <= maxMintAmount, "Exceeds max mint amount for the season");

        addressToSeasonMintedMapping[_receiver][currentSeason] += _amount;
        _mint(_receiver, _amount); 
    }

    function sell(uint8 _driverNumber, uint8 _tokenId, uint8 _driverSecondary, uint8 _teamNumber) public {
        require(canvasContract.getOwnerOf(_tokenId) == msg.sender, "Caller is not the owner of this token");

        uint256 driverCost = oracle.getDriverCost(_driverNumber);
        canvasContract.storeDriverData(msg.sender, _tokenId, _driverNumber, _driverSecondary, _teamNumber);
        _mint(msg.sender, driverCost);
    }

    function setCanvasContract(address _canvas) public onlyOwner {
        canvasContract = ICanvas(_canvas);
    }

    function setSeason(uint256 _season) public onlyOwner {
        currentSeason = _season;
    }

    // TODO later, disallow any sort of transfer of tokens

}
