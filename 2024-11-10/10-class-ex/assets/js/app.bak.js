// read json from url assets/json/stores.json

let stores = JSON.httpGet("assets/json/stores.json");

const storeJson = JSON.stringify(stores);
console.log(storeJson);