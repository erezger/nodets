const mongoose = require('mongoose');

export class MongooseDb {

  public connect() {
    mongoose.connect('mongodb+srv://erez:Bereshit@cluster0-utea1.mongodb.net/test1?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useCreateIndex: true
    }).then(() => {
      console.log('connected to database');
    }).catch((e) => {
      console.log('failed connected to database', e);
    });
  }
}
