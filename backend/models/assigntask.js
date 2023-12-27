const mongoose = require('mongoose');
const {Schema}=mongoose;

const AssignTaskSchema = new Schema({
    username:{
        type:String,
        required: true

    },
    user_id:{
        type:String,
        required: true

    },
    
    taskname:{
        type:String,
        // ref:'user_name',
        required: true

    },
    priority:{
        type: String,
        required: true

    },
    startdate:{
        type: Date,
        // default:Date.now
        required: true


    },
    deadline:{
        type: Date,
        // default:Date.now
        required: true

    },
    assignby:{
        type: String,
        required: true


    },
    assignto:{
        type: String,
        // default:Date.now
        required: true


    },
    description:{
        type: String,
        // default:Date.now
        required: true


    },
    status:{
        type: String,
        default:"pending",

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

module.exports=mongoose.model('assign',AssignTaskSchema);