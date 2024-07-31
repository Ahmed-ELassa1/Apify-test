import { AxiosResponse } from "axios";
import { IGetProductBody, IResponseList } from "../../Interfaces/GlobalInterfaces";
import { HTTPBaseService } from "../httpService";

export class ProductService extends HTTPBaseService {
  private static classInstance?: ProductService;
  constructor() {
    super(process.env.REACT_API_BASE_URL);
  }
  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ProductService();
    }
    return this.classInstance;
  }

  public getAllProducts(
    body: IGetProductBody
  ): Promise<AxiosResponse<IResponseList>> {
    return this.instance.get<IResponseList>("products", {
      params: body,
      ...this.getRequestConfig(),
    });
  }
}
