import { MongoClient } from 'mongodb'
// /api/new-meetup
// POST /api/new-meet


const handler = async (req, res) => {
    try {
        if(req.method === 'POST') {
            const data = req.body;
    
            const client = await MongoClient.connect('mongodb+srv://tanushjangid1234:ftqwo0jR7bIffVUs@cluster0.6gmgaqm.mongodb.net/meetups?retryWrites=true&w=majority');
    
            const db = client.db();
    
            const meetupsCollection = db.collection('meetups');
    
            const result = await meetupsCollection.insertOne(data);
    
            console.log(result)
    
            client.close()
    
            res.status(201).json({message: 'Meetup inserted!'});
        }
    } catch (err) {
        console.log(err);
    }
}

export default handler;