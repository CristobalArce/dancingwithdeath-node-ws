const express = require("express");
const DancingWhitDeath =  require('./routers/DancingWithDeath')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use('/API/DWD', DancingWhitDeath)


app.listen(4000,()=>{
    console.log('Service On port 4000');
})