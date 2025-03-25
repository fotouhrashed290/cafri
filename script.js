document.addEventListener("DOMContentLoaded", function() {
    // Initialization code if needed
});

// Variable to keep track of the previous values for each question
let previousValues = {};

// Object to store the points for each question group
var questionPoints = {
    group1: 0,
    group2: 0,
    group3: 0,
    group4: 0,
    group5: 0,
    group6: 0,
    group7: 0,
    group8: 0
};

function updateLayerVisibility(selectedValue, questionNumber) {
    var points = parseInt(selectedValue);
    console.log(`updateLayerVisibility called with points: ${points}, questionNumber: ${questionNumber}`);

    // Adjust previous points from the same question
    if (previousValues[questionNumber] !== undefined) {
        var previousPoints = parseInt(previousValues[questionNumber]);
        if (questionNumber === 1 || questionNumber === 2) {
            questionPoints.group1 -= previousPoints;
        } else if (questionNumber === 3) {
            questionPoints.group2 -= previousPoints;
        } else if (questionNumber === 4 || questionNumber === 5 || questionNumber === 6 || questionNumber === 7) {
            questionPoints.group3 -= previousPoints;
        } else if (questionNumber === 8 || questionNumber === 9|| questionNumber === 18|| questionNumber === 19) {
            questionPoints.group4 -= previousPoints;
        } else if (questionNumber === 10 || questionNumber === 11) {
            questionPoints.group5 -= previousPoints;
        } else if (questionNumber === 12 || questionNumber === 13) {
            questionPoints.group6 -= previousPoints;
        } else if (questionNumber === 14 || questionNumber === 15 || questionNumber === 16) {
            questionPoints.group7 -= previousPoints;
        } else if (questionNumber === 17) {
            questionPoints.group8 -= previousPoints;
        }
    }

    // Assign new points to the appropriate group based on the question number
    if (questionNumber === 1 || questionNumber === 2) {
        questionPoints.group1 += points;
        showLayerGroup1();
    } else if (questionNumber === 3) {
        questionPoints.group2 = points;
        showLayerGroup2();
    } else if (questionNumber === 4 || questionNumber === 5 || questionNumber === 6 || questionNumber === 7) {
        questionPoints.group3 += points;
        showLayerGroup3();
    } else if (questionNumber === 8 || questionNumber === 9|| questionNumber === 18|| questionNumber === 19) {
        questionPoints.group4 += points;
        showLayerGroup4();
    } else if (questionNumber === 10 || questionNumber === 11) {
        questionPoints.group5 += points;
        showLayerGroup5();
    } else if (questionNumber === 12 || questionNumber === 13) {
        questionPoints.group6 += points;
        showLayerGroup6();
    } else if (questionNumber === 14 || questionNumber === 15 || questionNumber === 16) {
        questionPoints.group7 += points;
        showLayerGroup7();
    } else if (questionNumber === 17) {
        questionPoints.group8 = points;
        showLayerGroup8();
    }

    // Save the current value as the previous value for next change
    previousValues[questionNumber] = selectedValue;

    // Update the total points display
    displayTotalPoints();
}

function showLayerGroup1() {
    var totalPoints = questionPoints.group1;
    console.log(`Group 1 total points: ${totalPoints}`);
    showLayer('g1', totalPoints === 5 || totalPoints === 6);
    showLayer('yy1', totalPoints === 3 || totalPoints === 4);
    showLayer('rr1', totalPoints === 1 || totalPoints === 2);
}

function showLayerGroup2() {
    var totalPoints = questionPoints.group2;
    console.log(`Group 2 total points: ${totalPoints}`);
    showLayer('g2', totalPoints === 3);
    showLayer('yy2', totalPoints === 2);
    showLayer('rr2', totalPoints === 1);
}

function showLayerGroup3() {
    var totalPoints = questionPoints.group3;
    console.log(`Group 3 total points: ${totalPoints}`);
    showLayer('g3', totalPoints >= 8 && totalPoints <= 11);
    showLayer('yy3', totalPoints >= 4 && totalPoints <= 7);
    showLayer('rr3', totalPoints >= 1 && totalPoints <= 3);
}

function showLayerGroup4() {
    var totalPoints = questionPoints.group4;
    console.log(`Group 4 total points: ${totalPoints}`);
    showLayer('g4', totalPoints >= 10 && totalPoints <= 16);
    showLayer('yy4', totalPoints >=5  && totalPoints <= 9);
    showLayer('rr4', totalPoints >= 1 && totalPoints <= 4);
}

function showLayerGroup5() {
    var totalPoints = questionPoints.group5;
    console.log(`Group 5 total points: ${totalPoints}`);
    showLayer('g5', totalPoints >= 5 && totalPoints <= 7);
    showLayer('yy5', totalPoints === 3 || totalPoints === 4);
    showLayer('rr5', totalPoints === 1 || totalPoints === 2);
}

function showLayerGroup6() {
    var totalPoints = questionPoints.group6;
    console.log(`Group 6 total points: ${totalPoints}`);
    showLayer('g6', totalPoints >= 7 && totalPoints <= 9);
    showLayer('yy6', totalPoints >= 3 && totalPoints <= 6);
    showLayer('rr6', totalPoints <= 2);
}

function showLayerGroup7() {
    var totalPoints = questionPoints.group7;
    console.log(`Group 7 total points: ${totalPoints}`);
    showLayer('g7', totalPoints === 8 || totalPoints === 9 || totalPoints === 10);
    showLayer('yy7', totalPoints === 5 || totalPoints === 6 || totalPoints === 7);
    showLayer('rr7', totalPoints === 2 || totalPoints === 3 || totalPoints === 4);
}

function showLayerGroup8() {
    var totalPoints = questionPoints.group8;
    console.log(`Group 8 total points: ${totalPoints}`);
    showLayer('g8', totalPoints === 3);
    showLayer('yy8', totalPoints === 2);
    showLayer('rr8', totalPoints === 1);
}

function showLayer(layerId, condition) {
    console.log(`showLayer called with layerId: ${layerId}, condition: ${condition}`);
    var layer = document.querySelector('.' + layerId);
    if (layer) {
        layer.style.visibility = condition ? 'visible' : 'hidden';
    }
}

// Calculate and display the total points
function displayTotalPoints() {
    let totalPoints = 0;
    for (let i = 1; i <= 19; i++) {
        const selectElement = document.querySelector(`select[name="question${i}"]`);
        totalPoints += parseInt(selectElement.value);
    }
    // Divide the total points by 50 and multiply by 100
    const normalizedPoints = (totalPoints / 65) * 100;
    document.getElementById('pointsCircle').textContent = normalizedPoints.toFixed(0);

    // Update the bar image based on normalized points
    updateBarImage(normalizedPoints);
}

function updateBarImage(points) {
    const barMapping = {
        3: '.bar_28',
        6: '.bar_30',
        9: '.bar_38',
        12: '.bar_46',
        15: '.bar_50',
        18: '.bar_58',
        21: '.bar_68',
        23: '.bar_76',
        26: '.bar_86',
        29: '.bar_100'
    };

    // If the current points exceed or equal to the threshold for the next bar
    if (points >= 3) {
        let nextBarKey = Object.keys(barMapping).find(key => parseInt(key) > points);
        let nextBarSelector = barMapping[nextBarKey];

        // If the next bar is different from the last shown bar, hide the last shown bar
        if (nextBarSelector !== lastShownBar) {
            if (lastShownBar) {
                let lastBar = document.querySelector(lastShownBar);
                if (lastBar) {
                    lastBar.style.visibility = 'hidden';
                }
            }

            // Show the next bar
            if (nextBarSelector) {
                let nextBar = document.querySelector(nextBarSelector);
                if (nextBar) {
                    nextBar.style.visibility = 'visible';
                    lastShownBar = nextBarSelector; // Update the last shown bar
                }
            }
        }
    }
}

// Attach event listeners to each select element to call updateLayerVisibility on change
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', function() {
        const questionNumber = parseInt(this.name.replace('question', ''));
        updateLayerVisibility(this.value, questionNumber);
    });
});
