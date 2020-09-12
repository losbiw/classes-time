function convertCharCode(form, toEnglish){
    const convert = 'А'.charCodeAt(0) - 'A'.charCodeAt(0);
    const regex = /[A-ZА-Яа-яa-z]/gi;
    const char = form.match(regex)[0];
    const code = char.charCodeAt(0);
    const formula = toEnglish ? code - convert : code + convert;
    const translated = String.fromCharCode(formula);
    const updated = form.replace(regex, translated)

    return updated;
}  

module.exports = convertCharCode