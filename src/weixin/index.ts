/**
 *  微信API
 */
import axios from 'axios';
import * as colors from 'colors';
const { log } = console;
const OAPI = 'https://api.weixin.qq.com'
import {
    IToken,
} from './interface';

class weixin {
    private appid: string;
    private appsecret: string;
    private proxy: string;
    /**
     * 实例化小程序
     * @param appid 小程序appid
     * @param appsecret 小程序appsecret
     * @param proxy  小程序的请求地址
    */
    constructor(appid: string, appsecret: string, proxy = OAPI) {
        this.appid = appid;
        this.appsecret = appsecret;
        this.proxy = proxy;
    }
    /**
   * 通过code换取网页授权access_token
   */
    async getAccessToken(code: string): Promise<IToken> {
        log(colors.green(`==========获取access_token`));
        const { appid, appsecret, proxy } = this;
        const { data } = await axios.post(`${proxy}/sns/oauth2/access_token?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code`);
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
        const { proxy } = this;
        const { data } = await axios.post(
            `${proxy}/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
        );
        return data;
    }
}

export default weixin