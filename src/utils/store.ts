import { TagType } from "@/pages/creativity/data";

class Store {
  static tokenKey: string = 'token';
  static refreshTokenKey: string = 'refresh_token';
  static tokenId: string = 'token_id';
  static expiresIn: string = 'expires_in';
  static userId: string = 'user_id';
  static userName: string = 'user_name';
  static mediaTagsId: string = 'media_tag_ids'
  static textTagsId: string = 'text_tag_ids'
  static tokenType = 'token_type'

  static GetToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  static SetToken(tokenValue: string) {
    localStorage.setItem(this.tokenKey, tokenValue)
  }

  static GetRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }
  static SetRefreshToken(refreshTokenValue: string) {
    localStorage.setItem(this.refreshTokenKey, refreshTokenValue)
  }

  static GetTokenId(): number | null {
    const tokenId = localStorage.getItem(this.tokenId);
    return tokenId ? parseInt(tokenId, 10) : null;
  }

  static SetTokenId(tokenIdValue: number) {
    localStorage.setItem(this.tokenId, String(tokenIdValue));
  }

  static GetExpiresIn(): number | null {
    const expiresIn = localStorage.getItem(this.expiresIn);
    return expiresIn ? parseInt(expiresIn, 10) : null;
  }

  static SetExpiresIn(expiresInValue: number) {
    localStorage.setItem(this.expiresIn, String(expiresInValue));
  }

  static GetUserId(): number | null {
    const userId = localStorage.getItem(this.userId);
    return userId ? parseInt(userId, 10) : null;
  }

  static SetUserId(userIdValue: number) {
    localStorage.setItem(this.userId, String(userIdValue));
  }

  static GetUserName(): string | null {
    return localStorage.getItem(this.userName);
  }

  static SetUserName(userNameValue: string) {
    localStorage.setItem(this.userName, userNameValue);
  }

  static SetMediaTagIds(tagIds: { key?: string; label: React.ReactNode; value: string | number }[]) {
    let storageIds = this.GetMediaTagIds();
    let setIds: { key?: string; label: React.ReactNode; value: string | number }[] = []
    if (storageIds) {
      setIds = JSON.parse(storageIds)
      if (setIds.length < 10) {
        const mapObj = new Map()
        setIds = setIds.concat(tagIds).filter(item => {
          return !mapObj.has(item.key) && mapObj.set(item.key, true)
        })
      }
    } else {
      setIds = tagIds
    }
    localStorage.setItem(this.mediaTagsId, JSON.stringify(setIds));
  }

  static GetMediaTagIds() {
    return localStorage.getItem(this.mediaTagsId);
  }

  static SetTextTagIds(tagIds: { key?: string; label: React.ReactNode; value: string | number }[]) {
    let storageIds = this.GetTextTagIds();
    let setIds: { key?: string; label: React.ReactNode; value: string | number }[] = []
    if (storageIds) {
      setIds = JSON.parse(storageIds)
      if (setIds.length < 10) {
        const mapObj = new Map()
        setIds = setIds.concat(tagIds).filter(item => {
          return !mapObj.has(item.key) && mapObj.set(item.key, true)
        })
      }
    } else {
      setIds = tagIds
    }
    localStorage.setItem(this.textTagsId, JSON.stringify(setIds));
  }

  static GetTextTagIds() {
    return localStorage.getItem(this.textTagsId);
  }

  static GetTokenType(): string | null {
    return localStorage.getItem(this.tokenType);
  }

  static SetTokenType(tokenType: string) {
    localStorage.setItem(this.tokenType, tokenType);
  }

  public static clearStorage() {
    localStorage.clear();
  }
}

export default Store
