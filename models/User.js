import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true 
        },

        email: {
            type: String,
            required: true, 
            unique: true 
        },

        department: { 
            type: String, 
            enum: ['Finance', 'HR', 'IT', 'Other'],
            required: true
        }
});

const UserRequest = mongoose.model('UserRequest', userSchema);
export default UserRequest;
