let chart = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let mode = "assign"; //stores the firts click <td> element

function drawChart() {
  let html = `<table border="1">`;
  for (let i = 0; i < chart.length; i++) {
    html += `<tr>`;
    for (let j = 0; j < chart[i].length; j++) {
      if (chart[i][j] == "") {
        html += `<td  onclick= "cellClicked(this, ${i},${j})" >Empty</td>`;
      } else {
        html += `<td  onclick= "cellClicked(this, ${i},${j})" >${chart[i][j]}</td>`;
      }
    }
    html += `</tr>`;
  }
  html += `</table>`;
  document.getElementById("grid").innerHTML = html;
  updateStats()
}
drawChart();

function cellClicked(cell, row, col) {
  if (mode == "assign") {
    let name = document.getElementById("name").value.trim();
    if (name === ""){
      document.getElementById("message").innerHTML =
        `⚠️ Type a name first!`;
      drawChart();
      return;
    }
    if (cell.innerHTML !== "Empty") {
      document.getElementById("message").innerHTML = `⚠️ Seat already taken!`;
      drawChart();
      return;
    }
    chart[row][col] = name;
    document.getElementById("name").value = "";
    document.getElementById("message").innerHTML = `Assigned!`
    drawChart();
  }else{
    if(cell.innerHTML == "Empty"){
        document.getElementById("message").innerHTML = `⚠️ This seat is already empty`
        drawChart()
        return
    }
    chart[row][col] = "";
    document.getElementById("message").innerHTML = `Removed!`
    drawChart();
  }
}

function assignMode(){
    mode = "assign"
    document.getElementById("mode").innerHTML = `Mode: Assign (click empty seat)`
}
assignMode()

function removeMode(){
    mode = "remove"
    document.getElementById("mode").innerHTML = `Mode: Remove (click filled seat)`
}

function resetChart(cell, row, col) {
  chart = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  document.getElementById("message").innerHTML = `Seating chart reset!`
  drawChart()
}

function updateStats(){
    let filled = 0
    let total = 0
    for(let i = 0; i < chart.length; i++){
        for (let j = 0; j < chart[i].length; j++) {
            total++
            if(chart[i][j] !== ""){
                filled++
            }
        }
    }
    document.getElementById("updateStats").innerHTML = `Assigned Seats: ${filled} / Total Seats: ${total}`
}
