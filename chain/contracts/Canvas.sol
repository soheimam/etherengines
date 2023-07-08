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

contract Canvas is ERC721A, ERC721AQueryable, Ownable {
    using Strings for uint256;

    IOracle public oracle;
    IERC20 public token;
    uint8 public activeRace;
    string public baseURI;
    string public URISuffix = ".json";

    struct DriverData {
        uint8 driverMain;
        uint8 driverSecondary;
        uint8 teamNumber;
    }

    mapping(address => mapping(uint256 => DriverData)) public tokenIdToDriverMapping;
    
    constructor(address _oracle, address _token, string memory _baseURI) ERC721A("Canvas", "CANVAS") {
        oracle = IOracle(_oracle);
        token = IERC20(_token);
        setBaseURI(_baseURI);
        setActiveRace(1);
    }

    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }

    function mint(uint8 _driverMain, uint8 _driverSecondary, uint8 _teamNumber) external {
        uint256 totalCost = getMintCost(_driverMain, _driverSecondary, _teamNumber);

        require(token.balanceOf(msg.sender) >= totalCost, "Not enough token balance.");
        require(token.allowance(msg.sender, address(this)) >= totalCost, "Check the token allowance");
        // TODO require the user cannot mint more than 1 canvas

        uint256 nextToken = _nextTokenId();
        DriverData storage driverData = tokenIdToDriverMapping[msg.sender][nextToken];
        driverData.driverMain = _driverMain;
        driverData.driverSecondary = _driverSecondary;
        driverData.teamNumber = _teamNumber;

        token.transferFrom(msg.sender, address(this), totalCost);
        _safeMint(msg.sender, 1);
    }

    function tokenURI(uint256 _tokenId) public view virtual override(IERC721A, ERC721A) returns (string memory) {
        if (!_exists(_tokenId)) revert URIQueryForNonexistentToken();
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _tokenId.toString(), URISuffix)) : '';
    }

    function _startTokenId() internal view virtual override(ERC721A) returns (uint256) {
        return 1;
    }

    function setActiveRace(uint8 raceNumber) public onlyOwner {
        activeRace = raceNumber;
    }

    function updateOracle(address _oracle) external onlyOwner {
        oracle = IOracle(_oracle);
    }

    function updateToken(address _token) external onlyOwner {
        token = IERC20(_token);
    }

    function getMintCost(uint8 _driverMain, uint8 _driverSecondary, uint8 _teamNumber) public view returns (uint256) {
        require(_driverMain > 0 && _driverMain <= 20, "Main driver number out of range");
        require(_driverSecondary > 0 && _driverSecondary <= 20, "Secondary driver number out of range");
        require(_teamNumber > 0 && _teamNumber <= 10, "Team number out of range");

        uint256 driverMainCost = oracle.getDriverCost(_driverMain);
        uint256 driverSecondaryCost = oracle.getDriverCost(_driverSecondary);
        uint256 teamCost = oracle.getTeamCost(_teamNumber);
        uint256 totalCost = driverMainCost + driverSecondaryCost + teamCost;
        return totalCost;
    }

    function getCanvasRating(uint8 _driverMain, uint8 _driverSecondary, uint8 _teamNumber) public view returns (uint256) {
        return oracle.getDriverRating(_driverMain) + oracle.getDriverRating(_driverSecondary) + oracle.getTeamRating(_teamNumber);
    }

    function getCanvasValue(uint8 _driverMain, uint8 _driverSecondary, uint8 _teamNumber) public view returns (uint256) {
        return oracle.getDriverCost(_driverMain) + oracle.getDriverCost(_driverSecondary) + oracle.getTeamCost(_teamNumber);
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
