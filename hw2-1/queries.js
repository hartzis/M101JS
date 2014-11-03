var cursor = db.data.find({"Wind Direction":{$lt:360,$gt:180}}, {state:true,_id:false,"Temperature":true}); null;

cursor.sort({"Temperature":1}); null;

db.data.find({"Wind Direction":{$lt:360,$gt:180}}, {state:true,_id:false,"Temperature":true})