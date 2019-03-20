require.config( {
    paths: {
        'datatables.net': "//cdn.datatables.net/1.10.19/js/jquery.dataTables.min",
		'reorder': "//cdn.datatables.net/colreorder/1.5.1/js/dataTables.colReorder.min",
		'select': "//cdn.datatables.net/select/1.3.0/js/dataTables.select.min",
		'datatables.net-buttons': "//cdn.datatables.net/buttons/1.5.6/js/dataTables.buttons.min",
		'colvis': "//cdn.datatables.net/buttons/1.5.6/js/buttons.colVis.min"
    }
} );


define( [
		'jquery',
		'qlik',
		'./properties',
        './init',
        "text!./jquery.dataTables.min.css",
		"text!./select.dataTables.min.css",
		"text!./buttons.dataTables.min.css",
		'datatables.net',
		'reorder',
		'select',
		'datatables.net-buttons',
		'colvis'
    ],
    function ( $, qlik, props, init, css, scss, bcss) {
        
        'use strict';
		
        $( '<style>' ).html( css ).appendTo( 'head' );
		$( '<style>' ).html( scss ).appendTo( 'head' );
		$( '<style>' ).html( bcss ).appendTo( 'head' );

        return {
            definition: props,
            initialProperties: init,
            support: { snapshot: true, export: true },
            paint: function ( $element , layout ) {
            
				$element.html( '<div id="datatable-div" class="table-main"></div>' ).height($element.height());
				
				var self = this;
				
            	var data = layout.qHyperCube.qDataPages[0].qMatrix;
            	var dimensions = layout.qHyperCube.qDimensionInfo;
            	var measures = layout.qHyperCube.qMeasureInfo;
            	var parent = document.getElementById('datatable-div');
				var table = document.createElement('table');
				
				table.setAttribute("id", "dt-table");
				table.setAttribute("class", "display");
				table.setAttribute("style", "width:100%");
				
				var row = {};
				var cell = {};
				var headers = [];
				
				data.forEach(function(rowdata) {
					row = table.insertRow(-1);
					rowdata.forEach(function(celldata) {
						cell = row.insertCell();
						cell.textContent = celldata.qText;
					});
				});
				
				dimensions.forEach(function(celldata) {
					headers.push(celldata.qFallbackTitle);
				});

				measures.forEach(function(celldata) {
					headers.push(celldata.qFallbackTitle);
				});

				var header = table.createTHead();
				row = header.insertRow(0);
				
				for(var i = 0; i < headers.length; i++) {	
					cell = row.insertCell(i);
					cell.innerHTML = headers[i];
				}
				
				parent.appendChild(table);
				$('#js-loading-state').remove();
				
				var table = $('#dt-table').DataTable({
					colReorder: true,
					select: {
						style: 'os',
						items: 'cell'
					},
					dom: 'Bfrtip',
					buttons: [
						'colvis'
					],
					"pageLength": 10,
					"scrollY": (self.$element.height() - 120) + "px",
					"scrollCollapse": true
				});
				
				table
					.on( 'select', function ( e, dt, type, indexes ) {
						var dim = 0;
						
						if(indexes[0].column <= dimensions.length) {
							dim = indexes[0].column;
							
							var row = [];
							
							for(var i = 0; i < indexes.length; i++) {
								row.push(data[indexes[i].row][dim].qElemNumber);
							}
							self.selectValues(dim,row,true);
						}						
					} )
					.on( 'deselect', function ( e, dt, type, indexes ) {
						var dim = 0;
						
						if(indexes[0].column <= dimensions.length) {
							dim = indexes[0].column;
							
							var row = [];
						
							for(var i = 0; i < indexes.length; i++) {
								row.push(data[indexes[i].row][dim].qElemNumber);
							}
							self.selectValues(dim,row,true);
						}
					} );
					
				return qlik.Promise.resolve();
            },
            destroy: function($element) {
            	//Destroy event handling here
            }
        }
    }
);