let dateObject = new Date();
let hourForConvert = dateObject.getHours().toString();
let minuteForConvert = dateObject.getMinutes().toString();
let day = dateObject.getDay();
const filterSvg = 'invert(100%) sepia(80%) saturate(8%) hue-rotate(188deg) brightness(102%) contrast(99%)';
let time;
let svgs;

const adress = getAdress();
const userData = getData('getData');
const classes = getData('getClasses');

const themes = {
    darkMode: {text: 'white', background: '#1c1c1c', font: 'Montserrat', filterSvg: filterSvg},//darkMode
    lightMode: {text: '#1c1c1c', background: 'white', font: 'Montserrat', filterSvg: 'none'},//lightMode
    rainbowMode: {text: 'white', animation: 'rainbow', font: 'Montserrat', filterSvg: filterSvg},//some strange rainbow stuff
    minecraftMode: {text: 'white', 
        background: [['Stuff/2.jpg', 'Stuff/3.jpg', 'Stuff/4.png', 'Stuff/5.png', 'Stuff/6.jpg'], ['Stuff/7.jpg', 'Stuff/8.jpg', 'Stuff/9.jpg']],
        font: 'MinecrafterAltRegular', 
        audio: 'https://vgmdownloads.com/soundtracks/minecraft/udxfrsyp/Volume%20Alpha%20-%2018%20-%20Sweden.mp3', 
        filterSvg: filterSvg
    }
};

const endings = [845, 940, 1040, 1140, 1240, 1335, 1430, 1525];

window.onload = function(){
    svgs = $('#body').find('.SVGs');
    changeTheme(themes[userData.theme], body);
    if(minuteForConvert < 10){
        minuteForConvert = "0" + minuteForConvert;
    }
    time = parseInt(hourForConvert + minuteForConvert, 10);
    day = classes[day - 1];
    if(day === 0 || day === 6){
        $('p').text("Nah man, it looks like it's weekend rn");
        $('h1').text("So better stay at home");
    }
    else{
        const lesson = returnClass();
        $('h1').text(lesson);
    }
    $('#darkMode').click(() => updatingTheme(themes.darkMode));
    $('#lightMode').click(() => updatingTheme(themes.lightMode));
    $('#rainbowMode').click(() => updatingTheme(themes.rainbowMode));
    $('#minecraftMode').click(() => updatingTheme(themes.minecraftMode));
    $('#menu').click(openMenu);
    $('#close').click(closeMenu);
}

function updatingTheme(theme){
    changeTheme(theme, body);
    updateTheme(theme);
}

function returnClass(){
    if(time < endings[0]){
        return day[0];
    }
    else if(time > endings[day.length - 1]){
        $('p').text('Congrats');
        return "It seems like it's finally time to go home";
    }
    for(let i = 0; i < day.length; i++){
        if(time >= endings[i] && time < endings[i + 1]){
            return day[i + 1];
        }
    }
}

function changeTheme(theme, toChange){
    $('h1').css('text-shadow', 'none');
    $('p').css('text-shadow', 'none');
    let {text, background, animation, filterSvg, font, audio} = theme;
    const audioEl = document.getElementById('audio');
    $(body).css('font-family', font);
    audioEl.setAttribute('src', '');
    $(body).css('color', text);
    $('#language').css('color', text);
    $(svgs).css('filter', filterSvg);
    if(background != undefined){
        $(body).css('animation-name', 'none');
        $(body).css('background', background);
    }
    if(animation != undefined){
        $(body).css('animation-name', animation);
    }
    if(theme === themes.minecraftMode){
        audioEl.setAttribute('src', audio);
        $('p').css('text-shadow', 'black 0 0 1vh');
        $('h1').css('text-shadow', 'black 0 0 1vh');
        if(time <= endings[endings.length - 1]){
            let random = Math.floor(Math.random() * theme.background[0].length);
            $(body).css('background-image', `url(${theme.background[0][random]})`);
        }
        else{
            let random = Math.floor(Math.random() * theme.background[1].length);
            $(body).css('background-image', `url(${theme.background[1][random]})`);
        }
    }
    closeMenu();
}

function openMenu(){
    $('#menu').css('visibility', 'hidden');
    $('nav').css('animation', 'menu 1s');
    setTimeout(() => {$('nav').css('visibility', 'visible'); 
                      $('nav').css('opacity', '1');}, 
    900);
}

function closeMenu(){
    $('nav').css('animation', 'menuClose 1s');
    setTimeout(() => {$('nav').css('visibility', 'hidden'); 
                      $('nav').css('opacity', '0');
                      $('#menu').css('visibility', 'visible');}, 
    900);
}

function getData(param){
    let result;
    $.ajax({
        url: `/user/${adress}/${param}`,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: (data)=>{
            result = data;
        },
        error: ()=>'error has occured'
    })
    return result;
}

function updateTheme(theme){
    const themesKeys = Object.keys(themes);
    let currentTheme;
    for(let i = 0; i < themesKeys.length; i++){
        if(themes[themesKeys[i]] == theme){
            currentTheme = themesKeys[i];
        }
    }
    let data = {
        id: adress,
        theme: currentTheme
    } 
    $.ajax({
        url: '/signup',
        data: data,
        type: 'PATCH',
        dataType: 'json'
    });
}

function getAdress(){
    const path = window.location.pathname;
    const slicedPath = [...path];
    let adress = '';
    for(let i = 6; i < slicedPath.length; i++){
        adress += slicedPath[i];
    };
    return adress;
}
