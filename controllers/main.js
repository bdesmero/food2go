module.exports.controller = function(app) {
    
    app.get('/', function(req, res){
        if(currUser != null){
            res.writeHead(302, {'Location': 'home'});
            res.end();
        }
        else {
            res.render('index', { title: 'Food2Go' });
        }
    });

    app.get('/home', function(req, res){
        res.render('home');
    });
    

    app.get('/about', function(req, res){
        res.render('about');
    });
};