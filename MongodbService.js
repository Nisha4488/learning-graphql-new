const { MongoClient, ObjectId } = require('mongodb');
const dbName = "demo";
const url = "mongodb://localhost:27017";

class MongodbService{
  async init(){
    const client = await MongoClient.connect(url);
    this.db = client.db(dbName);
  }

  async getAllUsers(){
     const allUsers = await this.db.collection('users').find({}).toArray();
     return   allUsers;
  }

  async getOneUser(userId){
    const findUser = await this.db.collection('users').findOne({_id: ObjectId(userId)});
    return findUser;
  }
  async addUser(user){
  const newUser =  await this.db.collection('users').findOneAndUpdate(
        {name: user.name},
        {$set: user},
        { upsert: true });

        // console.log('newUser', newUser)
        // return {...user, _id: newUser.lastErrorObject.upserted, ...newUser.value }
        }

  async updateUser(userId, userObject){
    const updatedUser = await this.db.collection('users').findOneAndUpdate({_id:  ObjectId(userId)}, {$set: userObject})
    return updatedUser;

  }

  async deleteUser(userId){
    const removeUser =await this.db.collection('users').deleteOne({_id:ObjectId(userId)})
  }
}


module.exports = MongodbService;
