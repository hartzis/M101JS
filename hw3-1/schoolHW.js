var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/school';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if(err) throw err;
  console.log("Connected correctly to server");

  var dataCollection = db.collection('students');
  
  var dataCollection2 = db.collection('students');

  // var options = {
  //   'sort': [["scores.type", -1]]
  // };

  var cursor = dataCollection.find({},{scores:true});

  // // cursor.sort({"scores.type":-1});

  var count;

  cursor.count(function (e, returnedCount) {
    count = returnedCount;
    console.log('count-', count);
  


    cursor.each(function (err, doc) {
      if (err) throw err;
      // if (doc === null) return db.close();
      console.log(doc);
      homeworks = doc.scores.filter(function (score) {
        return score.type === 'homework';
      });
      homeworks.sort(function (a,b) {
        return a.score - b.score;
      });
      // console.log('homeworks-', homeworks);
      // console.log('remove-', homeworks[0]);
      // dataCollection.update(doc, {$unset:{"scores":homeworks[0]}}, function (err, doc) {
      //   if (err) throw err;
      //   console.log('updated-', doc, 'count-', count);
      //   count = count - 1;
      //   if (count === 0) return db.close();
      // })

    });

  });
  
});