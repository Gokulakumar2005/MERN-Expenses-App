import Joi from "joi";

export const UserValidation = Joi.object({
    userName: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(8).max(15).required(),
    phoneNumber: Joi.string().trim().min(10).max(10).required()
})


//  userName: "",
//         email: "",
//         password: "",
//         phoneNumber: ""