import { getOpenAPIConfiguration } from "@/lib/APIConfig";
import {
  TransactionApi,
  CreateTransactionReq,
  TransactionRes,
  UpdateTransactionStatusReq,
  ListTransactionsTransactionsGetStatusParamEnum,
  ListTransactionsTransactionsGetTypeEnum,
} from "@/client";

export type ListTransactionsOptions = {
  status?: ListTransactionsTransactionsGetStatusParamEnum;
  initiatorUserId?: string | null;
  receiverUserId?: string | null;
  requestedItemId?: string | null;
  type?: ListTransactionsTransactionsGetTypeEnum;
  limit?: number;
  offset?: number;
};

export default class TransactionClient {
  async createTransaction(
    payload: CreateTransactionReq,
    xIdempotencyKey?: string | null
  ): Promise<TransactionRes> {
    const api = new TransactionApi(getOpenAPIConfiguration());
    const res = await api.createTransactionTransactionsTransactionPost(
      payload,
      xIdempotencyKey
    );
    return res.data;
  }

  async deleteTransaction(transactionId: string): Promise<TransactionRes> {
    const api = new TransactionApi(getOpenAPIConfiguration());
    const res = await api.deleteTransactionTransactionsTransactionIdDelete(
      transactionId
    );
    return res.data;
  }

  async getTransaction(transactionId: string): Promise<TransactionRes> {
    const api = new TransactionApi(getOpenAPIConfiguration());
    const res = await api.getTransactionTransactionsTransactionIdGet(
      transactionId
    );
    return res.data;
  }

  async listTransactions(
    options: ListTransactionsOptions = {}
  ): Promise<TransactionRes[]> {
    const api = new TransactionApi(getOpenAPIConfiguration());
    const {
      status,
      initiatorUserId,
      receiverUserId,
      requestedItemId,
      type,
      limit,
      offset,
    } = options;
    const res = await api.listTransactionsTransactionsGet(
      status,
      initiatorUserId,
      receiverUserId,
      requestedItemId,
      type,
      limit,
      offset
    );
    return res.data;
  }

  async updateTransaction(
    transactionId: string,
    payload: UpdateTransactionStatusReq
  ): Promise<TransactionRes> {
    const api = new TransactionApi(getOpenAPIConfiguration());
    const res = await api.updateTransactionTransactionsTransactionIdPut(
      transactionId,
      payload
    );
    return res.data;
  }
}
