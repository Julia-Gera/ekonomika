export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover?: {
    url: string;
    alternativeText?: string;
  };
  publishedAt: string;
  author: string;
  category?: string;
}

export interface Service {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  price: string;
  icon?: {
    url: string;
  };
  order: number;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  message?: string;
}
