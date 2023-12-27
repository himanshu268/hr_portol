const mongoose = require('mongoose');
const {Schema}=mongoose;

const leavesSchema = new Schema({
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
    sessions:{
        type: String,
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
    applying_to:{
        type: String,
        required: true


    },
    cc:{
        type: String,
        // default:Date.now
        required: true


    },
    emailid:{
        type: String,
        // default:Date.now
        required: true


    },
    phonenumber:{
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
    Date:{
        type: Date,
        default:Date.now

    },
    comment:{
        type:String,
    },
    file:{
        type: String,
        required: true



    },
})

module.exports=mongoose.model('leaves',leavesSchema);