const tokenABI = require("../abi/token.json");
const oracleABI = require("../abi/oracle.json");
const canvasABI = require("../abi/canvas.json");

const ABIMap = new Map<string, any>();
ABIMap.set("tokenABI", tokenABI);
ABIMap.set("oracleABI", oracleABI);
ABIMap.set("canvasABI", canvasABI);

const abiFetcher = (abiName: "Canvas" | "Oracle" | "Token") => {
  return ABIMap.get(abiName);
};
