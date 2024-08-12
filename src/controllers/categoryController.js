/**
 * category controller class
 */

import createError from "http-errors";
import { Category } from "../models/category.js";


import { SuccessResponse } from "../utils/response.js";

/**
 * Encapsulates a controller.
 */
export class categoryController {
  async addCategory(req, res, next) {
    try {
      const category = new Category({
        nameEnglish: req.body.nameEnglish,
        nameSwedish: req.body.nameSwedish,
      });

      await category.save();

      res
        .status(201)
        .send(
          SuccessResponse(
            {
              category
            },
            "You registerad  successfully"
          )
        );
    } catch (error) {
      let err = error;

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409);
        err.cause = error;
      } else if (error.name === "ValidationError") {
        // Validation error(s).
        err = createError(400);
        err.cause = error;
      }

      next(err);
    }
  }

  async getAllCategory(req, res, next) {
    try {
      const categories = await Category.find();
      res
        .status(200)
        .send(
          SuccessResponse(
            { categories: categories },
            "get all categories successfully"
          )
        );
    } catch (err) {
      const error = createError(404, "The requested resource was not found.");
      error.cause = err;
      next(error);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      await Category.findByIdAndDelete({ _id: req.params.id });
      res.status(200).send(SuccessResponse(null, "deleted successfully"));
    } catch (err) {
      const error = createError(err.status, "The delete  process faild.");
      error.cause = err;
      error.success = "false";
      next(error);
    }
  }
}
