export interface ConnectionInfo {
  id: number | null;
  user_id: number | null;
  connected_user_id: number | null;
  accepted_at: string | null;
  is_blocked: boolean | null;
}
