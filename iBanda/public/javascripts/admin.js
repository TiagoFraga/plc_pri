$(() => { 
    $("#pesquisar").change(e=>{
        var user = $("#pesquisar").val()
        $("#pesquisar").val('')
        e.preventDefault()
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:9009/api/users/list/" + user,
        })
    })
})