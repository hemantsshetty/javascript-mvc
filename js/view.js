/**
 * To Do App
 *
 * @module View
 */
var TODO = TODO || {};
/**
 *A View operations utility
 *@nameSpace TODO
 *@class View
 */
TODO.View = {
    /**
     *Render all To Do cards into the UI
     *@method render
     *@param {Object} cards An Object containing list of cards
     */
    render: function (cards) {
        var cardElement,
            cardCount,
            type,
            i,
            pushCards = function (type, cardList) {
                cardCount = cardList.length;
                cardElement = '';

                for (i = 0; i < cardCount; i += 1) {
                    if (cardList[i] !== '') {
                        cardElement += '<div id="' + type + "_" + i + '" class="card round"><div class="content">' +
                            cardList[i] + '</div><div class="update"><a class="delete">delete</a><a class="edit">edit</a></div></div>';
                    }
                }

                jQuery('#' + type + ' .card-wrapper').html(cardElement);
            };

        for (type in cards) {

            if (cards[type] || cards[type] === '') {
                pushCards(type, cards[type].split(','));
            }
        }
    },
    /**
     *Open a dialog box to add or update a card
     *@method openDialogBox
     *@param {String} type Type of the card viz. todo, doing and done
     *@param {String} name Name of the card
     *@param {String} cardContent Previous card content for updating a card and blank for adding new card
     */
    openDialogBox: function (type, name, cardContent) {
        var dialogBoxElement = jQuery('.update-card-wrapper');

        jQuery(dialogBoxElement).find('.update-card').attr('id', name);
        jQuery(dialogBoxElement).attr('id', type);

        if (cardContent) {
            jQuery(dialogBoxElement).find('.save-add').html('Save').attr('id', 'save');
            jQuery(dialogBoxElement).find('.content').val(cardContent);
        } else {
            jQuery(dialogBoxElement).find('.save-add').html('Add').attr('id', 'add');
            jQuery(dialogBoxElement).find('.content').val('');
        }

        jQuery(dialogBoxElement).show();
    },
    /**
     *Close the add or update card dialog box
     *@method closeDialogBox
     */
    closeDialogBox: function () {
        jQuery('.update-card-wrapper').hide();
    }
};