export interface TokenInfo {
  'id': number,
  'user_id': number,
  'token_type_id': number,
  'token': string,
  'valid_until': Date,
  'revoked_at': Date,
}
