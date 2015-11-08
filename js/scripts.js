
;(function(window, document, undefined) {

	'use strict';


	function extend(a, b) {
		var key,
			hasOwn = Object.hasOwnProperty;

		for (key in b) {
			if (hasOwn.call(b, key)) {
				a[key] = b[key];
			}
		}
		return a;
	};


	function TableFixer(options) {
		this.options = extend({}, this.DEFAULTS);
		extend(this.options, options);
		this.init();
	};


	TableFixer.prototype.DEFAULTS = {};


	TableFixer.prototype.init = function() {
		this.horizCells = [];
		this.vertCells = [];
		this.crossCells = [];

		var self = this,
			elem = this.options.element,
			headRows = Array.prototype.slice.call(elem.tHead.rows),
			headRowsLength,
			headRow,
			headRowCellsLength;

		for(headRowsLength = headRows.length - 1; headRowsLength >= 0; headRowsLength--) {
			for(headRow = headRows.pop(), headRowCellsLength = headRow.cells.length - 1; headRowCellsLength >= 0; headRowCellsLength--) {
				this.horizCells.push(headRow.cells[headRowCellsLength]);
			};
		};

		this.options.scrollContainer.addEventListener('scroll', function() {
			var scrollLeft = this.scrollLeft,
				scrollTop = this.scrollTop,
				len;

			for(len = self.horizCells.length - 1; len >= 0; len--) {
				// self.horizCells[len].style.transform = 'translate3d(0, ' + scrollTop + 'px' + ', 0)';
				self.horizCells[len].style.transform = 'translateY(' + scrollTop + 'px)';
			};

			for(len = self.vertCells.length - 1; len >= 0; len--) {
				// self.vertCells[len].style.transform = 'translate3d(' + scrollLeft + 'px' + ', 0, 0)';
				self.vertCells[len].style.transform = 'translateX(' + scrollLeft + 'px)';
			};

			for(len = self.crossCells.length - 1; len >= 0; len--) {
				// self.crossCells[len].style.transform = 'translate3d(' + scrollLeft + 'px, ' + scrollTop + 'px' + ', 0)';
				self.crossCells[len].style.transform = 'translate(' + scrollLeft + 'px, ' + scrollTop + 'px)';
			};
		});


	TableFixer.prototype.addVerticalCell = function (cell) {
		var index = this.horizCells.indexOf(cell);
		if ( index != -1) {
			this.crossCells.push(cell);
		} else {
			this.vertCells.push(cell);
		}
	};

	};


	window.TableFixer = TableFixer;


})(window, document);