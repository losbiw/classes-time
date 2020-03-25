function formSubmit(){
    if($('#password').val() === $('#passwordConfirm').val()){
        return true;
    }
    else{
        alert('The passwords should match up');
        return false;
    }
}
