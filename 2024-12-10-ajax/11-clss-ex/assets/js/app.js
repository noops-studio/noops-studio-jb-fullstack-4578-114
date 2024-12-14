"use strict";

(() => {
    const sqlQuery = (query, params) => alasql(query, params)
    // Fetch data from the given URL and return the parsed JSON
    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    // Generate HTML rows for table based on fetched data
    const generateTableRows = async (url) => {
        const data = await fetchData(url);

        const rowsHtml = data.map(({ userId, title, completed }) => `
            <tr>
                <td>${userId}</td>
                <td>${title}</td>
                <td>${completed ? '<span class="icon v-icon">✔</span>' : '<span class="icon x-icon">✖</span>'}</td>
            </tr>
        `).join('');

        return rowsHtml;
    };

    // Generate and append the chart for completion statistics
    const generateCompletionChart = async (url) => {
        const data = await fetchData(url);
        const totalTasks = data.length;
        const completedTasks = data.filter(task => task.completed).length;
        const notCompletedTasks = totalTasks - completedTasks;
        const completionRatio = ((completedTasks / totalTasks) * 100).toFixed(2);

        // Chart data
        const chartHtml = `
            <div>
                <h3>Completion Statistics</h3>

                            <table class="table table-bordered">
            <thead>
                <tr>
                    <th>completedTasks</th>
                    <th>notCompletedTasks</th>
                    <th>completionRatio</th>
                </tr>
            </thead>
            <tbody id="table-body1">
                <td>Completed: ${completedTasks}</td>
                <td>Not Completed: ${notCompletedTasks}</td>
                <td>Completion Ratio: ${completionRatio}%</td>
            </tbody>
        </table>
            </div>
        `;

        // Append chart content
        const statisticsContainer = document.getElementById('statistics');
        statisticsContainer.innerHTML = chartHtml;
    };

    // Generate and append user-specific task completion table
const generateUserStatsTable = async (url) => {
    const data = await fetchData(url);

    const userStats = sqlQuery(`
        SELECT 
            userId,
            SUM(CASE WHEN completed THEN 1 ELSE 0 END) AS completed,
            SUM(CASE WHEN NOT completed THEN 1 ELSE 0 END) AS notCompleted FROM ?
        GROUP BY userId
    `, [data]);

    // Generate HTML for the table rows
    const userStatsHtml = userStats.map(({ userId, completed, notCompleted }) => `
        <tr>
            <td>${userId}</td>
            <td>${completed}</td>
            <td>${notCompleted}</td>
        </tr>
    `).join('');

    // Populate the user stats table body
    const tableBody = document.querySelector('#user-stats tbody');
    tableBody.innerHTML = userStatsHtml;
};

    // Handle button click to render data
    document.getElementById('imager').addEventListener('click', async () => {
        const url = 'https://jsonplaceholder.typicode.com/todos';

        // Generate and render the main task table
        const tableRows = await generateTableRows(url);
        document.getElementById('table-body').innerHTML = tableRows;

        // Generate and append the completion chart
        await generateCompletionChart(url);

        // Generate and append the user-specific stats table
        await generateUserStatsTable(url);
    });
})();
