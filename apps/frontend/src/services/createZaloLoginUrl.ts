export default function createZaloLoginUrl(appId: string, callbackURL: string) {
  return `https://oauth.zaloapp.com/v4/permission?app_id=${appId}&redirect_uri=${callbackURL}&state=react-client`
}
