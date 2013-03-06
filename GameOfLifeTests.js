test("Creation of grids", function () {
    var helpers = new GameOfLifeHelpers();
    deepEqual(helpers.create(1, 1, false), [[{alive: false}]], "1, 1");
    deepEqual(helpers.create(2, 1, false), [[{ alive: false }], [{ alive: false }]], "2, 1");
    deepEqual(helpers.create(1, 2, false), [[{ alive: false }, { alive: false }]], "1, 2");
    deepEqual(helpers.create(2, 2, false), [[{ alive: false }, { alive: false }], [{ alive: false }, { alive: false }]], "2, 2");
    deepEqual(helpers.create(3, 3, true), [[{ alive: true }, { alive: true }, { alive: true }], [{ alive: true }, { alive: true }, { alive: true }], [{ alive: true }, { alive: true }, { alive: true }]], "3, 3");
});

test("Live neighbors of cell in 1x1 grid", function () {
    var helpers = new GameOfLifeHelpers();
    equal(helpers.getLiveNeighbors(helpers.create(1, 1, false), 0, 0), 0);
});

test("Live neighbors of cell in dead 2x2 grid", function () {
    var rows = 2;
    var cols = 2;
    var helpers = new GameOfLifeHelpers();
    var grid = helpers.create(rows, cols, false);

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            equal(helpers.getLiveNeighbors(grid, row, col),
                0, row + ", " + col + " in dead grid should have 0 live neighbors");
        }
    }
});

test("Live neighbors of cell in live 2x2 grid", function () {
    var rows = 2;
    var cols = 2;
    var helpers = new GameOfLifeHelpers();
    var grid = helpers.create(rows, cols, true);

    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            equal(helpers.getLiveNeighbors(grid, row, col),
                3, row + ", " + col + " in live grid should have 3 live neighbors");
        }
    }
});

test("Live neighbors of center cell in 3x3 grid", function () {
    var rows = 3;
    var cols = 3;
    var helpers = new GameOfLifeHelpers();
    var grid = helpers.create(rows, cols, false);
    var expectedLiveNeighbors;

    grid[1][1].alive = 2;
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            expectedLiveNeighbors = (row == 1 && col == 1) ? 0 : 1;
            equal(helpers.getLiveNeighbors(grid, row, col),
                expectedLiveNeighbors, row + ", " + col + " in dead grid should have " + expectedLiveNeighbors + " live neighbor(s), except for center");
        }
    }
});

test("Live cell survival", function () {
    var helpers = new GameOfLifeHelpers();
    var tests = [
        { count: 0, result: false },
        { count: 1, result: false },
        { count: 2, result: true },
        { count: 3, result: true },
        { count: 4, result: false },
        { count: 5, result: false },
        { count: 6, result: false },
        { count: 7, result: false },
        { count: 8, result: false }
    ];

    for (var i = 0; i < tests.length; i++) {
        equal(helpers.cellLives(true, tests[i].count), tests[i].result,
            "A live cell with " + tests[i].count + " live neighbors should result in a " + (tests[i].result ? "live" : "dead") + " cell");
    }
});

test("Dead cell survival", function () {
    var helpers = new GameOfLifeHelpers();
    var tests = [
        { count: 0, result: false },
        { count: 1, result: false },
        { count: 2, result: false },
        { count: 3, result: true },
        { count: 4, result: false },
        { count: 5, result: false },
        { count: 6, result: false },
        { count: 7, result: false },
        { count: 8, result: false }
    ];

    for (var i = 0; i < tests.length; i++) {
        equal(helpers.cellLives(false, tests[i].count), tests[i].result,
            "A dead cell with " + tests[i].count + " live neighbors should result in a " + (tests[i].result ? "live" : "dead") + " cell");
    }
});