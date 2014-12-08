

db.messages.aggregate({"$unwind":"$headers.To"}, {"$group": {"_id": '$_id', "To": {"$addToSet": '$headers.To'}}, {"$project":{"To":{'$To'}}})


db.messages.aggregate({"$unwind":"$headers.To"}, {$group:{_id:'$_id', To:{$addToSet:'$headers.To'}, From:{$first:'$headers.From'}}}, {$unwind:"$To"}, {$group:{_id:{To:"$To",From:"$From"}, count:{$sum:1}}})