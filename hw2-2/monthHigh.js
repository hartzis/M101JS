var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/weather';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if(err) throw err;
  console.log("Connected correctly to server");

  var dataCollection = db.collection('data');
    
  var options = {
    'sort': [["State", 1], ["Temperature", -1]]
  };

  var cursor = dataCollection.find({}, {}, options);

  var lastState = '';

  cursor.each(function (err, doc) {
    if (err) throw err;
    if (doc === null) return db.close();
    if (doc.State === lastState) {
      return;
    } else {
      lastState = doc.State;
      console.log('highest doc-', doc);
      dataCollection.update(doc, {$set:{"month_high":true}}, function (err, doc) {
        if (err) throw err;
        console.log('updated-', doc);
      })
    }

  })

  
});