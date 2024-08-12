import mongoose from "mongoose";
import { CONTENT_SECTION_TYPES } from "../utils/helper.js";


const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(CONTENT_SECTION_TYPES),
    required: true
  },
  text: String,
  mediaURL: String,
  imagSRC: String 
});
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required."],
      trim: true,
    },
    subject: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: [true, "subject is required."],
    },
    content: [contentSchema],
    numberofViews: {
      type: Number,
    default: 0
    },
  
    quote: {
      type:String,
      required: [true, "quto is required."],
    },
    subaddresses: {
      type: [String],
      default: []
    }

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
export const Article = mongoose.model("Article", schema);
