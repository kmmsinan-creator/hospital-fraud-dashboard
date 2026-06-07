/* ==========================================
EXECUTIVE INSIGHTS
========================================== */

function generateExecutiveInsights(data){

const totalTenders = data.length;

const fraudCases = data.filter(
row => Number(row.y) === 1
).length;

const fraudRate =
((fraudCases / totalTenders) * 100)
.toFixed(2);

let insight = "";

if(fraudRate < 5){

insight =
`
The dataset exhibits a low fraud prevalence
(${fraudRate}%).

This confirms a highly imbalanced procurement
environment where fraudulent tenders are rare.

Such environments require specialized machine
learning approaches such as SMOTE and
ensemble learning methods.
`;

}
else{

insight =
`
Fraud prevalence exceeds expected procurement
benchmarks and requires further investigation.
`;

}

document.getElementById(
"executiveInsight"
).innerHTML = insight;

}


/* ==========================================
SEARCH TENDER
========================================== */

function searchTender(){

const tenderId =
document.getElementById("searchInput")
.value.trim();

if(!window.dashboardData){

return;
}

const tender =
window.dashboardData.find(
row => String(row.id) === tenderId
);

if(!tender){

document.getElementById(
"searchResult"
).innerHTML =
`
<div class="risk-box high">
Tender not found
</div>
`;

return;
}

const riskScore =
calculateRiskScore(tender);

const riskLevel =
classifyRisk(riskScore);

document.getElementById(
"searchResult"
).innerHTML =
`
<div class="risk-box ${riskLevel.class}">

<h3>Tender ID: ${tender.id}</h3>

<p>
Risk Score:
<strong>${riskScore}</strong>
</p>

<p>
Risk Level:
<strong>${riskLevel.label}</strong>
</p>

</div>
`;

}


/* ==========================================
RISK SCORING DEMO
========================================== */

function calculateRiskScore(tender){

const skew =
Number(tender.skew);

const std =
Number(tender.std);

const obs =
Number(tender.obs_count);

let score = 0;

score += skew * 0.5;

score += std * 0.3;

score += (10 - obs) * 0.2;

return score.toFixed(2);

}


/* ==========================================
RISK CLASSIFICATION
========================================== */

function classifyRisk(score){

score = Number(score);

if(score >= 5){

return {
label:"High Risk",
class:"high"
};

}

if(score >= 2){

return {
label:"Medium Risk",
class:"medium"
};

}

return {
label:"Low Risk",
class:"low"
};

}


/* ==========================================
BUSINESS RECOMMENDATIONS
========================================== */

function generateRecommendations(){

const recommendations = [

"Prioritize tenders with abnormal skewness patterns.",

"Review procurements with unusually low bidder participation.",

"Investigate tenders exhibiting extreme bid dispersion.",

"Apply SHAP explanations before audit escalation.",

"Use Random Forest scores for risk-based audit planning."

];

let html = "";

recommendations.forEach(item => {

html += `
<li>${item}</li>
`;

});

document.getElementById(
"recommendations"
).innerHTML = html;

}


/* ==========================================
DATA LOADING HOOK
========================================== */

function initializeDashboard(data){

window.dashboardData = data;

generateExecutiveInsights(data);

generateRecommendations();

}


/* ==========================================
AUTO START
========================================== */

document.addEventListener(
"DOMContentLoaded",
function(){

setTimeout(function(){

if(window.dashboardData){

initializeDashboard(
window.dashboardData
);

}

},1500);

}
);
