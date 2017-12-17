/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

$(function () {
    let cardsSymbols = ['fa fa-diamond fa-2x', 'fa fa-paper-plane-o fa-2x', 'fa fa-anchor fa-2x', 'fa fa-cube fa-2x', 'fa fa-leaf fa-2x', 'fa fa-bolt fa-2x', 'fa fa-bolt fa-2x', 'fa fa-bicycle fa-2x', 'fa fa-bomb fa-2x', 'fa fa-diamond fa-2x', 'fa fa-paper-plane-o fa-2x', 'fa fa-anchor fa-2x', 'fa fa-cube fa-2x', 'fa fa-leaf fa-2x', 'fa fa-bicycle fa-2x', 'fa fa-bomb fa-2x'];

    cardsSymbols = shuffle(cardsSymbols);

    attach(cardsSymbols);

    function attach(array) {
        let cards = $('ul.deck').find('i');
        cards.each(function (i) {
            //remove the class with the symbol in it to start from scratch
            $(this).empty();
            //add the new and shuffled symbol to the cards
            $(this).addClass(array[i]);
        });
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
})

let cards = [];
let i = 0;

$('.card').click('li', function (e) {

    let card = $(e.target);
    let symbol = card.children();

    let symbolInCard = symbol["0"].className;

    openCards(card, symbolInCard);

    //console.log(symbol["0"].className);

});

function openCards(card, symbol) {

    card.addClass('open show');
    addToList(card, symbol);
}

function addToList(card, symbol) {

    if (cards[0] != undefined) {
        cards.forEach(e => {
            if (e === symbol) {
                closeCards(card);
                card.addClass('match');
            } else {
                closeCards(card);
            }
            console.log(e);
        });
    } else {

    }

    if (i < 16) {
        cards[i] = symbol;
        i++;
    }
    console.log(cards);
}

function closeCards(card) {
    card.toggleClass('open show');
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
