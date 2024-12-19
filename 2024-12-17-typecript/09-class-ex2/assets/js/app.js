document.getElementById('myForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.getElementById("message");
    if (message) {
        console.log(message.value);
    }
    else {
        console.error("Message element not found");
    }
});
function test() {
}
const toy = {
    name: 'yorkshare',
    eat: () => { console.log('eating Bonzo'); }
};
// Corrected the type of yossi to Animal
const yossi = toy;
