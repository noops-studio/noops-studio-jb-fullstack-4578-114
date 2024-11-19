document.body.style.backgroundColor = "white";

const h2 = document.createElement("h2");
h2.textContent = "Search/Filter Dropdown";
document.body.appendChild(h2);

const p = document.createElement("p");
p.textContent = "Click on the button to open the dropdown menu, and use the input field to search for a specific dropdown link.";
document.body.appendChild(p);

const dropdown = document.createElement("div");
dropdown.classList.add("dropdown");
document.body.appendChild(dropdown);

const button = document.createElement("button");
button.classList.add("dropbtn");
button.textContent = "Dropdown";
button.onclick = myFunction;
dropdown.appendChild(button);

const dropdownContent = document.createElement("div");
dropdownContent.id = "myDropdown";
dropdownContent.classList.add("dropdown-content");
dropdown.appendChild(dropdownContent);

const input = document.createElement("input");
input.type = "text";
input.placeholder = "Search..";
input.id = "myInput";
input.onkeyup = filterFunction;
dropdownContent.appendChild(input);

const links = ["About", "Base", "Blog", "Contact", "Custom", "Support", "Tools"];
links.forEach(text => {
  const a = document.createElement("a");
  a.href = `#${text.toLowerCase()}`;
  a.textContent = text;
  dropdownContent.appendChild(a);
});

// Styles
const style = document.createElement("style");
style.textContent = `
  .dropbtn {
    background-color: #04AA6D;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  .dropbtn:hover, .dropbtn:focus {
    background-color: #3e8e41;
  }
  #myInput {
    box-sizing: border-box;
    background-image: url('searchicon.png');
    background-position: 14px 12px;
    background-repeat: no-repeat;
    font-size: 16px;
    padding: 14px 20px 12px 45px;
    border: none;
    border-bottom: 1px solid #ddd;
  }
  #myInput:focus {outline: 3px solid #ddd;}
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f6f6f6;
    min-width: 230px;
    overflow: auto;
    border: 1px solid #ddd;
    z-index: 1;
  }
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  .dropdown a:hover {background-color: #ddd;}
  .show {display: block;}
`;
document.head.appendChild(style);

// Functions
function myFunction() {
  dropdownContent.classList.toggle("show");
}

function filterFunction() {
  const filter = input.value.toUpperCase();
  const a = dropdownContent.getElementsByTagName("a");
  for (let i = 0; i < a.length; i++) {
    const txtValue = a[i].textContent || a[i].innerText;
    a[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
  }
}
