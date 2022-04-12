import kbBaseRequest from "@/service";
import { IDataType } from "../../type";
import { ICustormType } from "./type";

export const httpAccount = (accountData: any) => {
  const newAccountData = { ...accountData };
  newAccountData.csname = accountData.cnstr;

  return kbBaseRequest.request<IDataType>({
    url: "/kbwebuserlogin",
    params: newAccountData,
  });
};

export const httpGetSelectOptions = () => {
  return kbBaseRequest.request<IDataType>({
    url: "/gogetcommonlistdata",
  });
};

export const httpGetCustormList = () => {
  return kbBaseRequest.request<ICustormType>({
    url: "/gogetwebselffun",
    params: {
      flag: "web",
    },
  });
};
