import fetch from "isomorphic-fetch";

export default () =>
  fetch(
    "https://raw.githubusercontent.com/kvhnuke/etherwallet/mercury/app/scripts/tokens/ethTokens.json",
    {
      method: "GET",
      mode: "cors",
      cache: "default",
    }
  )
    .then(response => {
      if (response.status === 204 || response.s) {
        return [];
      }

      return response.json().then(json => ({ json, response }));
    })
    .then(({ json, response }) => {
      if (response.ok) {
        return json;
      }

      return [];
    })
    .catch(error => {
      console.log("Request failed", error);
    });
