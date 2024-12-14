// Function to generate the HTML table
function generateTable(headerMappings, data) {
    // Create the container div
    const container = document.createElement('div');
    container.className = 'container mt-5';

    // Create and append the heading
    const heading = document.createElement('h2');
    heading.className = 'mb-4';
    heading.textContent = 'chart';
    container.appendChild(heading);

    // Create the table element
    const table = document.createElement('table');
    table.className = 'table table-striped table-bordered';

    // Create the table head
    const thead = document.createElement('thead');
    thead.className = 'table-primary';
    const headerRow = document.createElement('tr');

    Object.keys(headerMappings).forEach(headerKey => {
        const th = document.createElement('th');
        th.textContent = headerMappings[headerKey];
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create the table body
    const tbody = document.createElement('tbody');
    tbody.id = 'charty';

    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.keys(headerMappings).forEach(headerKey => {
            const td = document.createElement('td');
            // Resolve nested keys like "geo.lng"
            const value = headerKey.split('.').reduce((acc, key) => acc && acc[key], row) || '';
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);

    // Return the HTML as a string
    return container.outerHTML;
}

const getFormData = (formId) => {
    const form = document.getElementById(`${formId}`); // Corrected string interpolation
    if (!form) {
        throw new Error(`Form with id "${formId}" not found.`);
    }
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    return formObject;
};

