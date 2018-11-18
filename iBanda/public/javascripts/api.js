$(()=>{

    $("#q1").click(e=>{
        e.preventDefault()
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:9009/user/api/user",
            success: result => $("#resultados").prepend('<li>Q1: <p>' + JSON.stringify(result) + '</p></li>'),
            error: e => $("#resultados").prepend('<li>Erro em Q1: <p>' + e + '</p></li>')
        })
    })
    
    $("#q2").change(e=>{
        var id = $("#q2").val()
        $("#q2").val('')
        e.preventDefault()
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:9009/user/api/user/" + id,
            success: result => $("#resultados").prepend('<li> Q2: <p>' + JSON.stringify(result) + '</p></li>'),
            error: e => $("#resultados").prepend('<li>Erro em Q2: <p>' + e + '</p></li>')
        })
    })
})