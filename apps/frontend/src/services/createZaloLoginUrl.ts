const DEFAULT_APP_ID = '513056836020745485';
const DEFAULT_CALLBACK_URL = 'https://blog.kma-news.tech/auth/login/zalo';
export default function createZaloLoginUrl(appId: string, callbackURL: string) {
  return `https://oauth.zaloapp.com/v4/permission?app_id=${
    appId || DEFAULT_APP_ID
  }&redirect_uri=${callbackURL || DEFAULT_CALLBACK_URL}&state=react-client`;
}
