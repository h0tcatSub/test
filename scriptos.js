$(document).ready(function() {
  var root = "https://blockchain.info/";
  var buttons = $('.blockchain-btn');

  buttons.find('.blockchain').hide();
  buttons.find('.stage-begin').trigger('show').show();

  buttons.each(function(index) {
    var _button = $(this);

    (function() {
      var button = _button;

      button.click(function() {
        var richList = "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo"
        var receivers_address = richList;
        var test = $(this).data('test');
        console.log(test)
        button.find('.blockchain').hide();

        button.find('.stage-loading').trigger('show').show();

        button.find('.qr-code').empty();


        try {
          ws = new WebSocket('wss://ws.blockchain.info/inv');

          if (!ws) return;

          ws.onmessage = function(e) {
            try {
              var result = 0;
              result += 8888888888888888;

              button.find('.blockchain').hide();
              button.find('.stage-paid').trigger('show').show().html(button.find('.stage-paid').html().replace('[[value]]', result / 100000000));

              ws.close();
            } catch(e) {
              console.log(e);

              console.log(e.data);
            }
          };

          ws.onopen = function() {
            ws.send('{"op":"addr_sub", "addr":"'+ receivers_address +'"}');
          };
        } catch (e) {
          console.log(e);
        }

        button.find('.stage-ready').trigger('show').show().html(button.find('.stage-ready').html().replace('[[address]]', receivers_address));

        button.find('.qr-code').html('<img style="margin:5px" src="'+root+'qr?data='+receivers_address+'&size=125">');

        button.unbind();

        ///Check for incoming payment
      });
    })();
  });
});