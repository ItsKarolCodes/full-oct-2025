const fs = require('fs');

const writeCSV = (path, data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map(obj => headers.map(header => obj[header]).join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    fs.writeFileSync("data/" + path + ".csv", csvContent, 'utf8');
};

const readCSV = (path) => {
    const data = fs.readFileSync("data/" + path + ".csv", 'utf8');
    const [headers, ...rows] = data.split('\n').map(row => row.split(','));

    return rows.map(row =>
        row.reduce((obj, value, index) => {
            obj[headers[index]] = value;
            return obj;
        }, {})
    );
};

module.exports = { writeCSV, readCSV };
