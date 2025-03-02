export interface Category {
    id: string;
    name: string;
  }
  
  export interface CategoryDetail extends Category {
    createdAt: string;
    updatedAt: string;
  }