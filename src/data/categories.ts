export interface JobType {
  id: string;
  name_en: string;
  name_ar: string;
  verified_required: boolean;
  gender?: 'male' | 'female';
  authority?: string;
}

export interface SubCategory {
  id: string;
  name_en: string;
  name_ar: string;
  icon: string;
  jobs: JobType[];
}

export interface Category {
  id: string;
  name_en: string;
  name_ar: string;
  icon: string;
  subcategories: SubCategory[];
}

export const categories: Category[] = [
  {
    "id": "home_services",
    "name_en": "Home Services",
    "name_ar": "خدمات منزلية",
    "icon": "🏠",
    "subcategories": [
      {
        "id": "home_maintenance",
        "name_en": "Home Maintenance & Repair",
        "name_ar": "صيانة وإصلاح منزلية",
        "icon": "🔧",
        "jobs": [
          {"id": "plumber", "name_en": "Plumber", "name_ar": "سباك", "verified_required": false},
          {"id": "electrician", "name_en": "Electrician", "name_ar": "كهربائي", "verified_required": false},
          {"id": "ac_technician", "name_en": "AC Technician", "name_ar": "فني تكييف", "verified_required": false},
          {"id": "carpenter", "name_en": "Carpenter", "name_ar": "نجار", "verified_required": false},
          {"id": "painter", "name_en": "Painter", "name_ar": "دهان", "verified_required": false},
          {"id": "mason", "name_en": "Mason/Bricklayer", "name_ar": "بناء", "verified_required": false},
          {"id": "handyman", "name_en": "Handyman", "name_ar": "عامل صيانة عامة", "verified_required": false},
          {"id": "locksmith", "name_en": "Locksmith", "name_ar": "سمكري", "verified_required": false},
          {"id": "glass_installer", "name_en": "Glass Installer", "name_ar": "فني زجاج", "verified_required": false},
          {"id": "welder", "name_en": "Welder", "name_ar": "لحام", "verified_required": false},
          {"id": "pest_control", "name_en": "Pest Control Technician", "name_ar": "فني مكافحة حشرات", "verified_required": true},
          {"id": "waterproofing", "name_en": "Waterproofing Specialist", "name_ar": "فني عزل أسطح", "verified_required": false}
        ]
      },
      {
        "id": "cleaning",
        "name_en": "Cleaning Services",
        "name_ar": "خدمات تنظيف",
        "icon": "🧹",
        "jobs": [
          {"id": "home_cleaner", "name_en": "Home Cleaner", "name_ar": "عامل نظافة منازل", "verified_required": false},
          {"id": "deep_cleaning", "name_en": "Deep Cleaning Specialist", "name_ar": "تنظيف عميق", "verified_required": false},
          {"id": "carpet_cleaner", "name_en": "Carpet Cleaner", "name_ar": "تنظيف سجاد", "verified_required": false},
          {"id": "upholstery_cleaner", "name_en": "Sofa/Upholstery Cleaner", "name_ar": "تنظيف كنب ومجالس", "verified_required": false},
          {"id": "window_cleaner", "name_en": "Window Cleaner", "name_ar": "تنظيف زجاج", "verified_required": false},
          {"id": "post_construction", "name_en": "Post-Construction Cleaner", "name_ar": "تنظيف بعد البناء", "verified_required": false},
          {"id": "office_cleaner", "name_en": "Office Cleaner", "name_ar": "عامل نظافة مكاتب", "verified_required": false},
          {"id": "villa_cleaner", "name_en": "Villa Cleaner", "name_ar": "تنظيف فلل", "verified_required": false},
          {"id": "pool_cleaner", "name_en": "Swimming Pool Cleaner", "name_ar": "تنظيف مسابح", "verified_required": true},
          {"id": "pressure_washing", "name_en": "Pressure Washing Technician", "name_ar": "غسيل بالضغط", "verified_required": false},
          {"id": "mosque_cleaner", "name_en": "Mosque Cleaner", "name_ar": "عامل نظافة مساجد", "verified_required": false},
          {"id": "tank_cleaner", "name_en": "Tank Cleaner", "name_ar": "تنظيف خزانات", "verified_required": true}
        ]
      },
      {
        "id": "moving",
        "name_en": "Moving & Relocation",
        "name_ar": "نقل عفش وتخزين",
        "icon": "🚛",
        "jobs": [
          {"id": "furniture_mover", "name_en": "Furniture Mover", "name_ar": "عامل نقل عفش", "verified_required": false},
          {"id": "packing_specialist", "name_en": "Packing Specialist", "name_ar": "فني تغليف", "verified_required": false},
          {"id": "truck_driver_lift", "name_en": "Truck Driver with Lift", "name_ar": "سائق شاحنة مع ونش", "verified_required": true},
          {"id": "piano_mover", "name_en": "Piano Mover", "name_ar": "نقل بيانو", "verified_required": false},
          {"id": "office_mover", "name_en": "Office Mover", "name_ar": "نقل أثاث مكاتب", "verified_required": false},
          {"id": "storage_services", "name_en": "Storage Services", "name_ar": "خدمات تخزين", "verified_required": false},
          {"id": "furniture_assembly", "name_en": "Furniture Disassembly/Assembly", "name_ar": "فك وتركيب أثاث", "verified_required": false},
          {"id": "moving_coordinator", "name_en": "Moving Coordinator", "name_ar": "منسق نقل", "verified_required": false}
        ]
      },
      {
        "id": "appliance_repair",
        "name_en": "Appliance Repair",
        "name_ar": "إصلاح أجهزة",
        "icon": "🔌",
        "jobs": [
          {"id": "fridge_technician", "name_en": "Refrigerator Technician", "name_ar": "فني ثلاجات", "verified_required": false},
          {"id": "washer_technician", "name_en": "Washing Machine Technician", "name_ar": "فني غسالات", "verified_required": false},
          {"id": "oven_technician", "name_en": "Oven/Stove Technician", "name_ar": "فني أفران", "verified_required": false},
          {"id": "dishwasher_technician", "name_en": "Dishwasher Technician", "name_ar": "فني جلايات", "verified_required": false},
          {"id": "microwave_technician", "name_en": "Microwave Technician", "name_ar": "فني ميكروويف", "verified_required": false},
          {"id": "water_dispenser", "name_en": "Water Dispenser Technician", "name_ar": "فني مبردات مياه", "verified_required": false},
          {"id": "generator_technician", "name_en": "Generator Technician", "name_ar": "فني مولدات", "verified_required": true},
          {"id": "vacuum_repair", "name_en": "Vacuum Cleaner Repair", "name_ar": "إصلاح مكانس", "verified_required": false}
        ]
      }
    ]
  },
  {
    "id": "beauty_care",
    "name_en": "Beauty & Personal Care",
    "name_ar": "تجميل وعناية شخصية",
    "icon": "💇",
    "subcategories": [
      {
        "id": "salon_services",
        "name_en": "Salon Services",
        "name_ar": "خدمات صالون",
        "icon": "✂️",
        "jobs": [
          {"id": "hair_stylist_female", "name_en": "Hair Stylist (Women)", "name_ar": "مصفف شعر (نساء)", "gender": "female", "verified_required": false},
          {"id": "hair_stylist_male", "name_en": "Hair Stylist (Men)", "name_ar": "حلاق (رجال)", "gender": "male", "verified_required": false},
          {"id": "nail_technician", "name_en": "Nail Technician", "name_ar": "أخصائي أظافر", "gender": "female", "verified_required": false},
          {"id": "makeup_artist", "name_en": "Makeup Artist", "name_ar": "فنان مكياج", "gender": "female", "verified_required": false},
          {"id": "facial_specialist", "name_en": "Facial Specialist", "name_ar": "أخصائي بشرة", "gender": "female", "verified_required": false},
          {"id": "waxing_specialist", "name_en": "Waxing Specialist", "name_ar": "أخصائي إزالة شعر", "gender": "female", "verified_required": false},
          {"id": "eyebrow_threading", "name_en": "Eyebrow Threading", "name_ar": "رسم حواجب", "gender": "female", "verified_required": false},
          {"id": "eyelash_technician", "name_en": "Eyelash Extension Technician", "name_ar": "فني رموش", "gender": "female", "verified_required": false},
          {"id": "bridal_stylist", "name_en": "Bridal Stylist", "name_ar": "مصفف أعراس", "gender": "female", "verified_required": false},
          {"id": "hair_colorist", "name_en": "Hair Color Specialist", "name_ar": "أخصائي صبغات", "gender": "female", "verified_required": false},
          {"id": "keratin_specialist", "name_en": "Keratin Treatment Specialist", "name_ar": "أخصائي كيراتين", "gender": "female", "verified_required": false},
          {"id": "mens_grooming", "name_en": "Men's Grooming", "name_ar": "عناية رجالية", "gender": "male", "verified_required": false},
          {"id": "beard_trimming", "name_en": "Beard Trimming", "name_ar": "تشذيب لحية", "gender": "male", "verified_required": false},
          {"id": "traditional_barber", "name_en": "Traditional Barber", "name_ar": "حلاق شعبي", "gender": "male", "verified_required": false}
        ]
      },
      {
        "id": "mobile_salon",
        "name_en": "Mobile Salon Services",
        "name_ar": "صالون متنقل",
        "icon": "🚐",
        "jobs": [
          {"id": "home_hairdresser", "name_en": "Home Visit Hairdresser", "name_ar": "مصفف شعر منازل", "verified_required": false},
          {"id": "wedding_makeup", "name_en": "Wedding Party Makeup", "name_ar": "مكياج أفراح", "verified_required": false},
          {"id": "home_nail_services", "name_en": "Home Manicure/Pedicure", "name_ar": "عناية أظافر منازل", "verified_required": false},
          {"id": "event_styling", "name_en": "Special Occasion Styling", "name_ar": "تسريحات مناسبات", "verified_required": false}
        ]
      },
      {
        "id": "spa_wellness",
        "name_en": "Spa & Wellness",
        "name_ar": "منتجع صحي وعافية",
        "icon": "🧖",
        "jobs": [
          {"id": "massage_female", "name_en": "Massage Therapist (Female)", "name_ar": "معالج تدليك (نساء)", "gender": "female", "verified_required": true},
          {"id": "massage_male", "name_en": "Massage Therapist (Male)", "name_ar": "معالج تدليك (رجال)", "gender": "male", "verified_required": true},
          {"id": "hijama_therapist", "name_en": "Cupping Therapist (Hijama)", "name_ar": "معالج حجامة", "verified_required": true},
          {"id": "aromatherapist", "name_en": "Aromatherapist", "name_ar": "معالج عطري", "verified_required": false},
          {"id": "reflexologist", "name_en": "Reflexologist", "name_ar": "أخصائي تدليك القدمين", "verified_required": false},
          {"id": "body_scrub", "name_en": "Body Scrub Specialist", "name_ar": "مقشر جسم", "verified_required": false}
        ]
      }
    ]
  },
  {
    "id": "education",
    "name_en": "Education & Tutoring",
    "name_ar": "تعليم ودروس خصوصية",
    "icon": "📚",
    "subcategories": [
      {
        "id": "academic_tutoring",
        "name_en": "Academic Tutoring",
        "name_ar": "دروس أكاديمية",
        "icon": "🎓",
        "jobs": [
          {"id": "quran_tutor", "name_en": "Quran Tutor", "name_ar": "معلم قرآن", "verified_required": true},
          {"id": "arabic_tutor", "name_en": "Arabic Language Tutor", "name_ar": "معلم لغة عربية", "verified_required": false},
          {"id": "english_tutor", "name_en": "English Language Tutor", "name_ar": "معلم لغة إنجليزية", "verified_required": false},
          {"id": "math_tutor", "name_en": "Mathematics Tutor", "name_ar": "معلم رياضيات", "verified_required": false},
          {"id": "physics_tutor", "name_en": "Physics Tutor", "name_ar": "معلم فيزياء", "verified_required": false},
          {"id": "chemistry_tutor", "name_en": "Chemistry Tutor", "name_ar": "معلم كيمياء", "verified_required": false},
          {"id": "biology_tutor", "name_en": "Biology Tutor", "name_ar": "معلم أحياء", "verified_required": false},
          {"id": "computer_tutor", "name_en": "Computer Science Tutor", "name_ar": "معلم حاسوب", "verified_required": false},
          {"id": "history_tutor", "name_en": "History Tutor", "name_ar": "معلم تاريخ", "verified_required": false},
          {"id": "geography_tutor", "name_en": "Geography Tutor", "name_ar": "معلم جغرافيا", "verified_required": false},
          {"id": "test_prep", "name_en": "SAT/IELTS/TOEFL Prep", "name_ar": "تدريب اختبارات", "verified_required": false},
          {"id": "special_needs", "name_en": "Special Needs Teacher", "name_ar": "معلم احتياجات خاصة", "verified_required": true}
        ]
      },
      {
        "id": "skills_hobbies",
        "name_en": "Skills & Hobbies",
        "name_ar": "مهارات وهوايات",
        "icon": "🎨",
        "jobs": [
          {"id": "art_teacher", "name_en": "Art Teacher", "name_ar": "معلم رسم", "verified_required": false},
          {"id": "calligraphy_teacher", "name_en": "Calligraphy Teacher", "name_ar": "معلم خط عربي", "verified_required": false},
          {"id": "music_teacher", "name_en": "Music Teacher", "name_ar": "معلم موسيقى", "verified_required": false},
          {"id": "cooking_instructor", "name_en": "Cooking Instructor", "name_ar": "معلم طبخ", "verified_required": false},
          {"id": "sewing_teacher", "name_en": "Sewing/Tailoring Teacher", "name_ar": "معلم خياطة", "verified_required": false},
          {"id": "photography_tutor", "name_en": "Photography Tutor", "name_ar": "معلم تصوير", "verified_required": false},
          {"id": "fitness_trainer", "name_en": "Fitness Trainer", "name_ar": "مدرب رياضي", "verified_required": true},
          {"id": "swimming_instructor", "name_en": "Swimming Instructor", "name_ar": "مدرب سباحة", "verified_required": true},
          {"id": "driving_instructor", "name_en": "Driving Instructor", "name_ar": "مدرب قيادة", "verified_required": true},
          {"id": "public_speaking", "name_en": "Public Speaking Coach", "name_ar": "مدرب خطابة", "verified_required": false}
        ]
      }
    ]
  },
  {
    "id": "construction",
    "name_en": "Construction & Contracting",
    "name_ar": "مقاولات وبناء",
    "icon": "🏗️",
    "subcategories": [
      {
        "id": "construction_trades",
        "name_en": "Construction Trades",
        "name_ar": "حرف بناء",
        "icon": "🔨",
        "jobs": [
          {"id": "general_contractor", "name_en": "General Contractor", "name_ar": "مقاول عام", "verified_required": true},
          {"id": "architect", "name_en": "Architect", "name_ar": "مهندس معماري", "verified_required": true},
          {"id": "civil_engineer", "name_en": "Civil Engineer", "name_ar": "مهندس مدني", "verified_required": true},
          {"id": "interior_designer", "name_en": "Interior Designer", "name_ar": "مصمم داخلي", "verified_required": false},
          {"id": "tile_installer", "name_en": "Tile Installer", "name_ar": "مقاول بلاط", "verified_required": false},
          {"id": "marble_worker", "name_en": "Marble Worker", "name_ar": "فني رخام", "verified_required": false},
          {"id": "gypsum_installer", "name_en": "Gypsum Board Installer", "name_ar": "فني جبس بورد", "verified_required": false},
          {"id": "plasterer", "name_en": "Plasterer", "name_ar": "مُجَصِّص", "verified_required": false},
          {"id": "steel_fixer", "name_en": "Steel Fixer", "name_ar": "حداد تسليح", "verified_required": false},
          {"id": "concrete_worker", "name_en": "Concrete Worker", "name_ar": "عامل خرسانة", "verified_required": false},
          {"id": "scaffolding_erector", "name_en": "Scaffolding Erector", "name_ar": "فني سقالات", "verified_required": true},
          {"id": "demolition_worker", "name_en": "Demolition Worker", "name_ar": "عامل هدم", "verified_required": false},
          {"id": "excavation_operator", "name_en": "Excavation Operator", "name_ar": "سائق حفار", "verified_required": true},
          {"id": "surveyor", "name_en": "Surveyor", "name_ar": "مساح", "verified_required": true}
        ]
      },
      {
        "id": "finishing_works",
        "name_en": "Finishing Works",
        "name_ar": "تشطيبات",
        "icon": "🎨",
        "jobs": [
          {"id": "painter_finishing", "name_en": "Painter", "name_ar": "دهان", "verified_required": false},
          {"id": "wallpaper_installer", "name_en": "Wallpaper Installer", "name_ar": "فني ورق جدران", "verified_required": false},
          {"id": "parquet_installer", "name_en": "Parquet Installer", "name_ar": "فني باركيه", "verified_required": false},
          {"id": "carpet_installer", "name_en": "Carpet Installer", "name_ar": "فني سجاد", "verified_required": false},
          {"id": "curtain_installer", "name_en": "Curtain Installer", "name_ar": "فني ستائر", "verified_required": false},
          {"id": "kitchen_fitter", "name_en": "Kitchen Fitter", "name_ar": "فني مطابخ", "verified_required": false},
          {"id": "closet_installer", "name_en": "Closet Installer", "name_ar": "فني غرف نوم", "verified_required": false},
          {"id": "aluminum_works", "name_en": "Aluminum Works", "name_ar": "فني ألمنيوم", "verified_required": false}
        ]
      }
    ]
  },
  {
    "id": "automotive",
    "name_en": "Automotive Services",
    "name_ar": "خدمات سيارات",
    "icon": "🚗",
    "subcategories": [
      {
        "id": "auto_repair",
        "name_en": "Car Maintenance & Repair",
        "name_ar": "صيانة وإصلاح سيارات",
        "icon": "🔧",
        "jobs": [
          {"id": "auto_mechanic", "name_en": "Mechanic", "name_ar": "ميكانيكي سيارات", "verified_required": false},
          {"id": "auto_electrician", "name_en": "Electrician (Auto)", "name_ar": "كهربائي سيارات", "verified_required": false},
          {"id": "auto_ac", "name_en": "AC Technician (Auto)", "name_ar": "فني تكييف سيارات", "verified_required": false},
          {"id": "oil_change", "name_en": "Oil Change Technician", "name_ar": "تغيير زيت", "verified_required": false},
          {"id": "brake_specialist", "name_en": "Brake Specialist", "name_ar": "فني فرامل", "verified_required": false},
          {"id": "tire_technician", "name_en": "Tire Technician", "name_ar": "فني إطارات", "verified_required": false},
          {"id": "auto_painter", "name_en": "Car Painter", "name_ar": "دهان سيارات", "verified_required": false},
          {"id": "dent_repair", "name_en": "Dent Repair Technician", "name_ar": "فني سمكرة", "verified_required": false},
          {"id": "auto_detailing", "name_en": "Car Detailer", "name_ar": "تلميع سيارات", "verified_required": false},
          {"id": "auto_upholstery", "name_en": "Car Upholsterer", "name_ar": "مفروشات سيارات", "verified_required": false},
          {"id": "window_tinting", "name_en": "Window Tinting Technician", "name_ar": "فني تظليل", "verified_required": false},
          {"id": "auto_battery", "name_en": "Car Battery Service", "name_ar": "بطاريات سيارات", "verified_required": false}
        ]
      },
      {
        "id": "roadside_assistance",
        "name_en": "Roadside Assistance",
        "name_ar": "مساعدة على الطريق",
        "icon": "🆘",
        "jobs": [
          {"id": "towing", "name_en": "Towing Driver", "name_ar": "سائق ونش", "verified_required": true},
          {"id": "jump_start", "name_en": "Jump Start Service", "name_ar": "شحن بطارية متنقل", "verified_required": false},
          {"id": "fuel_delivery", "name_en": "Fuel Delivery", "name_ar": "توصيل وقود", "verified_required": false},
          {"id": "flat_tire", "name_en": "Flat Tire Service", "name_ar": "تغيير كفر", "verified_required": false},
          {"id": "lockout", "name_en": "Lockout Service", "name_ar": "فتح باب سيارة", "verified_required": false}
        ]
      }
    ]
  },
  {
    "id": "delivery",
    "name_en": "Delivery & Logistics",
    "name_ar": "توصيل ولوجستيات",
    "icon": "📦",
    "subcategories": [
      {
        "id": "delivery_services",
        "name_en": "Delivery Services",
        "name_ar": "خدمات توصيل",
        "icon": "🚚",
        "jobs": [
          {"id": "food_delivery", "name_en": "Food Delivery", "name_ar": "توصيل طلبات مطاعم", "verified_required": false},
          {"id": "parcel_delivery", "name_en": "Parcel Delivery", "name_ar": "توصيل طرود", "verified_required": false},
          {"id": "document_courier", "name_en": "Document Courier", "name_ar": "مندوب توصيل مستندات", "verified_required": false},
          {"id": "grocery_delivery", "name_en": "Grocery Delivery", "name_ar": "توصيل بقالة", "verified_required": false},
          {"id": "medicine_delivery", "name_en": "Medicine Delivery", "name_ar": "توصيل أدوية", "verified_required": true},
          {"id": "flower_delivery", "name_en": "Flower Delivery", "name_ar": "توصيل ورد", "verified_required": false},
          {"id": "gift_delivery", "name_en": "Gift Delivery", "name_ar": "توصيل هدايا", "verified_required": false},
          {"id": "furniture_delivery", "name_en": "Furniture Delivery", "name_ar": "توصيل أثاث", "verified_required": false},
          {"id": "heavy_item_delivery", "name_en": "Heavy Item Transport", "name_ar": "نقل بضائع ثقيلة", "verified_required": true},
          {"id": "refrigerated_transport", "name_en": "Refrigerated Transport", "name_ar": "نقل مبرد", "verified_required": true}
        ]
      },
      {
        "id": "specialized_transport",
        "name_en": "Specialized Transport",
        "name_ar": "نقل متخصص",
        "icon": "🚛",
        "jobs": [
          {"id": "moving_truck", "name_en": "Moving Truck Driver", "name_ar": "سائق شاحنة نقل عفش", "verified_required": true},
          {"id": "flatbed_driver", "name_en": "Flatbed Driver", "name_ar": "سائق قلاب", "verified_required": true},
          {"id": "tanker_driver", "name_en": "Tanker Driver", "name_ar": "سائق صهريج", "verified_required": true},
          {"id": "car_transporter", "name_en": "Car Transporter", "name_ar": "سائق ناقلة سيارات", "verified_required": true},
          {"id": "motorcycle_courier", "name_en": "Motorcycle Courier", "name_ar": "مندوب دراجة نارية", "verified_required": true}
        ]
      }
    ]
  },
  {
    "id": "healthcare",
    "name_en": "Healthcare Services",
    "name_ar": "خدمات صحية",
    "icon": "🏥",
    "subcategories": [
      {
        "id": "home_healthcare",
        "name_en": "Home Healthcare",
        "name_ar": "رعاية صحية منزلية",
        "icon": "👨‍⚕️",
        "jobs": [
          {"id": "home_nurse", "name_en": "Nurse (Home Visit)", "name_ar": "ممرض منازل", "verified_required": true, "authority": "SCFHS"},
          {"id": "physical_therapist", "name_en": "Physical Therapist", "name_ar": "أخصائي علاج طبيعي", "verified_required": true, "authority": "SCFHS"},
          {"id": "elderly_caregiver", "name_en": "Elderly Caregiver", "name_ar": "مقدم رعاية مسنين", "verified_required": true},
          {"id": "baby_nurse", "name_en": "Baby Nurse (Night)", "name_ar": "ممرضة أطفال ليلية", "verified_required": true},
          {"id": "post_surgery_care", "name_en": "Post-Surgery Care", "name_ar": "رعاية ما بعد الجراحة", "verified_required": true},
          {"id": "chronic_disease", "name_en": "Chronic Disease Monitor", "name_ar": "متابعة أمراض مزمنة", "verified_required": true},
          {"id": "medical_equipment", "name_en": "Medical Equipment Supplier", "name_ar": "مورد أجهزة طبية", "verified_required": true},
          {"id": "lab_technician", "name_en": "Home Lab Technician", "name_ar": "فني مختبر منازل", "verified_required": true, "authority": "SCFHS"}
        ]
      },
      {
        "id": "alternative_medicine",
        "name_en": "Alternative Medicine",
        "name_ar": "طب بديل",
        "icon": "🌿",
        "jobs": [
          {"id": "hijama", "name_en": "Cupping Therapist (Hijama)", "name_ar": "معالج حجامة", "verified_required": true},
          {"id": "herbalist", "name_en": "Herbalist", "name_ar": "أخصائي أعشاب", "verified_required": false},
          {"id": "nutritionist", "name_en": "Nutritionist", "name_ar": "أخصائي تغذية", "verified_required": true},
          {"id": "holistic_coach", "name_en": "Holistic Health Coach", "name_ar": "مدرب صحة شاملة", "verified_required": false}
        ]
      }
    ]
  },
  {
    "id": "events",
    "name_en": "Events & Occasions",
    "name_ar": "مناسبات وفعاليات",
    "icon": "🎉",
    "subcategories": [
      {
        "id": "event_services",
        "name_en": "Event Services",
        "name_ar": "خدمات مناسبات",
        "icon": "📸",
        "jobs": [
          {"id": "photographer", "name_en": "Photographer", "name_ar": "مصور فوتوغرافي", "verified_required": false},
          {"id": "videographer", "name_en": "Videographer", "name_ar": "مصور فيديو", "verified_required": false},
          {"id": "event_planner", "name_en": "Event Planner", "name_ar": "منسق حفلات", "verified_required": false},
          {"id": "party_decorator", "name_en": "Party Decorator", "name_ar": "منسق ديكور حفلات", "verified_required": false},
          {"id": "tent_setup", "name_en": "Tent/Catering Equipment Setup", "name_ar": "فني خيام وتجهيزات", "verified_required": false},
          {"id": "mc_host", "name_en": "MC/Host", "name_ar": "مذيع مناسبات", "verified_required": false},
          {"id": "wedding_stylist", "name_en": "Wedding Dress Stylist", "name_ar": "منسقة فساتين زفاف", "gender": "female", "verified_required": false},
          {"id": "henna_artist", "name_en": "Henna Artist", "name_ar": "فنانة حناء", "gender": "female", "verified_required": false}
        ]
      },
      {
        "id": "entertainment",
        "name_en": "Entertainment",
        "name_ar": "ترفيه",
        "icon": "🎭",
        "jobs": [
          {"id": "children_entertainer", "name_en": "Children's Entertainer", "name_ar": "مقدم ترفيه أطفال", "verified_required": false},
          {"id": "face_painter", "name_en": "Face Painter", "name_ar": "رسام وجوه", "verified_required": false},
          {"id": "balloon_artist", "name_en": "Balloon Artist", "name_ar": "فني بالونات", "verified_required": false},
          {"id": "dj", "name_en": "DJ", "name_ar": "دي جي", "verified_required": false},
          {"id": "traditional_dancer", "name_en": "Traditional Dancer", "name_ar": "راقص فرقة شعبية", "verified_required": false},
          {"id": "live_band", "name_en": "Live Band", "name_ar": "فرقة موسيقية", "verified_required": false}
        ]
      }
    ]
  },
  {
    "id": "business_services",
    "name_en": "Business Services",
    "name_ar": "خدمات أعمال",
    "icon": "💼",
    "subcategories": [
      {
        "id": "office_support",
        "name_en": "Office & Admin Support",
        "name_ar": "دعم مكاتب",
        "icon": "📊",
        "jobs": [
          {"id": "virtual_assistant", "name_en": "Virtual Assistant", "name_ar": "مساعد افتراضي", "verified_required": false},
          {"id": "data_entry", "name_en": "Data Entry", "name_ar": "إدخال بيانات", "verified_required": false},
          {"id": "translator", "name_en": "Translator (Arabic/English)", "name_ar": "مترجم", "verified_required": true},
          {"id": "legal_documents", "name_en": "Legal Document Preparer", "name_ar": "معداد مستندات قانونية", "verified_required": true},
          {"id": "accountant", "name_en": "Accountant", "name_ar": "محاسب", "verified_required": true, "authority": "SOCPA"},
          {"id": "graphic_designer", "name_en": "Graphic Designer", "name_ar": "مصمم جرافيك", "verified_required": false},
          {"id": "web_developer", "name_en": "Web Developer", "name_ar": "مطور مواقع", "verified_required": false},
          {"id": "social_media_manager", "name_en": "Social Media Manager", "name_ar": "مدير تواصل اجتماعي", "verified_required": false}
        ]
      },
      {
        "id": "tech_support",
        "name_en": "Technical Support",
        "name_ar": "دعم تقني",
        "icon": "💻",
        "jobs": [
          {"id": "computer_technician", "name_en": "Computer Technician", "name_ar": "فني حاسوب", "verified_required": false},
          {"id": "printer_technician", "name_en": "Printer Technician", "name_ar": "فني طابعات", "verified_required": false},
          {"id": "network_installer", "name_en": "Network Installer", "name_ar": "فني شبكات", "verified_required": false},
          {"id": "cctv_installer", "name_en": "CCTV Installer", "name_ar": "فني كاميرات مراقبة", "verified_required": true},
          {"id": "smart_home", "name_en": "Smart Home Installer", "name_ar": "فني منزل ذكي", "verified_required": false},
          {"id": "pos_installer", "name_en": "POS System Installer", "name_ar": "فني نقاط بيع", "verified_required": false}
        ]
      }
    ]
  },
  {
    "id": "fashion",
    "name_en": "Fashion & Tailoring",
    "name_ar": "أزياء وخياطة",
    "icon": "👗",
    "subcategories": [
      {
        "id": "tailoring",
        "name_en": "Tailoring & Alterations",
        "name_ar": "خياطة وتفصيل",
        "icon": "🧵",
        "jobs": [
          {"id": "mens_tailor", "name_en": "Men's Tailor", "name_ar": "خياط رجالي", "gender": "male", "verified_required": false},
          {"id": "womens_tailor", "name_en": "Women's Tailor", "name_ar": "خياطة نسائية", "gender": "female", "verified_required": false},
          {"id": "thobe_tailor", "name_en": "Thobe Tailor", "name_ar": "خياط ثياب", "gender": "male", "verified_required": false},
          {"id": "abaya_designer", "name_en": "Abaya Designer", "name_ar": "مصممة عباءات", "gender": "female", "verified_required": false},
          {"id": "wedding_dress_tailor", "name_en": "Wedding Dress Tailor", "name_ar": "خياط فساتين أفراح", "gender": "female", "verified_required": false},
          {"id": "alterations", "name_en": "Alterations Specialist", "name_ar": "فني تعديل ملابس", "verified_required": false},
          {"id": "leather_worker", "name_en": "Leather Worker", "name_ar": "عامل جلود", "verified_required": false},
          {"id": "shoe_repair", "name_en": "Shoe Repairer", "name_ar": "مرمد أحذية", "verified_required": false}
        ]
      },
      {
        "id": "laundry",
        "name_en": "Laundry & Ironing",
        "name_ar": "غسيل وكي",
        "icon": "🧺",
        "jobs": [
          {"id": "laundry_service", "name_en": "Laundry Service", "name_ar": "خدمة غسيل", "verified_required": false},
          {"id": "ironing_service", "name_en": "Ironing Service", "name_ar": "كي ملابس", "verified_required": false},
          {"id": "dry_cleaning", "name_en": "Dry Cleaning Specialist", "name_ar": "تنظيف جاف", "verified_required": false},
          {"id": "carpet_curtain_clean", "name_en": "Carpet/Curtain Cleaning", "name_ar": "تنظيف سجاد وستائر", "verified_required": false}
        ]
      }
    ]
  },
  {
    "id": "pets",
    "name_en": "Pet Services",
    "name_ar": "خدمات حيوانات أليفة",
    "icon": "🐾",
    "subcategories": [
      {
        "id": "pet_care",
        "name_en": "Pet Care",
        "name_ar": "رعاية حيوانات",
        "icon": "🐕",
        "jobs": [
          {"id": "dog_walker", "name_en": "Dog Walker", "name_ar": "ممشي كلاب", "verified_required": false},
          {"id": "pet_sitter", "name_en": "Pet Sitter", "name_ar": "جليسة حيوانات", "verified_required": false},
          {"id": "pet_groomer", "name_en": "Pet Groomer", "name_ar": "حلاق حيوانات", "verified_required": false},
          {"id": "veterinarian", "name_en": "Veterinarian (Home Visit)", "name_ar": "طبيب بيطري منازل", "verified_required": true},
          {"id": "pet_trainer", "name_en": "Pet Trainer", "name_ar": "مدرب حيوانات", "verified_required": false},
          {"id": "pet_taxi", "name_en": "Pet Taxi", "name_ar": "توصيل حيوانات", "verified_required": false}
        ]
      }
    ]
  },
  {
    "id": "sports",
    "name_en": "Sports & Fitness",
    "name_ar": "رياضة ولياقة",
    "icon": "🏋️",
    "subcategories": [
      {
        "id": "personal_training",
        "name_en": "Personal Training",
        "name_ar": "تدريب شخصي",
        "icon": "💪",
        "jobs": [
          {"id": "trainer_male", "name_en": "Personal Trainer (Male)", "name_ar": "مدرب شخصي رجال", "gender": "male", "verified_required": true},
          {"id": "trainer_female", "name_en": "Personal Trainer (Female)", "name_ar": "مدربة شخصية نساء", "gender": "female", "verified_required": true},
          {"id": "yoga_instructor", "name_en": "Yoga Instructor", "name_ar": "مدرب يوغا", "verified_required": true},
          {"id": "pilates_instructor", "name_en": "Pilates Instructor", "name_ar": "مدرب بيلاتس", "verified_required": true},
          {"id": "zumba_instructor", "name_en": "Zumba Instructor", "name_ar": "مدرب زومبا", "verified_required": true},
          {"id": "crossfit_coach", "name_en": "CrossFit Coach", "name_ar": "مدرب كروس فيت", "verified_required": true},
          {"id": "running_coach", "name_en": "Running Coach", "name_ar": "مدرب جري", "verified_required": true},
          {"id": "weight_loss_coach", "name_en": "Weight Loss Coach", "name_ar": "مدرب تخسيس", "verified_required": false}
        ]
      },
      {
        "id": "outdoor",
        "name_en": "Outdoor & Recreation",
        "name_ar": "أنشطة خارجية",
        "icon": "🏔️",
        "jobs": [
          {"id": "hiking_guide", "name_en": "Hiking Guide", "name_ar": "مرشد تسلق جبلي", "verified_required": true},
          {"id": "camping_guide", "name_en": "Camping Guide", "name_ar": "مرشد تخييم", "verified_required": true},
          {"id": "diving_instructor", "name_en": "Scuba Diving Instructor", "name_ar": "مدرب غوص", "verified_required": true},
          {"id": "horseback_instructor", "name_en": "Horseback Riding Instructor", "name_ar": "مدرب فروسية", "verified_required": true},
          {"id": "tennis_coach", "name_en": "Tennis Coach", "name_ar": "مدرب تنس", "verified_required": true},
          {"id": "football_coach", "name_en": "Football Coach", "name_ar": "مدرب كرة قدم", "verified_required": true}
        ]
      }
    ]
  },
  {
    "id": "traditional",
    "name_en": "Traditional & Specialty Services",
    "name_ar": "خدمات تقليدية ومتخصصة",
    "icon": "🏺",
    "subcategories": [
      {
        "id": "traditional_crafts",
        "name_en": "Traditional Saudi Crafts",
        "name_ar": "حرف سعودية تقليدية",
        "icon": "🪔",
        "jobs": [
          {"id": "sadu_weaver", "name_en": "Sadu Weaver", "name_ar": "حائك سدو", "verified_required": false},
          {"id": "pottery_maker", "name_en": "Pottery Maker", "name_ar": "صانع فخار", "verified_required": false},
          {"id": "palm_weaver", "name_en": "Palm Frond Weaver", "name_ar": "خوص النخيل", "verified_required": false},
          {"id": "coffee_maker", "name_en": "Coffee Maker (Arabic Coffee)", "name_ar": "قهوجي", "verified_required": false},
          {"id": "perfumer", "name_en": "Oud/Oil Perfumer", "name_ar": "عطار", "verified_required": false},
          {"id": "traditional_henna", "name_en": "Henna Artist (Traditional)", "name_ar": "فنانة حناء تراثية", "gender": "female", "verified_required": false}
        ]
      },
      {
        "id": "religious",
        "name_en": "Religious Services",
        "name_ar": "خدمات دينية",
        "icon": "🕋",
        "jobs": [
          {"id": "quran_reciter", "name_en": "Quran Reciter", "name_ar": "قارئ قرآن", "verified_required": true},
          {"id": "adhan_caller", "name_en": "Adhan Caller", "name_ar": "مؤذن", "verified_required": true},
          {"id": "islamic_speaker", "name_en": "Islamic Speaker", "name_ar": "متحدث إسلامي", "verified_required": true},
          {"id": "umrah_guide", "name_en": "Umrah Guide", "name_ar": "مرشد عمرة", "verified_required": true}
        ]
      }
    ]
  }
];