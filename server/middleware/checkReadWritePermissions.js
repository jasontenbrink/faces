module.exports = (req, res, next) => {
    const clientPins = getClientPins(req) || [];
    const x = isPostDeleteOrPut(req.method);
    if ( x ){ 
        if (clientPins.find( val => val == req.user.pin) || req.user.role > 1) next();
        else {
            console.log('**********check read/write permissions')
            console.log('req.user', req.user)
            console.log('client Pins', clientPins);
            console.log('url', req.baseUrl);
            console.log('**********check read/write permissions END')
            res.sendStatus(403);
        }
    } else next()
};

function getClientPins(req){
    if (req.body.hasOwnProperty('pin')) return [req.body.pin];
    if (req.query.hasOwnProperty('pin')) return [req.query.pin];
    if (req.body.hasOwnProperty('pinArray')) return [req.body.pinArray]; //families
    // if ...handle whatever pins there would be in an address or family request
}

const isPostDeleteOrPut = method => {
   return ['POST', 'DELETE', 'PUT'].find( value => method == value);
}