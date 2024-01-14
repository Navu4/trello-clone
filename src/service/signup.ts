import { UserDataType } from "../types/app.constants";
import { encryptData, getUsersData, setUsersData } from "../utils";
import {} from "@reduxjs/toolkit";

export const SignupService = {
  onUserSignUp: (data: UserDataType) => {
    const UsersData: UserDataType[] = getUsersData();
    const existingUser = UsersData.find(
      (user) => user.name === data.name || user.email === data.email
    );
    if (existingUser) {
      throw new Error("Existing User");
    }

    data.password = encryptData(data.password);
    delete (data as any).confirmPassword;
    UsersData.push(data);
    setUsersData(UsersData);
  },
};
