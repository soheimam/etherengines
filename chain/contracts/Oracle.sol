// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

struct TrackData {
    uint8 temperature;
    uint8 conditions;
}

contract Oracle is Ownable {
    mapping(uint8 => uint256) public driverCosts;
    mapping(uint8 => uint256) public teamCosts;
    mapping(uint8 => uint8) public driverRatings;
    mapping(uint8 => TrackData) public trackData;

    function setDriverCost(uint8 driverNumber, uint256 cost) external onlyOwner {
        driverCosts[driverNumber] = cost;
    }

    function setTeamCost(uint8 teamNumber, uint256 cost) external onlyOwner {
        teamCosts[teamNumber] = cost;
    }

    function setDriverRating(uint8 driverNumber, uint8 rating) external onlyOwner {
        driverRatings[driverNumber] = rating;
    }

    function setTrackData(uint8 raceNumber, uint8 temperature, uint8 conditions) external onlyOwner {
        trackData[raceNumber] = TrackData(temperature, conditions);
    }

    function getDriverCost(uint8 driverNumber) external view returns (uint256) {
        return driverCosts[driverNumber];
    }

    function getTeamCost(uint8 teamNumber) external view returns (uint256) {
        return teamCosts[teamNumber];
    }

    function getDriverRating(uint8 driverNumber) external view returns (uint8) {
        return driverRatings[driverNumber];
    }

    function getTrackData(uint8 raceNumber) external view returns (TrackData memory) {
        return trackData[raceNumber];
    }
}
