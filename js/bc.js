// Within localhost.js the state menu is moved into the hero image area by the following:
// relocatedStateMenu.appendChild(state_select);

if(typeof localObject == 'undefined') {
  var localObject = {};
}
if(typeof localObject.state == 'undefined') {
  localObject.state = {}; // Holds states.
}
var previousStateBC = "";

function showLocationStats() {
  var stateImpact = {};
  let hash = getHash();
  if (hash.state) {
    loadLocationStats(hash); // New list
  }
  previousStateBC = hash.state;
}

document.addEventListener('hashChangeEvent', function (elem) {
  hash = getHash();
  if (hash.state != previousStateBC) {
    loadLocationStats(hash)
  } else if (!hash.state) {
    $("#dataDisplay").hide();
  }
  previousStateBC = hash.state;
}, false);


function loadLocationStats(hash) {
  /*
  // Prior used csv file
  d3.text("/apps/carbon/5_22-data-06_06.csv").then(function(data) {
      stateImpact = d3.csvParseRows(data);
      console.log("loadLocationStats - stateImpact row count: " + stateImpact.length);
      //alert(stateImpact);

        let theStateName = "";
        if (param.state) {
          theStateName = $("#state_select").find(":selected").text();
          //alert("theStateName " + theStateName);
          setTimeout( function() {
            theStateName = $("#state_select").find(":selected").text();
            if(!theStateName) { // Hack. We need to instead trigger when #state_select menu becomes available.
              theStateName = "No State Found"
            }
            displayStateImpact(theStateName);
          }, 1000 ); // Allow time for state dropdown to load.
        }
  });
  */
  //

  if (Object.keys(localObject.state).length > 0) { // Use previously loaded
    //alert("found existing")
    $(document).ready(function () {
        displayStateImpact(hash, localObject.state);
    });
  } else { // Just add first time
    var url = "https://model.earth/beyond-carbon-scraper/fused/result.json"; // Also resides in localsite/js/map-filters.js


    // You can also use d3 fetch 
    // https://stackoverflow.com/questions/59307256/fetch-json-data-using-authorization-header-in-d3-v5
    var fullHtml = "";

    d3.json(url).then(function(json,error) {
      
      let rowcount = 0;

      /*
      localObject.state = $.extend(true, {}, json); // Clone/copy object without entanglement
      $.each(localObject.state , function(key,val) {             
          //alert(key+val);
          if (val["jurisdiction"]) {
            //stateImpactArray.push(val)

            //localObject.state.push(val)
            rowcount++;
          }
      });
      //alert("rowcount " + rowcount);
      */

      //stateImpact = $.extend(true, {}, json); // Clone/copy object without entanglement
      localObject.state = $.extend(true, {}, json); // Clone/copy object without entanglement

      /*
      $.each(stateImpact, function(key,val) {             
          //alert(key+val);
          if (val["jurisdiction"]) {
            //stateImpactArray.push(val)

            localObject.state.push(key,val)
            rowcount++;
          }
      });
      */



      if (hash.state) {

          $(document).ready(function () {
            //displayStateImpact(hash,localObject.state);
            displayStateImpact(hash,localObject.state);
          });

      }

      //alert("there " + localObject.state.length)

      /*
      if (Array.isArray(json)) { // Other than DifBot - NASA when count included
        for (a in json) {
          fullHtml += "<div class='level1'><b>Product ID:</b> " + json[a].id + "</div>\n";
          for (b in json[a]) {
            fullHtml += formatRow(b,json[a][b],1); // Resides in localsite.js
          }
        }
      } else {
        alert("not array")
        if (!json.data) {
          //json.data = json; // For NASA
        }
      }
      alert(fullHtml);
      */

      if (error) throw error;


    });
  }

}

function stateInsert(stateText, theStateName) {
  return(stateText.replace("[XX]" || "[XX's]", theStateName) )
}
function displayStateImpact(hash,stateImpact) {

  let theStateName = "";
  if (hash.state) {
    theStateName = getState(hash.state.split(",")[0].toUpperCase()); // Resides in localsite.js
  }
  console.log("theStateName from displayStateImpact: " + theStateName);
  //alert("theStateName " + theStateName);
  if (theStateName.length <= 0) {
    //alert("No state")
    $("#about-profile").show();
    $("#choose-counties").hide();
    $("#dataDisplay").hide();
    return;
  } else {
    $("#stateName").text(theStateName);
    $("#choose-your-state-intro").hide();
    $("#choose-counties").show();
  }
  $("#about-profile").hide();
  
  

  let dataRow = "";

  console.log("stateImpact");
  console.log(stateImpact);

  //alert("stateImpact.length " + stateImpact.length);
  //alert(stateImpact[theStateName].clean_energy_commitment);

  dataRow += "<div style='float:right; margin-left:15px;border-left:1px solid #ccc; padding-left:10px'>"
    dataRow += "CO<sub>2</sub> per capita: " + stateImpact[theStateName].CO2_per_capita + " (tons)<br>";
    dataRow += "CO<sub>2</sub> per 1000 miles: " + stateImpact[theStateName].CO2_per_1000_miles + " (tons)<br>";
  
    dataRow += "CO<sub>2</sub> Emissions: " + stateImpact[theStateName].CO2_emissions + "<br>";
    dataRow += "CO<sub>2</sub> Percent: " + stateImpact[theStateName].CO2_percent + "%<br>";
    dataRow += "Population: " + stateImpact[theStateName].population.toLocaleString() + "<br>";
    dataRow += "Population percent: " + stateImpact[theStateName].population_percent + "%<br>";
  dataRow += "</div>"

  dataRow += "<div>"
    dataRow += stateInsert(stateImpact[theStateName].energy_efficency_rank,theStateName) + "<br>";
    
    if (stateImpact[theStateName].clean_energy_commitment == "No") {
      dataRow += theStateName + " has not committed to 100% clean energy.<br>";
    } else if (stateImpact[theStateName].clean_energy_commitment == "Yes") {
      dataRow += theStateName + " has committed to 100% clean energy!<br>";
    } else {
      //dataRow += stateInsert(stateImpact[theStateName].clean_energy_commitment,theStateName) + "<br>";
    }
    dataRow += stateInsert(stateImpact[theStateName].clean_energy_target_percent,theStateName) + "<br>";
    
    if (stateImpact[theStateName].carbon_pollution_reduction_goal_percent == "No") {
        dataRow += theStateName + " has no goal for reducing carbon pollution across the entire economy.<br>"
    } else {
      dataRow += stateInsert(stateImpact[theStateName].carbon_pollution_reduction_goal_percent,theStateName) + "<br>";
    }
    if (stateImpact[theStateName].electric_vehicle_goals == "No") {
      dataRow += theStateName + " has no goals or incentives for electric vehicles.<br>"
    } else {
      dataRow += stateInsert(stateImpact[theStateName].electric_vehicle_goals,theStateName) + "<br>";
    }
    //dataRow += "CO<sub>2</sub> Rank: #" + stateImpact[theStateName].CO2_rank + " by the American Council for an Energy-Efficient Economy<br>";
  dataRow += "</div><br>"


  $("#dataDisplay").html(dataRow);
  $("#dataDisplay").show();

  //$("#dataHeader").html(dataRow);
}


function statePhrase(stateRow, rowIndex, theStateName) {
  return(stateRow[rowIndex].replace("[XX]" || "[XX's]", theStateName) )
}
function displayStateImpactXXX(theStateName) {
  alert("displayStateImpact: " + theStateName);
  if (theStateName.length <= 0) {
    //alert("test")
    $("#about-profile").show();
    $("#choose-counties").hide();
    $("#dataDisplay").hide();
    return;
  } else {
    $("#choose-your-state-intro").hide();
    $("#choose-counties").show();
  }
  $("#about-profile").hide();
  
  $("#dataDisplay").show();

  let rowcount = 0;
  let dataRow = "";
  
  for(var i = 0; i < stateImpact.length; i++) {
    rowcount++;
    if (stateImpact[i][0]==theStateName) {
      
      dataRow += "<table id='resultsTable'>";
      dataRow += "<tr><td><div style='float:right;font-size:11px;padding-top:10px'>Source: <a target='_blank' href='https://beyondcarbon.org'>BeyondCarbon.org</a></div><div style='float:left;font-size:22px;font-weight:500'>" + theStateName + " Clean Energy Progress</div></td></tr>"
      dataRow += "<tr><td>" + statePhrase(stateImpact[i], 5, theStateName) + "</td></tr>"
      dataRow += "<tr><td>Has " + theStateName + " committed to 100% clean energy? " + statePhrase(stateImpact[i], 1, theStateName) + "</td></tr>"
      dataRow += "<tr><td>" + statePhrase(stateImpact[i], 2, theStateName)  + "</td></tr>"
      dataRow += "<tr><td>Does " + theStateName + " have a goal for reducing carbon pollution across the entire economy? " + statePhrase(stateImpact[i], 3, theStateName)  + "</td></tr>"
      dataRow += "<tr><td>Does " + theStateName + " have goals or incentives for electric vehicles? " + statePhrase(stateImpact[i], 4, theStateName) + "</td></tr>"
      dataRow += "</table>";
    }
  }
  //alert("rowcount " + rowcount);
  //$(dataRow).insertAfter($("#dataHeader"));

  $("#dataDisplay").html(dataRow);
  //$("#dataHeader").html(dataRow);
}


