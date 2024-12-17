"use strict";

(() => {
const users =  {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
};

  document.getElementById("b1").addEventListener("click", () => {
    const elements = printPropertyOfAllObjects(users);
    console.log(elements);
  });

  document.getElementById("b2").addEventListener("click", () => {
    const elements = printPropertyOfAllObjectsV2(users);
    console.log(elements);
  });

  const printPropertyOfAllObjects = (obj, prefix = "") => {
    let elements = [];
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        elements = elements.concat(printPropertyOfAllObjects(obj[key], `${prefix}${key}.`));
      } else {
        elements.push(`${prefix}${key}`);
      }
    }
    return elements;
  };

  const printPropertyOfAllObjectsV2 = (obj) => {
    let elements = [];
    let stack = [{ obj, prefix: "" }];

    while (stack.length > 0) {
        const { obj, prefix } = stack.pop();

        for (const key in obj) {
            if (typeof obj[key] === "object") {
                stack.push({ obj: obj[key], prefix: `${prefix}${key}.` });
            } else {
                elements.push(`${prefix}${key}`);

            }
        }
    }

    return elements;
};
})();
