import axios from "axios";
import type { AxiosInstance } from "axios";
import { moreConfig, requestInterceptor } from "./type";

class kbRequest {
  // 传入axios的config实例
  instance: AxiosInstance;

  // 自定义拦截器 有可能不是每个请求都需要拦截 所以需要可选
  interceptors?: requestInterceptor;

  constructor(config: moreConfig) {
    // 每次创建实例都会执行创建axios实例
    this.instance = axios.create(config);

    // 保存拦截器信息
    this.interceptors = config.interceptors;

    // 自定义使用拦截器 从config中取出的拦截器是对应的实例的拦截器
    // 拦截前 拦截成功和拦截失败
    this.instance.interceptors.request.use(
      this.interceptors?.interceptorSuccess,
      this.interceptors?.interceptorFail
    );

    // 拦截后 响应成功和响应失败
    this.instance.interceptors.response.use(
      this.interceptors?.responseSuccess,
      this.interceptors?.responseFail
    );

    // 全局拦截器(给所有实例添加拦截器)
    // 拦截前
    this.instance.interceptors.request.use(
      (config) => {
        // 保存load配置
        return config;
      },
      (err) => {
        // console.log("全局网络请求拦截器 拦截失败")
        return err;
      }
    );
    // 拦截后响应
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("全局网络请求拦截器 响应成功")
        return res;
      },
      (err) => {
        // console.log("全局网络请求拦截器 响应失败")
        return err;
      }
    );
  }

  // 进行网络请求
  request<T>(config: moreConfig): Promise<T> {
    console.log("我是网络请求");
    return new Promise((resolve, reject) => {
      // 构造器保存了(interceptors) 拦截器的信息 如果设置了 (interceptors.interceptorSuccess) 则会替换当前
      if (config.interceptors?.interceptorSuccess) {
        config = config.interceptors.interceptorSuccess(config);
      }
      this.instance
        .request(config)
        .then((res) => {
          // 和上面拦截成功的逻辑相同 会替换当前
          if (config.interceptors?.responseSuccess) {
            res = config.interceptors.responseSuccess(res);
          }
          console.log(121212121, res);
          // 初始化配置
          resolve(res.data);
        })
        .catch((err) => {
          console.log(1212, err);
          // 初始化配置
          reject(err);
        });
    });
  }
}

export default kbRequest;
