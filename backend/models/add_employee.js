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
    
    Enter_name:{
        type:String,
        // ref:'user_name',
        required: true

    },
    gender:{
        type: String,
        required: true

    },
    birth_date:{
        type: Date,
        // default:Date.now
        required: true


    },
    martial_status:{
        type: String,
        required: true


    },
    address:{
        type: String,
        // default:Date.now
        required: true


    },
    contact_number:{
        type: String,
        // default:Date.now
        required: true


    },
    emergency_contact_email:{
        type: String,
        required: true

    },
    hiring_date:{
        type: Date,
        required: true


    },
    Designation:{
        type: String,
        required: true

    },
    employment_status:{
        type: String,
        required: true

    },
    reporting_to:{
        type:String,
        required: true

    },
    Department:{
        type:String,
        required: true

    },
    location:{
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

module.exports=mongoose.model('add_employee',add_employeeTaskSchema);