/**
 * To Do App
 *
 * @module Controller
 */
var TODO = TODO || {};
/**
 *A Controller operations utility
 *@nameSpace TODO
 *@class Controller
 */
TODO.Controller = {
    /**
     *Fetch all cards from localStorage and render them in UI
     *@method onLoadHandler
     */
    onLoadHandler: function () {
        TODO.View.render(TODO.Modal.load());
    },
    /**
     *Open a dialog box to add or update a card or close the dialog box
     *@method dialogBoxHandler
     *@param {String} operation Operations such as add a new card, update the card or close the dialog box
     *@param {Object} element Element on which the  click event occured
     */
    dialogBoxHandler: function (operation, element) {
        var card = {};

        card.type = $(element).closest('section').attr('id');
        card.name = $(element).closest('.card').attr('id');
        card.content = $(element).closest('.card').find('.content').html();

        if (operation === 'add') {
            TODO.View.openDialogBox(card.type);
        } else if (operation === 'edit') {
            TODO.View.openDialogBox(card.type, card.name, card.content);
        } else if (operation === 'close') {
            TODO.View.closeDialogBox();
        }
    },
    /**
     *Delete the card from localStorage
     *@method deleteCardHandler
     *@param {Object} element Card element to be deleted
     */
    deleteCardHandler: function (element) {
        var card = {};

        card.type = $(element).closest('section').attr('id');
        card.content = $(element).closest('.card').find('.content').html().replace(',', '&#44;');

        TODO.Modal.delete(card.type, card.content);

        TODO.Controller.onLoadHandler();
    },
    /**
     *Save card updates to localStorage
     *@method updateCardHandler
     *@param {String} operation Operations such as add a new card or update the card in localStorage
     *@param {Object} element Dialog card element
     */
    updateCardHandler: function (operation, element) {
        var card = {};

        card.type = $(element).closest("section").attr("id");
        card.newContent = $(element).closest("section").find('.content').val().replace(',', '&#44;');

        if (operation === 'edit') {
            card.name = $(element).closest(".update-card").attr("id");
            card.oldContent = $('#' + card.name).find('.content').html().replace(',', '&#44;');
        }

        TODO.Modal.update(card);

        TODO.View.closeDialogBox();

        TODO.Controller.onLoadHandler();
    },
    /**
     *Save card sort updates to localStorage
     *@method cardDragDropHandler
     *@param {Object} element Parent element of the card being sorted
     */
    cardDragDropHandler: function (element) {
        var card = {};

        card.items = [];
        $.each($(element).find('.card .content'), function (index, value) {
            card.items[index] = $(value).text().replace(',', '&#44;');
        });
        card.type = $(element).parent('section').attr('id');
        card.newContent = card.items.join(',');
        card.sort = true;

        TODO.Modal.update(card);
    }
};

/**
 *Document load function
 */
$(function () {
    var controller = TODO.Controller;

    controller.onLoadHandler(); //Render cards from the local storage

    $('.add-card').on('click', function () { //Add card event 
        controller.dialogBoxHandler('add', this);
    });

    $('.card-wrapper').on('click', '.edit', function () { //Edit card event
        controller.dialogBoxHandler('edit', this);
    });

    $('.update-card .close a').on('click', function () { //Close dialog box event
        controller.dialogBoxHandler('close', this);
    });

    $('.card-wrapper').on('click', '.delete', function () { //Delete card event
        controller.deleteCardHandler(this);
    });

    $('.update-card').on('click', '#add', function () { //Event to add new card to localStorage
        controller.updateCardHandler('add', this);
    });

    $('.update-card').on('click', '#save', function () { //Event to save card updates to localStorage
        controller.updateCardHandler('edit', this);
    });

    $("#todo-wrapper, #doing-wrapper, #done-wrapper").sortable({  //Cards drag and drop functionality
        connectWith: ".card-wrapper"
    }).disableSelection();

    $(".card-wrapper").on("sortupdate", function (event, ui) { //Cards sort event
        controller.cardDragDropHandler(event.currentTarget);
    });

    if (window.addEventListener) { //LocalStorage change event (domain specific, works only for server hosted App)
        window.addEventListener("storage", controller.onLoadHandler, false);
    } else {
        window.attachEvent("onstorage", controller.onLoadHandler);
    }

});