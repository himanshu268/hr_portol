const mongoose = require('mongoose');
const {Schema}=mongoose;

const job_openingTaskSchema = new Schema({
    username:{
        type:String,
        required: true

    },
    user_id:{
        type:String,
        required: true

    },
    
    job_opening_position:{
        type:String,
        // ref:'user_name',
        required: true

    },
    hiring_lead:{
        type: String,
        required: true

    },
    no_of_jobs:{
        type: String,
        // default:Date.now
        required: true


    },
    status:{
        type: String,
        required: true


    },
    job_requirements:{
        type: String,
        // default:Date.now
        required: true


    },
    created_on:{
        type: Date,
        required: true

    },
    
    Date:{
        type: Date,
        default:Date.now

    },
    // file:{
    //     type: String,
    //     required: true



    // },
})

module.exports=mongoose.model('job_opening',job_openingTaskSchema);