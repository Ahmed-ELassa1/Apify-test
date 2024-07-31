import { toast } from "react-toastify";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { IResponseList } from "../Interfaces/GlobalInterfaces";

export abstract class HTTPBaseService {
  protected instance: AxiosInstance;
  protected readonly baseURL: string | undefined;
  private abortController: AbortController;

  public constructor(baseURL: string | undefined) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
    });
    this.abortController = new AbortController();

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response?.use(
      (response: AxiosResponse<IResponseList>) => {
        return response;
      },
      (error) => {
        toast.dismiss();
        console.log(error);
        return toast.error(`${error?.message}`);
      }
    );
  };

  private handleRequest = (config: AxiosRequestConfig | any) => {
    return config;
  };

  public getRequestConfig() {
    return {
      signal: this.abortController.signal,
    };
  }

  public cancelRequests() {
    this.abortController.abort();
    this.abortController = new AbortController();
  }
}
