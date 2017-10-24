import jsonfile from "jsonfile";
import fetchExodusMovementTokens from "./fetchExodusMovementTokens";
import fetchKvhnukeTokens from "./fetchKvhnukeTokens";

Promise.all([fetchKvhnukeTokens(), fetchExodusMovementTokens()])
  .then(([kvhnukeTokens, exodusMovementTokens]) =>
    kvhnukeTokens.map(kvhnukeToken => {
      const exodusMovementToken =
        exodusMovementTokens.find(t => t.contractAddress === kvhnukeToken.address) || {};

      return {
        ...kvhnukeToken,
        name: exodusMovementToken.properName || kvhnukeToken.symbol,
        color: exodusMovementToken.color,
      };
    })
  )
  .then(tokens => {
    jsonfile.writeFile("eth-tokens.json", tokens, err => {
      console.error(err);
    });
  });
