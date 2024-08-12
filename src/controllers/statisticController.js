


// •	Most used search terms
// •	Most viewed categories



/**
 * category controller class
 */

import createError from "http-errors";
import { Category } from "../models/category.js";
import { User } from "../models/user.js";
import { Article } from "../models/article.js";
import { View } from "../models/view.js";

import { SuccessResponse } from "../utils/response.js";

/**
 * Encapsulates a controller.
 */
export class StatisticController {
  async getViewTable() {
    try {
        const counts = await View.aggregate([
          {
            $group: {
              _id: {
                month: "$month",
                year: "$year"
              },
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              month: "$_id.month",
              year: "$_id.year",
              count: 1
            }
          },
          {
            $sort: {
              year: 1,
              month: 1
            }
          }
        ]);
        console.log(counts,'ÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅÅ')
        console.log('Document counts by month and year:', counts);
        return counts;
      } catch (error) {
        console.error('Error fetching document counts:', error);
      }
    }
    
       
    async getSummary(req, res, next) {
        try {
            const totalUsers = await User.countDocuments({ role: 'user' });
            const totalvisit = await View.countDocuments();

            // Count the number of active users with role 'user' and messageSubscribed is true
            const subscribers = await User.countDocuments({ role: 'user', messageSubscribed: true });
          const viewTable =  await this.getViewTable()
               console.log(viewTable)
            const topTenArticles = await Article.find()
            .sort({ numberofViews: -1 })  
            .limit(10).select('title _id numberofViews');;                   
          res
            .status(200)
            .send(
              SuccessResponse(
                { totalUser: totalUsers, subscribers:subscribers ,topTenArticles:topTenArticles,totalvisit:totalvisit,viewTable:viewTable},
                "get summary successfully"
              )
            );
        } catch (err) {
          const error = createError(400, "Something goes wrong.");
          error.cause = err;
          next(error);
        }
      }
  async addView(req, res, next) {
    console.log('_________________________________________________')
try {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // JavaScript months are 0-based
    const year = now.getFullYear();

    // Create a new view document
    const newView = new View({
    
        day: day,
        month: month,
        year: year
      
      
    });

    // Save the document to the database
    await newView.save();
    console.log('New view added:', newView);
  

      res
        .status(201)
        .send(
          SuccessResponse( "You registerad  successfully")
        );
    } catch (error) {
      let err = error;
        err = createError(400);
        err.cause = error;
      

      next(err);
    }
  }

//   async getAllCategory(req, res, next) {
//     try {
//       const categories = await Category.find();
//       res
//         .status(200)
//         .send(
//           SuccessResponse(
//             { categories: categories },
//             "get all categories successfully"
//           )
//         );
//     } catch (err) {
//       const error = createError(404, "The requested resource was not found.");
//       error.cause = err;
//       next(error);
//     }
//   }
//   async deleteCategory(req, res, next) {
//     try {
//       await Category.findByIdAndDelete({ _id: req.params.id });
//       res.status(200).send(SuccessResponse(null, "deleted successfully"));
//     } catch (err) {
//       const error = createError(err.status, "The delete  process faild.");
//       error.cause = err;
//       error.success = "false";
//       next(error);
//     }
//   }
}
