const adress = getAdress();

$.ajax({
    url: `/user/${adress}`,
    data: {isConfirmed: true},
    type: 'PATCH',
    dataType: 'json',
});

function getAdress(){
    const path = window.location.pathname;
    const slicedPath = [...path];
    let adress = '';
    for(let i = 6; i < slicedPath.length; i++){
        adress += slicedPath[i];
    };
    return adress;
}