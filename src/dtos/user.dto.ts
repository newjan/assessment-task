export interface UserCreateDto {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
}

export interface UserUpdateDto {
  firstName?: string;
  lastName?: string;
  address?: string;
}
