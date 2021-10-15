//loadMarkdown("../../community/challenge/README.md", "readmeDiv", "_parent");

// Within localhost.js the state menu is moved into the hero image area by the following:
// relocatedStateMenu.appendChild(state_select);

if(typeof param == 'undefined') {
  var param = {};
}
var stateImpact = {};
var stateImpactArray = [];
$(document).ready(function() {

  // `hashChangeEvent` event reside in multiple widgets. Also called by involking goHash() within localsite.js
  document.addEventListener('hashChangeEvent', function (elem) {
      let hash = getHash();

      if (hash.state) {
        //let theStateName = $("#state_select").find(":selected").text();
        let theStateName = getState(hash.state.split(",")[0].toUpperCase());

        console.log("theStateName from hashChangeEvent: " + theStateName);
        displaystateImpact(theStateName,stateImpact);
      } else {
        $("#dataDisplay").hide();
      }
  }, false);

  //stateImpact = 
  loadHtmlTable(true); // New list
});


function loadHtmlTable(applyFilter) {
  
  /*
  // Prior used csv file
  d3.text("/apps/beyondcarbon/5_22-data-06_06.csv").then(function(data) {
      stateImpact = d3.csvParseRows(data);
      console.log("loadHtmlTable - stateImpact row count: " + stateImpact.length);
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
            displaystateImpact(theStateName);
          }, 1000 ); // Allow time for state dropdown to load.
        }
  });
  */

  // 
  
  

    var url = "https://model.earth/beyond-carbon-scraper/fused/result.json";

    // You can also use d3 fetch 
    // https://stackoverflow.com/questions/59307256/fetch-json-data-using-authorization-header-in-d3-v5
    var fullHtml = "";

    d3.json(url).then(function(json,error) {
      stateImpact = $.extend(true, {}, json); // Clone/copy object without entanglement
      if (param.state) {
        //theStateName = $("#state_select").find(":selected").text();
        let theStateName = getState(param.state);

          $(document).ready(function () {
            displaystateImpact(theStateName, stateImpact);
          });

      }

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
      //console.log("stateImpact");
      //return(stateImpact);
      
      let rowcount = 0;
      stateImpactArray = [];
      $.each(stateImpact, function(key,val) {             
          //alert(key+val);
          if (val["jurisdiction"]) {
            stateImpactArray.push(val)
            rowcount++;
          }
      });
      //alert("rowcount " + rowcount)
      console.log("stateImpactArray");
      console.log(stateImpactArray);

  });


}

function statePhrase(stateRow, rowIndex, theStateName) {
  return(stateRow[rowIndex].replace("[XX]" || "[XX's]", theStateName) )
}
function stateInsert(stateText, theStateName) {
  return(stateText.replace("[XX]" || "[XX's]", theStateName) )
}

function displaystateImpact(theStateName,stateImpact) {
  if (theStateName.length < 0) {
    alert("theStateName: " + theStateName);
    return;
  }
  if(!theStateName || theStateName == "Choose a location...") { // Hack. We need to instead trigger when #state_select menu becomes available.
    theStateName = "Alabama";
    console.log("No State Found");
  }

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
  //$("#dataHeader").html(dataRow);
}


function displaystateImpactXXX(theStateName) {
  alert("displaystateImpact: " + theStateName);
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

function getState(stateCode) {
  switch (stateCode)
  {
      case "AL":
          return "Alabama";

      case "AK":
          return "Alaska";

      case "AS":
          return "American Samoa";

      case "AZ":
          return "Arizona";

      case "AR":
          return "Arkansas";

      case "CA":
          return "California";

      case "CO":
          return "Colorado";

      case "CT":
          return "Connecticut";

      case "DE":
          return "Delaware";

      case "DC":
          return "District Of Columbia";

      case "FM":
          return "Federated States Of Micronesia";

      case "FL":
          return "Florida";

      case "GA":
          return "Georgia";

      case "GU":
          return "Guam";

      case "HI":
          return "Hawaii";

      case "ID":
          return "Idaho";

      case "IL":
          return "Illinois";

      case "IN":
          return "Indiana";

      case "IA":
          return "Iowa";

      case "KS":
          return "Kansas";

      case "KY":
          return "Kentucky";

      case "LA":
          return "Louisiana";

      case "ME":
          return "Maine";

      case "MH":
          return "Marshall Islands";

      case "MD":
          return "Maryland";

      case "MA":
          return "Massachusetts";

      case "MI":
          return "Michigan";

      case "MN":
          return "Minnesota";

      case "MS":
          return "Mississippi";

      case "MO":
          return "Missouri";

      case "MT":
          return "Montana";

      case "NE":
          return "Nebraska";

      case "NV":
          return "Nevada";

      case "NH":
          return "New Hampshire";

      case "NJ":
          return "New Jersey";

      case "NM":
          return "New Mexico";

      case "NY":
          return "New York";

      case "NC":
          return "North Carolina";

      case "ND":
          return "North Dakota";

      case "MP":
          return "Northern Mariana Islands";

      case "OH":
          return "Ohio";

      case "OK":
          return "Oklahoma";

      case "OR":
          return "Oregon";

      case "PW":
          return "Palau";

      case "PA":
          return "Pennsylvania";

      case "PR":
          return "Puerto Rico";

      case "RI":
          return "Rhode Island";

      case "SC":
          return "South Carolina";

      case "SD":
          return "South Dakota";

      case "TN":
          return "Tennessee";

      case "TX":
          return "Texas";

      case "UT":
          return "Utah";

      case "VT":
          return "Vermont";

      case "VI":
          return "Virgin Islands";

      case "VA":
          return "Virginia";

      case "WA":
          return "Washington";

      case "WV":
          return "West Virginia";

      case "WI":
          return "Wisconsin";

      case "WY":
          return "Wyoming";
  }
}
