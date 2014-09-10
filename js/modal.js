/**
 *The To Do App
 *
 *@module Modal
 */
var TODO = TODO || {};
/**
 *A Modal operations utility
 *@nameSpace TODO
 *@class Modal
 */
TODO.Modal = {
    /**
     *Load all Todo cards data from local storage
     *@method load
     *@return {Object} cards An object containing info of all cards
     */
    load: function () {
        var cards = {};
        
        cards.todo = localStorage.todo;
        cards.doing = localStorage.doing;
        cards.done = localStorage.done;

        return cards;
    },
    /**
     *Update Todo cards in local storage
     *@method update
     *@param {Object} card A card object containing info such as card type, old content, new content, name etc.
     */
    update: function (card) {
        var content = localStorage[card.type];

        if (card.sort) {

            localStorage[card.type] = card.newContent;
        } else if (content && card.oldContent) {

            localStorage[card.type] = content.replace(card.oldContent, card.newContent);
        } else if (content) {

            localStorage[card.type] = content + ',' + card.newContent;
        } else {

            localStorage[card.type] = card.newContent;
        }
    },
    /**
     *Delete the Todo card from local storage
     *@method delete
     *@param {String} type Card Type to be updated
     *@param {String} cardContent Content of the card to be deleted from localStorage
     */
    delete: function (type, cardContent) {
        var content = localStorage[type];

        if (content) {
            localStorage[type] = content.replace(cardContent, '').replace(',,', ',').replace(/^,|,$/g, '');
        }
    }
};