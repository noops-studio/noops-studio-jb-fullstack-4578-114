document.getElementById('myForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.getElementById("message") as HTMLInputElement;
  if (message) {
    console.log(message.value);
  } else {
    console.error("Message element not found");
  }
}); 

function test() {
  type Human = {
    name: string | undefined,
    middleName?: string,
    familyName: string,
    age: number,
    birthday: Date,
  };
  type Animal = {
    name: string,
    eat: Function,
  };

}
type Human = {
  name: string | undefined,
  middleName?: string,
  familyName: string,
  age: number,
  birthday: Date,
};
type Animal = {
  name: string,
  eat: Function,
};
const toy: Animal = {
  name: 'yorkshare',
  eat: () => { console.log('eating Bonzo') }
}

// Corrected the type of yossi to Animal
const yossi: Human = toy as unknown as Human;