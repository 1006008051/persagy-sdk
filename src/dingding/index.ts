/**
 *  钉钉API
 */
import axios from 'axios';
import * as colors from 'colors';
const { log } = console;
const OAPI = 'https://oapi.dingtalk.com';

import {
    IToken,
} from './interface';

class dingding {
    private appkey: string;
    private appsecret: string;
    /**
     * 实例化小程序
     * @param appKey 小程序appKey
     * @param appSecret 小程序appSecret
     * @param corpid 小程序corpid
     * @param corpsecret 小程序corpsecret
    */
    constructor(appkey: string, appsecret: string) {
        this.appkey = appkey;
        this.appsecret = appsecret
    }
    /**
   * 获取access_token 【注意】正常情况下access_token有效期为7200秒，有效期内重复获取返回相同结果，并自动续期。
   */
    async getAccessToken(): Promise<IToken> {
        log(colors.green(`==========获取access_token`));
        const { appkey, appsecret } = this;
        const { data } = await axios.get(`${OAPI}/gettoken?appkey=${appkey}&appsecret=${appsecret}`);
        return data;
    }
    /**
   * 判断传参是否有access_token, 没有的话重新获取
   * @param token access_token
   */
    private async getToken(token?: string) {
        if (!token) {
            const { access_token } = await this.getAccessToken();
            token = access_token;
        }
        return token;
    }
    /**
  * 获取用户ID
  * @param code 用户授权码
  * @param token access_token
  */
    async getUserId(code: string, token?: string) {
        log(colors.green(`===========获取用户ID`));
        token = token || (await this.getToken(token));
        const { data } = await axios(`${OAPI}/user/getuserinfo?access_token=${token}&code=${code}`);
        return data;
    }
    /**
   * 获取用户信息
   * @param userid 用户id
   * @param token access_token
   */
    async getUser(code: string, token?: string) {
        log(colors.green(`===========获取用户信息`));
        token = token || (await this.getToken(token));
        if (!token) return { errcode: 1, errmsg: 'token获取失败' }
        const userId_data = await this.getUserId(code, token);
        if (!userId_data.userid) return userId_data;
        const {data} = await axios(
            `${OAPI}/user/get?access_token=${token}&userid=${userId_data.userid}`
        );
        return data;
    }
}

export default dingding