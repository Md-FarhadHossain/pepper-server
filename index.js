const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USENAME_DB}:${process.env.PASSWORD_DB}@cluster0.1ivadd4.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const dbConnect = async () => {
  try {
    await client.connect();
    console.log("database connected");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();

// Databse
const headingDB = client.db('pepper').collection('heading')

// Heading
app.get('/heading', async (req, res) => {
  try {
    const query = {}
    const result = await headingDB.find(query).toArray()
    res.send(result)
  }
  catch (error) {
    console.log(error.name, error.message);
  }
})

app.get('/', (req, res) => {
  res.send(`Server is running port at ${PORT}`)
})

app.listen(PORT, () => {
  console.log(`Server is running port at ${PORT}`)
})
