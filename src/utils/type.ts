export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    brand: string;
    rating: number;
  }
  export interface ProfileFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
  }
  
  export interface PasswordFormInputs {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  