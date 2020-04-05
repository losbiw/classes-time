$('#submit').click(()=>{
    $.ajax({
        type: 'POST',
        url: 'recovery',
        data: $('#email').val(),
        dataType: 'json'
    });
});