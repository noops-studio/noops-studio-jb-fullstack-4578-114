const myName = 'notnot';
hasName(!!myName);
function hasName(hasName) {
    if (hasName) {
        console.log(`Hello ${myName}`);
    }
}
