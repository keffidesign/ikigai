const fs = require('fs');

const data = fs.readFileSync('/Users/epam1/Git/ikigai/mockups/dataset.json');

const data1 = JSON.parse(data);

data1.map(item => item.createdAt = randomDate(new Date(2017, 0, 1), new Date()));


function randomDate(start, end) {
  return (new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).valueOf();
}

fs.writeFileSync('/Users/epam1/Git/ikigai/mockups/dataset1.json', JSON.stringify(data1, null, 2));
