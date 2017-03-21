/**
 * Class Ship
 *
 * Manages multiple ships.
 *
 * @param Object firegrid  Reference to a FireGrid object.
 */
function Fleet(firegrid) {
    var INDEX_CARRIER = 0;
    var INDEX_BATTLESHIP = 1;
    var INDEX_CRUISER = 2;
    var INDEX_SUBMARINE = 3;
    var INDEX_DESTROYER = 4;
    var noOfShipsDestroyed = 0;

    var ships = [
        new Ship(firegrid, SHIP_CARRIER),
        new Ship(firegrid, SHIP_BATTLESHIP),
        new Ship(firegrid, SHIP_CRUISER),
        new Ship(firegrid, SHIP_SUBMARINE),
        new Ship(firegrid, SHIP_DESTROYER)
    ];

    this.getShips = function() {
        return ships;
    };

    this.getCarrier = function() {
        return ships[INDEX_CARRIER];
    };

    this.getBattleship = function() {
        return ships[INDEX_BATTLESHIP];
    };

    this.getCruiser = function() {
        return ships[INDEX_CRUISER];
    };

    this.getSubmarine = function() {
        return ships[INDEX_SUBMARINE];
    };

    this.getDestroyer = function() {
        return ships[INDEX_DESTROYER];
    };

    this.fleetHealth = function() {
        return nrOfShipsDestroyed;
    };

}
