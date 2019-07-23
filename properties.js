/* Properties */
define( [], function () {
    'use strict';

    // *****************************************************************************
    // Dimensions & Measures
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 20
    };

    var measures = {
        uses: "measures",
        min: 1,
        max: 20
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
    // Styling Section
    // *****************************************************************************
    var categories = {
        type: "array",
        ref: "listItems",
        label: "Categories",
        itemTitleRef: "settings.parent",
        allowAdd: true,
        allowRemove: true,
        addTranslation: "Add Relationship",
        items: {
            parent: {
                component: "dropdown",
                type: "string",
                options: [{
                    label: "Dim1",
                    value: "Dim1"
                }, {
                    label: "Dim2",
                    value: "Dim2"
                }, {
                    label: "Dim3",
                    value: "Dim3"
                }],
                ref: "settings.parent",
                label: "Parent"
            },
            children: {
                component: "dropdown",
                type: "string",
                options: [{
                    label: "Dim1",
                    value: "Dim1"
                }, {
                    label: "Dim2",
                    value: "Dim2"
                }, {
                    label: "Dim3",
                    value: "Dim3"
                }],
                ref: "settings.children",
                label: "Children"
            }
        }
    };

    // *****************************************************************************
    // Styling Section
    // *****************************************************************************
    var sortabletables = {
    	component: "expandable-items",
    	label: "Table Options",
        items: {
            ShowSearch: {
                type: "boolean",
                component: "switch",
                label: "Search",
                ref: "settings.search",
                options: [{
                    value: true,
                    label: "On"
                }, {
                    value: false,
                    label: "off"
                }],
                defaultValue: true
            }
        }
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
            categories: categories,
            tables: sortabletables
        }
    };

} );
