$(() => { 
    $("#remover").click(e=>{
        e.preventDefault()
        var username = $("#username").val()
        $("#username").val('')
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:9009/admin/users/remover/" + username,
            success: result => console.log("fixe"),
            error: e => console.log("merda")
        })
    })
})