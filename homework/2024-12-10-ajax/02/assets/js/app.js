(() => {
    const getData = (url) => {
        return fetch(url).then(response => response.json())
    }

    console.log(getData('https://jsonplaceholder.typicode.com/users'))

    const generateHtml = (dataArr) => {
        const arr = dataArr

        const html = arr.map(name => `
        <tr>
            <td>${name.name}</td>
            <td>${name.username}</td>
            <td>${name.email}</td>
            <td>${name.phone}</td>
            <td>${name.address.city}</td>
            <td>${name.address.street}</td>
            <td>${name.address.zipcode}</td>
            <td>${name.company.name}</td>

        </tr>
        `).join('')
        console.log(html)
        return html

    }
    const renderChart = newHTML => document.getElementById('chartplaceholder').innerHTML = newHTML
    const renderStatsChart = newHTML => document.getElementById('chartyMini').innerHTML = newHTML

    const calculateStats = (dataArr) => {
        const usernameCount = dataArr.length;

        const totalLat = dataArr.reduce((sum, item) => sum + parseFloat(item.address.geo.lat), 0);
        const totalLng = dataArr.reduce((sum, item) => sum + parseFloat(item.address.geo.lng), 0);
        const avgLat = totalLat / usernameCount;
        const avgLng = totalLng / usernameCount;
        console.log({ usernameCount, avgLat, avgLng })
        return { usernameCount, avgLat, avgLng };
    };

    const generateStatsHtml = (dataArr) => {
        const arr = dataArr

        const html = arr.map(data => `
    <tr>
        <td>${data.usernameCount}</td>
        <td>${data.avgLat}</td>
        <td>${data.avgLng}</td>


    </tr>
    `).join('')
        console.log(html)
        return html
    }

    const generateUsersTable = (arr) => {
        const data = arr
        console.log(typeof arr)
        const headers = {
            'name': 'שם',
            'username': 'שם משתמש',
            'email': 'אימייל',
            'phone': 'טלפון',
            'address.city': 'עיר',
            'address.street': 'רחוב',
            'address.zipcode': 'מיקוד',
            'company.name': 'שם החברה'
        };
   return generateTable(headers, data)
    }

    document.addEventListener('DOMContentLoaded', async () => {

        const usersData = await getData('https://jsonplaceholder.typicode.com/users')
        console.log(usersData)
        renderChart(generateUsersTable(usersData))

        const stats = await calculateStats(usersData)
        renderStatsChart(generateStatsHtml([stats]))

    })
})()