var SHIP_CARRIER = 5;
var SHIP_BATTLESHIP = 4;
var SHIP_CRUISER = 3;
var SHIP_SUBMARINE = 3;
var SHIP_DESTROYER = 2;

var DIRECTION_NORTH = 1;
var DIRECTION_EAST = 2;
var DIRECTION_SOUTH = 3;
var DIRECTION_WEST = 4;

// stern = back side of ship
// bow = front side of ship

/**
 * Class Ship
 *
 * Manages the properties of a ship.
 *
 * @param Object firegrid  Reference to a FireGrid object.
 * @param int    type      SHIP_CARRIER, SHIP_BATTLESHIP, etc.
 */
function Ship(firegrid, type) {
    console.log("DEBUG: Ship constructor");

    var _ship = this;

    var ship_length = type;
    var stern;
    var direction;
    var destroyed = false;
    var cells = [];

    this.getType = function() {
        return type;
    };

    this.getShipLength = function() {
        return ship_length;
    };

    this.getTypeAsString = function() {
        switch (type) {
            case SHIP_CARRIER:
                return "Carrier";

            case SHIP_BATTLESHIP:
                return "Battleship";

            case SHIP_CRUISER:
                return "Cruiser";

            case SHIP_SUBMARINE:
                return "Submarine";

            case SHIP_DESTROYER:
                return "Destroyer";
        }
    };

    this.getStern = function() {
        return stern;
    };

    this.setStern = function(stern_location) {
        stern = stern_location;
    };

    this.getDirection = function () {
        return direction;
    };

    this.getDirectionAsString = function () {
        switch (direction) {
            case DIRECTION_NORTH:
                return "North";

            case DIRECTION_EAST:
                return "East";

            case DIRECTION_SOUTH:
                return "South";

            case DIRECTION_WEST:
                return "West";
        }
    };

    this.setDirection = function (new_direction) {
        direction = new_direction;
    };

    this.getCells = function () {
        return cells;
    };

    this.getCellAt = function (row, column) {
        for (var i = 0; i < ship_length; i++) {
            if (cells[i].row === row && cells[i].column === column) {
                return cells[i];
            }
        }

        return null;
    };

    this.hitCellAt = function (row, column) {
        this.getCellAt(row, column).is_hit = true;
    };

    this.cellsHitCount = function () {
        var cells_hit_count = 0;
        for (var i = 0; i < ship_length; i++) {
            if (cells[i].is_hit) {
                cells_hit_count += 1;
            }
        }

        return cells_hit_count;
    };

    this.isDestroyed = function () {
        return this.cellsHitCount() === ship_length;
    };

    this.logCellNames = function () {
        for (var i = 0; i < ship_length; i++) {
            console.log("Row: " + cells[i].row + " Column: " + cells[i].column + " Name: " + cells[i].cell.cell_name);
        }
    }

    /**
     * Deploy the ship at its stern location and in the given
     * direction. This will fill the ships "cells" property which
     * references the cell objects on the grid.
     *
     * @param Object stern      e.g. {row: x, column: x}
     * @param int    direction  DIRECTION_NORTH, DIRECTION_EAST, etc.
     */
    this.deploy = function(stern, direction) {
        this.setStern(stern);
        this.setDirection(direction);

        var row = stern.row;
        var column = stern.column;
        var relative_direction = this.getRelativeDirection(direction);

        for (var i = 0; i < ship_length; i++) {
            // Get the actual cell Object from the grid, e.g.
            // { clicked: false, occupied: false, occupied_by: null,... }
            var grid_cell = firegrid.getCellAt(row, column);
            grid_cell.occupied = true;
            grid_cell.occupied_by = _ship;

            cells.push({row: row, column: column, is_hit: false, cell: grid_cell});
            row = row + relative_direction.vert;
            column = column + relative_direction.horiz;
        }
    };

    // DIRECTION_NORTH, DIRECTION_EAST, DIRECTION_SOUTH, DIRECTION_WEST
    this.getRelativeDirection = function(compass_direction) {
        switch (compass_direction) {
            case DIRECTION_NORTH:
                return {horiz: 0, vert: -1};

            case DIRECTION_EAST:
                return {horiz: 1, vert: 0};

            case DIRECTION_SOUTH:
                return {horiz: 0, vert: 1};

            case DIRECTION_WEST:
                return {horiz: -1, vert: 0};
        }
    };
}
