export interface Post {
  title: string;
  body: string;
  image?: File | string;
  createdDate?: Date | string;
  updatedDate?: Date | string;
  id?: number | string;
  userId?: number | string;
}
