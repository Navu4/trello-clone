import { LoginState, UserDataType } from "../types/app.constants";
import { decryptData, encryptData, getUsersData, setDashBoardDataToLocalStorage, setUserToken, setUsersData } from "../utils";
import { dashboard, newUser, existingUser as user } from "../utils/dummyData";

export const LoginService = {
  onUserLogin: (data: LoginState) => {
    const UserData: UserDataType[] = getUsersData();
    let existingUser = UserData.find(
      (user) => user.email === data.email && decryptData(user.password) === data.password
    );


    if(data.email === user.email && decryptData(user.password) === data.password) {
      setUsersData([user]);
      setDashBoardDataToLocalStorage(user.id, dashboard["cb9750a5-fc02-4c7c-a5cb-8daaa542e450"]);
      existingUser = user;
    } 
    if(data.email === newUser.email && decryptData(newUser.password) === data.password) {
      setUsersData([user]);
      existingUser = newUser;
    }

    if (!existingUser) {
      throw new Error("User doesn't exist with this email");
    }
    const token = encryptData(existingUser);
    setUserToken(token);
  },
};
