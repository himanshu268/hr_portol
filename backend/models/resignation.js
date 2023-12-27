const mongoose = require('mongoose');
const {Schema}=mongoose;

const querySchema = new Schema({
    username:{
        type:String,
        required: true

    },
    user_id:{
        type:String,
        required: true

    },

    Resignation_Date:{
        type: Date,
        // default:Date.now
        required:true,

    },
    last_workday:{
        type: Date,
        // default:Date.now
        required:true,

    },
    send_to:{
        type: String,
        // default:Date.now
        required:true,

    },
    Description:{
        type: String,
        // default:Date.now
        required:true,

    },
    Status_it_manager:{
        type: String,
        // default:Date.now
        default:"pending",

    },
    Status_hr:{
        type: String,
        // default:Date.now
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

module.exports=mongoose.model('query',querySchema);