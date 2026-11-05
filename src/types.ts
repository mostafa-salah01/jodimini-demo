export type Language = 'ar' | 'en';

export type AgeCategory = 'all' | '0-12m' | '1-3y' | '4-6y' | '7-9y' | '10-12y';

export interface Product {
  id: string;
  slug: string;
  name: { ar: string; en: string };
  shortDesc: { ar: string; en: string };
  fullDesc: { ar: string; en: string };
  price: number;
  originalPrice?: number;
  ageCategory: '0-12m' | '1-3y' | '4-6y' | '7-9y' | '10-12y';
  ageLabel: { ar: string; en: string };
  badge?: { ar: string; en: string; color: string };
  image: string;
  sizes: string[];
  fabric: { ar: string; en: string };
  care: { ar: string; en: string };
}

export interface CustomEmbroideryData {
  childName: string;
  threadColor: string;
  fontFamily: string;
  price: number;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  quantity: number;
  isGift: boolean;
  embroidery?: CustomEmbroideryData;
}

export interface BundleItem {
  id: string;
  title: { ar: string; en: string };
  desc: { ar: string; en: string };
  productIds: string[];
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  badge: { ar: string; en: string };
  tagline: { ar: string; en: string };
}

export interface Review {
  id: string;
  author: { ar: string; en: string };
  city: { ar: string; en: string };
  rating: number;
  comment: { ar: string; en: string };
  verified: boolean;
  highlight?: { ar: string; en: string };
}
