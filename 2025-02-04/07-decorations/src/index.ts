function Mammal(target: any): any {
    return class extends target {
        birthDate = new Date();
    }
}

function min(value:number){
    return function(target: any){}
}

class Animal {}

@Mammal
class Lion extends Animal {
  weight: number;

  constructor(weight: number) {
    super();
    this.weight = weight;
  }

  sayHello() {
    console.log("roaring.... ha hah ahahahaahah");
  }
}

const simba = new Lion(400);

console.log(simba);
