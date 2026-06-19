import { incrementDbClickCount, recordWin } from "./firebase_database.js";
import { tryPopUpAd } from "./modal.js";
import { blink, getCubeIdFromPath } from "./utils.js";
import {
    Region,
    mseaSlotItems,
    gmsSlotItems,
    kmsSlotItems,
    p2wSlotItems,
    cmsSlotItems,
    tmsSlotItems,
    jmsSlotItems,
    lmaoSlotItems,
    debugSlotItems,
} from "./constants.js";

const NUM_SLOT_ITEMS = 6;

var currClicks = 0;
var bag1 = $('#bag1');
var bag2 = $('#bag2');
var bag3 = $('#bag3');

var selectedRegion = Region.MSEA;

// slotImg array which contains the images for each of the three wheels
var slotImg = [[], [], []];
setDefaultImgs(slotImg[0]);
setDefaultImgs(slotImg[1]);
setDefaultImgs(slotImg[2]);

// counter for randomizeImgs()
var slotImgCounter = 0;
var x = 0;

// populate region-select options
populateRegionOptions();

// randomizing and adding images to #bags
applyRandImgs(bag1, slotImg[0], 23);
applyRandImgs(bag2, slotImg[1], 23);
applyRandImgs(bag3, slotImg[2], 23);

$('#click-button').on("click", spinSlotMachine);
$('#click-button').on("click", incrementDbClickCount);

function populateRegionOptions() {
    const $container = $('#region-select');
    $container.empty();
    Object.keys(Region).forEach(key => {
        const regionValue = Region[key];
        const $button = $('<button></button>')
            .addClass('region-button')
            .text(key)
            .attr('data-region', regionValue)
            .on('click', function() {
                changeRegionImages(regionValue);
            });

        if (regionValue === selectedRegion) {
            $button.addClass('selected');
        }

        $container.append($button);
    });
}

function changeRegionImages(newRegion) {
    if (selectedRegion === newRegion) return;

    const oldRegion = selectedRegion;
    selectedRegion = newRegion;

    $('.region-button').removeClass('selected');
    $(`.region-button[data-region="${newRegion}"]`).addClass('selected');

    swapRegionImages(oldRegion, selectedRegion);
}

function getRegionSet(region) {
    switch (region) {
        case Region.GMS:
            return gmsSlotItems;
        case Region.KMS:
            return kmsSlotItems;
        case Region.P2W:
            return p2wSlotItems;
        case Region.CMS:
            return cmsSlotItems;
        case Region.JMS:
            return jmsSlotItems;
        case Region.TMS:
            return tmsSlotItems;
        case Region.LMAO:
            return lmaoSlotItems;
        case Region.DEBUG:
            return debugSlotItems;
        case Region.MSEA:
        default:
            return mseaSlotItems;
    }
}

function swapRegionImages(fromRegion, toRegion) {
    const fromSet = getRegionSet(fromRegion);
    const toSet = getRegionSet(toRegion);

    for (let i = 0; i < slotImg.length; i++) {
        for (let j = 0; j < slotImg[i].length; j++) {
            let itemIndex = fromSet.indexOf(slotImg[i][j]);
            if (itemIndex !== -1) {
                slotImg[i][j] = toSet[itemIndex];
            }
        }
    }

    // update images for all bags
    updateBagHtml(bag1, slotImg[0]);
    updateBagHtml(bag2, slotImg[1]);
    updateBagHtml(bag3, slotImg[2]);
}

function updateBagHtml(element, array) {
    let text = "";
    for (let i = 0; i < array.length; i++) {
        if (i != 3) {
            text += '<img src="' + array[i] + '">';
        } else {
            text += '<img class="result" src="' + array[i] + '">';
        }
    }
    element.html(text);
}

function spinSlotMachine() {
    // add spin counter
    addClicks();
    // remove event listener
    $('#click-button').off("click");
    $('.region-button').prop('disabled', true);
    // spinner button animation
    $('#wheel').addClass("spin");

    // wheels will physically stop at the same spot every time
    // reset() sets wheel back to starting point
    reset(bag1);
    reset(bag2);
    reset(bag3);
    if (x > 0) {
        applyRandImgs(bag1, slotImg[0], 23);
        applyRandImgs(bag2, slotImg[1], 23);
        applyRandImgs(bag3, slotImg[2], 23);
    }
    // spin wheels one by one
    spin(bag1);
    setTimeout(function() {
        spin(bag2);
    }, 1000)
    setTimeout(function() {
        spin(bag3);
    }, 2000)

    setTimeout(function() {
        $('#wheel').removeClass("spin");

        // return event listener
        $('#click-button').on("click", spinSlotMachine);
        $('#click-button').on("click", incrementDbClickCount);
        $('.region-button').prop('disabled', false);

        // check results
        const result0 = $('.result').eq(0).attr("src");
        const result1 = $('.result').eq(1).attr("src");
        const result2 = $('.result').eq(2).attr("src");
        console.log(result0);
        console.log(result1);
        console.log(result2);

        if (result0 === result1 && result1 === result2) {
            console.log("yipee");
            document.querySelector("#slots").classList.add("win");
            setTimeout(() => document.querySelector("#slots").classList.remove("win"), 3000);

            const winningCubeId = getCubeIdFromPath(result0);
            recordWin(winningCubeId);
            tryPopUpAd(result0);
        } else {
            console.log("sadge");
        }

        x++;
    }, 7000)
}

function setDefaultImgs(array) {
    array[23] = 'images/cubes/O00_mirc_cube.png';
    array[24] = 'images/cubes/O00_mirc_cube.png';
    array[25] = 'images/cubes/O00_mirc_cube.png';
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
    var imgSetToUse = getRegionSet(selectedRegion);

    let random = Math.floor(Math.random()* NUM_SLOT_ITEMS);
    if (slotImgCounter < num) {
        if (array.length < 1) {
            array[slotImgCounter] = imgSetToUse[random];
            slotImgCounter++;
        } else if (array[slotImgCounter-1] != imgSetToUse[random]) {
            if (array.length < 2) {
                array[slotImgCounter] = imgSetToUse[random];
                slotImgCounter++;
            } else if (array[slotImgCounter-2] != imgSetToUse[random]) {
                array[slotImgCounter] = imgSetToUse[random];
                slotImgCounter++;
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
    // leave the 9 visible slotItems on the screen unchanged for the second spin while randomizing others
    if (array[2] != undefined) {
        array[23] = array[2];
        array[24] = array[3];
        array[25] = array[4];
    }

    randomizeImgs(array, num);
    slotImgCounter = 0; // reset counter

    updateBagHtml(element, array);
}

function addClicks() {
    currClicks += 1;
    blink($('#slot-curr-clicks'));
    $('#slot-curr-clicks').text(currClicks);
}
