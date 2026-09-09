import {MongoClient, ServerApiVersion} from 'mongodb';

const uri = 'mongodb+srv://eva3_express:CPPWVkOK6wjgM1kQ@cluster-express.mmsdpbk.mongodb.net/?appName=cluster-express';

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export default client 