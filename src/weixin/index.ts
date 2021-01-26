/**
 *  微信API
 */
import axios from 'axios';
import * as colors from 'colors';
const { log } = console;
const OAPI = 'https://api.weixin.qq.com';

import {
    IToken,
} from './interface';

class weixin {
    private appid: string;
    private appsecret: string;
    /**
     * 实例化小程序
     * @param appid 小程序appid
     * @param appsecret 小程序appsecret
    */
    constructor(appid: string, appsecret: string) {
        this.appid = appid;
        this.appsecret = appsecret
    }
    /**
   * 通过code换取网页授权access_token
   */
    async getAccessToken(code: string): Promise<IToken> {
        log(colors.green(`==========获取access_token`));
        const { appid, appsecret } = this;
        const { data } = await axios.post(`${OAPI}/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code`);
        return data
    }
    /**
   * 获取用户信息
   * @param code 授权码
   */
    async getUser(code: string) {
        log(colors.green(`===========获取用户信息`));
        const { access_token, openid, errcode } = await this.getAccessToken(code);
        if (!access_token) return { errcode, errmsg: 'token获取失败' }
        const { data } = await axios.post(
            `${OAPI}/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
        );
        return data;
    }
}

export default weixin