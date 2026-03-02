export type ID = string;

export interface User {
  id: ID;
  name: string;
  avatar?: string;
  rating?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
