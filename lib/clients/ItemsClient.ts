import { getOpenAPIConfiguration } from "@/lib/APIConfig";
import {
  ItemsApi,
  ItemRead,
  CategoryRead,
  TransactionType,
} from "@/client";

export type ListItemsOptions = {
  id?: string[] | null;
  categoryId?: number | null;
  transactionType?: TransactionType | null;
  search?: string | null;
  skip?: number;
  limit?: number;
};

export default class ItemsClient {
  async getItemById(itemId: string): Promise<ItemRead> {
    const api = new ItemsApi(getOpenAPIConfiguration());
    const res = await api.getPublicItemByIdItemsItemIdGet(itemId);
    return res.data;
  }

  async listCategories(skip?: number, limit?: number): Promise<CategoryRead[]> {
    const api = new ItemsApi(getOpenAPIConfiguration());
    const res = await api.listCategoriesItemsCategoriesGet(skip, limit);
    return res.data;
  }

  async listItems(options: ListItemsOptions = {}): Promise<ItemRead[]> {
    const api = new ItemsApi(getOpenAPIConfiguration());
    const {
      id,
      categoryId,
      transactionType,
      search,
      skip,
      limit,
    } = options;
    const res = await api.listPublicItemsItemsGet(
      id,
      categoryId,
      transactionType,
      search,
      skip,
      limit
    );
    return res.data;
  }
}
