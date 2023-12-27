const mongoose = require('mongoose');
const {Schema}=mongoose;

const compensationSchema = new Schema({
    username:{
        type:String,
        required: true

    },
    user_id:{
        type:String,
        required: true

    },
    emp_id:{
        type:String,
        required: true

    },
    emp_name:{
        type:String,
        required: true

    },
    
    pay_rate:{
        type:String,
        // ref:'user_name',
        required: true

    },
    pay_type:{
        type: String,
        required: true

    },
    effective_date:{
        type: Date,
        // default:Date.now
        required: true


    },
    overtime:{
        type: String,
        required: true


    },
    change_reason:{
        type: String,
        // default:Date.now
        required: true


    },
    comment:{
        type: String,
        // default:Date.now
        required: true


    },
    pay_schedule:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('compensation',compensationSchema);