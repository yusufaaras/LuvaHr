// Form data types
export interface CVFormData {
  name: string;
  email: string;
  phone: string;
  expertise: string;
  cv_file?: File;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}

// Component prop types
export interface ModalProps {
  show: boolean;
  onClose: () => void;
}

export interface ServiceItemProps {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItemProps {
  question: string;
  answer: string;
  isActive?: boolean;
}
