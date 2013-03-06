// See http://en.wikipedia.org/wiki/Conway's_Game_of_Life for rules and history

function GameOfLifeHelpers() {
    // Do nothing
}

GameOfLifeHelpers.prototype.getLiveNeighbors = function (cells, row, col) {
    if (!(_.isNumber(row) && row >= 0)) {
        throw "row must be a positive number";
    }
    if (!(_.isNumber(col) && col >= 0)) {
        throw "col must be a positive number";
    }
    if (!_.isArray(cells)) {
        throw "cells is not an array";
    }

    var rowIndexList = [];
    var colIndexList = [];
    var result;

    if (row > 0) {
        rowIndexList.push(row - 1);
    }
    rowIndexList.push(row);
    if (row < cells.length - 1) {
        rowIndexList.push(row + 1);
    }

    if (col > 0) {
        colIndexList.push(col - 1);
    }
    colIndexList.push(col);
    if (col < cells[0].length - 1) {
        colIndexList.push(col + 1);
    }

    result = 0;

    for (var i = 0; i < rowIndexList.length; i++) {
        for (var j = 0; j < colIndexList.length; j++) {
            // Exclude the cell at row 'row' and column 'col'
            if (rowIndexList[i] != row || colIndexList[j] != col) {
                result += (cells[rowIndexList[i]][colIndexList[j]].alive ? 1 : 0);
            }
        }
    }

    return result;
}

GameOfLifeHelpers.prototype.cellLives = function (alive, liveNeighbors) {
    if (!_.isBoolean(alive)) {
        throw "alive must be a boolean";
    }
    if (!(_.isNumber(liveNeighbors) && liveNeighbors >= 0)) {
        throw "liveNeighbors must be a positive number";
    }

    var result;
    if (alive) {
        result = liveNeighbors == 2 || liveNeighbors == 3;
    }
    else {
        result = liveNeighbors == 3;
    }

    return result;
}

GameOfLifeHelpers.prototype.create = function (rows, cols, alive) {
    if (!(_.isNumber(rows) && rows >= 0)) {
        throw "rows must be a positive number";
    }
    if (!(_.isNumber(cols) && cols >= 0)) {
        throw "cols must be a positive number";
    }
    if (!_.isBoolean(alive)) {
        throw "alive must be a boolean";
    }

    var result = [];
    for (var row = 0; row < rows; row++) {
        var newRow = [];
        for (var col = 0; col < cols; col++) {
            newRow.push({ alive: alive });
        }
        result.push(newRow);
    }

    return result;
}

GameOfLifeHelpers.prototype.step = function (cells) {
    if (!_.isArray(cells)) {
        throw "cells is not an array";
    }

    var liveNeighbors;
    var helpers = new GameOfLifeHelpers();
    var result;

    result = helpers.create(cells.length, cells[0].length, false);
    for (var row = 0; row < cells.length; row++) {
        for (var col = 0; col < cells[row].length; col++) {
            liveNeighbors = helpers.getLiveNeighbors(cells, row, col);
            result[row][col].alive = helpers.cellLives(cells[row][col].alive, liveNeighbors);
        }
    }

    return result;
}

function StillLifes() {
    // Do nothing
}

// Create a "block" still life
StillLifes.prototype.createBlock = function () {
    var result;

    result = new GameOfLifeHelpers().create(4, 4, false);
    result[1][1].alive = true;
    result[1][2].alive = true;
    result[2][1].alive = true;
    result[2][2].alive = true;

    return result;
};

// Create a "beehive" still life
StillLifes.prototype.createBeehive = function () {
    var result;

    result = new GameOfLifeHelpers().create(5, 6, false);
    result[1][2].alive = true;
    result[1][3].alive = true;
    result[2][1].alive = true;
    result[2][4].alive = true;
    result[3][2].alive = true;
    result[3][3].alive = true;

    return result;
};

// Create a "loaf" still life
StillLifes.prototype.createLoaf = function () {
    var result;

    result = new GameOfLifeHelpers().create(6, 6, false);
    result[1][2].alive = true;
    result[1][3].alive = true;
    result[2][1].alive = true;
    result[2][4].alive = true;
    result[3][2].alive = true;
    result[3][4].alive = true;
    result[4][3].alive = true;

    return result;
};


// Create a "boat" still life
StillLifes.prototype.createBoat = function () {
    var result;

    result = new GameOfLifeHelpers().create(5, 5, false);
    result[1][1].alive = true;
    result[1][2].alive = true;
    result[2][1].alive = true;
    result[2][3].alive = true;
    result[3][2].alive = true;

    return result;
};

function Oscillators() {
    // Do nothing
}

// Create a "blinker" (period 2) oscillator
Oscillators.prototype.createBlinker = function () {
    var result;

    result = new GameOfLifeHelpers().create(5, 5, false);
    result[2][1].alive = true;
    result[2][2].alive = true;
    result[2][3].alive = true;

    return result;
};

// Create a "blinker" (period 2) oscillator
Oscillators.prototype.createToad = function () {
    var result;

    result = new GameOfLifeHelpers().create(6, 7, false);
    result[2][2].alive = true;
    result[2][3].alive = true;
    result[2][4].alive = true;
    result[3][1].alive = true;
    result[3][2].alive = true;
    result[3][3].alive = true;

    return result;
};

// Create a "beacon" (period 3) oscillator
Oscillators.prototype.createBeacon = function () {
    var result;

    result = new GameOfLifeHelpers().create(6, 6, false);
    result[1][1].alive = true;
    result[1][2].alive = true;
    result[2][1].alive = true;
    result[2][2].alive = true;
    result[3][3].alive = true;
    result[3][4].alive = true;
    result[4][3].alive = true;
    result[4][4].alive = true;

    return result;
};

// Create a "pulsar" (period 3) oscillator
Oscillators.prototype.createPulsar = function () {
    var result;

    result = new GameOfLifeHelpers().create(8, 8, false);
    result[2][4].alive = true;
    result[2][5].alive = true;
    result[2][6].alive = true;
    result[4][2].alive = true;
    result[4][7].alive = true;
    result[5][2].alive = true;
    result[5][7].alive = true;
    result[6][2].alive = true;
    result[6][7].alive = true;
    result[7][4].alive = true;
    result[7][5].alive = true;
    result[7][6].alive = true;

    return result;
};

function Spaceships() {
    // Do nothing
}

// Create a "glider" spaceship
Spaceships.prototype.createGlider = function () {
    var result;

    result = new GameOfLifeHelpers().create(20, 20, false);
    result[1][2].alive = true;
    result[2][3].alive = true;
    result[3][1].alive = true;
    result[3][2].alive = true;
    result[3][3].alive = true;

    return result;
}

// Create a "Light Weight Spaceship (LWSS)" spaceship
Spaceships.prototype.createLWSS = function () {
    var result;

    result = new GameOfLifeHelpers().create(7, 30, false);
    result[1][1].alive = true;
    result[1][4].alive = true;
    result[2][5].alive = true;
    result[3][1].alive = true;
    result[3][5].alive = true;
    result[4][2].alive = true;
    result[4][3].alive = true;
    result[4][4].alive = true;
    result[4][5].alive = true;

    return result;
}


// Controller
function gameOfLife($scope) {
    $scope.create = function (rows, cols) {
        $scope.cells = new GameOfLifeHelpers().create(rows, cols, false);
    };

    // Placeholder. Filled by calling create().
    $scope.cells = [];

    $scope.flipCell = function (cell) {
        cell.alive = !cell.alive;
    };

    $scope.step = function () {
        $scope.cells = new GameOfLifeHelpers().step($scope.cells);
    };

    // Create a "block" still life
    $scope.createBlock = function() {
        $scope.cells = new StillLifes().createBlock();
    };

    // Create a "beehive" still life
    $scope.createBeehive = function () {
        $scope.cells = new StillLifes().createBeehive();
    };

    // Create a "loaf" still life
    $scope.createLoaf = function () {
        $scope.cells = new StillLifes().createLoaf();
    };

    // Create a "boat" still life
    $scope.createBoat = function () {
        $scope.cells = new StillLifes().createBoat();
    };

    // Create a "blinker" oscillator
    $scope.createBlinker = function () {
        $scope.cells = new Oscillators().createBlinker();
    };

    // Create a "toad" oscillator
    $scope.createToad = function () {
        $scope.cells = new Oscillators().createToad();
    };

    // Create a "beacon" oscillator
    $scope.createBeacon = function () {
        $scope.cells = new Oscillators().createBeacon();
    };

    // Create a "pulsar" oscillator
    $scope.createPulsar = function () {
        $scope.cells = new Oscillators().createPulsar();
    };

    // Create a "glider" spaceship
    $scope.createGlider = function () {
        $scope.cells = new Spaceships().createGlider();
    };

    // Create a "Light Weight Spaceship (LWSS)"
    $scope.createLWSS = function () {
        $scope.cells = new Spaceships().createLWSS();
    };

    // Initialize
    $scope.create(20, 20);
}
