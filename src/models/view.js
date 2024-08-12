import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: true,
            min: 1,
            max: 31
          },
          month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
          },
          year: {
            type: Number,
            required: true
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
export const View = mongoose.model("View", schema);
