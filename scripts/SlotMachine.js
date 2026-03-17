import {incrementDbClickCount} from "./firebase_database.js";

var currClicks = 0;
var bag1 = $('#bag1');
var bag2 = $('#bag2');
var bag3 = $('#bag3');
var slotItems = [
    'images/cubes/O00_mirc_cube.png',
    'images/cubes/A00_sus_cube.png',
    'images/cubes/A10_reg_cube.png',
    'images/cubes/A11_choice_cube.png',
    'images/cubes/A12_reg_acube.png',
    'images/cubes/A13_choice_acube.png'
];
const NUM_SLOT_ITEMS = 6;
//var premium = ["images/premium/new_equi_cube.png", "images/premium/equi_cube.png", "images/premium/new_hexa_cube.png", "images/premium/hexa_cube.png", "images/premium/new_uni_cube.png", "images/premium/uni_cube.png"];

//slotImg array which contains the images for each of the three wheels
var slotImg = [[], [], []];
defaultImgs(slotImg[0]);
defaultImgs(slotImg[1]);
defaultImgs(slotImg[2]);

//counter variable for randomizeImgs()
var counter = 0;

var x = 0;

//randomizing and adding images to html (#bags)
applyRandImgs(bag1, slotImg[0], 23);
applyRandImgs(bag2, slotImg[1], 23);
applyRandImgs(bag3, slotImg[2], 23);

console.log(slotImg);

$('#click-button').on("click", slotMachine);
$('#click-button').on("click", incrementDbClickCount);

//$('#btn').on("click", tryPopUpAd);
console.log(slotImg);

function slotMachine() {
    //add spin counter
    addClicks();
    //remove event listener
    $('#click-button').off("click");
    //spinner button animation
    $('#wheel').addClass("spin");

    /*
    //audio effects for the wheels
    var audioElement1 = document.createElement('audio');
    var audioElement2 = document.createElement('audio');
    var audioElement3 = document.createElement('audio');
    audioElement1.setAttribute('src', 'audio/holder1.wav');
    audioElement2.setAttribute('src', 'audio/holder2.wav');
    audioElement3.setAttribute('src', 'audio/holder3.wav');
    audioElement1.play();
    */

    //the wheels will physically stop at the same spot every time
    //reset function is there in order to get it to the starting point again
    reset(bag1);
    reset(bag2);
    reset(bag3);
    if (x > 0) {
        applyRandImgs(bag1, slotImg[0], 23);
        applyRandImgs(bag2, slotImg[1], 23);
        applyRandImgs(bag3, slotImg[2], 23);
    }
    //spinning the wheels one by one
    spin(bag1);
    setTimeout(function() {
        //audioElement2.play();
        spin(bag2);
    }, 1000)
    setTimeout(function() {
        //audioElement3.play();
        spin(bag3);
    }, 2000)

    setTimeout(function() {
        $('#wheel').removeClass("spin");

        //returning the event listener
        $('#click-button').on("click", slotMachine);
        $('#click-button').on("click", incrementDbClickCount);

        //check results
        console.log($('.result').eq(0).attr("src"));
        console.log($('.result').eq(1).attr("src"));
        console.log($('.result').eq(2).attr("src"));

        if ($('.result').eq(0).attr("src") == $('.result').eq(1).attr("src") && $('.result').eq(1).attr("src") == $('.result').eq(2).attr("src")) {
            console.log("yipee");
            document.querySelector("#slots").classList.add("win");
            setTimeout(() => document.querySelector("#slots").classList.remove("win"), 3000)
        } else {
            console.log("sadge");
        }

        x++;
    }, 7000)
}

function defaultImgs(array) {
    array[23] = 'images/star.png';
    array[24] = 'images/star.png';
    array[25] = 'images/star.png';
    console.log(array);
}

function reset(element) {
    element.css({
        left: "0",
        right: "0",
        top: "-3805px"
    })
}

function spin(element) {
    element.animate({
        top: "-380px"
    }, 5000)
}

function randomizeImgs(array, num) {
    var imgSetToUse = slotItems;
    // if (window.location.pathname.indexOf("premium") !== -1) {
    //     imgSetToUse = premium;
    // } else {
    //     imgSetToUse = slotItems;
    // }

    let random = Math.floor(Math.random()* NUM_SLOT_ITEMS);
    if (counter < num) {
        if (array.length < 1) {
            array[counter] = imgSetToUse[random];
            counter++;
        } else if (array[counter-1] != imgSetToUse[random]) {
            if (array.length < 2) {
                array[counter] = imgSetToUse[random];
                counter++;
            } else if (array[counter-2] != imgSetToUse[random]) {
                array[counter] = imgSetToUse[random];
                counter++;
            } else {
                randomizeImgs(array, num);
            }
        } else {
            randomizeImgs(array, num);
        }
        randomizeImgs(array, num);
    }
}

function applyRandImgs(element, array, num) {
    // Leave the 9 visible slotItems on the screen unchanged for the second spin while randomizing others
    if (array[2] != undefined) {
        array[23] = array[2];
        array[24] = array[3];
        array[25] = array[4];
    }

    randomizeImgs(array, num);
    // Reset the counter
    counter = 0;

    let text = "";
    for (let i = 0; i < array.length; i++) {
        if (i != 3) {
            text += '<img src="'+ array[i] +'">';
        } else {
            text += '<img class="result" src="'+ array[i] +'">';
        }
    }
    element.html(text);
}

function addClicks() {
    currClicks += 1;

    blink($('#slot-curr-clicks'));
    $('#slot-curr-clicks').text(currClicks);

}

function blink(element){
    element.animate({ opacity: 0 }, 200, 'linear', function(){
        $(this).animate({ opacity: 1 }, 200);
    });
}
