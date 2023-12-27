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
    
    Name:{
        type:String,
        // ref:'user_name',
        required: true

    },
    DOJ:{
        type: Date,
        // default:Date.now
        required:true,

    },
    Department:{
        type:String,
        // default:Date.now
        required:true,

    },
    Designation:{
        type:String,
        // default:Date.now
        required:true,

    },
    Description:{
        type:String,
        // default:Date.now
        required:true,

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