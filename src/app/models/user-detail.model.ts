export interface UserDetailModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  phone_number: number;
  profile_photo: string;
  is_active: boolean;
  is_superuser: boolean;
  is_admin: boolean;
  is_staff: boolean;
  is_teacher: boolean;
  parent: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    parent_id: string;
  };
}
