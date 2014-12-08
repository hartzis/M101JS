var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/q7';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if(err) throw err;
  console.log("Connected correctly to server");

  var imagesCollection = db.collection('images');

  var albumsCollection = db.collection('albums');

  var cursor = imagesCollection.find({}, {});

  var count;

  cursor.count(function (e, returnedCount) {
    count = returnedCount;
    console.log('count-', count);
  
    cursor.each(function (err, doc) {
      if (err) throw err;
      if (doc === null) return;
      // console.log(doc._id);

      var cursor2 = albumsCollection.find({"images":doc._id}, {});

      cursor2.count(function (e, returnAlbumsCount) {
        count = count - 1;
        if (returnAlbumsCount > 0) {
          console.log('album for-', doc._id);
          return;
        }
        console.log('no album for-', doc._id);
        imagesCollection.remove({_id:doc._id}, function (err, removedDoc) {
          console.log('removed-', doc._id);
          return;
        })
      })
      
      // albumsCollection.update({"images":doc._id}, {}, function (err, album) {
      //   if (doc) return;
      //   console.log('no album for-', doc.id);
      //   count = count - 1;
      //   if (count === 0) return db.close();
      // })

      // dataCollection.update(doc, {$pull:{"scores":removeHomework}}, function (err, doc) {
      //   if (err) throw err;
      //   console.log('updated-', doc, 'count-', count);
      //   count = count - 1;
      //   if (count === 0) return db.close();
      // })

    });

  });

  
});