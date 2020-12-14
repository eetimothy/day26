//load lib
const express = require('express')
const morgan = require('morgan')
const e = require('express')

//import the mongo driver
const MongoClient = require('mongodb').MongoClient
//connection string
const MONGO_URL = 'mongodb://localhost:27017'

//ATLAS SETUP EXAMPLE
/*
const MONGO_USER = process.env.MONGO_USER
30_PASSWORD = process.env.MONGO_PASSWORD
*/

//create a client pool
const mongoClient = new MongoClient(MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
)



//config port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

//instantiate express
const app = express()

app.use(morgan('combined'))

//GET/ countries (a list of all the sorted countries from the db)
app.get('/countries', async (req, res) => {
    const countries = req.params['countries']

    try {
        const result = await mongoClient.db('winemag')
            .collection('wine')
            .distinct('country')
            
         

        res.status(200)
        res.type('application/json')
        res.json(result)
    } catch (e) {
        res.status(500)
        res.status('application/json')
        res.json({ error: e })
    }
})



//GET/country/county
app.get('/country/:country', async (req, res) => {
    const county = req.params['country']

    try {
        const result = await mongoClient.db('winemag')
            .collection('wine')
            .find({
                country: {
                    $regex: 'country',
                    $options: 'i'
                }
            })
            .sort({ province: 1 })
            .limit(50)
            .project({ title: 1, price: 1 })
            .toArray

        res.status(200)
        res.type('application/json')
        res.json(result)

    } catch (e) {
        res.status(500)
        res.type('application/json')
        res.json({ error: e })
    }
})

//start server
mongoClient.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.info(`Application started on port ${PORT} at ${new Date()}`)
        })
    }).catch(e => {
        console.error('cannot connect to db',)
    })

