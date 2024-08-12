import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
      nameEnglish: {
        type: String,
        required: [true, "English name  is required."],
        trim: true,
        unique: [true, " nameSwedish used choose onther name"],
      },
    nameSwedish: {
        type: String,
        required: [true, "Swedish name  is required."],
        trim: true,
        unique: [true, " nameSwedish used choose onther name"],
      },
      numberofViews: {
        type : Number,
        default : 0
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
export const Category = mongoose.model("Category", schema);
