const mongoose = require('mongoose');
const {Schema}=mongoose;

const requestoffSchema = new Schema({
    username:{
        type:String,
        required: true

    },
    user_id:{
        type:String,
        required: true

    },
    
    category:{
        type:String,
        // ref:'user_name',
        required: true

    },
    from:{
        type: Date,
        // default:Date.now
        required: true


    },
    to:{
        type: Date,
        // default:Date.now
        required: true

    },
    amount:{
        type: String,
        // default:Date.now
        required: true


    },
    reason:{
        type: String,
        // default:Date.now
        required: true


    },
    status:{
        type: String,
        default:"pending",
    },
    comment:{
        type:String,
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

module.exports=mongoose.model('requestoff',requestoffSchema);