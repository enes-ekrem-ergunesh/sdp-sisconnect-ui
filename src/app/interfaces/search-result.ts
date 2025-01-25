export interface SearchResult {
  id: number | null;
  user_id: number | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean | null;
  is_blocked: boolean | null;
}
