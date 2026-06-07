/* ==========================================
MODEL PERFORMANCE CHART
========================================== */

new Chart(
document.getElementById("modelChart"),
{
type: "bar",

data: {
labels: [
"Random Forest",
"Gradient Boosting",
"XGBoost",
"LightGBM",
"MLP",
"SVM",
"KNN",
"Logistic Regression"
],

datasets: [{
label: "AUC Score",

data: [
0.989,
0.972,
0.968,
0.965,
0.942,
0.915,
0.894,
0.876
],

backgroundColor: [
"#00c853",
"#42a5f5",
"#5c6bc0",
"#26a69a",
"#ab47bc",
"#ff7043",
"#ffa726",
"#78909c"
]
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
beginAtZero: true,
max: 1
}
}
}
}
);


/* ==========================================
SHAP FEATURE IMPORTANCE
========================================== */

new Chart(
document.getElementById("shapChart"),
{
type: "bar",

data: {

labels: [
"Skewness",
"Std Deviation",
"Observation Count",
"Mean",
"Median"
],

datasets: [{
label: "SHAP Importance",

data: [
0.241,
0.189,
0.143,
0.045,
0.021
],

backgroundColor: "#5e35b1"
}]
},

options: {

indexAxis: "y",

plugins: {
legend: {
display: false
}
}
}
}
);


/* ==========================================
FRAUD DISTRIBUTION
========================================== */

new Chart(
document.getElementById("fraudChart"),
{
type: "doughnut",

data: {

labels: [
"Legitimate",
"Fraud"
],

datasets: [{

data: [
98.1,
1.9
],

backgroundColor: [
"#00c853",
"#e53935"
]
}]
},

options: {
responsive: true
}
}
);
