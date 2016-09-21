var transposedview = $.extend({}, $.fn.datagrid.defaults.view, {
	render: function(target, container, frozen){
	
		$('.datagrid-view1', $(target).parent()).css('display', 'none');
		
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		if (frozen){
			if (!(opts.rownumbers || (opts.frozenColumns && opts.frozenColumns.length))){
				return;
			}
		}
		
		var rows = state.data.rows;
		var fields = $(target).datagrid('getColumnFields', frozen);
		var table = [];
		table.push('<table class="datagrid-btable" cellspacing="0" cellpadding="0" border="0"><tbody>');
		if (opts.rownumbers){
			table.push('<tr>');
			if (opts.showHeader) {
				table.push('<td class="datagrid-header"></td>');
			}
			for(var i=0; i<rows.length; i++) {
				var row = rows[i];
				var selected = row == $(target).datagrid('getSelected');
				var rownumber = i+1;
				if (opts.pagination){
					rownumber += (opts.pageNumber-1)*opts.pageSize;
				}
				if (frozen){
					table.push('<td><div class="datagrid-cell-rownumber datagrid-cell-height');
				} else {
					table.push('<td><div class="datagrid-cell-rownumber');
				}
				if (selected == true){
					table.push(' datagrid-row-selected');
				} else {
					if (i % 2 && opts.striped){
						table.push(' datagrid-row-alt');
					} else {
						table.push('');
					}
				}
				table.push('">'+rownumber+'</div></td>');
			}
			table.push('</tr>');
		}
		for(var j=0; j<fields.length;j++) {
			var field = fields[j];
			var col = $(target).datagrid('getColumnOption', field);
			if (col && !col.expander){
				table.push('<tr>');
				if (opts.showHeader) {
					var attr = '';
					if (col.rowspan) attr += 'rowspan="' + col.rowspan + '" ';
					if (col.colspan) attr += 'colspan="' + col.colspan + '" ';
					table.push('<td class="datagrid-header" ' + attr);
					if (col.checkbox){
						table.push(' field="' + col.field + '"><div class="datagrid-header-check"><input type="checkbox"/></div>');
					} else if (col.field){
						table.push(' field="' + col.field + '"><div class="datagrid-cell datagrid-header-' + j + '"><span>' + col.title + '</span><span class="datagrid-sort-icon">&nbsp;</span></div>');
					} else {
						table.push('><div class="datagrid-cell-group">' + col.title + '</div>');
					}
					table.push('</td>');
				}
				for(var i=0; i<rows.length; i++) {
					var row = rows[i];
					var selected = row == $(target).datagrid('getSelected');
					var style = 'width:' + (col.width) + 'px;';
					style += 'text-align:' + (col.align || 'left');
					if (col.styler){
						style += ";" + col.styler(row[field], row, i);
					}
					table.push('<td>');
					table.push('<div style="' + style + '" datagrid-row-index="' + i + '" datagrid-column-index="' + j + '"');
					if (col.checkbox){
						table.push('class="datagrid-cell-check');
					} else {
						table.push('class="datagrid-cell');
					}
					table.push(' datagrid-cell-' + j + '-' + i);
					if (selected == true){
						table.push(' datagrid-row-selected');
					} else {
						if (i % 2 && opts.striped){
							table.push(' datagrid-row-alt');
						} else {
							table.push('');
						}
					}
					if (frozen){
						table.push('datagrid-cell-height ');
					}
					table.push('">');
					if (col.checkbox){
						if (selected){
							table.push('<input type="checkbox" checked="checked"/>');
						} else {
							table.push('<input type="checkbox"/>');
						}
					} else if (col.formatter){
						table.push(col.formatter(row[field], row, i));
					} else {
						table.push(row[field]);
					}
					table.push('</div>');
					table.push('</td>');
				}
				table.push('</tr>');
			}
		}
		table.push('</tbody></table>');
		
		$(container).html(table.join(''));
		
		var fieldCount = fields.length;
		for(var j=0; j<fields.length;j++) {
			var field = fields[j];
			var col = $(target).datagrid('getColumnOption', field);
			if (col && !col.expander){
				if (opts.headerWidth){
					$('.datagrid-header-' + j, container).width(opts.headerWidth);
				}
				for(var i=0; i<rows.length; i++) {
					var row = rows[i];
					if (opts.itemWidth){
						$('.datagrid-cell-' + j + '-' + i, container).width(opts.itemWidth);
					}
					$('.datagrid-cell-' + j + '-' + i, container).mouseover(function(){
						var index = $(this).attr('datagrid-row-index');
						for(var f=0; f<fieldCount;f++) {
							$('.datagrid-cell-' + f + '-' + index, container).addClass('datagrid-row-over');
						}
					}).mouseout(function(){
						var index = $(this).attr('datagrid-row-index');
						for(var f=0; f<fieldCount;f++) {
							$('.datagrid-cell-' + f + '-' + index, container).removeClass('datagrid-row-over');
						}
					}).click(function(){
						var index = $(this).attr('datagrid-row-index');
						if ($(this).hasClass('datagrid-row-selected')){
							$(target).datagrid('unselectRowT', {target:target, index:index});
						} else {
							$(target).datagrid('selectRowT', {target:target, index:index});
						}
						if (opts.onClickRow){
							opts.onClickRow.call(this, index, rows[index]);
						}
					}).dblclick(function(){
						var index = $(this).attr('datagrid-row-index');
						if (opts.onDblClickRow){
							opts.onDblClickRow.call(this, index, rows[index]);
						}
					});
				}
			}
		}
	},
	
	onBeforeRender: function(target){
		$('.datagrid-header', $(target).parent()).css('display', 'none');
	}
});

$.extend($.fn.datagrid.methods, {
	selectRowT: function(target, args){
		var grid = $.data(target[0], 'datagrid').grid;
		var opts = $.data(target[0], 'datagrid').options;
		var data = $.data(target[0], 'datagrid').data;
		var selectedRows = $.data(target[0], 'datagrid').selectedRows;
		
		var tds = $('.datagrid-body div[datagrid-row-index='+args.index+']',grid);
		var ck = $('.datagrid-body div[datagrid-row-index='+args.index+'] .datagrid-cell-check input[type=checkbox]',grid);
		if (opts.singleSelect == true){
			this.clearSelectionsT(target);
		}
		tds.addClass('datagrid-row-selected');
		ck.attr('checked', true);
		
		if (opts.idField){
			var row = data.rows[args.index];
			for(var i=0; i<selectedRows.length; i++){
				if (selectedRows[i][opts.idField] == row[opts.idField]){
					return;
				}
			}
			selectedRows.push(row);
		}
		opts.onSelect.call(target[0], args.index, data.rows[args.index]);
	},
	unselectRowT: function(target, args){
		var opts = $.data(target[0], 'datagrid').options;
		var grid = $.data(target[0], 'datagrid').grid;
		var selectedRows = $.data(target[0], 'datagrid').selectedRows;
		
		var tds = $('.datagrid-body div[datagrid-row-index='+args.index+']',grid);
		var ck = $('.datagrid-body div[datagrid-row-index='+args.index+'] .datagrid-cell-check input[type=checkbox]',grid);
		tds.removeClass('datagrid-row-selected');
		ck.attr('checked', false);
		
		var row = $.data(target[0], 'datagrid').data.rows[args.index];
		if (opts.idField){
			for(var i=0; i<selectedRows.length; i++){
				var row1 = selectedRows[i];
				if (row1[opts.idField] == row[opts.idField]){
					for(var j=i+1; j<selectedRows.length; j++){
						selectedRows[j-1] = selectedRows[j];
					}
					selectedRows.pop();
					break;
				}
			}
		}
		opts.onUnselect.call(target[0], args.index, row);
	},
	clearSelectionsT: function(target){
		var grid = $.data(target[0], 'datagrid').grid;
		
		$('.datagrid-body div.datagrid-row-selected', grid).removeClass('datagrid-row-selected');
		$('.datagrid-body .datagrid-cell-check input[type=checkbox]', grid).attr('checked', false);
		var selectedRows = $.data(target[0], 'datagrid').selectedRows;
		while(selectedRows.length > 0){
			selectedRows.pop();
		}
	},
	getSelected: function(target){
		var opts = $.data(target[0], 'datagrid').options;
		var grid = $.data(target[0], 'datagrid').grid;
		var data = $.data(target[0], 'datagrid').data;
		if (opts.idField){
			return $.data(target[0], 'datagrid').selectedRows;
		}
		var rows = [];
		$('.datagrid-view2 .datagrid-body tr.datagrid-row-selected', grid).each(function(){
			var index = parseInt($(this).attr('datagrid-row-index'));
			if (data.rows[index]){
				rows.push(data.rows[index]);
			}
		});
		var addedIndex = [];
		$('.datagrid-view2 .datagrid-body div.datagrid-row-selected', grid).each(function(){
			var index = parseInt($(this).attr('datagrid-row-index'));
			var found = false;
			for (var i = 0; i < addedIndex.length; i++) {
				if (addedIndex[i] == index) {
					found = true;
					break;
				}
			}
			if (data.rows[index] && !found){
				rows.push(data.rows[index]);
				addedIndex.push(index);
			}
		});
		return rows.length>0 ? rows[0] : null;
	}
});
