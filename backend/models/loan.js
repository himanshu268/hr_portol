const mongoose = require('mongoose');
const {Schema}=mongoose;

const loanSchema = new Schema({
        username:{
        type:String,
        required: true

    },
    user_id:{
        type:String,
        required: true

    },
    Desired_Amount:{
        type:String,
        required: true

    },
    Annual_income:{
        type:String,
        required: true

    },
    
    Loan_used:{
        type:String,
        // ref:'user_name',
        required: true

    },
    First:{
        type: String,
        required: true

    },
    Last:{
        type: String,
        // default:Date.now
        required: true


    },
    Birth_Date:{
        type: Date,
        // default:Date.now
        required: true

    },
    Martial_status:{
        type: String,
        required: true


    },
    Phone_Number:{
        type: String,
        // default:Date.now
        required: true


    },
    emailid:{
        type: String,
        // default:Date.now
        required: true


    },
    street_Address1:{
        type: String,
        // default:Date.now
        required: true


    },
    street_Address2:{
        type: String,
        // default:Date.now
        // required: true


    },
    city:{
        type: String,
        required: true

    },
    state:{
        type: String,
        // default:Date.now
        required: true


    },
    zipcode:{
        type: String,
        // default:Date.now
        required: true


    },
    address_year:{
        type: String,
        required: true
    },
    type_of_employement:{
        type: String,
        required: true

    },
    Comapny_Name:{
        type: String,
        required: true

    },
    occupation:{
        type: String,
        required: true

    },
    gross_income:{
        type: String,
        required: true

    },
    monthly_rent:{
        type: String,
        required: true

    },
    Down_payement:{
        type: String,
        required: true

    },
    Comments:{
        type: String,
        required: true

    },
    Bank_Name:{
        type: String,
        required: true

    },
    Account_number:{
        type: String,
        required: true

    },
    IFSC_Code:{
        type: String,
        required: true

    },
    Address:{
        type: String,
        required: true

    },
    pan_card:{
        type: String,
        required: true



    },
    aadhar_card:{
        type: String,
        required: true



    },
    photo:{
        type: String,
        required: true



    },
    bank_statement:{
        type: String,
        required: true



    },
    salary_slip:{
        type: String,
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
})

module.exports=mongoose.model('loan',loanSchema);