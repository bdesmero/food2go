$(document).on('ready', function(){
    console.log("Food2Go");

    var height = window.innerHeight - (2* $('.header').height());
    //$('#chat-box').css('height', window.innerHeight-100);
    $('#chat-box').css('height', height);

    var socket = io.connect('http://127.0.0.1:3000');

    socket.on('message', function(data){
        var output = '';
        output += "<div class='well message' style='display: none;'>";
        output += "<b><em>" + data.name + "</em></b>";
        output += "<p>" + data.message + "</p>"
        output += "</div>";

        $(output).prependTo('#chat-messages');
        $('.message').slideDown();
        $('#message').val('').focus();
    });


    $('#start-chat').on('click', function(){
        $('#chat-name').slideUp();
        $('#chat').slideDown();
        $('#message').focus();

        var height = $('#chat-box').height() - (3* $('#chat-input').height());
        $('#chat-messages').css('height', height);
    });


    $('#send-message').on('click', function(){
        socket.emit('message', {
            name: $('#name').val(),
            message: $('#message').val(),
            date: new Date().toUTCString()
        });
    });


    $('#hide-chat').on('click', function(){
        $('#chat-box').slideUp();
        //$('#show-chat').slideDown();
    });


    $('#hide-order').on('click', function(){
        $('#order-box').slideUp();
        //$('#show-chat').slideDown();
    });



    $('#show-chat').on('click', function(){
        $('#order-box').slideUp();
        $('#chat-box').slideDown();
    });


    $('#show-order').on('click', function(){
        $('#chat-box').slideUp();
        $('#order-box').slideDown();
    });


    $('.add-order').on('click', function(){
        var _this = $(this);

        var output = '';
        output += "<tr class='order-item' data-item-id=" + _this.data('id') + ">";
        output += "<td><b><em>" + _this.data('name') + "</em></b></td>";
        output += "<td class=;><b><em>" + _this.data('price') + "</em></b></td>";
        output += "</tr>";

        $('#order-box').slideDown();
        $(output).prependTo('#order-list');

        var price = parseFloat(_this.data('price')),
            totalPrice = parseFloat($('#total').val()),
            newTotal = price + totalPrice;

        $('#total').val(newTotal);

    });

});