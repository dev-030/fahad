export interface Achievement {
  icon: string;
  text: string;
}

export interface Coach {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  specializations: string[];
  certifications: string[];
  slug: string;
  email: string;
  phone: string;
  socialMedia: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface ScheduleEvent {
  time: string;
  days: string[];
  title: string;
  level: string;
  category: string;
  categoryType: string;
}

export interface Coach {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  specializations: string[];
  certifications: string[];
  slug: string;
  email: string;
  phone: string;
  socialMedia: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

export interface Program {

    id: string;

    name: string;

    tagline: string;

    imageUrl: string;

    description: string;

    detailedDescription: string;

    keyTechniques: {

        icon: string;

        name: string;

        description: string;

    }[];

    schedule: {

        day: string;

        time: string;

        class: string;

    }[];

    gear: string[];

    testimonial: {

        quote: string;

        author: string;

    };

}

export interface AdultPlan {
    title: string;
    description: string;
    price: string;
    term: string;
    monthly: string;
    features: {
        text: string;
        included: boolean;
    }[];
}

export interface AddOnPlan {
    title: string;
    description: string;
    price: string;
    term: string;
    note?: string;
    moreInfo?: boolean;
}

export interface KidsPlan {
    title: string;
    price: string;
    term: string;
    monthly: string;
}

export interface Program {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  isFeatured?: boolean;
}

export interface PricingSection {
  id: string;
  title: string;
  tiers: PricingTier[];
}

export interface CoachesHeroSection {
  backgroundImageUrl: string;
  mainHeadline: string;
  subHeadline: string;
}

export interface PricingHeroSection {
  backgroundImageUrl: string;
  mainHeadline: string;
  subHeadline: string;
}

export interface ScheduleHeroSection {
  backgroundImageUrl: string;
  mainHeadline: string;
  subHeadline: string;
}

export interface MembershipPage {
  freeTrial: {
    title: string;
    description: string;
    buttonText: string;
  };
  importantNotes: {
    title: string;
    notes: string[];
  };
  inquiryForm: {
    title: string;
    
        description: string;
      };
    }
    
    export interface OurGym {
      id: number;
      title: string;
      content: string;
      imageUrl: string;
    }
    