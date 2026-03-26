export type Locale = "en" | "hi" | "gu" | "ta" | "mr" | "te";
export const defaultLocale: Locale = "en";

export const supportedLocales = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "gu", label: "ગુજરાતી" },
  { value: "ta", label: "தமிழ்" },
  { value: "mr", label: "मराठी" },
  { value: "te", label: "తెలుగు" },
] as const satisfies ReadonlyArray<{ value: Locale; label: string }>;

interface TranslationSchema {
  language: {
    label: string;
  };
  common: {
    loading: string;
    validationError: string;
  };
  hero: {
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    cards: {
      soilMoisture: {
        title: string;
        warning: string;
        success: string;
      };
      irrigation: {
        title: string;
        active: string;
        inactive: string;
        descriptionActive: string;
        descriptionInactive: string;
      };
      fertilizer: {
        title: string;
        value: string;
        description: string;
      };
      soundSystem: {
        title: string;
        armed: string;
        disarmed: string;
        monitoring: string;
        alert: string;
      };
      fireDetection: {
        title: string;
        alert: string;
        normal: string;
        descriptionAlert: string;
        descriptionNormal: string;
      };
      systemHealth: {
        title: string;
        value: string;
        description: string;
      };
    };
  };
  controlPanel: {
    title: string;
    description: string;
    autoIrrigationTitle: string;
    autoIrrigationDescription: string;
    soundSystemTitle: string;
    soundSystemDescription: string;
    quickActions: string;
    startIrrigation: string;
    testAnimal: string;
    testFire: string;
  };
  alerts: {
    animalToastTitle: string;
    animalToastDescription: string;
    animalBannerTitle: string;
    animalBannerDescription: string;
    fireToastTitle: string;
    fireToastDescription: string;
    fireBannerTitle: string;
    fireBannerDescription: string;
    fieldClear: string;
  };
  auth: {
    brandTitle: string;
    brandSubtitle: string;
    welcomeTitle: string;
    welcomeDescription: string;
    tabs: {
      signIn: string;
      signUp: string;
    };
    emailLabel: string;
    passwordLabel: string;
    passwordHint: string;
    signInButton: string;
    signInLoading: string;
    signUpButton: string;
    signUpLoading: string;
    validationTitle: string;
    signUpErrorTitle: string;
    signUpSuccessTitle: string;
    signUpSuccessDescription: string;
    signInErrorTitle: string;
  };
  settings: {
    title: string;
    subtitle: string;
    accountInfoTitle: string;
    accountInfoDescription: string;
    emailLabel: string;
    emailHelper: string;
    accountIdLabel: string;
    securityTitle: string;
    securityDescription: string;
    newPasswordLabel: string;
    confirmPasswordLabel: string;
    passwordHelper: string;
    updatePassword: string;
    updatingPassword: string;
    errorTitle: string;
    successTitle: string;
    successDescription: string;
    mismatchDescription: string;
    lengthDescription: string;
    systemConfigTitle: string;
    systemConfigDescription: string;
    irrigationThresholdLabel: string;
    irrigationThresholdHelper: string;
    alertMethodLabel: string;
    alertMethodEmailApp: string;
    alertMethodEmail: string;
    alertMethodApp: string;
    saveConfiguration: string;
    locationTitle: string;
    locationDescription: string;
    cityLabel: string;
    stateLabel: string;
    pincodeLabel: string;
    saveLocation: string;
    locationSaved: string;
  };
  cropPrediction: {
    title: string;
    subtitle: string;
    formTitle: string;
    formDescription: string;
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    temperature: string;
    humidity: string;
    ph: string;
    rainfall: string;
    predictButton: string;
    predicting: string;
    resultTitle: string;
    recommendedCrop: string;
    successTitle: string;
    successDescription: string;
    season: string;
    soilType: string;
    soilMoisture: string;
    windSpeed: string;
  };
  crops: {
    rice: string;
    wheat: string;
    watermelon: string;
    cucumber: string;
    cotton: string;
    maize: string;
    millets: string;
    sugarcane: string;
    banana: string;
    grapes: string;
    coconut: string;
  };
  sidebar: {
    navigation: string;
    dashboard: string;
    settings: string;

    logout: string;
    logoutErrorTitle: string;
    logoutErrorDescription: string;
  };
  notFound: {
    title: string;
    description: string;
    cta: string;
  };
}

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends string ? string : RecursivePartial<T[P]>;
};

const cloneTranslation = (source: TranslationSchema): TranslationSchema =>
  JSON.parse(JSON.stringify(source)) as TranslationSchema;

const applyOverrides = (target: any, overrides?: RecursivePartial<TranslationSchema> | any): void => {
  if (!overrides) return;
  Object.entries(overrides).forEach(([key, value]) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      target[key] = target[key] ?? {};
      applyOverrides(target[key], value);
    } else {
      target[key] = value;
    }
  });
};

const buildTranslation = (overrides?: RecursivePartial<TranslationSchema>): TranslationSchema => {
  const cloned = cloneTranslation(baseTranslation);
  applyOverrides(cloned, overrides);
  return cloned;
};

const baseTranslation: TranslationSchema = {
  language: {
    label: "Language",
  },
  common: {
    loading: "Loading...",
    validationError: "Validation Error",
  },
  hero: {
    title: "Our Farm",
    description:
      "Advanced agricultural monitoring with automatic irrigation, fertilizer insights, deterrent sound defenses, and fire detection.",
    primaryCta: "Get Started",
    secondaryCta: "Learn More",
  },
  dashboard: {
    title: "Our Farm Dashboard",
    subtitle: "Real-time monitoring and control system",
    cards: {
      soilMoisture: {
        title: "Soil Moisture",
        warning: "Irrigation needed",
        success: "Optimal level",
      },
      irrigation: {
        title: "Irrigation Status",
        active: "Active",
        inactive: "Inactive",
        descriptionActive: "Automatic mode",
        descriptionInactive: "Manual mode",
      },
      fertilizer: {
        title: "Fertilizer Status",
        value: "NPK 20-20-20",
        description: "Optimal for current crop",
      },
      soundSystem: {
        title: "Sound System",
        armed: "Armed",
        disarmed: "Disarmed",
        monitoring: "Monitoring...",
        alert: "Animal detected!",
      },
      fireDetection: {
        title: "Fire Detection",
        alert: "ALERT",
        normal: "Normal",
        descriptionAlert: "SOS - Activate irrigation!",
        descriptionNormal: "No fire detected",
      },
      systemHealth: {
        title: "System Health",
        value: "100%",
        description: "All systems operational",
      },
    },
  },
  controlPanel: {
    title: "Control Panel",
    description: "Manage your irrigation system settings",
    autoIrrigationTitle: "Automatic Irrigation",
    autoIrrigationDescription: "Enable AI-powered water management",
    soundSystemTitle: "Sound Deterrent System",
    soundSystemDescription: "Protect crops from animals",
    quickActions: "Quick Actions",
    startIrrigation: "Start Irrigation",
    testAnimal: "Test Animal Alert",
    testFire: "Test Fire Alert",
  },
  alerts: {
    animalToastTitle: "Animal Detected!",
    animalToastDescription: "Sound deterrent system activated",
    animalBannerTitle: "Animal Detection Active",
    animalBannerDescription: "Sound deterrent system is protecting your crops.",
    fireToastTitle: "FIRE ALERT - SOS",
    fireToastDescription: "Immediate action required! Activate irrigation now.",
    fireBannerTitle: "FIRE DETECTED - EMERGENCY",
    fireBannerDescription: "Fire spark detected due to dry winds. Activate irrigation immediately!",
    fieldClear: "Field is clear. Monitoring movement...",
  },
  auth: {
    brandTitle: "Our Farm",
    brandSubtitle: "Advanced agricultural monitoring",
    welcomeTitle: "Welcome",
    welcomeDescription: "Sign in to access your farm dashboard",
    tabs: {
      signIn: "Sign In",
      signUp: "Sign Up",
    },
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordHint: "Password must be at least 6 characters",
    signInButton: "Sign In",
    signInLoading: "Signing in...",
    signUpButton: "Create Account",
    signUpLoading: "Creating account...",
    validationTitle: "Validation Error",
    signUpErrorTitle: "Sign Up Error",
    signUpSuccessTitle: "Success!",
    signUpSuccessDescription: "Account created successfully. You can now sign in.",
    signInErrorTitle: "Sign In Error",
  },
  settings: {
    title: "Settings",
    subtitle: "Manage your account settings and preferences",
    accountInfoTitle: "Account Information",
    accountInfoDescription: "Your account details and email",
    emailLabel: "Email Address",
    emailHelper: "Your email address is used for authentication",
    accountIdLabel: "Account ID",
    securityTitle: "Security",
    securityDescription: "Update your password",
    newPasswordLabel: "New Password",
    confirmPasswordLabel: "Confirm New Password",
    passwordHelper: "Password must be at least 6 characters",
    updatePassword: "Update Password",
    updatingPassword: "Updating...",
    errorTitle: "Error",
    successTitle: "Success",
    successDescription: "Password updated successfully",
    mismatchDescription: "Passwords do not match",
    lengthDescription: "Password must be at least 6 characters",
    systemConfigTitle: "System Configuration",
    systemConfigDescription: "Farm monitoring system settings",
    irrigationThresholdLabel: "Irrigation Threshold",
    irrigationThresholdHelper: "Soil moisture percentage below which irrigation activates",
    alertMethodLabel: "Alert Notification Method",
    alertMethodEmailApp: "Email & In-App",
    alertMethodEmail: "Email Only",
    alertMethodApp: "In-App Only",
    saveConfiguration: "Save Configuration",
    locationTitle: "Location Settings",
    locationDescription: "Set your farm's physical location",
    cityLabel: "City / Village",
    stateLabel: "State",
    pincodeLabel: "Pincode",
    saveLocation: "Save Location",
    locationSaved: "Location saved successfully",
  },
  cropPrediction: {
    title: "Crop Prediction",
    subtitle: "AI-based recommendations for your soil conditions",
    formTitle: "Soil & Environment Data",
    formDescription: "Enter the details below to get a crop recommendation",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    temperature: "Temperature (°C)",
    humidity: "Humidity (%)",
    ph: "Soil pH",
    rainfall: "Rainfall (mm)",
    predictButton: "Predict Crop",
    predicting: "Analyzing...",
    resultTitle: "Recommendation",
    recommendedCrop: "Best crop for you:",
    successTitle: "Analysis Complete",
    successDescription: "Here is the best crop recommendation for your farm.",
    season: "Season",
    soilType: "Soil Type",
    soilMoisture: "Soil Moisture (%)",
    windSpeed: "Wind Speed (km/h)",
  },
  crops: {
    rice: "Rice",
    wheat: "Wheat",
    watermelon: "Watermelon",
    cucumber: "Cucumber",
    cotton: "Cotton",
    maize: "Maize",
    millets: "Millets",
    sugarcane: "Sugarcane",
    banana: "Banana",
    grapes: "Grapes",
    coconut: "Coconut",
  },
  sidebar: {

    navigation: "Navigation",
    dashboard: "Dashboard",
    settings: "Settings",
    logout: "Logout",
    logoutErrorTitle: "Error",
    logoutErrorDescription: "Failed to sign out. Please try again.",
  },
  notFound: {
    title: "Oops! Page not found",
    description: "The page you're looking for does not exist.",
    cta: "Return to Home",
  },
};

export const translations: Record<Locale, TranslationSchema> = {
  en: baseTranslation,
  hi: buildTranslation({
    language: { label: "भाषा" },
    common: { loading: "लोड हो रहा है...", validationError: "मान्यकरण त्रुटि" },
    hero: {
      title: "स्मार्ट सिंचाई प्रणाली",
      description:
        "स्वचालित सिंचाई, उर्वरक विश्लेषण, ध्वनि आधारित सुरक्षा और आग पहचान के साथ उन्नत कृषि मॉनिटरिंग।",
      primaryCta: "शुरू करें",
      secondaryCta: "और जानें",
    },
    dashboard: {
      title: "खेत डैशबोर्ड",
      subtitle: "रीयल-टाइम मॉनिटरिंग और नियंत्रण प्रणाली",
      cards: {
        soilMoisture: { title: "मृदा नमी", warning: "सिंचाई की आवश्यकता", success: "उत्तम स्तर" },
        irrigation: {
          title: "सिंचाई की स्थिति",
          active: "सक्रिय",
          inactive: "निष्क्रिय",
          descriptionActive: "स्वचालित मोड",
          descriptionInactive: "मैन्युअल मोड",
        },
        fertilizer: { title: "उर्वरक स्थिति", value: "एनपीके 20-20-20", description: "वर्तमान फसल के लिए उपयुक्त" },
        soundSystem: {
          title: "ध्वनि प्रणाली",
          armed: "सक्रिय",
          disarmed: "निष्क्रिय",
          monitoring: "मॉनिटरिंग...",
          alert: "जानवर का पता चला!",
        },
        fireDetection: {
          title: "आग का पता लगाना",
          alert: "चेतावनी",
          normal: "सामान्य",
          descriptionAlert: "SOS - तुरंत सिंचाई चालू करें!",
          descriptionNormal: "कोई आग नहीं मिली",
        },
        systemHealth: { title: "सिस्टम हेल्थ", value: "100%", description: "सभी सिस्टम चालू" },
      },
    },
    controlPanel: {
      title: "नियंत्रण पैनल",
      description: "अपने सिंचाई सेटिंग्स प्रबंधित करें",
      autoIrrigationTitle: "स्वचालित सिंचाई",
      autoIrrigationDescription: "एआई आधारित जल प्रबंधन सक्षम करें",
      soundSystemTitle: "ध्वनि निरोधक प्रणाली",
      soundSystemDescription: "फसलों को जानवरों से बचाएं",
      quickActions: "त्वरित क्रियाएं",
      startIrrigation: "सिंचाई शुरू करें",
      testAnimal: "जानवर अलार्म परीक्षण",
      testFire: "आग अलार्म परीक्षण",
    },
    alerts: {
      animalToastTitle: "जानवर का पता चला!",
      animalToastDescription: "ध्वनि रक्षा प्रणाली सक्रिय",
      animalBannerTitle: "जानवर निगरानी सक्रिय",
      animalBannerDescription: "ध्वनि प्रणाली आपकी फसल की रक्षा कर रही है।",
      fireToastTitle: "आग अलर्ट - SOS",
      fireToastDescription: "तुरंत कार्रवाई करें! सिंचाई चालू करें।",
      fireBannerTitle: "आग का पता चला - आपातकाल",
      fireBannerDescription: "सूखी हवाओं से चिंगारी मिली। तुरंत पानी चलाएं!",
      fieldClear: "क्षेत्र सुरक्षित है। गति पर नजर है...",
    },
    auth: {
      brandTitle: "स्मार्ट सिंचाई प्रणाली",
      brandSubtitle: "उन्नत कृषि मॉनिटरिंग",
      welcomeTitle: "स्वागत है",
      welcomeDescription: "अपने खेत के डैशबोर्ड में लॉगिन करें",
      tabs: { signIn: "लॉगिन", signUp: "खाता बनाएं" },
      emailLabel: "ईमेल",
      passwordLabel: "पासवर्ड",
      passwordHint: "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए",
      signInButton: "लॉगिन",
      signInLoading: "लॉगिन हो रहा है...",
      signUpButton: "खाता बनाएं",
      signUpLoading: "खाता बनाया जा रहा है...",
      validationTitle: "मान्यकरण त्रुटि",
      signUpErrorTitle: "खाता बनाने में त्रुटि",
      signUpSuccessTitle: "सफलता!",
      signUpSuccessDescription: "खाता बन गया है। अब आप लॉगिन कर सकते हैं।",
      signInErrorTitle: "लॉगिन त्रुटि",
    },
    settings: {
      title: "सेटिंग्स",
      subtitle: "अपनी खाता प्राथमिकताएं प्रबंधित करें",
      accountInfoTitle: "खाता जानकारी",
      accountInfoDescription: "आपके विवरण और ईमेल",
      emailLabel: "ईमेल पता",
      emailHelper: "प्रमाणीकरण के लिए इस्तेमाल होता है",
      accountIdLabel: "खाता आईडी",
      securityTitle: "सुरक्षा",
      securityDescription: "अपना पासवर्ड अपडेट करें",
      newPasswordLabel: "नया पासवर्ड",
      confirmPasswordLabel: "पासवर्ड पुष्टि करें",
      passwordHelper: "पासवर्ड कम से कम 6 अक्षरों का हो",
      updatePassword: "पासवर्ड अपडेट करें",
      updatingPassword: "अपडेट हो रहा है...",
      errorTitle: "त्रुटि",
      successTitle: "सफलता",
      successDescription: "पासवर्ड सफलतापूर्वक अपडेट हुआ",
      mismatchDescription: "पासवर्ड मेल नहीं खाते",
      lengthDescription: "पासवर्ड कम से कम 6 अक्षरों का हो",
      systemConfigTitle: "सिस्टम कॉन्फ़िगरेशन",
      systemConfigDescription: "फार्म मॉनिटरिंग सेटिंग्स",
      irrigationThresholdLabel: "सिंचाई थ्रेशहोल्ड",
      irrigationThresholdHelper: "जिस नमी पर सिंचाई सक्रिय हो",
      alertMethodLabel: "अलर्ट विधि",
      alertMethodEmailApp: "ईमेल और ऐप",
      alertMethodEmail: "केवल ईमेल",
      alertMethodApp: "केवल ऐप",
      saveConfiguration: "कॉन्फ़िगरेशन सहेजें",
      locationTitle: "स्थान सेटिंग्स",
      locationDescription: "अपने खेत का स्थान निर्धारित करें",
      cityLabel: "शहर / गाँव",
      stateLabel: "राज्य",
      pincodeLabel: "पिन कोड",
      saveLocation: "स्थान सहेजें",
      locationSaved: "स्थान सफलतापूर्वक सहेजा गया",
    },
    cropPrediction: {
      title: "फसल भविष्यवाणी",
      subtitle: "आपकी मिट्टी की स्थिति के लिए एआई-आधारित सिफारिशें",
      formTitle: "मिट्टी और पर्यावरण डेटा",
      formDescription: "फसल की सिफारिश प्राप्त करने के लिए विवरण दर्ज करें",
      nitrogen: "नाइट्रोजन (N)",
      phosphorus: "फास्फोरस (P)",
      potassium: "पोटेशियम (K)",
      temperature: "तापमान (°C)",
      humidity: "नमी (%)",
      ph: "मिट्टी का पीएच",
      rainfall: "वर्षा (mm)",
      predictButton: "फसल की भविष्यवाणी करें",
      predicting: "विश्लेषण हो रहा है...",
      resultTitle: "सिफारिश",
      recommendedCrop: "आपके लिए सर्वोत्तम फसल:",
      successTitle: "विश्लेषण पूर्ण",
      successDescription: "ये है आपके खेत के लिए सर्वोत्तम फसल।",
      season: "ऋतु (मौसम)",
      soilType: "मिट्टी का प्रकार",
      soilMoisture: "मिट्टी की नमी (%)",
      windSpeed: "हवा की गति (km/h)",
    },
    crops: {
      rice: "चावल",
      wheat: "गेहूं",
      watermelon: "तरबूज",
      cucumber: "खीरा",
      cotton: "कपास",
      maize: "मक्का",
      millets: "बाजरा",
      sugarcane: "गन्ना",
      banana: "केला",
      grapes: "अंगूर",
      coconut: "नारियल",
    },
    sidebar: {

      navigation: "नेविगेशन",
      dashboard: "डैशबोर्ड",
      settings: "सेटिंग्स",
      logout: "लॉगआउट",
      logoutErrorTitle: "त्रुटि",
      logoutErrorDescription: "लॉगआउट विफल। फिर से प्रयास करें।",
    },
    notFound: {
      title: "उफ़! पेज नहीं मिला",
      description: "जिस पृष्ठ की तलाश है वह उपलब्ध नहीं है।",
      cta: "मुख्य पृष्ठ पर जाएं",
    },
  }),
  gu: buildTranslation({
    language: { label: "ભાષા" },
    common: { loading: "લોડ થઈ રહ્યું છે...", validationError: "માન્યકરણ ભૂલ" },
    hero: {
      title: "સ્માર્ટ સિંચાઈ સિસ્ટમ",
      description:
        "સ્વચાલિત સિંચાઈ, ખાતરની જાણકારી, અવાજ આધારિત સુરક્ષા અને આગ શોધ સાથેનું અદ્યતન કૃષિ મોનીટરીંગ.",
      primaryCta: "શરૂ કરો",
      secondaryCta: "વધુ જાણો",
    },
    dashboard: {
      title: "ખેતર ડેશબોર્ડ",
      subtitle: "રિયલ-ટાઈમ મોનીટરીંગ અને નિયંત્રણ સિસ્ટમ",
      cards: {
        soilMoisture: { title: "માટી ભેજ", warning: "સિંચાઈની જરૂર", success: "આદર્શ સ્તર" },
        irrigation: {
          title: "સિંચાઈની સ્થિતિ",
          active: "સક્રિય",
          inactive: "નિષ્ક્રિય",
          descriptionActive: "સ્વચાલિત સ્થિતિ",
          descriptionInactive: "મેન્યુઅલ સ્થિતિ",
        },
        fertilizer: { title: "ખાતરની સ્થિતિ", value: "એનપિકે 20-20-20", description: "હાલની પાક માટે યોગ્ય" },
        soundSystem: {
          title: "અવાજ સિસ્ટમ",
          armed: "સક્રિય",
          disarmed: "નિષ્ક્રિય",
          monitoring: "મોનીટરીંગ...",
          alert: "પ્રાણી શોધાયું!",
        },
        fireDetection: {
          title: "આગ શોધ",
          alert: "ચેતવણી",
          normal: "સામાન્ય",
          descriptionAlert: "SOS - તરત જ સિંચાઈ શરૂ કરો!",
          descriptionNormal: "કોઈ આગ મળી નથી",
        },
        systemHealth: { title: "સિસ્ટમ સ્વાસ્થ્ય", value: "100%", description: "બધા સિસ્ટમ કાર્યરત" },
      },
    },
    controlPanel: {
      title: "કંટ્રોલ પેનલ",
      description: "તમારા સિંચાઈ સેટિંગ્સ મેનેજ કરો",
      autoIrrigationTitle: "સ્વચાલિત સિંચાઈ",
      autoIrrigationDescription: "AI આધારિત પાણી મેનેજમેન્ટ",
      soundSystemTitle: "અવાજ નિરોધક સિસ્ટમ",
      soundSystemDescription: "પાકને પ્રાણીઓથી સુરક્ષિત કરો",
      quickActions: "ઝડપી ક્રિયાઓ",
      startIrrigation: "સિંચાઈ શરૂ કરો",
      testAnimal: "પ્રાણી એલર્ટ ચકાસો",
      testFire: "આગ એલર્ટ ચકાસો",
    },
    alerts: {
      animalToastTitle: "પ્રાણી મળ્યું!",
      animalToastDescription: "અવાજ સુરક્ષા સક્રિય",
      animalBannerTitle: "પ્રાણી મોનીટરીંગ સક્રિય",
      animalBannerDescription: "અવાજ સિસ્ટમ પાકને રક્ષા કરે છે.",
      fireToastTitle: "આગ ચેતવણી - SOS",
      fireToastDescription: "તરત પગલાં લો! પાણી ચાલુ કરો.",
      fireBannerTitle: "આગ મળી - આપાતકાલીન",
      fireBannerDescription: "સૂકાં પવનથી ચીંગારી મળી. તરત સિંચાઈ કરો!",
      fieldClear: "ખેતર સુરક્ષિત છે. ગતિ પર નજર છે...",
    },
    auth: {
      brandTitle: "સ્માર્ટ સિંચાઈ સિસ્ટમ",
      brandSubtitle: "અદ્યતન કૃષિ મોનીટરીંગ",
      welcomeTitle: "સ્વાગત છે",
      welcomeDescription: "તમારા ડેશબોર્ડમાં પ્રવેશ કરો",
      tabs: { signIn: "સાઇન ઇન", signUp: "એકાઉન્ટ બનાવો" },
      emailLabel: "ઈમેલ",
      passwordLabel: "પાસવર્ડ",
      passwordHint: "પાસવર્ડ ઓછામાં ઓછા 6 અક્ષરોનો હોવું જોઈએ",
      signInButton: "સાઇન ઇન",
      signInLoading: "લૉગિન થઈ રહ્યું છે...",
      signUpButton: "એકાઉન્ટ બનાવો",
      signUpLoading: "એકાઉન્ટ બન્યું છે...",
      validationTitle: "માન્યકરણ ભૂલ",
      signUpErrorTitle: "એકાઉન્ટ બનાવવામાં ભૂલ",
      signUpSuccessTitle: "સફળતા!",
      signUpSuccessDescription: "એકાઉન્ટ બની ગયું. હવે સાઇન ઇન કરો.",
      signInErrorTitle: "સાઇન ઇન ભૂલ",
    },
    settings: {
      title: "સેટિંગ્સ",
      subtitle: "તમારા એકાઉન્ટ સેટિંગ્સ મેનેજ કરો",
      accountInfoTitle: "એકાઉન્ટ માહિતી",
      accountInfoDescription: "તમારો ઇમેલ અને વિગતો",
      emailLabel: "ઈમેલ સરનામું",
      emailHelper: "પ્રમાણીકરણ માટે વપરાય છે",
      accountIdLabel: "એકાઉન્ટ આઈડી",
      securityTitle: "સુરક્ષા",
      securityDescription: "પાસવર્ડ અપડેટ કરો",
      newPasswordLabel: "નવો પાસવર્ડ",
      confirmPasswordLabel: "પાસવર્ડ પુષ્ટિ કરો",
      passwordHelper: "પાસવર્ડ ઓછામાં ઓછા 6 અક્ષરોનો હોવો જોઈએ",
      updatePassword: "પાસવર્ડ અપડેટ કરો",
      updatingPassword: "અપડેટ થઈ રહ્યું છે...",
      errorTitle: "ભૂલ",
      successTitle: "સફળતા",
      successDescription: "પાસવર્ડ સફળતાપૂર્વક બદલાયો",
      mismatchDescription: "પાસવર્ડ મેળ ખાતા નથી",
      lengthDescription: "પાસવર્ડ ઓછામાં ઓછા 6 અક્ષરોનો હોવો જોઈએ",
      systemConfigTitle: "સિસ્ટમ રૂપરેખા",
      systemConfigDescription: "ફાર્મ મોનીટરીંગ સેટિંગ્સ",
      irrigationThresholdLabel: "સિંચાઈ થ્રેશહોલ્ડ",
      irrigationThresholdHelper: "આટલી ભેજથી નીચે સિંચાઈ શરૂ થાય",
      alertMethodLabel: "અલર્ટ પદ્ધતિ",
      alertMethodEmailApp: "ઈમેલ અને એપ",
      alertMethodEmail: "માત્ર ઈમેલ",
      alertMethodApp: "માત્ર એપ",
      saveConfiguration: "સેટિંગ્સ સાચવો",
      locationTitle: "સ્થાન સેટિંગ્સ",
      locationDescription: "તમારા ખેતરનું સ્થાન સેટ કરો",
      cityLabel: "શહેર / ગામ",
      stateLabel: "રાજ્ય",
      pincodeLabel: "પીન કોડ",
      saveLocation: "સ્થાન સાચવો",
      locationSaved: "સ્થાન સફળતાપૂર્વક સાચવ્યું",
    },
    cropPrediction: {
      title: "પાક આગાહી",
      subtitle: "તમારી જમીનની સ્થિતિ માટે AI આધારિત ભલામણો",
      formTitle: "જમીન અને પર્યાવરણ ડેટા",
      formDescription: "પાકની ભલામણ મેળવવા માટે વિગતો દાખલ કરો",
      nitrogen: "નાઇટ્રોજન (N)",
      phosphorus: "ફોસ્ફરસ (P)",
      potassium: "પોટેશિયમ (K)",
      temperature: "તાપમાન (°C)",
      humidity: "ભેજ (%)",
      ph: "જમીન pH",
      rainfall: "વરસાદ (mm)",
      predictButton: "પાક આગાહી કરો",
      predicting: "વિશ્લેષણ થઈ રહ્યું છે...",
      resultTitle: "ભલામણ",
      recommendedCrop: "તમારા માટે શ્રેષ્ઠ પાક:",
      successTitle: "વિશ્લેષણ પૂર્ણ",
      successDescription: "તમારા ખેતર માટે શ્રેષ્ઠ પાક ભલામણ અહીં છે.",
      season: "ઋતુ (સીઝન)",
      soilType: "જમીનનો પ્રકાર",
      soilMoisture: "જમીનની ભેજ (%)",
      windSpeed: "પવનની ગતિ (km/h)",
    },
    sidebar: {

      navigation: "નેવિગેશન",
      dashboard: "ડેશબોર્ડ",
      settings: "સેટિંગ્સ",
      logout: "લૉગઆઉટ",
      logoutErrorTitle: "ભૂલ",
      logoutErrorDescription: "લૉગઆઉટ નિષ્ફળ. ફરી પ્રયાસ કરો.",
    },
    notFound: {
      title: "અરે! પાનું મળ્યું નથી",
      description: "તમે શોધી રહ્યા છો તે પાનું ઉપલબ્ધ નથી.",
      cta: "ઘરે પરત જાઓ",
    },
  }),
  ta: buildTranslation({
    language: { label: "மொழி" },
    common: { loading: "ஏற்றப்படுகிறது...", validationError: "சரிபார்ப்பு பிழை" },
    hero: {
      title: "ஸ்மார்ட் பாசன அமைப்பு",
      description:
        "தானியங்கி பாசனம், உர பரிந்துரைகள், ஒலி பாதுகாப்பு மற்றும் தீ கண்டறிதல் ஆகியவற்றைக் கொண்ட மேம்பட்ட வேளாண் கண்காணிப்பு.",
      primaryCta: "தொடங்கு",
      secondaryCta: "மேலும் அறிக",
    },
    dashboard: {
      title: "பண்ணை டாஷ்போர்டு",
      subtitle: "உடனடி கண்காணிப்பு மற்றும் கட்டுப்பாடு",
      cards: {
        soilMoisture: { title: "மண் ஈரப்பதம்", warning: "பாசனம் தேவை", success: "சிறந்த நிலை" },
        irrigation: {
          title: "பாசன நிலை",
          active: "செயலில்",
          inactive: "செயலற்றது",
          descriptionActive: "தானியங்கி பயன்முறை",
          descriptionInactive: "கைமுறை பயன்முறை",
        },
        fertilizer: { title: "உர நிலை", value: "என்.பி.கே 20-20-20", description: "தற்போதைய பயிருக்கு ஏற்றது" },
        soundSystem: {
          title: "ஒலி அமைப்பு",
          armed: "செயலில்",
          disarmed: "செயலற்றது",
          monitoring: "கண்காணிக்கிறது...",
          alert: "விலங்கு கண்டறியப்பட்டது!",
        },
        fireDetection: {
          title: "தீ கண்டறிதல்",
          alert: "எச்சரிக்கை",
          normal: "இயல்பு",
          descriptionAlert: "SOS - உடனே பாசனம் இயக்கவும்!",
          descriptionNormal: "தீ கண்டறியப்படவில்லை",
        },
        systemHealth: { title: "அமைப்பு நலம்", value: "100%", description: "அனைத்து அமைப்பும் செயலில்" },
      },
    },
    controlPanel: {
      title: "கட்டுப்பாட்டு பலகம்",
      description: "உங்கள் பாசன அமைப்பை நிர்வகிக்கவும்",
      autoIrrigationTitle: "தானியங்கி பாசனம்",
      autoIrrigationDescription: "AI தண்ணீர் மேலாண்மை",
      soundSystemTitle: "ஒலி தடுப்பு அமைப்பு",
      soundSystemDescription: "விலங்குகளிலிருந்து பயிரை பாதுகாக்கவும்",
      quickActions: "விரைவு நடவடிக்கைகள்",
      startIrrigation: "பாசனம் தொடங்கு",
      testAnimal: "விலங்கு எச்சரிக்கை சோதனை",
      testFire: "தீ எச்சரிக்கை சோதனை",
    },
    alerts: {
      animalToastTitle: "விலங்கு கண்டறியப்பட்டது!",
      animalToastDescription: "ஒலி பாதுகாப்பு இயக்கப்பட்டது",
      animalBannerTitle: "விலங்கு கண்காணிப்பு செயலில்",
      animalBannerDescription: "ஒலி அமைப்பு பயிரை காப்பாற்றுகிறது.",
      fireToastTitle: "தீ எச்சரிக்கை - SOS",
      fireToastDescription: "உடனடி நடவடிக்கை தேவை! பாசனம் தொடங்கவும்.",
      fireBannerTitle: "தீ கண்டறியப்பட்டது - அவசரம்",
      fireBannerDescription: "வறண்ட காற்றால் இமிலி ஏற்பட்டது. உடனே தண்ணீர் விடுங்கள்!",
      fieldClear: "புலம் பாதுகாப்பாக உள்ளது. நகர்வை கண்காணிக்கப்படுகிறது...",
    },
    auth: {
      brandTitle: "ஸ்மார்ட் பாசன அமைப்பு",
      brandSubtitle: "மேம்பட்ட வேளாண் கண்காணிப்பு",
      welcomeTitle: "வரவேற்பு",
      welcomeDescription: "பண்ணை டாஷ்போர்டுக்கு உள்நுழைக",
      tabs: { signIn: "உள்நுழை", signUp: "கணக்கு உருவாக்கு" },
      emailLabel: "மின்னஞ்சல்",
      passwordLabel: "கடவுச்சொல்",
      passwordHint: "கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்",
      signInButton: "உள்நுழை",
      signInLoading: "உள்நுழைந்து கொண்டு...",
      signUpButton: "கணக்கு உருவாக்கு",
      signUpLoading: "கணக்கு உருவாக்கப்படுகிறது...",
      validationTitle: "சரிபார்ப்பு பிழை",
      signUpErrorTitle: "கணக்கு உருவாக்க பிழை",
      signUpSuccessTitle: "வெற்றி!",
      signUpSuccessDescription: "கணக்கு உருவானது. இப்போது உள்நுழை.",
      signInErrorTitle: "உள்நுழை பிழை",
    },
    settings: {
      title: "அமைப்புகள்",
      subtitle: "உங்கள் கணக்கும் விருப்பங்களும்",
      accountInfoTitle: "கணக்கு தகவல்",
      accountInfoDescription: "உங்கள் விவரங்கள் மற்றும் மின்னஞ்சல்",
      emailLabel: "மின்னஞ்சல் முகவரி",
      emailHelper: "அடையாளத்திற்கு பயன்படுத்தப்படுகிறது",
      accountIdLabel: "கணக்கு ஐடி",
      securityTitle: "பாதுகாப்பு",
      securityDescription: "கடவுச்சொல்லை புதுப்பிக்கவும்",
      newPasswordLabel: "புதிய கடவுச்சொல்",
      confirmPasswordLabel: "புதிய கடவுச்சொல் உறுதிப்படுத்து",
      passwordHelper: "குறைந்தது 6 எழுத்துகள் தேவை",
      updatePassword: "கடவுச்சொல் புதுப்பி",
      updatingPassword: "புதுப்பித்து வருகிறது...",
      errorTitle: "பிழை",
      successTitle: "வெற்றி",
      successDescription: "கடவுச்சொல் வெற்றிகரமாக புதுப்பிக்கப்பட்டது",
      mismatchDescription: "கடவுச்சொற்கள் பொருந்தவில்லை",
      lengthDescription: "6 எழுத்துகளுக்கு குறையக்கூடாது",
      systemConfigTitle: "அமைப்பு உள்ளமைவு",
      systemConfigDescription: "பண்ணை கண்காணிப்பு அமைப்புகள்",
      irrigationThresholdLabel: "பாசன வரம்பு",
      irrigationThresholdHelper: "இதற்குக் கீழே ஈரப்பதம் இருந்தால் பாசனம் இயங்கும்",
      alertMethodLabel: "அறிவிப்பு முறை",
      alertMethodEmailApp: "மின்னஞ்சல் & பயன்பாடு",
      alertMethodEmail: "மின்னஞ்சல் மட்டும்",
      alertMethodApp: "பயன்பாடு மட்டும்",
      saveConfiguration: "அமைப்புகளை சேமி",
    },
    sidebar: {
      navigation: "வழிசெலுத்தல்",
      dashboard: "டாஷ்போர்டு",
      settings: "அமைப்புகள்",
      logout: "வெளியேறு",
      logoutErrorTitle: "பிழை",
      logoutErrorDescription: "வெளியேற முடியவில்லை. மீண்டும் முயற்சி செய்க.",
    },
    notFound: {
      title: "அப்பா! பக்கம் கிடைக்கவில்லை",
      description: "நீங்கள் தேடும் பக்கம் இல்லை.",
      cta: "முகப்புக்கு செல்",
    },
  }),
  mr: buildTranslation({
    language: { label: "भाषा" },
    common: { loading: "लोड होत आहे...", validationError: "प्रमाणीकरण त्रुटी" },
    hero: {
      title: "स्मार्ट सिंचन प्रणाली",
      description:
        "स्वयंचलित सिंचन, खताची माहिती, ध्वनी सुरक्षा आणि अग्नि शोध असलेली प्रगत कृषी मॉनिटरिंग प्रणाली.",
      primaryCta: "सुरू करा",
      secondaryCta: "अधिक जाणून घ्या",
    },
    dashboard: {
      title: "शेती डॅशबोर्ड",
      subtitle: "रीअल-टाइम निरीक्षण आणि नियंत्रण",
      cards: {
        soilMoisture: { title: "मातीतील ओलावा", warning: "सिंचन आवश्यक", success: "सर्वोत्तम स्तर" },
        irrigation: {
          title: "सिंचन स्थिती",
          active: "सक्रिय",
          inactive: "निष्क्रिय",
          descriptionActive: "स्वयंचलित मोड",
          descriptionInactive: "मॅन्युअल मोड",
        },
        fertilizer: { title: "खत स्थिती", value: "एनपीके 20-20-20", description: "सध्याच्या पिकासाठी योग्य" },
        soundSystem: {
          title: "ध्वनी प्रणाली",
          armed: "सक्रिय",
          disarmed: "निष्क्रिय",
          monitoring: "नजर ठेवत आहे...",
          alert: "प्राणी आढळला!",
        },
        fireDetection: {
          title: "आग शोध",
          alert: "चेतावणी",
          normal: "सामान्य",
          descriptionAlert: "SOS - तत्काळ सिंचन सुरू करा!",
          descriptionNormal: "कोणतीही आग आढळली नाही",
        },
        systemHealth: { title: "सिस्टम स्थिती", value: "100%", description: "सर्व प्रणाली कार्यरत" },
      },
    },
    controlPanel: {
      title: "नियंत्रण पॅनेल",
      description: "आपल्या सिंचन सेटिंग्ज व्यवस्थापित करा",
      autoIrrigationTitle: "स्वयंचलित सिंचन",
      autoIrrigationDescription: "AI आधारित पाणी व्यवस्थापन",
      soundSystemTitle: "ध्वनी प्रतिबंधक प्रणाली",
      soundSystemDescription: "पिकांना प्राण्यांपासून वाचा",
      quickActions: "जलद क्रिया",
      startIrrigation: "सिंचन सुरू करा",
      testAnimal: "प्राणी अलर्ट चाचणी",
      testFire: "आग अलर्ट चाचणी",
    },
    alerts: {
      animalToastTitle: "प्राणी आढळला!",
      animalToastDescription: "ध्वनी सुरक्षा सक्रिय",
      animalBannerTitle: "प्राणी निरीक्षण सक्रिय",
      animalBannerDescription: "ध्वनी प्रणाली तुमची शेती सांभाळते.",
      fireToastTitle: "आग अलर्ट - SOS",
      fireToastDescription: "तत्काळ कृती करा! सिंचन सुरू करा.",
      fireBannerTitle: "आग शोधली - आपत्काल",
      fireBannerDescription: "कोरड्या वाऱ्यामुळे ठिणगी आढळली. लगेच पाणी चालू करा!",
      fieldClear: "शेती सुरक्षित आहे. हालचाल तपासत आहोत...",
    },
    auth: {
      brandTitle: "स्मार्ट सिंचन प्रणाली",
      brandSubtitle: "प्रगत कृषी निरीक्षण",
      welcomeTitle: "स्वागत आहे",
      welcomeDescription: "शेती डॅशबोर्डमध्ये लॉगिन करा",
      tabs: { signIn: "लॉगिन", signUp: "खाते तयार करा" },
      emailLabel: "ईमेल",
      passwordLabel: "पासवर्ड",
      passwordHint: "पासवर्ड किमान 6 अक्षरांचा असावा",
      signInButton: "लॉगिन",
      signInLoading: "लॉगिन होत आहे...",
      signUpButton: "खाते तयार करा",
      signUpLoading: "खाते तयार होत आहे...",
      validationTitle: "प्रमाणीकरण त्रुटी",
      signUpErrorTitle: "खाते तयार करण्यात त्रुटी",
      signUpSuccessTitle: "यशस्वी!",
      signUpSuccessDescription: "खाते तयार झाले. आता लॉगिन करा.",
      signInErrorTitle: "लॉगिन त्रुटी",
    },
    settings: {
      title: "सेटिंग्ज",
      subtitle: "खाते आणि प्राधान्ये व्यवस्थापित करा",
      accountInfoTitle: "खाते माहिती",
      accountInfoDescription: "आपला ईमेल आणि तपशील",
      emailLabel: "ईमेल पत्ता",
      emailHelper: "प्रमाणीकरणासाठी वापरले जाते",
      accountIdLabel: "खाते आयडी",
      securityTitle: "सुरक्षा",
      securityDescription: "पासवर्ड अद्ययावत करा",
      newPasswordLabel: "नवा पासवर्ड",
      confirmPasswordLabel: "पासवर्डची पुष्टी करा",
      passwordHelper: "पासवर्ड किमान 6 अक्षरांचा असावा",
      updatePassword: "पासवर्ड अपडेट करा",
      updatingPassword: "अपडेट होत आहे...",
      errorTitle: "त्रुटी",
      successTitle: "यशस्वी",
      successDescription: "पासवर्ड यशस्वीरित्या बदलला",
      mismatchDescription: "पासवर्ड जुळत नाहीत",
      lengthDescription: "पासवर्ड किमान 6 अक्षरे",
      systemConfigTitle: "सिस्टम कॉन्फिगरेशन",
      systemConfigDescription: "फार्म मॉनिटरिंग सेटिंग्ज",
      irrigationThresholdLabel: "सिंचन मर्यादा",
      irrigationThresholdHelper: "ज्याखाली ओलावा असल्यास सिंचन सुरू होईल",
      alertMethodLabel: "अलर्ट पद्धत",
      alertMethodEmailApp: "ईमेल आणि अॅप",
      alertMethodEmail: "फक्त ईमेल",
      alertMethodApp: "फक्त अॅप",
      saveConfiguration: "सेटिंग्ज जतन करा",
    },
    sidebar: {
      navigation: "नेव्हिगेशन",
      dashboard: "डॅशबोर्ड",
      settings: "सेटिंग्ज",
      logout: "लॉगआउट",
      logoutErrorTitle: "त्रुटी",
      logoutErrorDescription: "लॉगआउट अयशस्वी. पुन्हा प्रयत्न करा.",
    },
    notFound: {
      title: "अरे! पृष्ठ सापडले नाही",
      description: "आपण शोधत असलेले पृष्ठ उपलब्ध नाही.",
      cta: "मुख्य पृष्ठावर जा",
    },
  }),
  te: buildTranslation({
    language: { label: "భాష" },
    common: { loading: "లోడ్ అవుతోంది...", validationError: "ధృవీకరణ లోపం" },
    hero: {
      title: "స్మార్ట్ నీటిపారుదల వ్యవస్థ",
      description:
        "స్వయంచాలక నీటిపారుదల, ఎరువు సూచనలు, శబ్ద భద్రత మరియు అగ్ని గుర్తింపుతో ఉన్న అధునాతన వ్యవసాయ మానిటరింగ్.",
      primaryCta: "ప్రారంభించండి",
      secondaryCta: "మరింత తెలుసుకోండి",
    },
    dashboard: {
      title: "పొలం డ్యాష్‌బోర్డ్",
      subtitle: "తక్షణ గమనిక మరియు నియంత్రణ",
      cards: {
        soilMoisture: { title: "మట్టి తేమ", warning: "నీటిపారుదల అవసరం", success: "అత్యుత్తమ స్థాయి" },
        irrigation: {
          title: "నీటిపారుదల స్థితి",
          active: "సక్రియం",
          inactive: "నిష్క్రియం",
          descriptionActive: "స్వయంచాలక మోడ్",
          descriptionInactive: "మానవీయ మోడ్",
        },
        fertilizer: { title: "ఎరువు స్థితి", value: "ఎన్‌పికే 20-20-20", description: "ప్రస్తుత పంటకు సరైనది" },
        soundSystem: {
          title: "శబ్ద వ్యవస్థ",
          armed: "సిద్ధంగా",
          disarmed: "నిష్క్రియం",
          monitoring: "మానిటరింగ్...",
          alert: "జంతువు గుర్తించబడింది!",
        },
        fireDetection: {
          title: "అగ్ని గుర్తింపు",
          alert: "హెచ్చరిక",
          normal: "సాధారణ",
          descriptionAlert: "SOS - వెంటనే నీటిపారుదల ఆన్ చేయండి!",
          descriptionNormal: "అగ్ని గుర్తించబడలేదు",
        },
        systemHealth: { title: "సిస్టమ్ స్థితి", value: "100%", description: "అన్ని వ్యవస్థలు సజావుగా" },
      },
    },
    controlPanel: {
      title: "నియంత్రణ ప్యానెల్",
      description: "నీటిపారుదల సెట్టింగ్‌లను నిర్వహించండి",
      autoIrrigationTitle: "స్వయంచాలక నీటిపారుదల",
      autoIrrigationDescription: "AI ఆధారిత నీటి నిర్వహణ",
      soundSystemTitle: "శబ్ద నిరోధక వ్యవస్థ",
      soundSystemDescription: "పంటలను జంతువుల నుండి రక్షించండి",
      quickActions: "వేగవంతమైన చర్యలు",
      startIrrigation: "నీటిపారుదల ప్రారంభం",
      testAnimal: "జంతు హెచ్చరిక పరీక్ష",
      testFire: "అగ్ని హెచ్చరిక పరీక్ష",
    },
    alerts: {
      animalToastTitle: "జంతువు గుర్తించబడింది!",
      animalToastDescription: "శబ్ద రక్షణ సక్రియమైంది",
      animalBannerTitle: "జంతు మానిటరింగ్ యాక్టివ్",
      animalBannerDescription: "శబ్ద వ్యవస్థ మీ పంటను కాపాడుతోంది.",
      fireToastTitle: "అగ్ని హెచ్చరిక - SOS",
      fireToastDescription: "తక్షణ చర్య తీసుకోండి! నీటిపారుదల ఆన్ చేయండి.",
      fireBannerTitle: "అగ్ని గుర్తింపు - అత్యవసరం",
      fireBannerDescription: "ఎండ గాలుల వలన చిమ్ముడు. వెంటనే నీరు వదలండి!",
      fieldClear: "పొలం భద్రంగా ఉంది. కదలికపై నిఘా ఉంది...",
    },
    auth: {
      brandTitle: "స్మార్ట్ నీటిపారుదల వ్యవస్థ",
      brandSubtitle: "అధునాతన వ్యవసాయ మానిటరింగ్",
      welcomeTitle: "స్వాగతం",
      welcomeDescription: "మీ డ్యాష్‌బోర్డ్‌లో సైన్ ఇన్ చేయండి",
      tabs: { signIn: "సైన్ ఇన్", signUp: "ఖాతా సృష్టించండి" },
      emailLabel: "ఈమెయిల్",
      passwordLabel: "పాస్‌వర్డ్",
      passwordHint: "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి",
      signInButton: "సైన్ ఇన్",
      signInLoading: "సైన్ ఇన్ అవుతోంది...",
      signUpButton: "ఖాతా సృష్టించండి",
      signUpLoading: "ఖాతా సృష్టిస్తోంది...",
      validationTitle: "ధృవీకరణ లోపం",
      signUpErrorTitle: "ఖాతా సృష్టి లోపం",
      signUpSuccessTitle: "విజయం!",
      signUpSuccessDescription: "ఖాతా సృష్టించబడింది. ఇప్పుడు సైన్ ఇన్ చేయండి.",
      signInErrorTitle: "సైన్ ఇన్ లోపం",
    },
    settings: {
      title: "అమరికలు",
      subtitle: "ఖాతా మరియు అభిరుచులను నిర్వహించండి",
      accountInfoTitle: "ఖాతా సమాచారం",
      accountInfoDescription: "మీ వివరాలు మరియు ఈమెయిల్",
      emailLabel: "ఈమెయిల్ చిరునామా",
      emailHelper: "ధృవీకరణ కోసం ఉపయోగిస్తారు",
      accountIdLabel: "ఖాతా ఐడి",
      securityTitle: "భద్రత",
      securityDescription: "పాస్‌వర్డ్ నవీకరించండి",
      newPasswordLabel: "కొత్త పాస్‌వర్డ్",
      confirmPasswordLabel: "కొత్త పాస్‌వర్డ్ ధృవీకరించండి",
      passwordHelper: "కనీసం 6 అక్షరాలు ఉండాలి",
      updatePassword: "పాస్‌వర్డ్ నవీకరించండి",
      updatingPassword: "నవీకరిస్తోంది...",
      errorTitle: "లోపం",
      successTitle: "విజయం",
      successDescription: "పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది",
      mismatchDescription: "పాస్‌వర్డ్‌లు సరిపోలడం లేదు",
      lengthDescription: "పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి",
      systemConfigTitle: "సిస్టమ్ కాన్ఫిగరేషన్",
      systemConfigDescription: "ఫారం మానిటరింగ్ అమరికలు",
      irrigationThresholdLabel: "నీటిపారుదల పరిమితి",
      irrigationThresholdHelper: "ఈ తేమ కంటే తక్కువైతే నీటిపారుదల ప్రారంభం",
      alertMethodLabel: "హెచ్చరిక విధానం",
      alertMethodEmailApp: "ఈమెయిల్ & యాప్",
      alertMethodEmail: "ఈమెయిల్ మాత్రమే",
      alertMethodApp: "యాప్ మాత్రమే",
      saveConfiguration: "అమరికలను సేవ్ చేయండి",
    },
    sidebar: {
      navigation: "నావిగేషన్",
      dashboard: "డ్యాష్‌బోర్డ్",
      settings: "అమరికలు",
      logout: "లాగౌట్",
      logoutErrorTitle: "లోపం",
      logoutErrorDescription: "లాగౌట్ విఫలమైంది. మళ్లీ ప్రయత్నించండి.",
    },
    notFound: {
      title: "అయ్యో! పేజీ కనిపించలేదు",
      description: "మీరు వెతుకుతున్న పేజీ అందుబాటులో లేదు.",
      cta: "హోమ్‌కి తిరుగు",
    },
  }),
};