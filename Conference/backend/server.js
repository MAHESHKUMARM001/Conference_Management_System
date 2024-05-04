const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/RegisterModel");
const uploadschema = require("./model/Upload");
const cors = require("cors");


const app = express();
app.use(cors()); 

mongoose.connect("mongodb://localhost:27017/conference", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Mongodb connected"))
    .catch((err) => console.log("this may have error"))

app.use(express.json()); 

// app.post("/register", async (req, res) => {
//     const email = req.body.email;
//     const user = await User.findOne({ email }) 
//         .then((existingUser) => {
//             if (existingUser) {
//                 res.json({ already: "The User already Exists" });
//             } else {
//                 const newUser = new User({
//                     Name: req.body.name,
//                     Email: req.body.email,
//                     Password: req.body.password
//                 })
//                 newUser.save()
//                     .then(() => {
//                         console.log("The User is Successfully stored on the mongodb");
//                         res.json("Success");
//                     })
//                     .catch(error => {
//                         console.log("Error saving user:", error);
//                         res.status(500).json({ error: "Internal server error" });
//                     });
//             }
//         })
//         .catch(error => {
//             console.log("Error finding user:", error);
//         });
// });


app.post('/register', async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
    //   const existingUser = await User.find({ email });
       const existingUser = await User.findOne({Email: email });
        console.log(existingUser);
        // console.log(existingUser.Email);
      if (existingUser) {
        return res.json({ already: 'Email already exists' });
      }
     else{
        
        const newUser = new User({
          Name: req.body.name,
          Email: req.body.email,
          Password: req.body.password
      })
        await newUser.save()
        .then(() => {
                      console.log("The User is Successfully stored on the mongodb");
                      return res.json("Success");
          })
     }
        
    } catch (error) {
      console.error('Registration error:', error);
      return res.json({ already: 'Internal server error' });
    }
  });
// app.post("/login", (req, res) => {
//     const { email, password } = req.body; 
//     User.findOne({ email, password })
//         .then((user) => {
//             if (!user) {
//                 console.log("The User or Password is Incorrect");
//                 res.json({ loginerror: "The User or Password is Incorrect" });
//             } else {
//                 console.log("The login is successful")
//                 res.json("Success");
//             }
//         })
//         .catch(error => {
//             console.log("Error finding user:", error);
//         });
// });
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try{
        const exitstinguser = await User.findOne({ Email: email });
        console.log(exitstinguser);
        if(!exitstinguser){
            console.log("The User does not exist");
            return res.json({ loginerror: "The User does not exist" });
        }
        else{
            if(exitstinguser.Password !== password){
                console.log("The Password is Incorrect");
                return res.json({ loginerror: "The Password is Incorrect" });
            }
            else{
                console.log("The login is successful");
                return res.json("Success");
            }
        }
    }
    catch(e){
        console.error('Login error:', e);
    }
});



app.post("/upload", async (req, res)=>{
    try {
    //   const existingUser = await User.find({ email });
        const newUser = new uploadschema({
          Title: req.body.title,
          Author: req.body.name,
          Email: req.body.Email1,
          Description: req.body.description,
          Link:req.body.link,
          Status:"Not_Viwed"
        })
        await newUser.save()
        .then(() => {
                      console.log("The Documnet is Successfully stored on the mongodb");
                      return res.json("Success");
        })
     }
     catch (error) {
      console.error('Upload error:', error);
      return res.json({ already: 'Internal server error' });
    }

});


app.get('/documents', async (req, res) => {
    try {
        const documents = await uploadschema.find();

        res.json(documents);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get a specific document by id
app.get('/document/:id', async (req, res) => {
    try {
        const document = await uploadschema.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(document);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


app.post('/profile', async (req, res) =>{
    try{
        
        const { Email1 } = req.body;
        console.log(Email1);
        const existingUser = await User.findOne({Email: Email1 });
        return res.json(existingUser.Name);
    } catch ( err ){
    }
});

app.post('/documentsta', async (req, res) => {
    try {
        const { Email1 } = req.body;
        console.log(Email1);
        const existingUser = await uploadschema.findOne({Email: Email1 });
        // const documents = await uploadschema.find();
        if (existingUser) {
            return res.json("Available");
        }
        else{
            return res.json("Not_Available");
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/approve/:id', async (req, res) => {
    try{
        const document = await uploadschema.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        else{
            console.log("In update"+req.params.id);
            await uploadschema.findByIdAndUpdate({_id: req.params.id}, { Status: "Approved" });
            return res.json("approved");
        }
    }catch (err) {
        console.log(err);
    }
})
app.post('/status', async (req, res) => {
    try{
        const { Email1 } = req.body;
        const existingUser = await uploadschema.findOne({Email: Email1 });
        if (!existingUser) {
            return res.status(404).json({ message: 'Document not found' });
        }
        else{
            // console.log("In update"+req.params.id);
            // await uploadschema.findByIdAndUpdate({_id: req.params.id}, { Status: "Approved" });
            // return res.json("approved");
            return res.json(existingUser.Status);
        }
    }catch (err) {
        console.log(err);
    }
})





app.listen(5000, () => {
    console.log("Server is listening on port 5000");
})
