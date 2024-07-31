import { toast } from "react-toastify";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { IResponseList } from "../Interfaces/GlobalInterfaces";

// Abstract base class to handle HTTP requests using Axios
export abstract class HTTPBaseService {
  protected instance: AxiosInstance; // Axios instance for making HTTP requests
  protected readonly baseURL: string | undefined; // Base URL for the HTTP requests
  private abortController: AbortController; // Controller to handle request cancellation

  // Constructor to initialize the Axios instance with the base URL and interceptors
  public constructor(baseURL: string | undefined) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
    });
    this.abortController = new AbortController();

    // Initialize request and response interceptors
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  // Setup request interceptor to handle configurations before the request is sent
  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  // Setup response interceptor to handle the response and errors after the request is made
  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response?.use(
      (response: AxiosResponse<IResponseList>) => {
        return response;
      },
      (error) => {
        toast.dismiss();
        return toast.error(`${error?.message}`);
      }
    );
  };

  // Function to handle the request configuration before sending the request
  private handleRequest = (config: AxiosRequestConfig | any) => {
    return config;
  };

  // Provide request configuration, including signal for request cancellation
  public getRequestConfig() {
    return {
      signal: this.abortController.signal,
    };
  }

  // Method to cancel all ongoing requests
  public cancelRequests() {
    this.abortController.abort();
    this.abortController = new AbortController();
  }
}
