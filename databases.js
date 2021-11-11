const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const mongoose = require('mongoose');

const url = `mongodb+srv://aleksandrs:BdUH2gb83EfEeBx@cluster0.q8nte.mongodb.net/tests?retryWrites=true&w=majority`;

mongoose
  .connect(url)
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

const testSchema = new mongoose.Schema({
  Ediens: {
    type: String, 
    unique: true,
    required: "Ēdienam jābūt ievadītam"
  },
  Dzeriens: {
    type: String,
    required: "Dzērienam jābūt ievadītam"
  },
  Saldais: {
    type: String,
    required: "Saldajam jābūt ievadītam"
  },
});
const Test = mongoose.model("Test", testSchema);
// app.get(`/`, function(req,res){
//   // Test.find().then((data)=> {
//   //   res.send(data);
//   // });
//   res.json({data:"test"});
// });
app.get('/', function(req, res){
  Test.find().then((test)=>{
    res.send(test);
  });
});
app.post(`/`, function(req,res){
  Test.create(req.body).then(()=>{
    res.send(req.body);
  }).catch(err => {
    if (err.keyValue.Ediens) {
      res.status(500).json({
        status: "failed",
        error: "Ēdiens jau pastāv!"
      });
    } else {
      res.status(500).json({
        status: "failed",
        error: err
      });
    }
});
});
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});


// const funk = async ()=> {
//   await Test.create({test:"dessa notter"});
//   console.log(await Test.find());
// }
// funk();