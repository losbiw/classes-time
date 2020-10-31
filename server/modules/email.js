const fs = require('fs');
const { join } = require('path');

function getUserEmail(id){
    const link = `https://classes-time.herokuapp.com/account/confirm/${id}`;
    const html = fs.readFileSync(join(__dirname, 'message.html'), 'utf8');
    const edited = html.replace('user_confirmation_link', link);

    return edited
}

module.exports = getUserEmail