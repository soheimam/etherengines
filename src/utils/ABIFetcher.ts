const tokenABI = require("../abi/token.json");
const oracleABI = require("../abi/oracle.json");
const canvasABI = require("../abi/canvas.json");

const ABIMap = new Map<string, any[]>();
ABIMap.set("Token", tokenABI);
ABIMap.set("Oracle", oracleABI);
ABIMap.set("Canvas", canvasABI);

export const abiFetcher = (abiName: "Canvas" | "Oracle" | "Token") => {
  const abi = ABIMap.get(abiName);
  return abi;
};
