exports.index = function(req, res){
    res.render('index', { title: 'Food2Go' });
};


exports.home = function(req, res){
    res.render('home');
};