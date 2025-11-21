import { getOpenAPIConfiguration } from "@/lib/APIConfig";
import { UserApi, SignInRes, SignedInUserRes } from "@/client";

export default class UserClient {
  async authMe(): Promise<SignedInUserRes> {
    const api = new UserApi(getOpenAPIConfiguration());
    const res = await api.authMeMeUserGet();
    return res.data;
  }

  async signIn(username: string, password: string): Promise<SignInRes> {
    const api = new UserApi(getOpenAPIConfiguration());
    const res = await api.signInTokenPost({ username, password });
    return res.data;
  }

  async signUp(
    username: string,
    email: string,
    password: string
  ): Promise<SignedInUserRes> {
    const api = new UserApi(getOpenAPIConfiguration());
    const res = await api.createUserUsersPost({ username, email, password });
    return res.data;
  }
}
