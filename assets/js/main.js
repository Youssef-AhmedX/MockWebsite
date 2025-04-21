// Saudi Dates Website - Main JavaScript

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check for stored language preference first and set it as current language
  const storedLang = localStorage.getItem("language");
  if (storedLang) {
    currentLang = storedLang;
  }

  // Initialize loading screen
  initLoadingScreen();

  // Initialize navigation menu functionality
  initNavigation();

  // Initialize cookie consent banner
  initCookieConsent();

  // Initialize language toggle
  initLanguageToggle();

  // Initialize dates section with data
  initDatesSection();

  // Initialize cities section
  initCitiesSection();

  // Initialize FAQ accordion
  initFaqAccordion();

  // Initialize scroll animations with Intersection Observer
  initScrollAnimations();

  // Initialize GSAP animations
  initGSAPAnimations();

  // Apply language setting AFTER all components are initialized
  setLanguage(currentLang);
});

// Global language state
let currentLang = "ar";

// Add language toggle functionality
function initLanguageToggle() {
  const languageToggle = document.getElementById("language-toggle");

  // Set the language toggle button's initial state based on current language
  updateLanguageToggleUI(currentLang);

  languageToggle.addEventListener("click", function () {
    // Toggle language
    currentLang = currentLang === "en" ? "ar" : "en";

    // Save preference
    localStorage.setItem("language", currentLang);

    // Update UI
    setLanguage(currentLang);
  });
}

function updateLanguageToggleUI(lang) {
  const languageToggle = document.getElementById("language-toggle");

  if (lang === "ar") {
    languageToggle.innerHTML =
      '<span class="px-2 opacity-50">EN</span> | <span class="px-2">عربي</span>';
  } else {
    languageToggle.innerHTML =
      '<span class="px-2">EN</span> | <span class="px-2 opacity-50">عربي</span>';
  }
}

function setLanguage(lang) {
  const html = document.documentElement;
  const languageToggle = document.getElementById("language-toggle");

  if (lang === "ar") {
    html.setAttribute("dir", "rtl");
    html.setAttribute("lang", "ar");
    document.body.classList.add("rtl");
    updateLanguageToggleUI(lang);

    // Update all translatable elements
    document.querySelectorAll("[data-en]").forEach((el) => {
      // Store English text if not already stored
      if (!el.getAttribute("data-en")) {
        el.setAttribute("data-en", el.textContent);
      }

      // Set Arabic text
      if (el.getAttribute("data-ar")) {
        el.textContent = el.getAttribute("data-ar");
      }
    });
  } else {
    html.setAttribute("dir", "ltr");
    html.setAttribute("lang", "en");
    document.body.classList.remove("rtl");
    updateLanguageToggleUI(lang);

    // Revert to English
    document.querySelectorAll("[data-en]").forEach((el) => {
      el.textContent = el.getAttribute("data-en");
    });
  }

  // Update date cards if they exist
  updateDateCards(lang);

  // Update city content
  updateCityContent(lang);

  // Update FAQ content
  updateFaqContent(lang);
}

function updateDateCards(lang) {
  const dateCards = document.querySelectorAll(".date-card");

  dateCards.forEach((card) => {
    const nameEl = card.querySelector(".date-card-name h3");
    const arabicNameEl = card.querySelector(".arabic-name");
    const descriptionEl = card.querySelector(".date-card-description");
    const buttonEl = card.querySelector(".date-card-btn span");

    if (lang === "ar") {
      if (nameEl && arabicNameEl) {
        // Swap English and Arabic names
        const englishName = nameEl.textContent;
        nameEl.textContent = arabicNameEl.textContent;
        arabicNameEl.textContent = englishName;
      }

      if (buttonEl) {
        buttonEl.textContent = "أضف إلى السلة";
      }
    } else {
      // Restore original order
      if (nameEl && arabicNameEl) {
        const arabicName = nameEl.textContent;
        nameEl.textContent = arabicNameEl.textContent;
        arabicNameEl.textContent = arabicName;
      }

      if (buttonEl) {
        buttonEl.textContent = "Add to Cart";
      }
    }
  });
}

function updateCityContent(lang) {
  const cityTabs = document.querySelectorAll(".city-tab");
  const cityContents = document.querySelectorAll(".city-content");

  // Update city tabs
  if (lang === "ar") {
    cityTabs.forEach((tab) => {
      const cityKey = tab.getAttribute("data-city");
      // Clear any existing content to avoid duplication
      tab.textContent = "";

      switch (cityKey) {
        case "riyadh":
          tab.textContent = "الرياض";
          break;
        case "jeddah":
          tab.textContent = "جدة";
          break;
        case "dammam":
          tab.textContent = "الدمام";
          break;
      }
    });
  } else {
    cityTabs.forEach((tab) => {
      const cityKey = tab.getAttribute("data-city");
      // Clear any existing content to avoid duplication
      tab.textContent = "";

      switch (cityKey) {
        case "riyadh":
          tab.textContent = "Riyadh";
          break;
        case "jeddah":
          tab.textContent = "Jeddah";
          break;
        case "dammam":
          tab.textContent = "Dammam";
          break;
      }
    });
  }

  // Update city content titles, descriptions and highlights
  cityContents.forEach((content) => {
    const cityKey = content.getAttribute("data-city");
    const titleEl = content.querySelector("h3");
    const arabicTitleEl = content.querySelector(".font-arabic");
    const descEl = content.querySelector(".city-header p");
    const highlightsTitle = content.querySelector(".city-highlights h4");
    const factsTitle = content.querySelector(".bg-white.p-4 h4");
    const populationLabel = content.querySelector(
      ".bg-white.p-4 p:first-of-type strong"
    );
    const coordinatesLabel = content.querySelector(
      ".bg-white.p-4 p:last-of-type strong"
    );

    // Update highlight items
    const highlightItems = content.querySelectorAll(".city-highlight-item");

    if (lang === "ar") {
      if (titleEl && arabicTitleEl) {
        const englishTitle = titleEl.textContent;
        titleEl.textContent = arabicTitleEl.textContent;
        arabicTitleEl.textContent = englishTitle;
      }

      // Update description based on city
      if (descEl) {
        switch (cityKey) {
          case "riyadh":
            descEl.textContent =
              "عاصمة المملكة العربية السعودية ومدينة نابضة بالحياة تجمع بين العمارة الحديثة والتراث الثقافي.";
            break;
          case "jeddah":
            descEl.textContent =
              "المركز التجاري للمملكة العربية السعودية والبوابة إلى المدن المقدسة مكة والمدينة.";
            break;
          case "dammam":
            descEl.textContent =
              "عاصمة المنطقة الشرقية وموطن تمور الخلاص الشهيرة.";
            break;
        }
      }

      // Update section titles
      if (highlightsTitle) highlightsTitle.textContent = "أبرز المعالم";
      if (factsTitle) factsTitle.textContent = "حقائق عن المدينة";

      // Update fact labels
      if (populationLabel) populationLabel.textContent = "عدد السكان:";
      if (coordinatesLabel) coordinatesLabel.textContent = "الإحداثيات:";

      // Update highlight items for each city
      highlightItems.forEach((item, index) => {
        const itemTitle = item.querySelector("h5");
        const itemContent = item.querySelector("p");

        if (itemTitle && itemContent) {
          if (cityKey === "riyadh") {
            switch (index) {
              case 0:
                itemTitle.textContent = "أسواق التمور";
                itemContent.textContent =
                  "تضم أكبر أسواق التمور في المملكة، وتقدم مجموعة واسعة من التمور الفاخرة.";
                break;
              case 1:
                itemTitle.textContent = "مرافق حديثة";
                itemContent.textContent =
                  "مصانع معالجة التمور المتطورة المجهزة بأحدث التقنيات.";
                break;
              case 2:
                itemTitle.textContent = "التراث الثقافي";
                itemContent.textContent =
                  "استمتع بالأهمية الثقافية الغنية للتمور في التقاليد والضيافة السعودية.";
                break;
            }
          } else if (cityKey === "jeddah") {
            switch (index) {
              case 0:
                itemTitle.textContent = "التوزيع الساحلي";
                itemContent.textContent =
                  "ميناء رئيسي لتصدير التمور السعودية إلى الأسواق العالمية في جميع أنحاء العالم.";
                break;
              case 1:
                itemTitle.textContent = "مهرجانات التمور";
                itemContent.textContent =
                  "مهرجانات سنوية تحتفل بموسم حصاد التمور مع معارض ثقافية.";
                break;
              case 2:
                itemTitle.textContent = "الابتكار في الطهي";
                itemContent.textContent =
                  "موطن للطهاة المبتكرين الذين يبتكرون وصفات حديثة باستخدام التمور السعودية التقليدية.";
                break;
            }
          } else if (cityKey === "dammam") {
            switch (index) {
              case 0:
                itemTitle.textContent = "تميز الخلاص";
                itemContent.textContent =
                  "تشتهر بإنتاج تمور الخلاص الفاخرة، المعروفة بنكهتها المميزة.";
                break;
              case 1:
                itemTitle.textContent = "مراكز البحوث";
                itemContent.textContent =
                  "مرافق بحثية زراعية رائدة تركز على زراعة وحفظ نخيل التمر.";
                break;
              case 2:
                itemTitle.textContent = "المزارع التقليدية";
                itemContent.textContent =
                  "زيارة مزارع التمور التقليدية التي حافظت على تقنيات الزراعة القديمة لأجيال.";
                break;
            }
          }
        }
      });
    } else {
      if (titleEl && arabicTitleEl) {
        const arabicTitle = titleEl.textContent;
        titleEl.textContent = arabicTitleEl.textContent;
        arabicTitleEl.textContent = arabicTitle;
      }

      // Reset to English descriptions
      if (descEl) {
        switch (cityKey) {
          case "riyadh":
            descEl.textContent =
              "The capital city of Saudi Arabia and a bustling metropolis blending modern architecture with cultural heritage.";
            break;
          case "jeddah":
            descEl.textContent =
              "The commercial hub of Saudi Arabia and gateway to the holy cities of Mecca and Medina.";
            break;
          case "dammam":
            descEl.textContent =
              "The capital of the Eastern Province and home to the famous Khalas dates.";
            break;
        }
      }

      // Reset section titles
      if (highlightsTitle) highlightsTitle.textContent = "Regional Highlights";
      if (factsTitle) factsTitle.textContent = "City Facts";

      // Reset fact labels
      if (populationLabel) populationLabel.textContent = "Population:";
      if (coordinatesLabel) coordinatesLabel.textContent = "Coordinates:";

      // Reset highlight items for each city
      highlightItems.forEach((item, index) => {
        const itemTitle = item.querySelector("h5");
        const itemContent = item.querySelector("p");

        if (itemTitle && itemContent) {
          if (cityKey === "riyadh") {
            switch (index) {
              case 0:
                itemTitle.textContent = "Date Markets";
                itemContent.textContent =
                  "Home to the largest date markets in the Kingdom, offering a wide variety of premium dates.";
                break;
              case 1:
                itemTitle.textContent = "Modern Facilities";
                itemContent.textContent =
                  "State-of-the-art date processing factories equipped with the latest technology.";
                break;
              case 2:
                itemTitle.textContent = "Cultural Heritage";
                itemContent.textContent =
                  "Experience the rich cultural significance of dates in Saudi tradition and hospitality.";
                break;
            }
          } else if (cityKey === "jeddah") {
            switch (index) {
              case 0:
                itemTitle.textContent = "Coastal Distribution";
                itemContent.textContent =
                  "Major port for exporting Saudi dates to international markets across the world.";
                break;
              case 1:
                itemTitle.textContent = "Date Festivals";
                itemContent.textContent =
                  "Annual festivals celebrating the date harvest season with cultural exhibitions.";
                break;
              case 2:
                itemTitle.textContent = "Culinary Innovation";
                itemContent.textContent =
                  "Home to innovative chefs creating modern recipes using traditional Saudi dates.";
                break;
            }
          } else if (cityKey === "dammam") {
            switch (index) {
              case 0:
                itemTitle.textContent = "Khalas Excellence";
                itemContent.textContent =
                  "Renowned for producing the premium Khalas dates, celebrated for their distinctive flavor.";
                break;
              case 1:
                itemTitle.textContent = "Research Centers";
                itemContent.textContent =
                  "Leading agricultural research facilities focused on date palm cultivation and preservation.";
                break;
              case 2:
                itemTitle.textContent = "Traditional Farms";
                itemContent.textContent =
                  "Visit traditional date farms that have preserved ancient farming techniques for generations.";
                break;
            }
          }
        }
      });
    }
  });
}

function updateFaqContent(lang) {
  // Arabic FAQ data
  const faqDataAr = [
    {
      question:
        "ما الذي يجعل التمور السعودية فريدة من نوعها بين التمور الأخرى حول العالم؟",
      answer:
        "تشتهر التمور السعودية بجودتها الاستثنائية ونكهاتها المميزة ومحتواها الغذائي الغني. يساهم مناخ المملكة الفريد، والتربة الخصبة في مناطق الواحات، وخبرة زراعة التمور على مدى قرون في إنتاج تمور ذات حلاوة وقوام وقيمة غذائية لا مثيل لها. تضم المملكة العربية السعودية أيضًا أكثر من 300 نوع من التمور، العديد منها حصري في المنطقة.",
    },
    {
      question: "كيف يجب تخزين التمور للحفاظ على نضارتها؟",
      answer:
        "للتخزين قصير المدى (1-2 أشهر)، احتفظ بالتمور في حاوية محكمة الإغلاق في درجة حرارة الغرفة بعيدًا عن أشعة الشمس المباشرة. للحفظ لفترة أطول، ضعها في الثلاجة في حاويات مغلقة حيث يمكن أن تستمر من 6 إلى 12 شهرًا. للتخزين الممتد (حتى عام)، جمد التمور في حاويات محكمة الإغلاق أو أكياس للتجميد. تأكد دائمًا من تخزين التمور في بيئة جافة لمنع امتصاص الرطوبة.",
    },
    {
      question: "هل التمور السعودية مناسبة للأشخاص المصابين بداء السكري؟",
      answer:
        "على الرغم من أن التمور تحتوي على سكريات طبيعية، إلا أنها تحتوي أيضًا على مؤشر جلايسيمي منخفض إلى متوسط وغنية بالألياف، مما يساعد على تنظيم مستويات السكر في الدم. يمكن للعديد من الأشخاص المصابين بمرض السكري تناول التمور باعتدال كجزء من نظام غذائي متوازن. ومع ذلك، يُنصح دائمًا باستشارة مقدم الرعاية الصحية للحصول على نصائح شخصية بخصوص حالتك الصحية واحتياجاتك الغذائية.",
    },
    {
      question: "ما هي الفوائد الصحية لتناول التمور بانتظام؟",
      answer:
        "التمور هي مستودعات للعناصر الغذائية وتقدم العديد من الفوائد الصحية. فهي غنية بالألياف للصحة الهضمية، وتحتوي على معادن أساسية مثل البوتاسيوم والمغنيسيوم لصحة القلب، وتوفر طاقة طبيعية من الكربوهيدرات، وتحتوي على مضادات الأكسدة التي تحارب الالتهابات، وتدعم صحة العظام بمعادن مثل الكالسيوم والفوسفور، وقد تعزز صحة الدماغ، ويمكن أن تساعد في تحفيز المخاض الطبيعي أثناء الحمل.",
    },
    {
      question: "هل تشحنون التمور السعودية دولياً؟",
      answer:
        "نعم، نشحن تمورنا السعودية الفاخرة في جميع أنحاء العالم. يستغرق الشحن الدولي عادة 5-10 أيام عمل حسب البلد المقصود. نستخدم عبوات خاصة معزولة لضمان بقاء التمور طازجة أثناء النقل. يرجى ملاحظة أن رسوم الاستيراد والضرائب قد تنطبق وفقًا للوائح بلدك وتكون مسؤولية العميل.",
    },
    {
      question: "ما هي طرق الدفع التي تقبلونها؟",
      answer:
        "نقبل مختلف طرق الدفع بما في ذلك بطاقات الائتمان الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس)، باي بال، آبل باي، التحويلات المصرفية، والعملات المشفرة. جميع معاملات الدفع مؤمنة بتقنية تشفير قياسية في الصناعة لضمان بقاء معلوماتك المالية محمية. بالنسبة للطلبات داخل المملكة العربية السعودية، نقدم أيضًا خدمة الدفع عند الاستلام.",
    },
    {
      question: "ما هي الأهمية الثقافية للتمور في المملكة العربية السعودية؟",
      answer:
        "تحمل التمور أهمية ثقافية عميقة في المملكة العربية السعودية، متأصلة بعمق في تراث الأمة وحياتها اليومية. إنها ترمز إلى الضيافة، حيث يتم الترحيب بالضيوف تقليدياً بالتمر والقهوة العربية. خلال رمضان، تُستخدم التمور لكسر الصيام. تظهر أشجار النخيل والتمور في الفن الثقافي والشعر والأدب. يتم الاحتفال بموسم حصاد التمور بمهرجانات في جميع أنحاء البلاد، والتمور هي محور العديد من العادات والمراسم الدينية.",
    },
    {
      question:
        "كيف يمكنني إدراج التمور في نظامي الغذائي اليومي بعيدًا عن تناولها عادية؟",
      answer:
        "هناك العديد من الطرق الإبداعية لتضمين التمور في نظامك الغذائي: استخدمها كمحليات طبيعية في العصائر المخفوقة، امزجها في كرات الطاقة مع المكسرات والبذور، قطّعها وأضفها إلى الشوفان أو الزبادي، حشوها بالمكسرات أو الجبن كمقبلات، استخدم معجون التمر كبديل للسكر في الخبز، أضفها إلى السلطات للحلاوة، امزجها في الصلصات أو التتبيلات، أو حضّر شراب التمر المنزلي للرش على الحلويات وأطباق الإفطار.",
    },
    {
      question: "هل تمورك عضوية وخالية من المبيدات؟",
      answer:
        "تزرع تمورنا الفاخرة باستخدام ممارسات زراعية مستدامة. العديد من أصناف التمر لدينا معتمدة عضويًا، وتزرع بدون مبيدات أو أسمدة اصطناعية. بالنسبة للتمور التقليدية، نضمن الحد الأدنى من التدخل الكيميائي من خلال تقنيات متكاملة لإدارة الآفات. نغسل بدقة ونتحقق من جودة جميع منتجاتنا قبل التعبئة. تحدد كل صفحة منتج ما إذا كان نوع التمر المحدد معتمدًا عضويًا أو مزروعًا بشكل تقليدي.",
    },
    {
      question: "ما هو الفرق بين التمور الطرية وشبه الجافة والجافة؟",
      answer:
        "يشير التصنيف إلى محتوى الرطوبة والقوام. التمور اللينة (مثل المدجول والسكري والبرحي) تحتوي على نسبة عالية من الرطوبة (30-35٪)، مما يمنحها قوام لين يشبه الكراميل ومدة صلاحية أقصر. التمور شبه الجافة (مثل دقلة نور والصفاوي) تحتوي على رطوبة معتدلة (20-30٪) مع قوام أكثر صلابة ولكن طري ومدة صلاحية أطول. التمور الجافة (مثل الثوري) لديها أقل محتوى من الرطوبة (10-20٪)، مما يوفر قوام مضغ ومدة صلاحية أطول، مما يجعلها ممتازة للتخزين.",
    },
  ];

  const faqItems = document.querySelectorAll(".faq-item");

  if (lang === "ar") {
    faqItems.forEach((item, index) => {
      const questionEl = item.querySelector(".faq-question h3");
      const answerEl = item.querySelector(".faq-answer p");

      if (questionEl && answerEl && index < faqDataAr.length) {
        questionEl.textContent = faqDataAr[index].question;
        answerEl.textContent = faqDataAr[index].answer;
      }
    });
  } else {
    // Reset to English using the existing FAQ data - Create new FAQ items
    const faqAccordion = document.querySelector(".faq-accordion");
    faqAccordion.innerHTML = ""; // Clear existing FAQ items

    // This will reinitialize the FAQ with English content
    initFaqAccordion();
  }
}

// Functions for website initialization
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");

  // Hide loading screen after content is loaded
  window.addEventListener("load", function () {
    setTimeout(function () {
      gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
          loadingScreen.style.display = "none";
        },
      });
    }, 800);
  });
}

function initNavigation() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  menuToggle.addEventListener("click", function () {
    menu.classList.toggle("active");
    menu.classList.toggle("hidden");
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: "smooth",
        });

        // Close mobile menu if open
        menu.classList.remove("active");
        menu.classList.add("hidden");
      }
    });
  });
}

function initCookieConsent() {
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookies = document.getElementById("accept-cookies");
  const declineCookies = document.getElementById("decline-cookies");

  // Check if user already made a choice
  const cookieChoice = localStorage.getItem("cookieConsent");

  if (cookieChoice) {
    cookieConsent.style.display = "none";
  }

  acceptCookies.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    gsap.to(cookieConsent, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      onComplete: function () {
        cookieConsent.style.display = "none";
      },
    });
  });

  declineCookies.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "declined");
    gsap.to(cookieConsent, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      onComplete: function () {
        cookieConsent.style.display = "none";
      },
    });
  });
}

function initDatesSection() {
  // Date products data
  const datesData = [
    {
      id: 1,
      name: "Ajwa",
      arabicName: "عجوة",
      type: "soft",
      price: 120,
      description:
        "Premium Madinah dates with soft texture and distinctive taste, known for their numerous health benefits.",
      images: ["ajwa-2.jpg", "ajwa-1.jpg", "ajwa-3.webp"],
    },
    {
      id: 2,
      name: "Sukkari",
      arabicName: "سكري",
      type: "soft",
      price: 85,
      description:
        "Sweet golden dates from Qassim, with caramel-like flavor and melt-in-your-mouth texture.",
      images: ["sukkari-3.jpg", "sukkari-2.jpg", "sukkari-1.jpg"],
    },
    {
      id: 3,
      name: "Safawi",
      arabicName: "صفاوي",
      type: "semi-dry",
      price: 70,
      description:
        "Dark dates from Madinah with a rich flavor profile and medium sweetness.",
      images: ["safawi-1.webp", "safawi-2.webp"],
    },
    {
      id: 4,
      name: "Segai",
      arabicName: "صقعي",
      type: "dry",
      price: 95,
      description:
        "Distinguished dry dates with a unique texture and intense sweetness.",
      images: ["segai-1.webp", "segai-2.webp", "segai-3.webp"],
    },
    {
      id: 5,
      name: "Khudri",
      arabicName: "خضري",
      type: "semi-dry",
      price: 60,
      description:
        "Semi-dry dates with a perfect balance of softness and chewiness.",
      images: ["khudri-1.webp", "khudri-2.webp"],
    },
    {
      id: 6,
      name: "Khalas",
      arabicName: "خلاص",
      type: "soft",
      price: 110,
      description:
        "Premium dates from Eastern Province with an amber color and distinctive caramel notes.",
      images: ["khalas-1.webp", "khalas-2.webp", "khalas-3.webp"],
    },
    {
      id: 7,
      name: "Mabroom",
      arabicName: "مبروم",
      type: "dry",
      price: 90,
      description:
        "Elongated dates with a chewy texture and rich flavor from Madinah region.",
      images: ["mabroom-1.jpg", "mabroom-2.jpg"],
    },
    {
      id: 8,
      name: "Nabtat Ali",
      arabicName: "نبتة علي",
      type: "semi-dry",
      price: 75,
      description:
        "Semi-dry dates with distinct flavor and balanced sweetness.",
      images: ["nabtat-ali-1.webp", "nabtat-ali-2.webp"],
    },
    {
      id: 9,
      name: "Shishi",
      arabicName: "شيشي",
      type: "soft",
      price: 65,
      description:
        "Soft and juicy dates with unique flavor from the northern regions.",
      images: ["shishi-1.webp", "shishi-2.webp"],
    },
    {
      id: 10,
      name: "Barhi",
      arabicName: "برحي",
      type: "soft",
      price: 100,
      description:
        "Amber-colored soft dates with a distinctive sweet honey flavor.",
      images: ["barhi-1.webp", "barhi-2.webp", "barhi-3.webp"],
    },
  ];

  // Generate date cards and add to grid
  const datesGrid = document.getElementById("dates-grid");

  datesData.forEach((date) => {
    const dateCard = createDateCard(date);
    datesGrid.appendChild(dateCard);
  });

  // Initialize filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get filter value
      const filterValue = this.getAttribute("data-filter");

      // Filter date cards
      filterDates(filterValue);
    });
  });
}

function createDateCard(dateData) {
  const card = document.createElement("div");
  card.className = "date-card";
  card.setAttribute("data-type", dateData.type);

  // Create card content
  const content = document.createElement("div");
  content.className = "date-card-content";

  const nameDiv = document.createElement("div");
  nameDiv.className = "date-card-name";

  const name = document.createElement("h3");
  name.textContent = dateData.name;

  const arabicName = document.createElement("span");
  arabicName.className = "arabic-name";
  arabicName.textContent = dateData.arabicName;

  nameDiv.appendChild(name);
  nameDiv.appendChild(arabicName);

  const price = document.createElement("div");
  price.className = "date-card-price";
  price.textContent = `${dateData.price} SAR`;

  const description = document.createElement("p");
  description.className = "date-card-description";
  description.textContent = dateData.description;

  const button = document.createElement("button");
  button.className = "date-card-btn";
  button.innerHTML =
    '<span>Add to Cart</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>';

  button.addEventListener("click", function () {
    // Simple animation for add to cart button
    this.innerHTML =
      '<span>Added!</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';

    setTimeout(() => {
      this.innerHTML =
        '<span>Add to Cart</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>';
    }, 1500);
  });

  // Type badge
  const typeBadge = document.createElement("div");
  typeBadge.className = "date-card-type";
  typeBadge.textContent =
    dateData.type.charAt(0).toUpperCase() + dateData.type.slice(1);

  // Assemble card
  content.appendChild(nameDiv);
  content.appendChild(price);
  content.appendChild(description);
  content.appendChild(button);

  card.appendChild(content);

  return card;
}

function filterDates(filterValue) {
  const dateCards = document.querySelectorAll(".date-card");

  dateCards.forEach((card) => {
    if (filterValue === "all") {
      gsap.to(card, { scale: 1, opacity: 1, duration: 0.3 });
    } else {
      const type = card.getAttribute("data-type");

      if (type === filterValue) {
        gsap.to(card, { scale: 1, opacity: 1, duration: 0.3 });
      } else {
        gsap.to(card, { scale: 0.95, opacity: 0.5, duration: 0.3 });
      }
    }
  });
}

function initCitiesSection() {
  // City data
  const citiesData = {
    riyadh: {
      name: "Riyadh",
      arabicName: "الرياض",
      skylineImage: "riyadh-skyline.svg",
      population: "7.6 million",
      coordinates: "24.7136° N, 46.6753° E",
      description:
        "The capital city of Saudi Arabia and a bustling metropolis blending modern architecture with cultural heritage.",
      highlights: [
        {
          title: "Date Markets",
          icon: "market",
          content:
            "Home to the largest date markets in the Kingdom, offering a wide variety of premium dates.",
        },
        {
          title: "Modern Facilities",
          icon: "building",
          content:
            "State-of-the-art date processing factories equipped with the latest technology.",
        },
        {
          title: "Cultural Heritage",
          icon: "museum",
          content:
            "Experience the rich cultural significance of dates in Saudi tradition and hospitality.",
        },
      ],
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232132.8548055147!2d46.5491159465814!3d24.77067149049441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh!5e0!3m2!1sen!2ssa!4v1650554848652!5m2!1sen!2ssa",
    },
    jeddah: {
      name: "Jeddah",
      arabicName: "جدة",
      skylineImage: "jeddah-skyline.svg",
      population: "4.2 million",
      coordinates: "21.5433° N, 39.1728° E",
      description:
        "The commercial hub of Saudi Arabia and gateway to the holy cities of Mecca and Medina.",
      highlights: [
        {
          title: "Coastal Distribution",
          icon: "ship",
          content:
            "Major port for exporting Saudi dates to international markets across the world.",
        },
        {
          title: "Date Festivals",
          icon: "calendar",
          content:
            "Annual festivals celebrating the date harvest season with cultural exhibitions.",
        },
        {
          title: "Culinary Innovation",
          icon: "utensils",
          content:
            "Home to innovative chefs creating modern recipes using traditional Saudi dates.",
        },
      ],
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d475325.0313019672!2d38.88150299010593!3d21.449800186524012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b118db!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1745243853979!5m2!1sen!2seg",
    },
    dammam: {
      name: "Dammam",
      arabicName: "الدمام",
      skylineImage: "dammam-skyline.svg",
      population: "1.2 million",
      coordinates: "26.4367° N, 50.1039° E",
      description:
        "The capital of the Eastern Province and home to the famous Khalas dates.",
      highlights: [
        {
          title: "Khalas Excellence",
          icon: "award",
          content:
            "Renowned for producing the premium Khalas dates, celebrated for their distinctive flavor.",
        },
        {
          title: "Research Centers",
          icon: "microscope",
          content:
            "Leading agricultural research facilities focused on date palm cultivation and preservation.",
        },
        {
          title: "Traditional Farms",
          icon: "tractor",
          content:
            "Visit traditional date farms that have preserved ancient farming techniques for generations.",
        },
      ],
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d232132.8548055147!2d50.1039!3d26.4367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e3120295dde5dbb%3A0xeabc5a2b215d34b9!2sDammam!5e0!3m2!1sen!2ssa!4v1650554848652!5m2!1sen!2ssa",
    },
  };

  // Generate city content
  const cityContentWrapper = document.querySelector(".city-content-wrapper");

  for (const cityKey in citiesData) {
    const cityData = citiesData[cityKey];
    const cityContent = createCityContent(cityData, cityKey);
    cityContentWrapper.appendChild(cityContent);
  }

  // Initialize city tabs
  const cityTabs = document.querySelectorAll(".city-tab");
  const cityContents = document.querySelectorAll(".city-content");

  // Show first city content by default
  cityContents[0].classList.add("active");

  cityTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      cityTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Get city value
      const cityValue = this.getAttribute("data-city");

      // Hide all city content
      cityContents.forEach((content) => content.classList.remove("active"));

      // Show selected city content
      document
        .querySelector(`.city-content[data-city="${cityValue}"]`)
        .classList.add("active");
    });
  });
}

function createCityContent(cityData, cityKey) {
  const content = document.createElement("div");
  content.className = "city-content";
  content.setAttribute("data-city", cityKey);

  // Create city header
  const header = document.createElement("div");
  header.className = "city-header";

  const skyline = document.createElement("div");
  skyline.className = "city-skyline";
  skyline.style.backgroundImage = `url('assets/images/cities/${cityData.skylineImage}')`;

  const titleDiv = document.createElement("div");

  const title = document.createElement("h3");
  title.className = "text-2xl font-bold text-saudi-green";
  title.textContent = cityData.name;

  const arabicTitle = document.createElement("p");
  arabicTitle.className = "text-xl font-arabic text-saudi-green opacity-80";
  arabicTitle.textContent = cityData.arabicName;

  const description = document.createElement("p");
  description.className = "mt-2 text-text-secondary";
  description.textContent = cityData.description;

  titleDiv.appendChild(title);
  titleDiv.appendChild(arabicTitle);
  titleDiv.appendChild(description);

  header.appendChild(skyline);
  header.appendChild(titleDiv);

  // Create city info grid
  const infoGrid = document.createElement("div");
  infoGrid.className = "city-info-grid mt-6";

  // City highlights column
  const highlightsCol = document.createElement("div");
  highlightsCol.className = "city-highlights";

  const highlightsTitle = document.createElement("h4");
  highlightsTitle.className = "text-xl font-bold text-saudi-green mb-4";
  highlightsTitle.textContent = "Regional Highlights";

  highlightsCol.appendChild(highlightsTitle);

  // Add highlight items
  cityData.highlights.forEach((highlight) => {
    const item = document.createElement("div");
    item.className = "city-highlight-item";

    const icon = document.createElement("div");
    icon.className = "city-highlight-icon";
    icon.innerHTML = getIconSVG(highlight.icon);

    const content = document.createElement("div");

    const itemTitle = document.createElement("h5");
    itemTitle.className = "font-bold text-text-primary mb-1";
    itemTitle.textContent = highlight.title;

    const itemContent = document.createElement("p");
    itemContent.className = "text-text-secondary text-sm";
    itemContent.textContent = highlight.content;

    content.appendChild(itemTitle);
    content.appendChild(itemContent);

    item.appendChild(icon);
    item.appendChild(content);

    highlightsCol.appendChild(item);
  });

  // City facts and map column
  const factsCol = document.createElement("div");

  const factsCard = document.createElement("div");
  factsCard.className = "bg-white p-4 rounded-lg shadow-sm mb-4";

  const factsTitle = document.createElement("h4");
  factsTitle.className = "text-lg font-bold text-saudi-green mb-2";
  factsTitle.textContent = "City Facts";

  const population = document.createElement("p");
  population.className = "mb-2 text-sm";
  population.innerHTML = `<strong>Population:</strong> ${cityData.population}`;

  const coordinates = document.createElement("p");
  coordinates.className = "text-sm";
  coordinates.innerHTML = `<strong>Coordinates:</strong> ${cityData.coordinates}`;

  factsCard.appendChild(factsTitle);
  factsCard.appendChild(population);
  factsCard.appendChild(coordinates);

  const mapContainer = document.createElement("div");
  mapContainer.className = "maps-container";

  // Create a proper iframe for Google Maps embedding
  const mapIframe = document.createElement("iframe");
  mapIframe.src = cityData.mapEmbed;
  mapIframe.className = "w-full h-full rounded-lg";
  mapIframe.style.border = "none";
  mapIframe.loading = "lazy";
  mapIframe.setAttribute("allowfullscreen", "");
  mapIframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");

  mapContainer.appendChild(mapIframe);

  factsCol.appendChild(factsCard);
  factsCol.appendChild(mapContainer);

  infoGrid.appendChild(highlightsCol);
  infoGrid.appendChild(factsCol);

  content.appendChild(header);
  content.appendChild(infoGrid);

  return content;
}

function getIconSVG(iconName) {
  const icons = {
    market:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/></svg>',
    building:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/><path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 2h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/></svg>',
    museum:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0a.5.5 0 0 1 .5.5V1h.5A1.5 1.5 0 0 1 10.5 2.5V15H15a1 1 0 0 1 1 1v.5a.5.5 0 0 1-1 0V16h-13v.5a.5.5 0 0 1-1 0V16a1 1 0 0 1 1-1h4.5V2.5A1.5 1.5 0 0 1 7.5 1H8V.5A.5.5 0 0 1 8 0ZM7.5 3h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5ZM7.5 6h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5ZM7.5 9h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm-3-6h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5ZM4.5 9h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Z"/></svg>',
    ship: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.5L2 15.5V14H0V2zm5.998 5.5a1.5 1.5 0 1 0-2.998.002 1.5 1.5 0 0 0 2.998-.002zM7.5 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4.5-.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>',
    calendar:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/></svg>',
    utensils:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/></svg>',
    award:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/><path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/></svg>',
    microscope:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M5 0a1 1 0 0 1 1 1v2h4a7 7 0 1 1-8 8h2a5 5 0 0 0 10 0c0-2.76-2.24-5-5-5H6V3a1 1 0 0 1-1-1V0zM4 3.5A1.5 1.5 0 0 1 5.5 2h5A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5h-1.338a1.5 1.5 0 0 1-1.12-.502l-1.302-1.4a1.5 1.5 0 0 1-.413-1.4l.295-1.473A1.5 1.5 0 0 1 11.5 6H13V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V6h2.5a.5.5 0 0 1 0 1H4v1h2.5a.5.5 0 0 1 0 1H4v1h3a.5.5 0 0 1 0 1H4a2 2 0 1 1 0-4h1V3.5z"/></svg>',
    tractor:
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8.5 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-1 0a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z"/><path d="M14 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-1 0a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z"/><path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1h-1V4H5v1H4V4zm1 7a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v1h-1v-1H6v1H5v-1z"/><path fill-rule="evenodd" d="M15.438 11a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.562a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-.562zm0 1H16v.5h-.562v-.5zm-9.937-8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.562a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-.562zm0 1H6v.5h-.562v-.5zm0 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.562a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-.562zm0 1H6v.5h-.562v-.5zm5-8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.562a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-.562zm0 1H11v.5h-.562v-.5zm0 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.562a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-.562zm0 1H11v.5h-.562v-.5z"/></svg>',
  };

  return icons[iconName] || "";
}

function initFaqAccordion() {
  // FAQ data
  const faqData = [
    {
      question:
        "What makes Saudi dates unique from other dates around the world?",
      answer:
        "Saudi dates are renowned for their exceptional quality, distinctive flavors, and rich nutritional content. The Kingdom's unique climate, fertile soil in oasis regions, and centuries of date farming expertise contribute to producing dates with unmatched sweetness, texture, and nutritional value. Saudi Arabia is also home to over 300 date varieties, many of which are exclusive to the region.",
    },
    {
      question: "How should I store dates to maintain their freshness?",
      answer:
        "For short-term storage (1-2 months), keep dates in an airtight container at room temperature away from direct sunlight. For longer preservation, refrigerate them in sealed containers where they can last 6-12 months. For extended storage (up to a year), freeze dates in airtight containers or freezer bags. Always ensure dates are stored in a dry environment to prevent moisture absorption.",
    },
    {
      question: "Are Saudi dates suitable for people with diabetes?",
      answer:
        "While dates contain natural sugars, they also have a low to medium glycemic index and are rich in fiber, which helps regulate blood sugar levels. Many people with diabetes can consume dates in moderation as part of a balanced diet. However, it's always recommended to consult with a healthcare provider for personalized advice regarding your specific health condition and dietary needs.",
    },
    {
      question: "What are the health benefits of consuming dates regularly?",
      answer:
        "Dates are nutrient powerhouses offering numerous health benefits. They're rich in fiber for digestive health, contain essential minerals like potassium and magnesium for heart health, provide natural energy from carbohydrates, contain antioxidants that fight inflammation, support bone health with minerals like calcium and phosphorus, may promote brain health, and can help with natural labor induction during pregnancy.",
    },
    {
      question: "Do you ship Saudi dates internationally?",
      answer:
        "Yes, we ship our premium Saudi dates worldwide. International shipping typically takes 5-10 business days depending on the destination country. We use special insulated packaging to ensure the dates remain fresh during transit. Please note that import duties and taxes may apply according to your country's regulations and are the responsibility of the customer.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, bank transfers, and cryptocurrency. All payment transactions are secured with industry-standard encryption technology to ensure your financial information remains protected. For orders within Saudi Arabia, we also offer cash on delivery.",
    },
    {
      question: "What is the cultural significance of dates in Saudi Arabia?",
      answer:
        "Dates hold profound cultural significance in Saudi Arabia, deeply embedded in the nation's heritage and daily life. They symbolize hospitality, with guests traditionally welcomed with dates and Arabic coffee. During Ramadan, dates are used to break the fast. Palm trees and dates appear in cultural art, poetry, and literature. The date harvest season is celebrated with festivals across the country, and dates are central to various religious customs and ceremonies.",
    },
    {
      question:
        "How can I incorporate dates into my daily diet beyond eating them plain?",
      answer:
        "There are numerous creative ways to include dates in your diet: use them as natural sweeteners in smoothies, blend into energy balls with nuts and seeds, chop and add to oatmeal or yogurt, stuff with nuts or cheese for an appetizer, use date paste as a sugar substitute in baking, add to salads for sweetness, blend into sauces or marinades, or process into homemade date syrup for drizzling over desserts and breakfast dishes.",
    },
    {
      question: "Are your dates organic and free from pesticides?",
      answer:
        "Our premium dates are grown with sustainable agricultural practices. Many of our date varieties are certified organic, grown without synthetic pesticides or fertilizers. For our conventional dates, we ensure minimal chemical intervention through integrated pest management techniques. We thoroughly wash and quality-check all our products before packaging. Each product page specifies whether the specific date variety is organic-certified or conventionally grown.",
    },
    {
      question: "What is the difference between soft, semi-dry, and dry dates?",
      answer:
        "The classification refers to moisture content and texture. Soft dates (like Medjool, Sukkari, and Barhi) have high moisture content (30-35%), giving them a soft, caramel-like texture and shorter shelf life. Semi-dry dates (like Deglet Noor, Safawi) have moderate moisture (20-30%) with a firmer yet tender texture and longer shelf life. Dry dates (like Thoory) have the lowest moisture content (10-20%), offering a chewy texture and the longest shelf life, making them excellent for storage.",
    },
  ];

  // Generate FAQ items
  const faqAccordion = document.querySelector(".faq-accordion");

  faqData.forEach((item, index) => {
    const faqItem = createFaqItem(item, index);
    faqAccordion.appendChild(faqItem);
  });
}

function createFaqItem(faqData, index) {
  const item = document.createElement("div");
  item.className = "faq-item";
  item.setAttribute("data-index", index);

  const question = document.createElement("div");
  question.className = "faq-question";

  const questionTitle = document.createElement("h3");
  questionTitle.textContent = faqData.question;

  const icon = document.createElement("div");
  icon.className = "faq-question-icon";
  icon.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

  question.appendChild(questionTitle);
  question.appendChild(icon);

  const answer = document.createElement("div");
  answer.className = "faq-answer";
  answer.innerHTML = `<p>${faqData.answer}</p>`;

  item.appendChild(question);
  item.appendChild(answer);

  // Add click event
  question.addEventListener("click", function () {
    item.classList.toggle("active");
  });

  return item;
}

function initScrollAnimations() {
  // Set up Intersection Observer for animation on scroll
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-up, .slide-right"
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

function initGSAPAnimations() {
  // Register ScrollTrigger with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Animated landmarks silhouette
  gsap.to(".landmarks-silhouette", {
    backgroundPositionX: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Section divider animations
  gsap.utils
    .toArray(".section-divider, .section-divider-alt")
    .forEach((divider) => {
      gsap.from(divider, {
        backgroundPositionX: -window.innerWidth + "px",
        ease: "none",
        scrollTrigger: {
          trigger: divider,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      });
    });

  // FAQ animations
  gsap.from(".faq-item", {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#faq",
      start: "top 80%",
    },
  });
}
