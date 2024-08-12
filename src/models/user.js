/**
 * Mongoose model User.
 *
 */

import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";
import {ROLES} from "../utils/helper.js"
const { isEmail } = validator;

// Create a schema.
const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email address is required."],
      unique: [true, " email is used choose onther name"],
      lowercase: true,
      trim: true,
      validate: [isEmail, "Please provide a valid email address."],
    },
    password: {
      type: String,
      minLength: [6, "The password must be of minimum length 6 characters."],
      maxLength: [40, "The password must be of maximum length 40 characters."],
      required: [true, "Password is required."],
    
    },
    role :{
      type: String,
      enum: Object.values(ROLES),
    },
    username: {
      type: String,
      required: [true, "username address is required."],
      unique: [true, " username is used choose onther name"],
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number address is required."],
      unique: [true, " phone number is used choose onther name"],
      trim: true,
    },
   
    firstVisit :{
      type :Boolean,
      default :true
    },
    messageSubscribed: {
    type:Boolean,
    default:false
    },
    favoritesContent : [{
      type: mongoose.SchemaTypes.ObjectId,
        ref: 'Article',
    }]
  },
  {
    timestamps: true, // to add createdAt and updatedAt
    toJSON: {
      /**
       * Performs a transformation of the resulting object to remove sensitive information.
       *
       * @param {object} doc - The mongoose document which is being converted.
       * @param {object} ret - The plain object representation which has been converted.
       */
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
      virtuals: true, // ensure virtual fields are serialized
    },
  }
);
// add virtule field (id)
schema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Salts and hashes password before save.
schema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
 // this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Authenticates a user.
 *
 * @param {string} username - ...
 * @param {string} password - ...
 * @returns {Promise<User>} ...
 */
schema.statics.authenticate = async function (username, password) {
  console.log('ååå')
  const user = await this.findOne({ username });
 if (!user)
  throw new Error("Invalid credentials.");
console.log(password,user.password)
  // If no user found or password is wrong, throw an error.
  if (!(await bcrypt.compare(password, user?.password))) {
    console.log('ooo')
    throw new Error("Invalid credentials.");
  }
console.log('ppp')
  // User found and password correct, return the user.
  return user;
};

// Create a model using the schema.
export const User = mongoose.model("User", schema);
