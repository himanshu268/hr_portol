const mongoose = require('mongoose');
const {Schema}=mongoose;

const traningSchema = new Schema({
        username:{
        type:String,
        required: true

    },
    user_id:{
        type:String,
        required: true

    },
    Trainer:{
        type:String,
        required: true

    },
    Traning_title:{
        type:String,
        required: true

    },
    
    Trainee_Names:{
        type:String,
        // ref:'user_name',
        required: true

    },
    Comment:{
        type: String,
        required: true

    },
    
    From_date:{
        type: Date,
        // default:Date.now
        required: true

    },
    to_date:{
        type: Date,
        // default:Date.now
        required: true

    },
})

module.exports=mongoose.model('traning',traningSchema);