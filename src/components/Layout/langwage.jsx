// LanguageSettings.jsx
import React, { useState } from "react";
import "./LanguageSettings.css";

// Comprehensive language data with flags, codes, and native names
const languages = [
  // Indo-Aryan & South Asian
  {
    code: "EN",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    region: "United Kingdom",
    subtitle: "English",
  },
  {
    code: "US",
    name: "English (US)",
    nativeName: "English",
    flag: "🇺🇸",
    region: "United States",
    subtitle: "English",
  },
  {
    code: "HI",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    region: "India",
    subtitle: "हिन्दी",
  },
  {
    code: "TA",
    name: "Tamil",
    nativeName: "தமிழ்",
    flag: "🇮🇳",
    region: "Tamil Nadu",
    subtitle: "தமிழ்",
  },
  {
    code: "TE",
    name: "Telugu",
    nativeName: "తెలుగు",
    flag: "🇮🇳",
    region: "Andhra Pradesh",
    subtitle: "తెలుగు",
  },
  {
    code: "KN",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    flag: "🇮🇳",
    region: "Karnataka",
    subtitle: "ಕನ್ನಡ",
  },
  {
    code: "ML",
    name: "Malayalam",
    nativeName: "മലയാളം",
    flag: "🇮🇳",
    region: "Kerala",
    subtitle: "മലയാളം",
  },
  {
    code: "BN",
    name: "Bengali",
    nativeName: "বাংলা",
    flag: "🇧🇩",
    region: "Bangladesh",
    subtitle: "বাংলা",
  },
  {
    code: "MR",
    name: "Marathi",
    nativeName: "मराठी",
    flag: "🇮🇳",
    region: "Maharashtra",
    subtitle: "मराठी",
  },
  {
    code: "GU",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
    region: "Gujarat",
    subtitle: "ગુજરાતી",
  },
  {
    code: "PA",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    flag: "🇮🇳",
    region: "Punjab",
    subtitle: "ਪੰਜਾਬੀ",
  },
  {
    code: "OR",
    name: "Odia",
    nativeName: "ଓଡ଼ିଆ",
    flag: "🇮🇳",
    region: "Odisha",
    subtitle: "ଓଡ଼ିଆ",
  },
  {
    code: "AS",
    name: "Assamese",
    nativeName: "অসমীয়া",
    flag: "🇮🇳",
    region: "Assam",
    subtitle: "অসমীয়া",
  },
  {
    code: "NE",
    name: "Nepali",
    nativeName: "नेपाली",
    flag: "🇳🇵",
    region: "Nepal",
    subtitle: "नेपाली",
  },
  {
    code: "SA",
    name: "Sanskrit",
    nativeName: "संस्कृतम्",
    flag: "🇮🇳",
    region: "India",
    subtitle: "संस्कृतम्",
  },
  {
    code: "UR",
    name: "Urdu",
    nativeName: "اردو",
    flag: "🇵🇰",
    region: "Pakistan",
    subtitle: "اردو",
  },
  {
    code: "SI",
    name: "Sinhala",
    nativeName: "සිංහල",
    flag: "🇱🇰",
    region: "Sri Lanka",
    subtitle: "සිංහල",
  },

  // East Asian
  {
    code: "ZH-CN",
    name: "Chinese (Simplified)",
    nativeName: "中文 (简体)",
    flag: "🇨🇳",
    region: "China",
    subtitle: "简体中文",
  },
  {
    code: "ZH-TW",
    name: "Chinese (Traditional)",
    nativeName: "中文 (繁體)",
    flag: "🇹🇼",
    region: "Taiwan",
    subtitle: "繁體中文",
  },
  {
    code: "JA",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    region: "Japan",
    subtitle: "日本語",
  },
  {
    code: "KO",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    region: "Korea",
    subtitle: "한국어",
  },
  {
    code: "MN",
    name: "Mongolian",
    nativeName: "Монгол хэл",
    flag: "🇲🇳",
    region: "Mongolia",
    subtitle: "Монгол хэл",
  },

  // Southeast Asian
  {
    code: "VI",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    region: "Vietnam",
    subtitle: "Tiếng Việt",
  },
  {
    code: "TH",
    name: "Thai",
    nativeName: "ภาษาไทย",
    flag: "🇹🇭",
    region: "Thailand",
    subtitle: "ภาษาไทย",
  },
  {
    code: "ID",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
    region: "Indonesia",
    subtitle: "Bahasa Indonesia",
  },
  {
    code: "MS",
    name: "Malay",
    nativeName: "Bahasa Melayu",
    flag: "🇲🇾",
    region: "Malaysia",
    subtitle: "Bahasa Melayu",
  },
  {
    code: "KM",
    name: "Khmer",
    nativeName: "ភាសាខ្មែរ",
    flag: "🇰🇭",
    region: "Cambodia",
    subtitle: "ភាសាខ្មែរ",
  },
  {
    code: "LO",
    name: "Lao",
    nativeName: "ພາສາລາວ",
    flag: "🇱🇦",
    region: "Laos",
    subtitle: "ພາສາລາວ",
  },
  {
    code: "MY",
    name: "Burmese",
    nativeName: "မြန်မာစာ",
    flag: "🇲🇲",
    region: "Myanmar",
    subtitle: "မြန်မာစာ",
  },
  {
    code: "TL",
    name: "Tagalog",
    nativeName: "Tagalog",
    flag: "🇵🇭",
    region: "Philippines",
    subtitle: "Tagalog",
  },
  {
    code: "CEB",
    name: "Cebuano",
    nativeName: "Cebuano",
    flag: "🇵🇭",
    region: "Philippines",
    subtitle: "Cebuano",
  },

  // European
  {
    code: "FR",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    region: "France",
    subtitle: "Français",
  },
  {
    code: "DE",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    region: "Germany",
    subtitle: "Deutsch",
  },
  {
    code: "ES",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    region: "Spain",
    subtitle: "Español",
  },
  {
    code: "PT",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    region: "Portugal",
    subtitle: "Português",
  },
  {
    code: "PT-BR",
    name: "Portuguese (Brazil)",
    nativeName: "Português (BR)",
    flag: "🇧🇷",
    region: "Brazil",
    subtitle: "Português",
  },
  {
    code: "RU",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    region: "Russia",
    subtitle: "Русский",
  },
  {
    code: "IT",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    region: "Italy",
    subtitle: "Italiano",
  },
  {
    code: "NL",
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    region: "Netherlands",
    subtitle: "Nederlands",
  },
  {
    code: "PL",
    name: "Polish",
    nativeName: "Polski",
    flag: "🇵🇱",
    region: "Poland",
    subtitle: "Polski",
  },
  {
    code: "UK",
    name: "Ukrainian",
    nativeName: "Українська",
    flag: "🇺🇦",
    region: "Ukraine",
    subtitle: "Українська",
  },
  {
    code: "RO",
    name: "Romanian",
    nativeName: "Română",
    flag: "🇷🇴",
    region: "Romania",
    subtitle: "Română",
  },
  {
    code: "HU",
    name: "Hungarian",
    nativeName: "Magyar",
    flag: "🇭🇺",
    region: "Hungary",
    subtitle: "Magyar",
  },
  {
    code: "CS",
    name: "Czech",
    nativeName: "Čeština",
    flag: "🇨🇿",
    region: "Czech Republic",
    subtitle: "Čeština",
  },
  {
    code: "SK",
    name: "Slovak",
    nativeName: "Slovenčina",
    flag: "🇸🇰",
    region: "Slovakia",
    subtitle: "Slovenčina",
  },
  {
    code: "BG",
    name: "Bulgarian",
    nativeName: "Български",
    flag: "🇧🇬",
    region: "Bulgaria",
    subtitle: "Български",
  },
  {
    code: "SR",
    name: "Serbian",
    nativeName: "Српски",
    flag: "🇷🇸",
    region: "Serbia",
    subtitle: "Српски",
  },
  {
    code: "HR",
    name: "Croatian",
    nativeName: "Hrvatski",
    flag: "🇭🇷",
    region: "Croatia",
    subtitle: "Hrvatski",
  },
  {
    code: "SL",
    name: "Slovenian",
    nativeName: "Slovenščina",
    flag: "🇸🇮",
    region: "Slovenia",
    subtitle: "Slovenščina",
  },
  {
    code: "LT",
    name: "Lithuanian",
    nativeName: "Lietuvių",
    flag: "🇱🇹",
    region: "Lithuania",
    subtitle: "Lietuvių",
  },
  {
    code: "LV",
    name: "Latvian",
    nativeName: "Latviešu",
    flag: "🇱🇻",
    region: "Latvia",
    subtitle: "Latviešu",
  },
  {
    code: "ET",
    name: "Estonian",
    nativeName: "Eesti",
    flag: "🇪🇪",
    region: "Estonia",
    subtitle: "Eesti",
  },
  {
    code: "FI",
    name: "Finnish",
    nativeName: "Suomi",
    flag: "🇫🇮",
    region: "Finland",
    subtitle: "Suomi",
  },
  {
    code: "SV",
    name: "Swedish",
    nativeName: "Svenska",
    flag: "🇸🇪",
    region: "Sweden",
    subtitle: "Svenska",
  },
  {
    code: "NO",
    name: "Norwegian",
    nativeName: "Norsk",
    flag: "🇳🇴",
    region: "Norway",
    subtitle: "Norsk",
  },
  {
    code: "DA",
    name: "Danish",
    nativeName: "Dansk",
    flag: "🇩🇰",
    region: "Denmark",
    subtitle: "Dansk",
  },
  {
    code: "IS",
    name: "Icelandic",
    nativeName: "Íslenska",
    flag: "🇮🇸",
    region: "Iceland",
    subtitle: "Íslenska",
  },
  {
    code: "EL",
    name: "Greek",
    nativeName: "Ελληνικά",
    flag: "🇬🇷",
    region: "Greece",
    subtitle: "Ελληνικά",
  },
  {
    code: "HE",
    name: "Hebrew",
    nativeName: "עברית",
    flag: "🇮🇱",
    region: "Israel",
    subtitle: "עברית",
  },
  {
    code: "AR",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    region: "Saudi Arabia",
    subtitle: "العربية",
  },

  // African
  {
    code: "SW",
    name: "Swahili",
    nativeName: "Kiswahili",
    flag: "🇹🇿",
    region: "Tanzania",
    subtitle: "Kiswahili",
  },
  {
    code: "HA",
    name: "Hausa",
    nativeName: "Hausa",
    flag: "🇳🇬",
    region: "Nigeria",
    subtitle: "Hausa",
  },
  {
    code: "YO",
    name: "Yoruba",
    nativeName: "Yorùbá",
    flag: "🇳🇬",
    region: "Nigeria",
    subtitle: "Yorùbá",
  },
  {
    code: "IG",
    name: "Igbo",
    nativeName: "Igbo",
    flag: "🇳🇬",
    region: "Nigeria",
    subtitle: "Igbo",
  },
  {
    code: "AM",
    name: "Amharic",
    nativeName: "አማርኛ",
    flag: "🇪🇹",
    region: "Ethiopia",
    subtitle: "አማርኛ",
  },
  {
    code: "SO",
    name: "Somali",
    nativeName: "Soomaali",
    flag: "🇸🇴",
    region: "Somalia",
    subtitle: "Soomaali",
  },
  {
    code: "RW",
    name: "Kinyarwanda",
    nativeName: "Kinyarwanda",
    flag: "🇷🇼",
    region: "Rwanda",
    subtitle: "Kinyarwanda",
  },
  {
    code: "MG",
    name: "Malagasy",
    nativeName: "Malagasy",
    flag: "🇲🇬",
    region: "Madagascar",
    subtitle: "Malagasy",
  },
  {
    code: "ZU",
    name: "Zulu",
    nativeName: "isiZulu",
    flag: "🇿🇦",
    region: "South Africa",
    subtitle: "isiZulu",
  },
  {
    code: "XH",
    name: "Xhosa",
    nativeName: "isiXhosa",
    flag: "🇿🇦",
    region: "South Africa",
    subtitle: "isiXhosa",
  },
  {
    code: "AF",
    name: "Afrikaans",
    nativeName: "Afrikaans",
    flag: "🇿🇦",
    region: "South Africa",
    subtitle: "Afrikaans",
  },

  // Middle Eastern & Central Asian
  {
    code: "FA",
    name: "Persian",
    nativeName: "فارسی",
    flag: "🇮🇷",
    region: "Iran",
    subtitle: "فارسی",
  },
  {
    code: "KU",
    name: "Kurdish",
    nativeName: "Kurdî",
    flag: "🇮🇶",
    region: "Iraq",
    subtitle: "Kurdî",
  },
  {
    code: "KA",
    name: "Georgian",
    nativeName: "ქართული",
    flag: "🇬🇪",
    region: "Georgia",
    subtitle: "ქართული",
  },
  {
    code: "HY",
    name: "Armenian",
    nativeName: "Հայերեն",
    flag: "🇦🇲",
    region: "Armenia",
    subtitle: "Հայերեն",
  },
  {
    code: "AZ",
    name: "Azerbaijani",
    nativeName: "Azərbaycan",
    flag: "🇦🇿",
    region: "Azerbaijan",
    subtitle: "Azərbaycan",
  },
  {
    code: "KK",
    name: "Kazakh",
    nativeName: "Қазақша",
    flag: "🇰🇿",
    region: "Kazakhstan",
    subtitle: "Қазақша",
  },
  {
    code: "UZ",
    name: "Uzbek",
    nativeName: "Oʻzbekcha",
    flag: "🇺🇿",
    region: "Uzbekistan",
    subtitle: "Oʻzbekcha",
  },
  {
    code: "TK",
    name: "Turkmen",
    nativeName: "Türkmençe",
    flag: "🇹🇲",
    region: "Turkmenistan",
    subtitle: "Türkmençe",
  },
  {
    code: "KY",
    name: "Kyrgyz",
    nativeName: "Кыргызча",
    flag: "🇰🇬",
    region: "Kyrgyzstan",
    subtitle: "Кыргызча",
  },
  {
    code: "TG",
    name: "Tajik",
    nativeName: "Тоҷикӣ",
    flag: "🇹🇯",
    region: "Tajikistan",
    subtitle: "Тоҷикӣ",
  },

  // Other European
  {
    code: "TR",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    region: "Turkey",
    subtitle: "Türkçe",
  },
  {
    code: "SQ",
    name: "Albanian",
    nativeName: "Shqip",
    flag: "🇦🇱",
    region: "Albania",
    subtitle: "Shqip",
  },
  {
    code: "MK",
    name: "Macedonian",
    nativeName: "Македонски",
    flag: "🇲🇰",
    region: "North Macedonia",
    subtitle: "Македонски",
  },
  {
    code: "BS",
    name: "Bosnian",
    nativeName: "Bosanski",
    flag: "🇧🇦",
    region: "Bosnia",
    subtitle: "Bosanski",
  },
  {
    code: "MT",
    name: "Maltese",
    nativeName: "Malti",
    flag: "🇲🇹",
    region: "Malta",
    subtitle: "Malti",
  },

  // Other Asian
  {
    code: "DZ",
    name: "Dzongkha",
    nativeName: "རྫོང་ཁ",
    flag: "🇧🇹",
    region: "Bhutan",
    subtitle: "རྫོང་ཁ",
  },
  {
    code: "DV",
    name: "Dhivehi",
    nativeName: "ދިވެހި",
    flag: "🇲🇻",
    region: "Maldives",
    subtitle: "ދިވެހި",
  },

  // Pacific
  {
    code: "MI",
    name: "Māori",
    nativeName: "Māori",
    flag: "🇳🇿",
    region: "New Zealand",
    subtitle: "Māori",
  },
  {
    code: "SM",
    name: "Samoan",
    nativeName: "Gagana Sāmoa",
    flag: "🇼🇸",
    region: "Samoa",
    subtitle: "Gagana Sāmoa",
  },
  {
    code: "TO",
    name: "Tongan",
    nativeName: "Faka-Tonga",
    flag: "🇹🇴",
    region: "Tonga",
    subtitle: "Faka-Tonga",
  },
  {
    code: "FJ",
    name: "Fijian",
    nativeName: "Na Vosa Vakaviti",
    flag: "🇫🇯",
    region: "Fiji",
    subtitle: "Na Vosa Vakaviti",
  },

  // Native American
  {
    code: "QU",
    name: "Quechua",
    nativeName: "Runasimi",
    flag: "🇵🇪",
    region: "Peru",
    subtitle: "Runasimi",
  },
  {
    code: "AY",
    name: "Aymara",
    nativeName: "Aymar aru",
    flag: "🇧🇴",
    region: "Bolivia",
    subtitle: "Aymar aru",
  },
  {
    code: "GN",
    name: "Guarani",
    nativeName: "Avañe'ẽ",
    flag: "🇵🇾",
    region: "Paraguay",
    subtitle: "Avañe'ẽ",
  },
  {
    code: "NAH",
    name: "Nahuatl",
    nativeName: "Nāhuatl",
    flag: "🇲🇽",
    region: "Mexico",
    subtitle: "Nāhuatl",
  },

  // Constructed / International
  {
    code: "EO",
    name: "Esperanto",
    nativeName: "Esperanto",
    flag: "🏳️",
    region: "International",
    subtitle: "Esperanto",
  },
  {
    code: "LA",
    name: "Latin",
    nativeName: "Latina",
    flag: "🏛️",
    region: "Vatican",
    subtitle: "Latina",
  },

  // Additional major languages
  {
    code: "BN-IN",
    name: "Bengali (India)",
    nativeName: "বাংলা (ভারত)",
    flag: "🇮🇳",
    region: "West Bengal",
    subtitle: "বাংলা",
  },
  {
    code: "MAI",
    name: "Maithili",
    nativeName: "मैथिली",
    flag: "🇮🇳",
    region: "Bihar",
    subtitle: "मैथिली",
  },
  {
    code: "SIN",
    name: "Sindhi",
    nativeName: "سنڌي",
    flag: "🇵🇰",
    region: "Pakistan",
    subtitle: "سنڌي",
  },
  {
    code: "KOK",
    name: "Konkani",
    nativeName: "कोंकणी",
    flag: "🇮🇳",
    region: "Goa",
    subtitle: "कोंकणी",
  },
  {
    code: "TET",
    name: "Tetum",
    nativeName: "Tetun",
    flag: "🇹🇱",
    region: "Timor-Leste",
    subtitle: "Tetun",
  },
  {
    code: "DIV",
    name: "Maldivian",
    nativeName: "ދިވެހި",
    flag: "🇲🇻",
    region: "Maldives",
    subtitle: "ދިވެހި",
  },
];

const LanguageSettings = () => {
  const [selectedCode, setSelectedCode] = useState("EN");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (code) => {
    setSelectedCode(code);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchTerm) ||
      lang.nativeName.toLowerCase().includes(searchTerm) ||
      lang.code.toLowerCase().includes(searchTerm) ||
      lang.region.toLowerCase().includes(searchTerm) ||
      lang.subtitle.toLowerCase().includes(searchTerm),
  );

  const selectedLanguage = languages.find((lang) => lang.code === selectedCode);

  return (
    <div className="language-settings">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="title">Language Settings</h1>
          <p className="subtitle">
            Select the language you prefer for browsing, shopping and
            communications.
          </p>
        </div>

        {/* Search */}
        <div className="search-wrapper">
          <div className="search-icon">🔍</div>
          <input
            type="text"
            className="search-input"
            placeholder="Search language..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>

        {/* Selected Language Indicator */}
        {selectedLanguage && (
          <div className="selected-indicator">
            <span className="selected-label">Currently selected:</span>
            <span className="selected-language">
              {selectedLanguage.flag} {selectedLanguage.nativeName}
              <span className="selected-code">({selectedLanguage.code})</span>
            </span>
          </div>
        )}

        {/* Language Grid */}
        <div className="language-grid">
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => (
              <div
                key={lang.code}
                className={`language-card ${selectedCode === lang.code ? "selected" : ""}`}
                onClick={() => handleSelect(lang.code)}
              >
                <div className="card-flag">{lang.flag}</div>
                <div className="card-content">
                  <div className="card-native">{lang.nativeName}</div>
                  <div className="card-code">{lang.code}</div>
                  <div className="card-name">{lang.name}</div>
                  <div className="card-subtitle">{lang.subtitle}</div>
                  <div className="card-region">{lang.region}</div>
                </div>
                {selectedCode === lang.code && (
                  <div className="checkmark">✓</div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>
                No languages found matching "<strong>{searchTerm}</strong>"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
