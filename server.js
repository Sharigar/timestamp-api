var http = require('http');
var url = require('url');
var sugar = require('sugar/date');

var server = new http.Server(function(req, res) {

  var urlParsed = url.parse(req.url, true);
  var pathDate = urlParsed.pathname.substring(1).replace(/%20/g," ");
  
  var sugarDate = sugar.Date.create(pathDate);
  
  var unix = null;
  var dateString = null;
  
  if (!isNaN(sugarDate.getTime())) {
    dateString = sugar.Date.format(sugarDate, '{medium}');
    unix = sugarDate.getTime()/1000>>0;
  } else {
    var unixDate = +pathDate;
    if (!isNaN(unixDate)) {
      unix = unixDate
      dateString = sugar.Date.format(new Date(unixDate), '{medium}');
    }
  }
  
  res.setHeader('Cache-control', 'no-cache,no-store,must-revalidate');
  res.end(JSON.stringify({ "unix": unix, "natural": dateString }));
});

server.listen(8080);