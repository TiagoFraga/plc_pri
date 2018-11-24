$(() => {    
    $('#pass, #confirm-pass').on('keyup', () => {
        if ($('#pass').val() == $('#confirm-pass').val()) {
          $('#message').html('Matching').css('color', '#4682B4');
          $('.enable').prop('disabled', false);
 
        }
        else {
            $('#message').html('Not Matching').css('color', 'maroon');
            $('.enable').prop('disabled', true);
        }
      })
})