// Display icons

function setImpactIconStyles(styleName) {
	$(document).ready(function() {
		
		// HACK - Trigger with info-template load instead
		setTimeout( function() {
			$("#insertImpactIcons").prepend($("#impactIcons"));
		}, 1000 ); // Allow time for state dropdown to load.

		setTimeout( function() {
			$("#insertImpactIcons").prepend($("#impactIcons"));
		}, 3000 ); // Allow time for state dropdown to load.

	});
}