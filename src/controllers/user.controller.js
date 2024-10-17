import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.modals.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) => {
  /* return  res.status(200).json({
        message:"ok and go!"
    }) */

        // get user details from frontend
        //validation - not empty
        // check if user already exists: username, email
        // check for images, check for avatar
        // upload them to cloudinary, avatar
        //  create user object - create entry in db
        // remove password and refrsh token field from response
        // check for user creation
        // return  response
        // for request from form or direct from json
         const {fullName, email, username, password} = req.body
         console.log("email: ", email);

         if(
            [fullName , email, username, password].some((field) => field?.trim() === "")
         ){
         
            throw new ApiError(400, "fullname is required")
         }
         
         const existedUser = User.findOne({
            $or : [{username },{ email }]
         })

         if (existedUser) {
            throw new apiError(409, "User with email or username already exists")
         }

         const avatarLocalPath = req.files?.avatar[0]?.path;
         const coverimageLocalPath = req.files?.coverimage[0]?.path;

         if(!avatarLocalPath){
            throw new ApiError(400,"Avatar file is required")
         }

         const avatar = await  uploadOnCloudinary (avatarLocalPath)
         const coverImage = await uploadOnCloudinary (coverImageLocalPath)

         if(!avatar) {
            throw new ApiError(400,"Avatar file is required")
         }

         const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
         })

         const createdUser = await User.findById(user._id).select("-password -refreshToken")  //by default all selected

         if (!createdUser) {
             throw new ApiError(500, "Something went wrong while registering the user")
         }   

         return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully")
         )
) }



export {
    registerUser,
}