const mongoose = require('mongoose');
const {Schema}=mongoose;

const surveySchema = new Schema({
    username:{
        type:String,
        required: true

    },
    user_id:{
        type:String,
        required: true

    },
    
    Q1:{
        type:String,
        // ref:'user_name',
        // required: true

    },
    Q2:{
        type: String,
        // required: true

    },
    Q3:{
        type: String,
        // default:Date.now
        // required: true


    },
    Q4:{
        type: String,
        // default:Date.now
        // required: true

    },
    
})

module.exports=mongoose.model('survey',surveySchema);