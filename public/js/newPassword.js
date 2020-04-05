function formSubmit(){
    if($('#password').val() === $('#passwordConfirm').val()){
        $.ajax({
            url: window.location.pathname,
            data: {password: $('#password').val()},
            type: 'POST',
            dataType: 'json'
        });
    }
    else{
        alert('The passwords should match up');
        return false;
    }
}      
