export interface User {
  id: number;
  is_admin: boolean;
  admin_blocked_by: User;
  admin_blocked_at: Date;
  h_student_id: number;
  h_personnel_id: number;
  student_id: number;
  first_name: string;
  family_name: string;
  gender: string;
  birth_date: Date;
  address: string;
  email: string;
  password: string;
  personnel_id: number;
  personal_email: string;
  school_email: string;
  phone_numbers: string;
  old_id: number;
}
