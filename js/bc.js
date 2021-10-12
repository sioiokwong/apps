//loadMarkdown("../../community/challenge/README.md", "readmeDiv", "_parent");

// Within localhost.js the state menu is moved into the hero image area by the following:
// relocatedStateMenu.appendChild(state_select);

if(typeof param == 'undefined') {
  var param = {};
}

$(document).ready(function() {

  // `hashChangeEvent` event reside in multiple widgets. Also called by involking goHash() within localsite.js
  document.addEventListener('hashChangeEvent', function (elem) {
      //let hash = getHash();

      //let theState = $("#state_select").find(":selected").val();
      let theStateName = $("#state_select").find(":selected").text();
      //let theStateNameLowercase = theStateName.toLowerCase();

      console.log("theStateName from hashChangeEvent: " + theStateName);
      displayStateData(theStateName);
  }, false);

  loadHtmlTable(true); // New list
});

var stateDataset = [];
function loadHtmlTable(applyFilter) {
  //alert("loading")
  d3.text("/apps/beyondcarbon/5_22-data-06_06.csv").then(function(data) {
      stateDataset = d3.csvParseRows(data);
      console.log("loadHtmlTable - stateDataset row count: " + stateDataset.length);
      //alert(stateDataset);

        let theStateName = "";
        if (param.state) {
          theStateName = $("#state_select").find(":selected").text();
          //alert("theStateName " + theStateName);
          setTimeout( function() {
            theStateName = $("#state_select").find(":selected").text();
            if(!theStateName) { // Hack. We need to instead trigger when #state_select menu becomes available.
              //theStateName = "Georgia"
            }
            displayStateData(theStateName);
          }, 1000 ); // Allow time for state dropdown to load.
        }
  });
}

function statePhrase(stateRow, rowIndex, theStateName) {
  return(stateRow[rowIndex].replace("[XX]" || "[XX's]", theStateName) )
}
function displayStateData(theStateName) {
  console.log("displayStateData: " + theStateName);
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
  
  for(var i = 0; i < stateDataset.length; i++) {
    rowcount++;
    if (stateDataset[i][0]==theStateName) {
      
      dataRow += "<table id='resultsTable'>";
      dataRow += "<tr><td><div style='float:right;font-size:11px;padding-top:10px'>Source: <a target='_blank' href='https://beyondcarbon.org'>BeyondCarbon.org</a></div><div style='float:left;font-size:22px;font-weight:500'>" + theStateName + " Clean Energy Progress</div></td></tr>"
      dataRow += "<tr><td>" + statePhrase(stateDataset[i], 5, theStateName) + "</td></tr>"
      dataRow += "<tr><td>Has " + theStateName + " committed to 100% clean energy? " + statePhrase(stateDataset[i], 1, theStateName) + "</td></tr>"
      dataRow += "<tr><td>" + statePhrase(stateDataset[i], 2, theStateName)  + "</td></tr>"
      dataRow += "<tr><td>Does " + theStateName + " have a goal for reducing carbon pollution across the entire economy? " + statePhrase(stateDataset[i], 3, theStateName)  + "</td></tr>"
      dataRow += "<tr><td>Does " + theStateName + " have goals or incentives for electric vehicles? " + statePhrase(stateDataset[i], 4, theStateName) + "</td></tr>"
      dataRow += "</table>";
    }
  }
  //alert("rowcount " + rowcount);
  //$(dataRow).insertAfter($("#dataHeader"));

  $("#dataDisplay").html(dataRow);
  //$("#dataHeader").html(dataRow);
}
