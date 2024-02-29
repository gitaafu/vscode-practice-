const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { connectToDb , getDb } = require('./db')

const app = express();
app.use(express.json());
const port = 3000;


app.use(cors(
  {
    origin: "http://localhost:4200"
  }
 
));

//connect to DB
let db

connectToDb((err)=>
{
    if(!err){
        app.listen(3000,()=>{
            console.log("App is listening on port 3000");
        })
        db=getDb()
    }
})

app.use(cors());

//MONGODB CONFIGURATION FOR DATABASES

const mongoURL = 'mongodb://localhost:27017';
const dbName1 = 'jenkinsDB';
const dbname2 = 'testjenkins';


const collection1='jobs'
const collection2 = 'jobstatus';
const collection3 ='lbnumbers';



//JENKINS URL AND CREDENTIALS FOR AAFREEN

const jenkinsURL = 'http://localhost:8080/api/json?tree=jobs[name,color]';
const jenkinsUsername = 'aafreentaj';
const jenkinsPassword = 'Hijenkins';
const jenkinsstatusurl='http://localhost:8080/api/json'
const jenkinsUrl = 'http://localhost:8080';


//----------->METHODS FOR AAFREEN ACCOUNT<------------------------

//get method to get job counts

app.get('/aafu/jobcount', async (req, res) => {
    try {
      // Fetch jobs from Jenkins API
      const response = await axios.get(jenkinsURL, {
        auth: {
          username: jenkinsUsername,
          password: jenkinsPassword,
        },
      });
  
      const jobs = response.data.jobs || [];
  
      // Connect to MongoDB
      const client = await MongoClient.connect(mongoURL);
      const db = client.db(dbName1);
      const collection = db.collection(collection1);
  
      // Clear the existing data in the collection
      await collection.deleteMany({});
  
      // Insert new data into the collection
      await collection.insertMany(jobs);
  
      client.close();
  
      res.json({ message: 'Successfully fetched and stored jobs', count: jobs.length });
    } catch (error) {
      console.error('Error fetching or storing jobs:', error);
      res.status(500).json({ error: 'Failed to fetch or store jobs' });
    }
  });
  


//get method which fetches all the docs inside jobs collection
app.get('/aafu/jobDetails',async (req,res)=>
{
    //current page
    //const page=req.query.page || 0
    //const jobsperpage=2

    let jobs=[]
    const client = await MongoClient.connect(mongoURL);
    const db = client.db(dbName1);

    await db.collection(collection1)
        .find()
        .sort({name:1})
        //.skip(page*jobsperpage)
        //.limit(jobsperpage)

        .forEach(job=>jobs.push(job))
        .then(()=>{

            res.status(200).json(jobs)
        })  
        .catch(()=>
        {
            res.status(500).json({error:"Cannot fetch data"})
        })
        
        

})

//get method to fetch job status
app.get('/aafu/jobstatus', async (req, res) => {
    try {
      // Fetch jobs from Jenkins API
      const response = await axios.get(jenkinsstatusurl, {
        auth: {
          username: jenkinsUsername,
          password: jenkinsPassword,
        },
      });
       // Connect to MongoDB
      const client = await MongoClient.connect(mongoURL);
      const db = client.db(dbName1);
      const collection = db.collection(collection2);

      await collection.deleteMany({});
      
      const jobs = response.data.jobs.map((job) => ({
        name: job.name,
        url: job.url,
        status: job.color ==='blue'? 'Success':'Failure',
        
  
      }));
  
      await collection.insertMany(jobs);
  
      res.json(jobs);
    } catch (error) {
      console.error('Error fetching or storing jobs:', error);
      res.status(500).json({ error: 'Failed to fetch or store jobs' });
    }
  });


  //get method to get LAST BUILD NUMBER AND SUCCESS ELEMENTS
  
  app.get('/aafu/lastBuildNumber/:jobName', async (req, res) => {
    try {
      const lastBuildApiUrl=`${jenkinsUrl}/job/${req.params.jobName}/lastBuild/api/json`  
      const response = await axios.get(lastBuildApiUrl, {
        auth: {
          username: jenkinsUsername,
          password: jenkinsPassword,
        },
      });

      const client = await MongoClient.connect(mongoURL);
        const db = client.db(dbName1);
        const collection = db.collection(collection3);

       
        const jsonResponse = response.data;
        const buildNumber = jsonResponse.number;
        const buildResult = jsonResponse.result;

        await collection.deleteMany({});
      // Insert the extracted data into the collection
      const jobs = [{
        number: buildNumber,
        result: buildResult,
      }];
      await collection.insertMany(jobs);
  
      res.status(200).json(jobs);
    } catch (error) {
      console.error('Error fetching last build number:', error);
      res.status(500).json({ error: 'Error fetching the last BUild Number' });
    }
  });

  
  //---------------------->testjenkins ACCOUNT<-------------------------------

  //JENKINS URL AND CREDENTIALS FOR TESTJENKINS account

const tjenkinsURL = 'http://10.147.183.21:8006/api/json?tree=jobs[name,color]';
const tjenkinsUrl='http://10.147.183.21:8006';

const tjenkinsstatusurl='http://10.147.183.21:8006/api/json'
  //get method to get job counts

app.get('/testjenkins/jobcount', async (req, res) => {
    try {
      // Fetch jobs from Jenkins API
      const response = await axios.get(tjenkinsURL);
  
      const jobs = response.data.jobs || [];
  
      // Connect to MongoDB
      const client = await MongoClient.connect(mongoURL);
      const db = client.db(dbname2);
      const collection = db.collection(collection1);
  
      // Clear the existing data in the collection
      await collection.deleteMany({});
  
      // Insert new data into the collection
      await collection.insertMany(jobs);
  
      client.close();
  
      res.json({ message: 'Successfully fetched and stored jobs', count: jobs.length });
    } catch (error) {
      console.error('Error fetching or storing jobs:', error);
      res.status(500).json({ error: 'Failed to fetch or store jobs' });
    }
  });
  


//get method which fetches all the docs inside jobs collection
app.get('/testjenkins/jobDetails',async (req,res)=>
{
    //current page
    //const page=req.query.page || 0
    //const jobsperpage=2

    let jobs=[]
    const client = await MongoClient.connect(mongoURL);
    const db = client.db(dbname2);

    await db.collection(collection1)
        .find()
        .sort({name:1})
        //.skip(page*jobsperpage)
        //.limit(jobsperpage)

        .forEach(job=>jobs.push(job))
        .then(()=>{

            res.status(200).json(jobs)
        })  
        .catch(()=>
        {
            res.status(500).json({error:"Cannot fetch data"})
        })
        
        

})

//get method to fetch job status
app.get('/testjenkins/jobstatus', async (req, res) => {
    try {
      // Fetch jobs from Jenkins API
      const response = await axios.get(tjenkinsstatusurl );
  
    
      // Connect to MongoDB
      const client = await MongoClient.connect(mongoURL);
      const db = client.db(dbname2);
      const collection = db.collection(collection2);
      
      const jobs = response.data.jobs.map((job) => ({
        name: job.name,
        url: job.url,
        status: job.color ==='blue'? 'Success':'Failure',
        
  
      }));
  
      await collection.insertMany(jobs);
  
      res.json(jobs);
    } catch (error) {
      console.error('Error fetching or storing jobs:', error);
      res.status(500).json({ error: 'Failed to fetch or store jobs' });
    }
  });
  
    //get method to get LAST BUILD NUMBER AND SUCCESS ELEMENTS
  
    app.get('/testjenkins/lastBuildNumber/:jobName', async (req, res) => {
      try {
        const lastBuildApiUrl=`${tjenkinsUrl}/job/${req.params.jobName}/lastBuild/api/json`  
        const response = await axios.get(lastBuildApiUrl, {
          auth: {
            username: jenkinsUsername,
            password: jenkinsPassword,
          },
        });
  
        const client = await MongoClient.connect(mongoURL);
          const db = client.db(dbname2);
          const collection = db.collection(collection3);
  
         
          const jsonResponse = response.data;
          const buildNumber = jsonResponse.number;
          const buildResult = jsonResponse.result;
  
          await collection.deleteMany({});
        // Insert the extracted data into the collection
        const jobs = [{
          number: buildNumber,
          result: buildResult,
        }];
        await collection.insertMany(jobs);
    
        res.status(200).json(jobs);
      } catch (error) {
        console.error('Error fetching last build number:', error);
        res.status(500).json({ error: 'Error fetching the last BUild Number' });
      }
    });
  
  
