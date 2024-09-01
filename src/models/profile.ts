import { Schema, model } from "mongoose"

const ProfileSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    user_image : {
        public_id: String,
        url: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPKf7bdPa_aOiwGzeNO4YY4YwvAya-Hy8vOUtOFkfi1SD3HDDhjCz7Ux6OqLKNiD3SIxM&usqp=CAU"
        }
    },
    dob: {
        type: Date,
    },
    address: {
        
        city: { type: String, maxLength:  20, description: "The city of residence"},
        state: {type: String, maxLength:  20, description: "The state or province of residence"},
        zipCode: {type: String, maxLength:  20, description: "The postal code residence"},
        country: {type: String, maxLength:  20, description: "The country of residence"}
    },
    bio: {
        type: String,
        trim: true,
        maxLength:  60
    },
    hobbies: [{
        type: String,
        trim: true
    }],
    
    profession :{
        type: String,
    },
    locale: {
        type: String,
        enum: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ru', 'other'],
        default: 'en' // Default language
    }

})

ProfileSchema.pre("save", async function (next){

    if(this.isNew){
        await this.populate('user', 'firstname lastname gender phone');
    }
    next();

    
})

const Profile = model("Profile", ProfileSchema)

export default Profile;