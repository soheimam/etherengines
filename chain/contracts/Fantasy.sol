// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "erc721a/contracts/extensions/ERC721AQueryable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct TrackData {
    uint8 temperature;
    uint8 conditions;
}

interface IOracle {
    function getDriverCost(uint8 driverNumber) external view returns (uint256);
    function getTeamCost(uint8 teamNumber) external view returns (uint256);
    function getDriverRating(uint8 driverNumber) external view returns (uint8);
    function getTeamRating(uint8 teamNumber) external view returns (uint8);
    function getTrackData(uint8 raceNumber) external view returns (TrackData memory);
}

contract FantasyOne is ERC721A, Ownable {
    using Strings for uint256;
    mapping(uint256 => uint24) public tokenIdToDriverMapping;

    IOracle public oracle;
    IERC20 public token;
    uint8 public activeRace;
    string public baseURI;
    string public URISuffix = ".json";

    constructor(address _oracle, address _token, string memory _baseURI) ERC721A("FantasyOne", "FAN") {
        oracle = IOracle(_oracle);
        token = IERC20(_token);
        setBaseURI(_baseURI);
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    function mint(uint8 _driverMain, uint8 _driverSecondary, uint8 _teamNumber) external {
        require(_driverMain > 0 && _driverMain <= 20, "Main driver number out of range");
        require(_driverSecondary > 0 && _driverSecondary <= 20, "Secondary driver number out of range");
        require(_teamNumber > 0 && _teamNumber <= 10, "Team number out of range");

        uint256 driverMainCost = oracle.getDriverCost(_driverMain);
        uint256 driverSecondaryCost = oracle.getDriverCost(_driverSecondary);
        uint256 teamCost = oracle.getTeamCost(_teamNumber);
        uint256 totalCost = driverMainCost + driverSecondaryCost + teamCost;

        require(token.balanceOf(msg.sender) >= totalCost, "Not enough token balance.");
        require(token.allowance(msg.sender, address(this)) >= totalCost, "Check the token allowance");

        token.transferFrom(msg.sender, address(this), totalCost);
        uint256 _nextTokenId = totalSupply() + 1;
        _safeMint(msg.sender, _nextTokenId);
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        if (!_exists(_tokenId)) revert URIQueryForNonexistentToken();
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _tokenId.toString(), URISuffix)) : '';
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function setActiveRace(uint8 raceNumber) external onlyOwner {
        activeRace = raceNumber;
    }

    function updateOracle(address _oracle) external onlyOwner {
        oracle = IOracle(_oracle);
    }

    function updateToken(address _token) external onlyOwner {
        token = IERC20(_token);
    }

    function getDriverRating(uint8 driverNumber) public view returns (uint8) {
        return oracle.getDriverRating(driverNumber);
    }

    function getTeamRating(uint8 teamNumber) public view returns (uint8) {
        return oracle.getTeamRating(teamNumber);
    }

    function getDriverCost(uint8 driverNumber) public view returns (uint256) {
        return oracle.getDriverCost(driverNumber);
    }

    function getTeamCost(uint8 teamNumber) public view returns (uint256) {
        return oracle.getTeamCost(teamNumber);
    }

    function getTrackData(uint8 raceNumber) public view returns (TrackData memory) {
        return oracle.getTrackData(raceNumber);
    }

}
