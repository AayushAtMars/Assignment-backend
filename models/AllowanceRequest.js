import mongoose from "mongoose";

const allowanceRequestSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserRequest', 
        required: true 
    },

    amount: { 
        type: Number, 
        required: true 
    },

    description: { 
        type: String, 
        required: true 
    },

    date: { 
        type: Date, 
        default: Date.now 
    },

    status: { 
        type: String, 
        enum: ['Pending', 'Approved', 'Rejected'], 
        default: 'Pending' 
    }
});

const AllowanceRequest = mongoose.model('AllowanceRequest', allowanceRequestSchema);
export default AllowanceRequest;
