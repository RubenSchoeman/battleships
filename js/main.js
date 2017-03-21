// We need this to handle our fire Grid
var fireGrid = new FireGrid();
var enemyGrid = new FireGrid();

// REMEMBER:
// Simple variables such as strings and numbers are
// copied when passing it through as a function parameter
// but complex Objects such as {name: "Pete", surname: "Johnson"}
// is passed by reference and can be modified within the
// function.

/*
var grids = [];
for (var i = 0; i < 10; i++) {
    grids.push(new fireGrid("Grid " + i));
}

console.log(grids)
*/

fireGrid.setGridColor('#FF0000');

// Render the fire grid
// Render function is defined in firegrid.js
fireGrid.render('#fire-grid');


fireGrid.onFireAtCell(function (cell) {
    //console.log(cell); // Echoes out the {clicked: true, ...} object
    //console.log(fireGrid.getLastFiredAtCell()); // Echoes out the {clicked: true, ...} object

    var $result_text = $('#result-text');

    if (!cell.clicked) {
        fireGrid.setCellClicked(cell);

        // console.log(enemyGrid);

        var enemy_grid_cell = enemyGrid.getCellAt(cell.row_no, cell.column_no);

        if (enemy_grid_cell.occupied) {
            fireGrid.markCellHit(cell);
            var enemy_ship = enemy_grid_cell.occupied_by;
            enemy_ship.hitCellAt(cell.row_no, cell.column_no);
            if (enemy_ship.isDestroyed()) {
                $result_text.html("Congratulations, you have destroyed the " + enemy_ship.getTypeAsString());
            } else {
                $result_text.html("You have hit " + enemy_ship.cellsHitCount() + " cells on the ship: " + enemy_ship.getTypeAsString());
            }
        } else {
            fireGrid.markCellClicked(cell);
            $result_text.html("You have missed!");
        }
    } else {
        $result_text.html("You have already clicked on this cell dummy!");
    }



//    setTimeout(function() {
//        if (fireGrid.getLastFiredAtCell().cell_name == 'a5') {
//            alert("Oh no, its a hit!");
//        } else {
//            alert("Haha, you missed");
//        }
//    }, 1500);
});

// var friendlyFleet = new Fleet(fireGrid);
var enemyFleet = new Fleet(enemyGrid);

// Returns the whole fleet of ships
//console.log(friendlyFleet.getShips());

// Returns the status of a ships
//console.log(friendlyFleet.getCruiser().isDestroyed());

enemyFleet.getCruiser().deploy({row: 8, column: 4}, DIRECTION_NORTH);
enemyFleet.getCarrier().deploy({row: 8, column: 3}, DIRECTION_NORTH);

//console.log(enemyGrid.getCellAt(4, 8));

console.log(enemyFleet.getCarrier().getStern());
console.log(enemyFleet.getCarrier().getType());
console.log(enemyFleet.getCarrier().getDirectionAsString());
enemyFleet.getCarrier().logCellNames();




//console.log(friendlyFleet.getCruiser().getCells());

// Lets see if there is a ship deployed at row 6, column 4
var cell = fireGrid.getCellAt(6, 4);
if (cell.occupied) {
    //console.log(cell.occupied_by.getCells());

    //var ship = cell.occupied_by;
    //console.log(ship.getTypeAsString());
}
