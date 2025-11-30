import { getOpenAPIConfiguration } from "@/lib/APIConfig";
import { DefaultApi } from "@/client";

export default class DefaultClient {
  async root(): Promise<any> {
    const api = new DefaultApi(getOpenAPIConfiguration());
    const res = await api.rootGet();
    return res.data;
  }
}
