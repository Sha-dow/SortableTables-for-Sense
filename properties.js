/* Properties */
define( [], function () {
    'use strict';

    // *****************************************************************************
    // Dimensions & Measures
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 5
    };

    var measures = {
        uses: "measures",
        min: 1,
        max: 10
    };

    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************
    var appearanceSection = {
        uses: "settings"
    };

    // *****************************************************************************
    // Sorting Section
    // *****************************************************************************
	var sorting = {
    	uses: "sorting"
  	};

    // *****************************************************************************
    // Highcharts Section
    // *****************************************************************************
    var sortabletables = {
    	component: "expandable-items",
    	label: "Table Options",
    	items: {}
    };

    // *****************************************************************************
    // Main property panel definition
    // *****************************************************************************
    return {
        type: "items",
        component: "accordion",
        items: {
            dimensions: dimensions,
            measures: measures,
            sorting: sorting,
            appearance: appearanceSection,
            tables: sortabletables
        }
    };

} );
