/**
 * Class FireGrid
 *
 * Maintains an array of rows and columns of objects
 * that keeps track of each cell and their status. Can also
 * render a grid out to HTML.
 */
function FireGrid(grid_name) {
    console.log("DEBUG: FireGrid constructor");

    // Create a local instance of "this" so that
    // event handlers can call functions declared
    // in the this.x() context
    var _firegrid = this;

    // If a grid name was not provided we
    // make our own.
    if (typeof grid_name === 'undefined') {
        var grid_name = "Grid";
    }

    //==========================================================================
    // Privately declared variables
    //==========================================================================
    var rows = [];
    var grid_color;
    var row_names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    var last_fired_at_cell = null;
    var call_me_later;

    function buildGrid() {
        for (var row = 0; row < 10; row++) {
            var columns = [];
            var row_name = row_names[row];
            for (var column = 0; column < 10; column++) {
        	       var column_name = (column + 1).toString();
                   var cell_name = row_name + column_name;
        		   columns.push({
                       clicked: false,
                       occupied: false,
                       occupied_by: null,
                       enemy_grid: false,
                       cell_name: cell_name,
                       row_no: row,
                       column_no: column
                   });
            }
            rows.push(columns);
        }
    }

    //==========================================================================
    // Public variables and functions
    //==========================================================================

    this.getRows = function() {
        return rows;
    };

    this.getName = function() {
        return grid_name;
    };

    this.setGridColor = function (color) {
        grid_color = color;
    };

    this.getGridColor = function () {
        return grid_color;
    };

    this.getRowNames = function () {
        return row_names;
    };

    this.getGrid = function () {
        return rows;
    };

    // Returns an object containing all the cell details
    // This will contain a row with Objects for each column : clicked: false, occupied: false, occupied_by: null, enemy_grid: false, etc...
    this.getCellAt = function(row_no, column_no) {
        return rows[row_no][column_no];
    };

    this.getLastFiredAtCell = function () {
        return last_fired_at_cell;
    };

    this.setCellClicked = function (cell) {
        cell.clicked = true;
    };

    this.onFireAtCell = function(callback) {
        $('.placed_ships').on('click', function (event) {
            event.preventDefault();

            var rowTemp = parseInt($(this).data('row'));
            var columnTemp = parseInt($(this).data('column'));
            //
            last_fired_at_cell = _firegrid.getCellAt(rowTemp, columnTemp);

            callback(last_fired_at_cell);
        });
    };

    this.markCellClicked = function (cell) {
        $('#btn-' + cell.cell_name).addClass('cell_clicked');
    };

    this.markCellHit = function (cell) {
        $('#btn-' + cell.cell_name).addClass('cell_hit');
    };

    /**
     * This function is called in main.js
     * Renders the grid out to html.
     */
    this.render = function (element_id) {                   // Parameter is passed from main.js
        var html = [];
        for (var row = 0; row < 10; row++) {
            html.push('<div class="ships">');
            for (var column = 0; column < 10; column++) {
                var cell = this.getCellAt(row, column);       //def: In firegrid get getCellAt function.
                html.push('<button class="placed_ships" data-clicked="false" id="btn-' + cell.cell_name + '" data-row="' + row + '" data-column="' + column + '"></button>');
            }
            html.push('</div>');
        }

        $(element_id).html(html.join('\n'));
    };

    /**
     *  The render function renders html in this form:

        <div class="ships">
            <button class="placed_ships" data-clicked="false" id="btn-a1" data-row="a" data-column="1"></button>
            <button class="placed_ships" data-clicked="false" id="btn-a2" data-row="a" data-column="2"></button>
            <button class="placed_ships" data-clicked="false" id="btn-a3" data-row="a" data-column="3"></button>
            <button class="placed_ships" data-clicked="false" id="btn-a4" data-row="a" data-column="4"></button>
            <button class="placed_ships" data-clicked="false" id="btn-a5" data-row="a" data-column="5"></button>
            <button class="placed_ships" data-clicked="false" id="btn-a6" data-row="a" data-column="6"></button>
            <button class="placed_ships" data-clicked="false" id="btn-a7" data-row="a" data-column="7"></button>
            <button class="placed_ships" data-clicked="false" id="btn-a8" data-row="a" data-column="8"></button>
            <button class="placed_ships" data-clicked="false" id="btn-a9" data-row="a" data-column="9"></button>
            <button class="placed_ships" data-clicked="false" id="btn-a10" data-row="a" data-column="10"></button>
        </div>
    **/

    //==========================================================================
    // Call initial functions
    //==========================================================================
    buildGrid();
}
