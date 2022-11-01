const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mahum:mahum438@cluster0.m4zar48.mongodb.net/test', {
    dbName:'JOJO',
    useNewUrlParser:true,
    useUnifiedTopology:true,

})
.then(()=>{
    console.log('mongodb connected')
})
.catch((error)=> console.log(error.message));

mongoose.connection.on('connected',()=> {
    console.log('Mongoose connected to db')
})

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
});

mongoose.connection.on('disconnected',()=>{
    console.log("Mongoose connection is disconnected")
})

process.on('SIGINT', async()=>{
    await mongoose.connection.close();
    process.exit(0);
})
