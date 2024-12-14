// (() => {
//     const getData = (url) => {
//         return fetch(url).then(response => response.json())
//     }

//     console.log(getData('https://jsonplaceholder.typicode.com/users'))


//     const renderChart = newHTML => document.getElementById('chartPlaceHolder').innerHTML = newHTML
 
    

   

//     const generateUsersTable = (arr) => {
//         const data = arr
//         console.log(typeof arr)
//         const headers = {
//             'name': 'שם',
//             'username': 'שם משתמש',
//             'email': 'אימייל',
//             'phone': 'טלפון',
//             'address.city': 'עיר',
//             'address.street': 'רחוב',
//             'address.zipcode': 'מיקוד',
//             'company.name': 'שם החברה'
//         };
//         return generateTable(headers, data)
//     }




//     document.addEventListener('DOMContentLoaded', async () => {
//         console.log('DOM Loaded');

//         document.getElementById('formi').addEventListener('submit', (event) => {
//             event.preventDefault(); // Prevent form submission

//             console.log(document.getElementById('id'))
//             // now we will fethc the valeu of the input with id id 
//             const id = document.getElementById('id').value;
//             console.log(id)
//             getData(`https://jsonplaceholder.typicode.com/users/${id}`).then(data => {
//                 console.log(data)
//                 renderChart(generateUsersTable([data]))
//             });

//         });
//     });




// })()
(() => {
    const getData = (url) => {
        return fetch(url).then(response => response.json());
    };

    const renderData = (data) => {
        const container = document.getElementById('dataPlaceHolder');
        container.innerHTML = `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; color: #333;">User Information</h2>
                <div><strong>שם:</strong> ${data.name}</div>
                <div><strong>שם משתמש:</strong> ${data.username}</div>
                <div><strong>אימייל:</strong> ${data.email}</div>
                <div><strong>טלפון:</strong> ${data.phone}</div>
                <div><strong>עיר:</strong> ${data.address.city}</div>
                <div><strong>רחוב:</strong> ${data.address.street}</div>
                <div><strong>מיקוד:</strong> ${data.address.zipcode}</div>
                <div><strong>שם החברה:</strong> ${data.company.name}</div>
            </div>
        `;
    };

    document.addEventListener('DOMContentLoaded', async () => {
        console.log('DOM Loaded');

        document.getElementById('formi').addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent form submission

            const id = document.getElementById('id').value;
            console.log(id);
            getData(`https://jsonplaceholder.typicode.com/users/${id}`).then(data => {
                console.log(data);
                renderData(data);
            });
        });
    });
})();
