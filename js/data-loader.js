/* ==========================================
LOAD TRAIN DATASET
========================================== */

Papa.parse("assets/train.csv", {

download: true,
header: true,
dynamicTyping: true,

complete: function(results) {

const data = results.data.filter(
row => row.id !== undefined
);

updateKPIs(data);

createHistogram(
"skewChart",
data,
"skew",
"Skewness Distribution"
);

createHistogram(
"stdChart",
data,
"std",
"Standard Deviation Distribution"
);

createHistogram(
"meanChart",
data,
"mean",
"Mean Distribution"
);

createHistogram(
"medianChart",
data,
"median",
"Median Distribution"
);

}

});


/* ==========================================
KPI CALCULATIONS
========================================== */

function updateKPIs(data){

const totalTenders = data.length;

const fraudCases = data.filter(
row => Number(row.y) === 1
).length;

const fraudRate =
((fraudCases / totalTenders) * 100)
.toFixed(2);

document.getElementById(
"totalTenders"
).innerText = totalTenders;

document.getElementById(
"fraudCases"
).innerText = fraudCases;

document.getElementById(
"fraudRate"
).innerText = fraudRate + "%";

}


/* ==========================================
HISTOGRAM GENERATOR
========================================== */

function createHistogram(
canvasId,
data,
column,
title
){

const values = data
.map(row => Number(row[column]))
.filter(v => !isNaN(v));

if(values.length === 0) return;

const bins = 10;

const min = Math.min(...values);
const max = Math.max(...values);

const step = (max - min) / bins;

const counts =
new Array(bins).fill(0);

values.forEach(v => {

let index =
Math.floor((v - min) / step);

if(index >= bins){
index = bins - 1;
}

counts[index]++;

});

const labels = [];

for(let i=0;i<bins;i++){

const start =
(min + i * step).toFixed(2);

const end =
(min + (i+1) * step).toFixed(2);

labels.push(
start + " - " + end
);

}

new Chart(
document.getElementById(canvasId),
{

type: "bar",

data: {

labels: labels,

datasets: [{

label: title,

data: counts,

backgroundColor: "#1e88e5",

borderRadius: 6

}]
},

options: {

responsive: true,

plugins: {

legend: {
display: false
}

},

scales: {

y: {
beginAtZero: true
}

}

}

}
);

}
