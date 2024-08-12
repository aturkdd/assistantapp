
import jwt from "jsonwebtoken";
import createError from "http-errors";
import { User } from "../models/user.js";
import { ROLES } from "../utils/helper.js";
import mongoose from "mongoose";
import { SuccessResponse } from "../utils/response.js";
import bcrypt from "bcrypt";
import { registerValidation,loginValidation,changePasswordValidation,updateUserValidation } from "./validation.js";

export class userController {
  async loadUser(id) {
    try {
      const selectedUser = await User.findById(id);
      console.log("ååå");

      if (!selectedUser) {
        const error = createError(404, "The requested resource not found.");
        error.cause = "The requested resource not found.";
        next(error);
        return;
      }

      return selectedUser;
    } catch (err) {
      const error = createError(404, "The requested  was not found.");
      error.cause = err;
      error.success = "false";
      next(error);
    }
  }
  async getAccessToken(user) {
    const payload = {
      Id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };

    const accessTokenBuffer = Buffer.from(process.env.PRIVATE_KEY, "utf8");

    // Create the access token with the shorter lifespan.
    const accessToken = jwt.sign(payload, accessTokenBuffer, {
      algorithm: "RS256",
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    });
    return accessToken;
  }
  async login(req, res, next) {
    try {
      console.log(req.body);
      const user = await User.authenticate(
        req.body.username,
        req.body.password
      );
      console.log(user);
      const accessToken = await this.getAccessToken(user);
      // const payload = {
      //   Id: user.id,
      //   username: user.username,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   email: user.email,
      //   phoneNumber: user.phoneNumber,
      //   role: user.role,

      // };

      // const accessTokenBuffer = Buffer.from(process.env.PRIVATE_KEY, "utf8");
      // console.log(accessTokenBuffer);
      // // Create the access token with the shorter lifespan.
      // const accessToken = jwt.sign(payload, accessTokenBuffer, {
      //   algorithm: "RS256",
      //   expiresIn: process.env.ACCESS_TOKEN_LIFE,
      // });
      res.status(201).send(
        SuccessResponse(
          {
            access_token: accessToken,
            user: user,
          },
          "You loged in  successfully"
        )
      );
    } catch (error) {
      const err = createError(401);
      err.cause = error;

      next(err);
    }
  }

  async register(req, res, next) {

    const { error } = registerValidation.validate(req.body);
    if (error){
      const e = createError(
        400,
        error.message
      );

      next(e);
      return;
    }
    if (!(await itUnique({ email: req.body.email }))) {
      const error = createError(
        409,
        "Duplicate email value.Email should be unique "
      );

      next(error);
      return;
    }

    if (!(await itUnique({  phoneNumber: req.body.phoneNumber, })) ){
      const error = createError(
        409,
        "Duplicate phone Number value.phone Number should be unique "
      );

      next(error);
      return;
    }

    if (!(await itUnique({ username: req.body.username,}))){
      const error = createError(
        409,
        "Duplicate phone Number value.phone Number should be unique "
      );

      next(error);
      return;
    }

    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        messageSubscribed: req.body.messageSubscribed,
        role: ROLES.USER,
      });
      console.log(user);
      await user.save();

      res
        .status(201)
        .send(SuccessResponse({ id: user.id }, "You registerad  successfully"));

      // res.status(201).json({ id: user.id });
    } catch (error) {
      console.log(error, "____________________");

      err = createError(400);
      err.cause = error;

      next(err);
    }
  }

  async updateUserInfo(req, res, next) {
    console.log(req.params.id);

    try {
      const filter = {
        _id: new mongoose.Types.ObjectId(req.params.id),
      };
      console.log("************");
      const update = {
        $set: {},
      };
      console.log(filter, "_______________________________________________");
      const options = { returnOriginal: false }; // Return the updated document

      req.body.firstName ? (update.$set.firstName = req.body.firstName) : null;
      req.body.lastName ? (update.$set.lastName = req.body.lastName) : null;
      req.body.messageSubscribed
        ? (update.$set.messageSubscribed = req.body.messageSubscribed)
        : null;

      if (req.body.email) {
        if (
          await itUnique({ email: req.body.email, _id: { $ne: req.user._id } })
        )
          update.$set.email = req.body.email;
        else {
          const error = createError(
            409,
            "Duplicate email value.Email should be unique "
          );

          next(error);
          return;
        }
      }
      if (req.body.phoneNumber) {
        if (
          await itUnique({
            phoneNumber: req.body.phoneNumber,
            _id: { $ne: req.user._id },
          })
        )
          update.$set.phoneNumber = req.body.phoneNumber;
        else {
          const error = createError(
            409,
            "Duplicate phone Number value.phone Number should be unique "
          );

          next(error);
          return;
        }
      }
      console.log("____ __ _ _ _------");

      const user = await User.findOneAndUpdate(filter, update, options);
      if (!user) {
        const error = createError(404, "not found ");

        next(error);
        return;
      }
      const access_token = await this.getAccessToken(user);
      res.status(200).send(
        SuccessResponse(
          {
            access_token: access_token,
            user: user,
          },
          "Your informationhas been  changed successfully"
        )
      );
    } catch (err) {
      const error = createError(404, "The requested resource was not found.");
      error.cause = err;
      next(error);
    }
  }
  async getFavorites(req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid ID format");
      }
      const $match = {
        _id: new mongoose.Types.ObjectId(req.params.id),
      };


      const favorites = await User.aggregate([
        {
          $match,
        },
        {
          $lookup: {
            from: "articles", // The collection to join
            localField: "favoritesContent", // The field from the input documents (user documents)
            foreignField: "_id", // The field from the documents of the "from" collection (content documents)
            as: "favorites", // The output array field
          },
        },
        {
          $project: {
            favorites: {
              $map: {
                input: "$favorites",
                as: "favorite",
                in: {
                  _id: "$$favorite._id",
                  title: "$$favorite.title",
                },
              },
            },
          },
        },
      ]);

      res.status(200).send(SuccessResponse(favorites, "get user information"));
    } catch (error) {
      next(error);
    }
  }
  async getAllUser(req, res, next) {
    try {
      console.log(req.query,'ppppppp')
      const filter= {}
      if (req.query.subscribed !== "")
      {
        filter.messageSubscribed= req.query.subscribed
      }
      
      const users = await User.find({... filter});
    
       

   
      res
        .status(200)
        .send(SuccessResponse({ users: users }, "get all users successfully"));
    } catch (err) {
      const error = createError(404, "The requested resource was not found.");
      error.cause = err;
      next(error);
    }
  }
  async deleteUser(req, res, next) {
    try {
      await User.findByIdAndDelete({ _id: req.params.id });
      res.status(200).send(SuccessResponse(null, "deleted successfully"));
    } catch (err) {
      const error = createError(err.status, "The delete  process faild.");
      error.cause = err;
      error.success = "false";
      next(error);
    }
  }
  async updatePassword(req, res, next) {
    try {
      const filter = {
        _id: new mongoose.Types.ObjectId(req.user.id),
      };
      console.log(req.user.username, req.body.oldPassword);
      let user = await User.authenticate(
        req.user.username,
        req.body.oldPassword
      );
      if (user) {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(req.body.newPassword, salt);
        user = await User.findOneAndUpdate(filter, {
          $set: { password: hashedpassword },
        });
      } else {
        const err = createError(401);

        next(err);
      }

      res
        .status(200)
        .send(
          SuccessResponse(null, "Your password HAS been  changed successfully")
        );
    } catch (err) {
      const error = createError(404, "The requested resource was not found.");
      error.cause = err;
      next(error);
    }
  }
  async mangeFavorites(req, res, next) {
    try {
      console.log("++++++++++++++++");
      const $match = {
        _id: new mongoose.Types.ObjectId(req.user.id),
      };
      const user = await User.findById(req.user.id);
      if (!user) {
        console.log("erro");
        const error = createError(404, "The requested resource not found.");
        error.cause = "The requested resource not found.";
        next(error);
        return;
      } else {
        console.log(user);
        let updatedFavorites = [];
        if (user?.favoritesContent) {
          if (req.body.action === "add") {
            {
              console.log("ååååååååååååååååååååååååååå");
              updatedFavorites = [...user.favoritesContent, req.body.articleId];
            }
          } else if (req.body.action === "remove") {
            console.log("00000000000000");
            updatedFavorites = user.favoritesContent?.filter((fav) => {
              console.log(fav, new mongoose.Types.ObjectId(req.body.articleId));
              fav !== req.body.articleId;
            });
            console.log(updatedFavorites, "_______________________");
          }
        } else {
          {
            console.log(req.body.action, "..................");
            if (req.body.action === "add")
            
            updatedFavorites = [req.body.articleId];
          }
        }
        const update = {
          $set: {},
        };
        update.$set.favoritesContent = updatedFavorites;
        const options = { returnOriginal: false }; // Return the updated document

        await User.findOneAndUpdate($match, update, options);

        const newFavorites = await User.aggregate([
          {
            $match,
          },
          {
            $lookup: {
              from: "articles", // The collection to join
              localField: "favoritesContent", // The field from the input documents (user documents)
              foreignField: "_id", // The field from the documents of the "from" collection (content documents)
              as: "favorites", // The output array field
            },
          },
          {
            $project: {
              favorites: {
                $map: {
                  input: "$favorites",
                  as: "favorite",
                  in: {
                    _id: "$$favorite._id",
                    title: "$$favorite.title",
                  },
                },
              },
            },
          },
        ]);
        console.log(newFavorites);
        res
          .status(200)
          .send(
            SuccessResponse(
              newFavorites,
              "Your Favorite  HAS been  changed successfully"
            )
          );
      }
    } catch (err) {
      const error = createError(404, "The requested resource was not found.");
      error.cause = err;
      next(error);
    }
  }
}
const itUnique = async (filter) => {
  const user = await User.findOne(filter);

  const result = user ? false : true;

  return result;
};
