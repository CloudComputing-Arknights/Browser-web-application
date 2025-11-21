import { getOpenAPIConfiguration } from "@/lib/APIConfig";
import {
  ItemUserApi,
  CreateOwnItemReq,
  JobRead,
  UpdateOwnItemReq,
  ItemRead,
} from "@/client";

export default class ItemUserClient {
  async createItemForMe(payload: CreateOwnItemReq): Promise<JobRead> {
    const api = new ItemUserApi(getOpenAPIConfiguration());
    const res = await api.createItemForMeMeItemsPost(payload);
    return res.data;
  }

  async deleteMyItem(itemId: string): Promise<any> {
    const api = new ItemUserApi(getOpenAPIConfiguration());
    const res = await api.deleteMyItemMeItemsItemIdDelete(itemId);
    return res.data;
  }

  async getMyJobStatus(jobId: string): Promise<JobRead> {
    const api = new ItemUserApi(getOpenAPIConfiguration());
    const res = await api.getMyJobStatusMeItemsJobsJobIdGet(jobId);
    return res.data;
  }

  async listMyItems(skip?: number, limit?: number): Promise<any> {
    const api = new ItemUserApi(getOpenAPIConfiguration());
    const res = await api.listMyItemsMeItemsGet(skip, limit);
    return res.data;
  }

  async updateMyItem(
    itemId: string,
    ifMatch: string,
    payload: UpdateOwnItemReq
  ): Promise<ItemRead> {
    const api = new ItemUserApi(getOpenAPIConfiguration());
    const res = await api.updateMyItemMeItemsItemIdPatch(itemId, ifMatch, payload);
    return res.data;
  }
}
