const tabs = document.querySelectorAll(".tab");
const basicPanel = document.getElementById("basicPanel");
const gpaPanel = document.getElementById("gpaPanel");
tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(t => t.classList.toggle("active", t === tab));
  basicPanel.classList.toggle("hidden", tab.dataset.tab !== "basic");
  gpaPanel.classList.toggle("hidden", tab.dataset.tab !== "gpa");
}));

let current = "0", stored = null, operation = null, fresh = false;
const result = document.getElementById("calcResult");
const expression = document.getElementById("calcExpression");
const message = document.getElementById("calcMessage");
function showCalc(){ result.textContent = current; }
function calculate(a,b,op){
  if(op === "+") return a+b;
  if(op === "-") return a-b;
  if(op === "*") return a*b;
  if(op === "/") return b === 0 ? null : a/b;
  return b;
}
document.querySelectorAll(".key").forEach(key => key.addEventListener("click", () => {
  if(key.dataset.num !== undefined){
    const n = key.dataset.num;
    if(fresh){ current = n === "." ? "0." : n; fresh = false; }
    else if(n === "." && current.includes(".")) return;
    else current = current === "0" && n !== "." ? n : current + n;
    showCalc(); message.textContent = "Enter an operation or another number.";
  } else if(key.dataset.op){
    stored = Number(current); operation = key.dataset.op; fresh = true;
    expression.textContent = `${stored} ${operation} …`;
    message.textContent = "Now enter the second number.";
  } else if(key.dataset.action === "clear"){
    current = "0"; stored = null; operation = null; fresh = false;
    expression.textContent = "Ready when you are"; showCalc(); message.textContent = "Calculator cleared.";
  } else if(key.dataset.action === "back"){
    current = current.length > 1 ? current.slice(0,-1) : "0"; showCalc();
  } else if(key.dataset.action === "equals"){
    if(stored === null || !operation) { message.textContent = "Choose an operation first."; return; }
    const second = Number(current), answer = calculate(stored,second,operation);
    if(answer === null){ message.textContent = "You cannot divide by zero."; return; }
    expression.textContent = `${stored} ${operation} ${second} =`;
    current = String(Number(answer.toFixed(8))); stored = null; operation = null; fresh = true;
    showCalc(); message.textContent = "Calculation complete.";
  }
}));

const marksGrid = document.getElementById("marksGrid");
for(let i=1;i<=5;i++){
  const box = document.createElement("div");
  box.className = "mark-box";
  box.innerHTML = `<label for="mark${i}">Subject ${i}</label><input class="mark-input" id="mark${i}" type="number" min="0" max="100" step="0.01" placeholder="0–100">`;
  marksGrid.appendChild(box);
}
const gpaMessage = document.getElementById("gpaMessage");
document.getElementById("calculateGpa").addEventListener("click", () => {
  const inputs = [...document.querySelectorAll(".mark-input")];
  const marks = inputs.map(input => input.value.trim() === "" ? NaN : Number(input.value));
  if(marks.some(mark => !Number.isFinite(mark) || mark < 0 || mark > 100)){
    gpaMessage.textContent = "Please enter a valid mark from 0 to 100 in all five fields.";
    document.getElementById("gpaResult").classList.add("hidden"); return;
  }
  const percentage = marks.reduce((sum,mark)=>sum+mark,0) / marks.length;
  const gpa = percentage / 100 * 4;
  let grade = "Needs Improvement";
  if(percentage >= 90) grade = "A+";
  else if(percentage >= 80) grade = "A";
  else if(percentage >= 70) grade = "B";
  else if(percentage >= 60) grade = "C";
  document.getElementById("resultGreeting").textContent =
    document.getElementById("studentName").value.trim() ? `Well done, ${document.getElementById("studentName").value.trim()}!` : "Your result is ready!";
  document.getElementById("percentageOut").textContent = percentage.toFixed(2) + "%";
  document.getElementById("gpaOut").innerHTML = gpa.toFixed(2) + '<span class="out-of"> / 4</span>';
  document.getElementById("gradeOut").textContent = grade;
  document.getElementById("gpaResult").classList.remove("hidden");
  gpaMessage.textContent = "Your results have been calculated.";
});
document.getElementById("resetGpa").addEventListener("click", () => {
  document.getElementById("studentName").value = "";
  document.querySelectorAll(".mark-input").forEach(input => input.value = "");
  document.getElementById("gpaResult").classList.add("hidden");
  gpaMessage.textContent = "Enter a mark from 0 to 100 for each subject.";
});
