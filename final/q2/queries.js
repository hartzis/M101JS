

db.messages.aggregate([{$unwind:"$headers.To"},
  {$group: {_id: '$_id', To: {$addToSet: '$headers.To'}, from: 1}},])