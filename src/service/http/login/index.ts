import kbBaseRequest from "@/service";
import { IDataType } from "../../type";
import { ICustormType, ICustormSetup } from "./type";

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

export const httpSetCustormList = (content: string) => {
  return kbBaseRequest.request<ICustormType>({
    url: "/gosetwebselffun",
    method: "POST",
    data: {
      flag: "web",
      content,
    },
  });
};

export const httpSetupState = (
  data: ICustormSetup,
  method: "GET" | "POST" = "GET"
) => {
  const config = {
    url: "gocustomizedata",
    method,
    data: {},
    params: {},
  };
  method == "GET" ? (config.params = data) : (config.data = data);
  return kbBaseRequest.request<IDataType>(config);
};
