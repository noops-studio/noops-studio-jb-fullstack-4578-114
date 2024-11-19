let stores = [
  {
    storeName: "Samsung",
    address: [
      {
        street: "Main St",
        city: "Dallas",
        Number: 123
      }
    ],
    products: [
      {
        name: "Galaxy S10",
        price: 999.99
      },
      {
        name: "Galaxy Note 10",
        price: 1099.99
      },
      {
        name: "Galaxy Fold",
        price: 1999.99
      },
    ]
  }
];


const storeJson = JSON.stringify(stores);
console.log(storeJson);