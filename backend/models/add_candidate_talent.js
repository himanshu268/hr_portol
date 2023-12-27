const mongoose = require('mongoose');
const {Schema}=mongoose;

const add_candTaskSchema = new Schema({
    username:{
        type:String,
        required: true

    },
    user_id:{
        type:String,
        required: true

    },
    talent_pool:{
        typr:string,
        required: true,
    },
    Emp_name:{
        type:String,
        // ref:'user_name',
        required: true

    },
    DOA:{
        type: Date,
        // required: true

    },
    dep:{
        type: String,
        required: true


    },
    des:{
        type: String,
        // default:Date.now
        required: true


    },
    performance:{
        type: String,
        // default:Date.now
        required: true


    },
    rating:{
        type: String,
        required: true
    },
    desc:{
        type:String,
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

module.exports=mongoose.model('add_cand',add_candTaskSchema);