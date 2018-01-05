
let cardsSymbols = ['fa fa-diamond fa-2x', 'fa fa-paper-plane-o fa-2x', 'fa fa-anchor fa-2x', 'fa fa-cube fa-2x', 'fa fa-leaf fa-2x', 'fa fa-bolt fa-2x', 'fa fa-bolt fa-2x', 'fa fa-bicycle fa-2x', 'fa fa-bomb fa-2x', 'fa fa-diamond fa-2x', 'fa fa-paper-plane-o fa-2x', 'fa fa-anchor fa-2x', 'fa fa-cube fa-2x', 'fa fa-leaf fa-2x', 'fa fa-bicycle fa-2x', 'fa fa-bomb fa-2x'];
let card1, card2;
let i = 0;
let turn = 0;
let matchedPairs = 0;
let bestScore = 0;
let sec = 0;

shuffle(cardsSymbols);

/*
This function get the shuffeled array and  makes sure none of the cards have either a open show or a match class to close them all.
then removes the old image from the card and attaches the new one.
*/
function attach(array) {

    let card = $('li.card').each(function (i) {
        $(this).toggleClass('open show', false);
        $(this).toggleClass('match', false);
    });

    let cards = $('ul.deck').find('i');
    cards.each(function (i) {
        //remove the class with the symbol in it to start from scratch.
        $(this).removeClass();
        //add the new and shuffled symbol to the cards.
        $(this).addClass(array[i]);
    });
    turnCounter();

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    attach(array);
}




/*
event to check which card was clicked. 
Increases the moves counter and calls the function to refresh the counter on the page.
It calls the function open cards which temporarely shows up to 2 cards open (not matching)
*/
$('.card').click('li', function (e) {
    let card = $(e.target);
    turn++;
    turnCounter();
    openCards(card);    
});

//reset the game and counters.
$('.restart').click('i', function () {
    i = 0;
    turn = 0;
    matchedPairs = 0;
    card1, card2 = undefined;
    sec = 0;
    $('ul.stars > li > i').toggleClass('fa fa-star');
    turnCounter()
    $('.goldstars').children().remove();
    $('.modal-body > h1').siblings('h2').remove();
    shuffle(cardsSymbols);
});

//Timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
function pad ( val ) { 
    return val > 9 ? val : "0" + val; 
}

let timer = setInterval( function(){
    $("#seconds").html(pad(++sec%60));
    $("#minutes").html(pad(parseInt(sec/60,10)));
    stars();
}, 1000);

//remove stars from the game rating
function stars(){
    if (sec === 25) {
        $('.fa.fa-star').first().removeClass('fa fa-star');        
    } else if (sec === 32){
        $('.fa.fa-star').first().removeClass('fa fa-star');
    } else if(sec === 40){
        $('.fa.fa-star').first().removeClass('fa fa-star');
    }
}

function removeStar(){
    $('.fa.fa-star').first().removeClass('fa fa-star');
}

/*
temporarely attaches the class open show to show the cards even if they donw match.
it calls the function to store those cards values.
*/
function openCards(card) {
    card.addClass('open show');
    addToList(card);
}

//Dettaches the class open show to show the cards even once the turn has finished.
function closeCards(a, b) {
    a.toggleClass('swing',true);
    b.toggleClass('swing',true);
    setTimeout(() => {
        a.toggleClass('open show', false);
        b.toggleClass('open show', false);
        a.toggleClass('swing', false);
        b.toggleClass('swing', false);
    }, 750);
    
}

//Store cards values temporarely to check if they are equal and calls the method to do so.
function addToList(card) {
    if (i === 0) {
        card1 = card;
        i++;
    } else {
        card2 = card;
        i = 0;
        compareCards(card1, card2);
    }
}

/*
check the cards in the turn for equality if so add match class to keep them open and remove the temporary classes open show.
increase the counter of matched pairs.
closes the cards in case they are not a match and erase values from temporary variables and check if the game is won.
*/
function compareCards(a, b) {
    if (a.children()["0"].className === b.children()["0"].className) {
        a.addClass('match');
        b.addClass('match');
        closeCards(a, b);
        matchedPairs++;
    } else {
        closeCards(a, b);
    }
    card1, card2 = undefined;
    won(matchedPairs);
}

function turnCounter() {
    turnText = 'Moves: ' + turn
    $('span.moves').text(turnText);
}

/*
Checks for a win.  
Reveals the modal that shows the victory.
and calls the record function.
*/
function won(matchedPairs) {
    if (matchedPairs === 8) {
        winModal();
        record();
        clearInterval(timer);
    }
}

function winModal(){
    $('#winning').modal('show');
    $('.modal-body > h1').after(`<h2>It Took you ${parseInt(sec/60,10)}: ${sec%60} minutes.</h2><h2>With only: ${turn} movements!!</h2>`);
    $('ul.stars').clone().appendTo('.goldstars');
    $('.goldstars').children().css({'list-style': 'none', 'display': 'inline-flex'});
}

//Updates and keeps the best record on the games played.
function record() {
    if (bestScore === 0 || turn < bestScore) {
        bestScore = 'Best Score: ' + turn;
        $('span.record').text(bestScore);
    }
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */