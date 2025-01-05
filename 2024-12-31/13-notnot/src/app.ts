const myName :string = 'notnot';
hasName(!!myName);
function hasName(hasName:boolean){
    if(hasName){
        console.log( `Hello ${myName}`)
    }
}