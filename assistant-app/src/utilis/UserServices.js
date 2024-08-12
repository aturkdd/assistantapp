"use client";
import axios from "axios";
import userHelper from "./userHelper";

const handleLogin = async (username, password) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
    {
      username,
      password,
    }
  );
  console.log(res.data.data);
  return res.data.data;
};

const handlesignup = (data) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, data);
};
const updatePassword = async (id, updatePassword) => {
  const token = userHelper.getToken();
  const userData = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/users/changePassword/${id}`,
    updatePassword,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//__________________Article__________
const getArticles = async (setArticlessArray, query) => {
  const token = userHelper.getToken();

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/article/`, {
    params: { ...query },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("data", res.data.data.articles);
  const result = res.data.data.articles;
  setArticlessArray(result);
};

const getOneArticle = async (setData, slug) => {
  const token = userHelper.getToken();

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/article/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("data", res.data.data[0]);
  const result = res.data.data[0];
  setData(result);
};
const addArticle = async (data) => {
  try {
    const token = userHelper.getToken();

    const articleData = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/article`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(articleData);
    return articleData;
  } catch (e) {
    console.log(e);
  }
};
const deleteArticle = async (id) => {
  const token = userHelper.getToken();

  const deleted = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/article/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const res = deleted;

  return res;
};

// ___________________________________Favorites________________
const getFavorites = async (id) => {
  const token = userHelper.getToken();

  const userData = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/favorites/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const res = userData.data.data[0].favorites;
  console.log(res, "**********");
  return res;
};
const isfavorite = async (id, slug, setIsFavorite) => {
  console.log(slug);
  const favorites = await getFavorites(id);
  favorites.forEach((element) => {
    console.log(element, "PPp");
    if (element._id === slug) {
      console.log("...............");
      setIsFavorite(true);
    }
  });
};

const addRemoveVaforite = async (action, articleId, id) => {
  try {
    const token = userHelper.getToken();

    const favorites = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/users/mangeFavorite/${id}`,
      { action: action, articleId: articleId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = favorites.data.data[0].favorites;
    return res;
  } catch (e) {
    console.log(e);
  }
};

//_____________________________User________________________
const updateOneUser = async (id, updateState) => {
  const token = userHelper.getToken();
  const userData = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
    updateState,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return userData.data.data;
};

const getAllUsers = async (subscribed, setUsers) => {
  const token = userHelper.getToken();
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    params: { subscribed: subscribed },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("data", res.data.data.users);
  setUsers(res.data.data.users);
};

const deleteUser = async (id) => {
  const token = userHelper.getToken();

  const deleted = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const res = deleted;
  console.log(deleted);
  return res;
};

//_________________Categories_________
const getCategories = async () => {
  const token = userHelper.getToken();

  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/category/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const res = data.data.data.categories;
  console.log(res, "**********");
  return res;
};
const deleteCategory = async (id) => {
  try {
    const token = userHelper.getToken();

    const deleted = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = deleted;
    console.log(deleted);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const addCategory = async (data) => {
  try {
    const token = userHelper.getToken();

    const Categorydata = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/category`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(Categorydata);
    return Categorydata;
  } catch (e) {
    console.log(e);
  }
};

const getSummary = async (setSummary) => {
  const token = userHelper.getToken();

  const data = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/statistic/summary`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const res = data.data.data;
  console.log(res, "**********");
  setSummary(data.data.data);
};

const addView = async () => {
  try {
    const visited =  userHelper.getCookies();
    if (visited === "") {
   
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/statistic/views`);
    }
  } catch (e) {
    console.log(e);
  }
};

export default {
  handleLogin,
  handlesignup,
  getArticles,
  getOneArticle,
  isfavorite,
  getAllUsers,
  getFavorites,
  updateOneUser,
  updatePassword,
  addRemoveVaforite,
  deleteUser,
  getCategories,
  deleteCategory,
  addCategory,
  addArticle,
  deleteArticle,
  getSummary,
  addView,
};
