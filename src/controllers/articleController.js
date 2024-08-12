/**
 * Article controller class
 */


import createError from "http-errors";
import { Article } from "../models/article.js";

import { SuccessResponse } from "../utils/response.js";
import mongoose from "mongoose";
import { Category } from "../models/category.js";

/**
 * Encapsulates a controller.
 */
export class articleController {
 async addCategoryView(id) {
  await Category.findByIdAndUpdate(
    id,
{ $inc: { numberofViews: 1 } },
{ new: true, useFindAndModify: false })
  }

  async addNewArticle(req, res, next) {
    try {
  //     console.log('1')
  //   const imageFiles = req.files['imageFiles'];
  //   const videoFiles = req.files['videoFiles'];


  //   const updatedContent = JSON.parse(req?.body?.content).map((section, index) => {
  //     if (section.type === 'image' && imageFiles && imageFiles[index]) {
  //       section.imagSRC = imageFiles[index].id;
  //     }
  //     if (section.type === 'video' && videoFiles && videoFiles[index]) {
  //       section.mediaURL = videoFiles[index].id;
  //     }
  //     return section;
  //   });

  //  req.body.content = updatedContent
  console.log(req.body)
        const article = new Article(req.body);
        
     
      await article.save();

      res
        .status(201)
        .send(SuccessResponse({ id: article.id }, "article added   successfully"));

      
    } catch (error) {
      console.log(error,'¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨')
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

  async updateArticle(req, res, next) {
    try {
      const filter = { _id: req.params.id }; // Replace with the filter criteria to find the document
      const update = {
        $set: {},
      };

      const options = { returnOriginal: false }; // Return the updated document

      req.body.title ? (update.$set.title = req.body.title) : null;
      req.body.subject ? (update.$set.subject = req.body.subject) : null;

      if (req.body.content) {
       
          update.$set.content = req.body.content;
        
      }
     
      const article = await Article.findOneAndUpdate(filter, update, options);
      if(!article)
        {
            const error = createError(404, "The requested resource not found.");
          error.cause = "The requested resource not found.";
          next(error);
          return;  
        }
      res
        .status(200)
        .send(
          SuccessResponse(
            article,
            "article has  been  changed successfully"
          )
        );
    } catch (err) {
      const error = createError(404, "The requested resource was not found.");
      error.cause = err;
      next(error);
    }
  }
  async getOneArticle(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID format');
      }
        const $match= {
          _id : new mongoose.Types.ObjectId(req.params.id)
        }
      
        
     
        const selectedArticle = await Article.aggregate([
          {
            $match,
          },
          {
            $lookup: {
              from: 'categories',
              localField: 'subject',
              foreignField: '_id',
              as: 'category',
            },
          },])
  
        if (!selectedArticle) {
          const error = createError(404, "The requested resource not found.");
          error.cause = "The requested resource not found.";
          next(error);
          return;
        }
       await Article.findByIdAndUpdate(
          req.params.id,
      { $inc: { numberofViews: 1 } },
      { new: true, useFindAndModify: false })
   
        res
        .status(200)
        .send(
          SuccessResponse(
            selectedArticle,
            "article info"
          )
        );
  
   
      } catch (err) {
        const error = createError(404, "The requested  was not found.");
        error.cause = err;
        error.success = "false";
        next(error);
      }
  }
  async getAllArticles(req, res, next) {
    try {
      let $match = {};
      console.log(req.query,'----------------------')
      const query = {...req.query}
      if (query?.search !== "" && (query?.search))
        $match.$or = [
          { title: { $regex: query.search, $options: 'i' } },
          { subaddresses: { $regex: query.search, $options: 'i' } }
        ];
        if (query?.subject !== "" && (query?.subject))
          {
               this.addCategoryView (query.subject)
           $match.subject= new mongoose.Types.ObjectId(query.subject)
          }

  console.log($match,'----------match---------------')

      const articles = await Article.aggregate([
        {
          $match,
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'subject',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $project: { title: 1, quote: 1,category:1,numberofViews:1, _id: 1}
        },])


 res
 .status(200)
 .send(
   SuccessResponse(
    { articles },
     "article info"
   )
 );

    } catch (err) {
      console.log(err)
      const error = createError(404, "The requested resource was not found.");
      error.cause = err;
      next(error);
    }
  }
  async deleteArticle(req, res, next) {
    try {
    const response= await Article.findByIdAndDelete ({_id : req.params.id})
     console.log(response)
     if(!response)
        {
            const error = createError(404, "The requested resource not found.");
          error.cause = "The requested resource not found.";
          next(error);
          return;  
        }
     res
     .status(200)
     .send(SuccessResponse(null, "deleted successfully"));
    } catch (err) {
      const error = createError(err.status, "The delete  process faild.");
      error.cause = err;
      error.success = "false";
      next(error);

    }
  }
}

