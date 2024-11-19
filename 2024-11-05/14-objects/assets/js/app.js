const emp={
privetname: 'John',
lastname: 'Doe',
salary: 1000
};


for(const proparty in emp){
    document.write(`${proparty} : ${emp[proparty]} <br>`);
}

emp.address='USA';
delete emp.salary;

document.write(emp.salary);