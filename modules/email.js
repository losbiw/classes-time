const fs = require('fs');
const { join } = require('path');

function getUserEmail(id){
    const link = `http://localhost:5000/account/confirm/${id}`;
    const html = fs.readFileSync(join(__dirname, 'message.html'), 'utf8');
    const edited = html.replace('user_confirmation_link', link);

    return edited
}

module.exports = getUserEmail