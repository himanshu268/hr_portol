const mongoose = require('mongoose');
const {Schema}=mongoose;

const add_employeeTaskSchema = new Schema({
    username:{
        type:String,
        required: true

    },
    user_id:{
        type:String,
        required: true

    },
    
    create_pool_name:{
        type:String,
        // ref:'user_name',
        required: true

    },
    Date:{
        type: Date,
        default:Date.now

    },
})

module.exports=mongoose.model('add_employee',add_employeeTaskSchema);