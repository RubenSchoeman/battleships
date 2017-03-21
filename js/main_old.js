/*
var shipsPlacedVerify = 'false';
var radarClass = '';
var row = [];
var column = [];
var rowTemp = '';
var columnTemp = '';


$('.placed_ships').on('click', function () {
    $(this).data('clicked', 'true');
    shipsPlacedVerify = $(this).data('clicked');
    rowTemp = $(this).data('row');
    columnTemp = $(this).data('column');
//  console.log(shipsPlacedVerify);
//  console.log(rowTemp);
//  console.log(columnTemp);

    if (shipsPlacedVerify !== 'false') {
        column[row][columns].clicked = true;
//      console.log(rowTemp, columnTemp);
        $('#r' + rowTemp + columnTemp).css({backgroundColor: 'red'});
  };
});

console.log(row);
console.log(column);

function showRadar() {
    $('.canvas').fadeTo(0, 0.5);
    $('.canvas').fadeTo("fast", 1);
}


function test () {
    $('.radar_scan').on('click', function() {
        showRadar();
    });
}
*/
var shipsPlacedVerify = 'false';
var radarClass = '';
var row = '';
var column = '';
var rowTemp = 0;
var columnTemp = 0;
var row_names = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

var rows = [];
for (var row = 0; row < 10; row++) {
    var columns = [];
    var row_name = row_names[row];
    for (var column = 0; column < 10; column++) {
	       var column_name = (column + 1).toString();
           var cell_name = row_name + column_name;
		   columns.push({
               clicked: false,
               destroyed: false,
               occupied: false,
               occupied_by: null,
               enemy_grid: false,
               cell_name: cell_name
           });
  }
    console.log(columns);
    rows.push(columns);
}

console.log("Full Grid:");
console.log(rows);

// console.log(rows[0][0]); // This is a1
// console.log(rows[2][3]); // This is C4
// console.log(rows[2][4]); // This is C5

// console.log(rows[9][9]); // This is J10

// rows[9][9].clicked = true;
// rows[9][9].occupied = true;

// console.log(rows[9][9]); // This is J10

renderFireGrid();

$('.placed_ships').on('click', function (event) {
    event.preventDefault();

    $(this).data('clicked', 'true');
    shipsPlacedVerify = $(this).data('clicked');
    rowTemp = parseInt($(this).data('row'));
    columnTemp = parseInt($(this).data('column'));

    var cell_name = rows[rowTemp][columnTemp].cell_name;

    console.log("DEBUG: User clicked on Cell: " + cell_name + " row = " + rowTemp + " column = " + columnTemp);

    rows[rowTemp][columnTemp].clicked = true;
    cellClickedCheck = rows[rowTemp][columnTemp].clicked;

    if (cellClickedCheck === true) {
        console.log('Test text for ' + rowTemp + columnTemp);
    };
});

function renderFireGrid() {
    var html = [];
    for (var row = 0; row < 10; row++) {
        html.push('<div class="ships">');
        for (var column = 0; column < 10; column++) {
            html.push('<button class="placed_ships" data-clicked="false" data-row="' + row + '" data-column="' + column + '"></button>');
        }
        html.push('</div>');
    }

    $('#fire-grid').html(html.join('\n'));
}

/*
<div class="ships_a ships">
  <button class="placed_ships_a1 placed_ships" data-clicked="false" data-row="a" data-column="0"></button>
  <button class="placed_ships_a2 placed_ships" data-clicked="false" data-row="a" data-column="1"></button>
  <button class="placed_ships_a3 placed_ships" data-clicked="false" data-row="a" data-column="2"></button>
  <button class="placed_ships_a4 placed_ships" data-clicked="false" data-row="a" data-column="3"></button>
  <button class="placed_ships_a5 placed_ships" data-clicked="false" data-row="a" data-column="4"></button>
  <button class="placed_ships_a6 placed_ships" data-clicked="false" data-row="a" data-column="5"></button>
  <button class="placed_ships_a7 placed_ships" data-clicked="false" data-row="a" data-column="6"></button>
  <button class="placed_ships_a8 placed_ships" data-clicked="false" data-row="a" data-column="7"></button>
  <button class="placed_ships_a9 placed_ships" data-clicked="false" data-row="a" data-column="8"></button>
  <button class="placed_ships_a10 placed_ships" data-clicked="false" data-row="a" data-column="9"></button>
</div>
*/

//function clearGridStatus() {
//    for (var row = 0; row < 10; row++) {
//        for (var column = 0; column < 10; column++) {
//            rows[row][column].clicked = false;
//            rows[row][column].destroyed = false;
//        }
//    }
//}




//test();
/*
function powerUpAppear () {
  $('.powerup').fadeIn(1000);
}

function powerUpDissapear () {
  $('.powerup').hide();
}

function clickPowerUp () {
  $('.powerup').on('click', function() {
    powerUpDissapear ();
  });
}

function fire () {
  $('.placed_ships').on('click', function(){
    powerUpAppear();
  });
}
*/



/*
function showRadar() {
  $('.canvas').fadeTo(0, 0.5);
  $('.canvas').fadeTo("fast", 1);
}


function test () {
  $('.radar_scan').on('click', function() {
    showRadar();
  });
}

//function isSelected () {
//  $('.placed_ships_a1').on('click', function() {
//    $('.radar_a').css("background-color", "red");
//  });
//}

//isSelected();
test();
*/



//clickPowerUp();
//fire();
