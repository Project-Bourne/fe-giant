export interface UserInfoModel {
  uuid?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  image?: string | null;
  socketId?: string;
  onlineStatus?: number;
  status?: string;
  verified?: boolean;
  blocked?: boolean;
  delete?: boolean;
  role?: number;
  createdAt?: string;
  updatedAt?: string;
}
