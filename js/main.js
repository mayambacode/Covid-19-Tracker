// main.js
// name, date, description
// description

// global
let go = {};

// const 
const URL = "http://ejd.songho.ca//ios/covid19.json";
const MS_PER_DAY = 1000 * 60 * 60 * 24; // ms per day

//main entry point
document.addEventListener("DOMContentLoaded", main);
function main() {

    Logger.open();
    log("page is loaded");

    // init DOM elements

    // 2. load JSON and parse
    fetch(URL)
    .then(response => {
        if(!response.ok){
            throw new Error("Network response was not OK");
        }
        return response.json();
    })
    .then( json => parseJson(json))
    .catch(e => log(e.message));

    

    changeProvince("Ontario");

    console.log("main is working!");
}

// process JSON data
function parseJson (json) {
   // log("parsing is called");
    console.log("parsing is called!");
   //remember the original JSON data
   go.json = json;

   // compute # of dates
   let firstMs = new Date(go.json[0].date).getTime();
   let lastMs = new Date(go.json[go.json.length-1].date).getTime();
   let dateCount =  (lastMs - firstMs) / MS_PER_DAY + 1;
    log("Date count: " + dateCount);

   // generate dates array
   go.date = []; // empty array
   for(let i = firstMs; i <= lastMs; i+= MS_PER_DAY) {
       
        let date = new Date(i).toISOString().substring(0, 10);
        go.date.push(date);
   }
   //log(go.dates.length);

   // set/remember initial date index

   // initial change province
   
}

function changeProvince(provinceName) {
    
    //go.json = json;

    let provinceData = go.json.filter( provinceData => provinceData.name === provinceName);
   // go.provinceName = go.json.filter( provinceData => provinceData.length);

    values = []; // create/init an empty array
    let count = go.date.length; // set iteration count

    for (let i = 0; i < count; i++) {

        let date = go.date[i];
        let data = provinceData.find(item => item.date === date); 
        if (data)
            values[i] = data.numtodays; 
        else
            values[i] = 0;
    }
    // province names 
    let comboprovince = document.getElementById("comboprovince");
    for (let i = 0; i < go.json; i++) {
        
      let newOpt =  document.createElement("option");
      newOpt.append("comboprovince"); 
      newOpt.textContent = go.json[i].prname;
      newOpt.value = go.json[i].prname;
    }

    console.log("changeProvince Works!");

    
}

function displayLatestDAte() {
    const dailyCases = document.getElementById("dailyNum");
    const totalCases = document.getElementById("totalNum");

    
}

