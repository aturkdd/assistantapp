"use client";

import UserServices from "@/utilis/UserServices";
import React, { useEffect, useState } from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { MdOutlineCancel } from "react-icons/md";
import LoadingSpinner from "../Loading/LoadingSpinner";
import "./index.css";
import { RiDeleteBinFill } from "react-icons/ri";
import { resetMessage, setmessage } from "@/lib/messageSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation.js";
import { resetUser } from "../../lib/slices.js";
import { useTranslation } from "react-i18next";
import userHelper from "@/utilis/userHelper";

const UsersForm = ({ user }) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState("");
  const route = useRouter();
  const dispatch = useDispatch();
  const loadUsers = async () => {
    try {
      const res = await UserServices.getAllUsers(subscribed, setUsers);

      setLoading(false);
    } catch (e) {
      let errorMessage;

      if (e?.response?.request?.status == 401) {
        errorMessage = "logInAgainAndTryAgain";
        userHelper.removeToken();
        dispatch(resetUser());
        route.push("/login");
      } else errorMessage = "somethingGoesWrongTryAgain";
      dispatch(
        setmessage({
          success: false,
          failure: true,
          message: ` ${t(errorMessage)}`,
        })
      );
      setTimeout(() => {
        dispatch(resetMessage());
      }, 10000);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [subscribed]);

  const handleRemove = async (Id) => {
    try {
      const res = await UserServices.deleteUser(Id);

      loadUsers();

      dispatch(
        setmessage({
          success: true,
          failure: false,
          message: ` ${t("deletedSuccessfully")}`,
        })
      );
      setTimeout(() => {
        dispatch(resetMessage());
      }, 10000);
    } catch (e) {
      let errorMessage;

      if (e?.response?.request?.status == 401) {
        errorMessage = "logInAgainAndTryAgain";
        userHelper.removeToken();
        dispatch(resetUser());
        route.push("/login");
      } else errorMessage = "somethingGoesWrongTryAgain";
      dispatch(
        setmessage({
          success: false,
          failure: true,
          message: ` ${t(errorMessage)}`,
        })
      );
      setTimeout(() => {
        dispatch(resetMessage());
      }, 10000);
    }
  };

  return (
    <div>
      <h3 className="subAddress"> {t("users")}</h3>
      <div className="search-component">
        <label style={{ color: "green" }}> {t("subscribed")} </label>
        <select
          name="subscribed"
          value={subscribed}
          onChange={(e) => {
            setSubscribed(e.target.value);
          }}
        >
          <option key="selection" value="">
            {" "}
            {"       "}
          </option>
          <option key="selection1" value={true}>
            {t("subscribed")}
          </option>
          <option key="selection2" value={false}>
            {t("notSubscribed")}
          </option>
        </select>
      </div>
      <br></br>
      {Loading ? (
        <LoadingSpinner />
      ) : (
        <table>
          <thead>
            <tr>
              <th>{t("firstName")}</th>
              <th>{t("lastName")}</th>
              <th>{t("email")}</th>
              <th>{t("phoneNumber")}</th>
              <th>{t("subscribed")} </th>
              <th> -</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((rowData, i) => (
              <tr key={i} className={i % 2 === 0 ? "col-2" : "col-1"}>
                <td>{rowData.firstName}</td>
                <td>{rowData.lastName}</td>
                <td>{rowData.email}</td>
                <td>{rowData.phoneNumber}</td>
                <td>
                  {" "}
                  {rowData.messageSubscribed ? (
                    <ImCheckboxChecked color="green" />
                  ) : (
                    <MdOutlineCancel color="red" />
                  )}
                </td>
                <td>
                  <button
                    className="deleteButton"
                    onClick={() => handleRemove(rowData.id)}
                  >
                    <RiDeleteBinFill> </RiDeleteBinFill>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersForm;
