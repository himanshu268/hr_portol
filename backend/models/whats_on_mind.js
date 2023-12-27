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
    
    query:{
        type:String,
        // ref:'user_name',
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

module.exports=mongoose.model('query',querySchema);