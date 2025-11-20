import axios, {AxiosInstance} from 'axios';
import {Configuration} from "@/client";

export const defaultAPIBaseURLs = process.env.NEXT_PUBLIC_API_BASE_URL!;


export function getAxiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: defaultAPIBaseURLs
  });
}

export function getOpenAPIConfiguration(): Configuration {
  const token = localStorage.getItem("token");
  return new Configuration({
    basePath: defaultAPIBaseURLs,
    accessToken: token || undefined,
  });
}
