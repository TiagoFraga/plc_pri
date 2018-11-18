$(() => {
    $('#adicionar').click(e =>{
        e.preventDefault()
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:9009/user/register",
            data: JSON.stringify({ id: $('#id_user').val() , name: $('#user_name').val(), password: $('#pass').val() , email: $('#mail').val(),userType: $('#type').val()}),
            success: p => alert('Utilizador gravado com sucesso!!' + p),
            error: e => alert('Erro na gravação do utilizador ' + JSON.stringify(e))
        })

    })
    
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