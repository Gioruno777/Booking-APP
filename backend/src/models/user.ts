import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    }

})

const User = mongoose.model("User", userSchema)
export default User