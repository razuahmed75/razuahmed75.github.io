(function () {
  // const FALLBACK_REPLIES = [
  //     "✨ I'm not sure I follow — try asking about Razu's skills, projects, experience, education, or contact info.",
  //     "✨ Hmm, could you rephrase that? I can talk about Razu's work, background, or how to reach him.",
  //     "✨ I don't have info on that. Ask me about skills, projects, experience, education, or contact.",
  //     "✨ Not sure about that — ask about skills, projects, experience, education, or contact.",
  //     "✨ Try asking about Razu's skills, projects, experience, education, or contact.",
  //     "✨ Not in my knowledge base. Ask about skills, projects, experience, education, or contact.",
  // ];

  const FALLBACK_REPLIES = [
    //---------------51 fallback---------//
    "✨ এই প্রশ্ন শুনে আমার CPU বললো, 'আমি ছুটি চাই!' 😵",
    "✨ আমি এতক্ষণ উত্তর খুঁজলাম, শেষে Google-ও বললো 'ভাই, পারলাম না!' 😂",
    "✨ আমার RAM এই প্রশ্ন প্রসেস করতে গিয়ে ফুল হয়ে গেছে! 🧠💥",
    "✨ এই প্রশ্নটা এমন, আমার AI-ও বলে দিলো 'নাহ, আজকে না!' 🤖",
    "✨ Bro, এইটা শুনে আমার JavaScript-ও undefined হয়ে গেছে! 😅",
    "✨ আমি উত্তর খুঁজতে গিয়ে Stack Overflow-তে হারিয়ে গিয়েছিলাম! 🚀",
    "✨ আমার if-else সব ফেল করেছে, এখন switch-case-ও কান্না করছে। 😭",
    "✨ এই প্রশ্নে আমার keyboard নিজেই Alt + F4 চাপতে চাইছে! 😂",
    "✨ আমার compiler এই প্রশ্ন দেখে warning না, সরাসরি resignation দিলো! 🤣",
    "✨ আমার cache-এ এই প্রশ্নের উত্তর ছিল না, cache miss! 💨",
    "✨ এই প্রশ্নটা এমন, ChatGPT-কে জিজ্ঞেস করলেও ও আগে কফি খাবে! ☕",
    "✨ আমার প্রসেসর বলছে: 'Boss, overtime লাগবে!' 😵",
    "✨ এই প্রশ্ন শুনে WiFi-ও disconnect হয়ে গেলো! 📶💀",
    "✨ Error 418: I'm a teapot... আর এই প্রশ্নের উত্তরও আমার কাছে নাই! 🫖",
    "✨ উত্তর খুঁজতে গিয়ে আমি নিজের source code-ই ভুলে গেছি! 🤦",
    "✨ এই প্রশ্নে আমার code review reject হয়ে গেছে! 😆",
    "✨ আমার AI confidence 100% থেকে 0% হয়ে গেলো! 📉",
    "✨ এই প্রশ্নটা এমন, debugger-ও breakpoint ছেড়ে পালিয়ে গেছে! 🏃",
    "✨ Bro, আমার algorithm এইখানে এসে হাঁটু গেড়ে বসে পড়েছে! 😂",
    "✨ আমি তো ভাবলাম prank করতেছো! 😅",
    "✨ আমার GPU বলছে, 'Graphics আঁকতে পারি, উত্তর না!' 🎮",
    "✨ এই প্রশ্নে আমার battery 100% থেকে 1% হয়ে গেছে! 🔋",
    "✨ আমার terminal-এ শুধু একটা output আসছে: 'Bruh...' 😐",
    "✨ Segmentation fault... আমার brain.exe কাজ করা বন্ধ করে দিয়েছে! 💀",
    "✨ এই প্রশ্নটা আমার database-এর বাইরে exile হয়ে আছে! 🚫",
    "✨ আমি উত্তর আনতে গিয়েছিলাম, কিন্তু return statement-টাই খুঁজে পেলাম না! 😭",
    "✨ আমার function recursive হয়ে নিজেই নিজেকে জিজ্ঞেস করছে! 🤯",
    "✨ এই প্রশ্নে আমার internet speed 5G থেকে Edge হয়ে গেছে! 🐢",
    "✨ Bro... এইটা শুনে আমার fan full speed-এ ঘুরতেছে! 🌪️",
    "✨ আমি উত্তর খুঁজতে খুঁজতে npm install চালিয়ে ঘুমিয়ে পড়েছিলাম। 😴",
    "✨ এই প্রশ্নটা দেখে VS Code-ও auto close হয়ে গেলো! 😂",
    "✨ আমার code lint pass করলো, কিন্তু এই প্রশ্ন pass করতে পারলাম না! 😅",
    "✨ এইটা এমন প্রশ্ন, interview board-ও skip করে দিতো! 🤣",
    "✨ আমার brain buffer overflow হয়ে গেছে! 💥",
    "✨ Ctrl + Z মারলেও এই প্রশ্ন বুঝতে পারলাম না! 😭",
    "✨ আমার কাছে এইটার উত্তর নাই, কিন্তু memes থাকলে হাজারটা দিতে পারতাম! 😎",
    "✨ এই প্রশ্নটা এমন, NASA-ও mission cancel করে দিতো! 🚀",
    "✨ Bro, আমি bot... বাবা লোকনাথ না! 😅",
    "✨ আমার AI certificate এই প্রশ্ন দেখে expire হয়ে গেছে! 📜",
    "✨ আমি এখন officially confused.exe চালাচ্ছি... 🤯",
    "✨ এই প্রশ্নটা বুঝতে গেলে আগে PhD লাগবে মনে হচ্ছে! 🎓",
    "✨ আমার brain loading... loading... loading... এখনও loading! ⏳",
    "✨ উত্তরটা ছিল... ছিল... ওহ না, garbage collector নিয়ে গেছে! 🗑️",
    "✨ আমার console.log() শুধু বলছে: 'কি বললি ভাই?' 😂",
    "✨ এই প্রশ্ন শুনে আমার source code লজ্জায় hide হয়ে গেছে! 🙈",
    "✨ Bro, এইটা এমন প্রশ্ন যেটা exam-এ আসলে সবাই washroom-এ চলে যেতো! 🚽🤣",
    "✨ আমার AI আজকে casual leave-এ আছে। কাল আবার চেষ্টা কইরো! 😆",
    "✨ এই প্রশ্নে আমি 404 না, 503 Service Unavailable হয়ে গেছি! 🤖",
    "✨ আমার brain.exe stopped working. Windows-ও solution দিতে পারলো না! 💀",
    "✨ একটু easy mode-এ আসো বস, hard mode unlock কইরো না! 🎮",
    
    //---------------50 fallback---------//
    "✨ আরে আরে! এই প্রশ্ন শুনে আমার CPU ফ্যান হাওয়া খাওয়া শুরু করে দিছে! 🌪️",
    "✨ আমি উত্তর খুঁজতে গিয়ে নিজের README পড়া শুরু করে দিছি! 📖",
    "✨ এই প্রশ্নটা এতই কঠিন, আমার AI-ও Google খুলে বসছে! 🤖",
    "✨ আমার কোড এই প্রশ্ন দেখে console-এ শুধু '😭' প্রিন্ট করছে!",
    "✨ Bro, এইটা বুঝতে গেলে আমার firmware update লাগবে! 🔄",
    "✨ এই প্রশ্নে আমার cache-ও বলছে, 'ভাই আমি নাই!' 😅",
    "✨ আমি Echo, কিন্তু এই প্রশ্ন শুনে echo-ও ফেরত আসলো না! 🏔️",
    "✨ এই প্রশ্নটা আমার brain-এর জন্য premium feature! 💳😂",
    "✨ Loading answer... 1%... 1%... 1%... 😭",
    "✨ আমার algorithm এই প্রশ্ন দেখে দুই দিনের ছুটি নিয়েছে! 🏖️",
    "✨ ওহ! এই প্রশ্নটা আমার confidence-কে uninstall করে দিলো! 😂",
    "✨ Bro, এইটা এমন প্রশ্ন যেটা interviewer-ও করতে ভয় পায়! 😆",
    "✨ আমার console.log() নিজেই delete হয়ে গেলো! 💀",
    "✨ আমি এতক্ষণ ভাবলাম, শেষে বুঝলাম আমিও বুঝি নাই! 🤦",
    "✨ এই প্রশ্নে আমার RAM আর ROM একসাথে ঝগড়া শুরু করছে! 😂",
    "✨ আমার debugger breakpoint না দিয়ে breakdance শুরু করে দিছে! 🕺",
    "✨ এই প্রশ্নের উত্তর দিতে গেলে আমার warranty শেষ হয়ে যাবে! 📃",
    "✨ একটু আস্তে ভাই! আমি এখনো beta version! 🧪",
    "✨ আমার source code এই প্রশ্ন দেখে VPN অন করে পালাইছে! 🏃",
    "✨ আমার AI model বলছে, 'আজকে একটু রেস্ট নিই?' 😴",
    "✨ Bro, এই প্রশ্নটা আমার syllabus-এর optional chapter-ও না! 📚",
    "✨ আমার keyboard-এর সব key একসাথে facepalm করছে! 🤦⌨️",
    "✨ এই প্রশ্নটা বুঝতে গেলে আমার internet-এর সাথে brain-ও connect লাগবে! 🌐",
    "✨ আমার processor এই প্রশ্নে overheat warning দেখাচ্ছে! 🔥",
    "✨ আমি তো ভাবছিলাম সহজ কিছু হবে... ধরা খেয়ে গেলাম! 😅",
    "✨ Error: Confidence not found. Please try again later. 🤖",
    "✨ এই প্রশ্নে আমি silent mode-এ চলে গেছি! 🤐",
    "✨ আমার AI এখন emergency meeting-এ আছে। 😆",
    "✨ এই প্রশ্ন শুনে আমার battery saver mode অন হয়ে গেছে! 🔋",
    "✨ Bro, আমার code এই প্রশ্নে compile না, complain করছে! 😂",
    "✨ আমার brain.zip extract করতে পারলাম না! 📦",
    "✨ এই প্রশ্নটা আমার coding interview-র nightmare! 😭",
    "✨ আমার answer API timeout হয়ে গেছে! ⏰",
    "✨ Bro, একটু mercy করো! আমি ছোট্ট terminal bot! 🥹",
    "✨ আমার server বলছে: '503... পরে আইসো!' 🚧",
    "✨ এই প্রশ্নে আমার emoji-ও confused হয়ে গেছে! 😵‍💫",
    "✨ আমার AI-কে reboot দিলেও এইটার উত্তর বের হবে কিনা সন্দেহ! 🔄",
    "✨ আমার confidence level এখন airplane mode-এ! ✈️",
    "✨ এই প্রশ্নটা এমন, calculator-ও divide by zero দেখায়! ➗",
    "✨ Bro, একটু hint দিলে হয়তো পাশ করতে পারতাম! 😭",
    "✨ আমার code এখন existential crisis-এ ভুগতেছে! 🤯",
    "✨ আমার উত্তর দিতে ইচ্ছা ছিল... কিন্তু answer.exe missing! 📂",
    "✨ আমি এতক্ষণ processing করলাম, শেষে 'Nope' পেলাম! 😂",
    "✨ আমার CPU বলছে, 'Boss, increment দাও আগে!' 💰",
    "✨ এই প্রশ্নে আমার brain garbage collection-এ চলে গেছে! 🗑️",
    "✨ Bro, আমি উত্তর খুঁজতে গিয়ে নিজেই lost and found-এ চলে গেছি! 🧭",
    "✨ আমার neural network আজকে strike-এ আছে! 🚩",
    "✨ এই প্রশ্নটা শুনে VS Code dark mode-ও ফ্যাকাশে হয়ে গেছে! 🌑",
    "✨ আমার AI বলছে, 'ভাই, অন্য কিছু জিজ্ঞেস করো প্লিজ!' 🥹",
    "✨ এই প্রশ্নটা আমার confidence-কে git reset --hard করে দিলো! 💥"
  ];

  const THINKING_LABELS = ['✨ Thinking', '✨ Processing', '✨ One moment', '✨ Looking that up', '✨ Analyzing', '✨ Computing', '✨ Working on it', '✨ Just a sec', '✨ Fetching data', '✨ Crunching numbers'];

  const TOOLTIP_TEXTS = [
    '💬 Need help? Ask me anything!',
    '🛠️ Want to know my skills?',
    '🚀 Curious about my projects?',
    '💼 Ask about my experience!',
    '🎓 See my education details?',
    '⚡ What tech stack do I use?',
    '🏆 See my achievements?',
  ];

  const SUGGESTED_QUESTIONS = [
    '✨ What skills does Razu have?',
    '✨ What projects has Razu built?',
    '✨ What is Razu\'s experience?',
    '✨ Can you tell me about Razu?',
  ];

  const KB = [
    //-----General-------//
    { topic: 'education', keys: ['education','educational','degree','degrees','background','study','studied','studies','university','universities','college','academic','academics','qualification','qualifications','school','graduate','graduated','bsc','diploma','gpa','learn'], replies: ["BSc in Computer Science, European University of Bangladesh (2024–Current). Diploma in Computer Science, Munshiganj Polytechnic Institute (2018–2022, GPA 3.48/4.00).","Razu is currently pursuing a BSc in Computer Science at European University of Bangladesh (2024–Current), and holds a Diploma in Computer Science from Munshiganj Polytechnic Institute (2018–2022, GPA 3.48/4.00)."], more: "Razu's diploma coursework covered structured programming, databases, and software engineering fundamentals, which built the foundation for his current BSc studies." },
    { topic: 'skills', keys: ['skill','skills','skilled','tech','technical','technology','technologies','stack','framework','frameworks','language','languages','proficient','proficiency','expertise','know','knows','good at','capable','capabilities','tools','toolset','programming'], replies: ["Razu works with Dart, Flutter, JavaScript, HTML/CSS. State management: Riverpod, GetX, Bloc, Provider. Local DB: Hive, Isar, SQLite, ObjectBox. Networking: Dio, Retrofit, Chopper. Also Git, Firebase, REST APIs, Clean Architecture.","His core toolkit: Dart & Flutter for cross-platform apps, GetX/Riverpod/Bloc/Provider for state management, Hive/Isar/SQLite/ObjectBox for local storage, and Dio/Retrofit for networking — all backed by Firebase and Clean Architecture."], more: "Beyond the basics: Razu also handles CI/CD pipelines, REST API integration, third-party SDK integration (payments, maps, push notifications), app performance profiling, and reducing APK/IPA build sizes." },
    { topic: 'projects', keys: ['project','projects','app','apps','application','applications','portfolio','built','build','made','make','created','create','developed','develop','shipped','launched', 'live', 'published'], replies: ["Razu's projects:\n\n\n• Giftily — Play Store: https://play.google.com/store/apps/details?id=com.giftily_dz.app&hl=en | CodeCanyon: https://codecanyon.net/item/gamers-arena-on-demand-game-shop-cross-platform-mobile-application/51225336\n\n\n• Lama.ng — Play Store: https://play.google.com/store/apps/details?id=com.lama.ng&hl=en | App Store: https://apps.apple.com/us/app/lama-ng/id6756806464\n\n\n• Golala BillPay — Play Store: https://play.google.com/store/apps/details?id=com.golala.billpayment&hl=en | App Store: https://apps.apple.com/us/app/golala-billpay-solutions/id6743252509 | CodeCanyon: https://codecanyon.net/item/bill-pay-topup-recharge-and-utility-bill-payment-mobile-app/50124639?s_rank=26\n\n\n• Agriwealth — Play Store: https://play.google.com/store/apps/details?id=com.stip.club | CodeCanyon: https://codecanyon.net/item/agriwealth-agricultural-hyip-investment-mobile-application-android-ios/55396787?s_rank=15\n\n\n• Listplace — CodeCanyon: https://codecanyon.net/item/listplace-business-directory-listing-flutter-app-android-ios/57380835?s_rank=10\n\n\n• HYIP PRO — CodeCanyon: https://codecanyon.net/item/hyip-pro-cross-platform-mobile-application/49701045?s_rank=28\n\n\n• Coinectra — CodeCanyon: https://codecanyon.net/item/coinectra-buy-sell-and-crypto-currency-exchange-flutter-app-android-ios/58421141?s_rank=6\n\n\n• Waiz — CodeCanyon: https://codecanyon.net/item/waiz-digital-wallet-and-remittance-app-and-website-with-admin-panel/53238316?s_rank=22\n\n\n• Paysecure-User — CodeCanyon: https://codecanyon.net/item/paysecure-digital-wallet-flutter-app-android-ios/58040829?s_rank=7\n\n\n• Paysecure-Merchant — CodeCanyon: https://codecanyon.net/item/pay-secure-digital-wallet-application-for-merchant-android-ios/58793831?s_rank=1\n\n\n• Paysecure-Agent — CodeCanyon: https://codecanyon.net/item/pay-secure-digital-wallet-application-for-agent-android-ios/58793829?s_rank=2"], more: "A few highlights: Giftily handles real-time game top-ups with Pusher signaling; Lama.ng is a full service marketplace with Google Maps integration; Paysecure spans three connected apps (User, Merchant, Agent) for a complete digital wallet ecosystem." },
    { topic: 'experience', keys: ['experience','experienced','job','jobs','career','company','companies','role','roles','position','positions','employer','employers','work history','professional','years of experience','current job','current role'], replies: ["Senior Flutter Developer @ Bug Finder (Nov 2023–Present): leads mobile dev team, architects apps, mentors juniors, optimizes performance, CI/CD. Previously Junior Flutter Developer @ Bringin Technologies Ltd (Feb–Sep 2023).","Currently Senior Flutter Developer at Bug Finder since Nov 2023, leading the mobile team and mentoring developers. Before that, he was a Junior Flutter Developer at Bringin Technologies Ltd (Feb–Sep 2023)."], more: "At Bug Finder, Razu also handles client communication for international projects, sets up CI/CD pipelines, and profiles apps to cut load times and build sizes. At Bringin Technologies, he worked closely with backend teams on secure payment and bank-transfer flows." },
    { topic: 'contact', keys: ['contact','email','e-mail','hire','hiring','reach','linkedin','connect','get in touch','message him','talk to him'], replies: ["Reach Razu at +880 1706-084790, LinkedIn: https://linkedin.com/in/razuahmed75 , or via the contact form on this page.","You can email razuahmed8641@gmail.com, connect on LinkedIn (linkedin.com/in/razuahmed75), or use the contact form above."] },
    { topic: 'resume', keys: ['resume','cv','curriculum vitae'], replies: ["Download Razu's CV: https://surl.li/wledoq"] },
    { topic: 'github', keys: ['github','git hub','repo','repos','repository'], replies: ["GitHub: https://github.com/razuahmed75"] },
    { topic: 'twitter', keys: ['twitter','tweet','tweets','x profile'], replies: ["Twitter/X: https://twitter.com/razuahmed8641"] },
    { topic: 'facebook', keys: ['facebook','fb'], replies: ["Facebook: https://www.facebook.com/razu8641/"] },
    { topic: 'blog', keys: ['blog','blogs','writing','articles'], replies: ["Blog: https://razuahmed75.blogspot.com/"] },
    { topic: 'photos', keys: ['photo','photos','gallery','pictures','images'], replies: ["Photo Gallery: https://razuahmed75.blogspot.com/p/photo-gallery.html"] },
    { topic: 'codewars', keys: ['codewars','coding challenges','katas'], replies: ["Codewars: https://www.codewars.com/users/razuahmed75"] },
    { topic: 'location', keys: ['location','where','based','dhaka','bangladesh','live','lives','living','from'], replies: ["Razu is based in Uttara, Dhaka, Bangladesh."] },
    { topic: 'phone', keys: ['phone','number','call','mobile','whatsapp'], replies: ["Phone: +880 1706-084790"] },
    { topic: 'who', keys: ['who','yourself','razu','introduce','introduction','bio','about him','about you'], replies: ["Razu Ahmed is a Senior Flutter Developer with 4+ years building cross-platform apps for Android & iOS. Leads mobile dev, architects solutions, mentors developers.","Meet Razu — a Senior Flutter Developer with 4+ years shipping Android & iOS apps, leading teams, and mentoring junior developers."], more: "Outside of Flutter, Razu enjoys exploring new mobile architectures, mentoring junior devs, and tackling coding challenges on Codewars." },
    
    { topic: 'help', keys: ['help','commands','options','what can you do'], replies: ["✨ Ask about skills, projects, experience, education, contact, resume, or socials!"], smalltalk: true },
    { topic: 'greeting', keys: ['hi','hii','hiii','hello','helloo','hlw','hlww', 'hllw','hhlw','hey','heyy','yo','hiya','hola','sup','wassup','wsp','what\'s up','whats up','howdy','greetings','good morning','good afternoon','good evening','good night','morning','afternoon','evening','hi there','hello there','hey there','how are you','how are u','how r u','how\'s it going','hows it going','how are things','nice to meet you','good to see you','long time no see','are you there','anyone there','echo','echo hi','echo hello','hi echo','hello echo','hey echo','hi razu','hello razu','hey razu','হাই','হ্যালো','হেলো','হেই','হে','সালাম','আসসালামু আলাইকুম','আসসালামুয়ালাইকুম','ওয়ালাইকুম সালাম','শুভ সকাল','সুপ্রভাত','শুভ দুপুর','শুভ সন্ধ্যা','শুভ রাত্রি','কেমন আছো','কেমন আছেন','কি খবর','কী খবর','খবর কি','আছেন নাকি','কেউ আছেন','এই শুনছেন','হ্যালো ভাই','হ্যালো বন্ধু','হাই ভাই','হাই echo','হ্যালো echo'], replies: ["👋 Hey! Welcome! I'm Echo, Razu's AI assistant. Ask me anything about Razu!","😄 Hello! Great to see you. What would you like to know about Razu?","✨ Hi there! I can tell you about Razu's skills, projects, experience, education, or contact information.","🚀 Hey! Ready to explore Razu's portfolio? Ask me anything!","🤖 Hello! I'm Echo. How can I help you today?","🌟 Hi! Want to know about Razu's Flutter journey, projects, or experience?","👋 Welcome aboard! I'm here to answer your questions about Razu.","💙 Assalamu Alaikum! I'm Echo. What would you like to know about Razu?","⚡ Hey buddy! Feel free to ask me anything related to Razu.","😊 Hello! Let's get started. Ask me about Razu's skills, projects, experience, education, or resume!"], smalltalk: true },
    { topic: 'howareyou', keys: ['how are you','hows it going',"how's it going",'how are you doing'], replies: ["✨ Running smoothly, thanks for asking! What would you like to know about Razu?","All systems good here. Ask me anything about Razu's work!"], smalltalk: true },
    { topic: 'identity', keys: ['are you real','are you ai','are you human','are you a bot','are you chatgpt','are you gpt','are you gemini','what are you'], replies: ["✨ I'm Echo — a lightweight assistant built into this portfolio to answer questions about Razu. Not a general-purpose AI, just here to help you learn about his work!"], smalltalk: true },
    { topic: 'thanks', keys: ['thank','thanks','thank you','appreciate'], replies: ["✨ You're welcome! Anything else you'd like to know about Razu?","Anytime! Let me know if you want to know more about Razu's work."], smalltalk: true },
    { topic: 'bye', keys: ['bye','goodbye','see you','later'], replies: ["✨ Goodbye! Feel free to come back anytime.","See you! Come back if you have more questions about Razu."], smalltalk: true },

    //-----Additional-------//
    { topic: 'hobbies', keys: ['hobby','hobbies','interest','interests','free time','spare time','fun','passion','passionate','likes','enjoy','enjoys'], replies: ["When he's not coding, Razu likes tackling algorithm puzzles on Codewars and exploring new Flutter architecture patterns.","Outside work, Razu spends time on Codewars challenges and experimenting with new mobile dev techniques."] },
    { topic: 'why_flutter', keys: ['why flutter','why dart','why does he use flutter','flutter over','why choose flutter'], replies: ["Razu prefers Flutter for its single codebase covering both iOS and Android with near-native performance and a rich widget ecosystem.","He picked Flutter because it lets him ship polished, fast apps to both platforms from one codebase — with hot reload speeding up iteration."] },
    { topic: 'availability', keys: ['available','availability','freelance','freelancing','open to work','looking for work','open for hire','part time','full time'], replies: ["Razu's currently working full-time at Bug Finder, but he's open to interesting freelance or collaboration opportunities — reach out via email or LinkedIn.","He's open to discussing new opportunities; best way in is email or LinkedIn."] },
    { topic: 'rate', keys: ['rate','rates','price','pricing','cost','budget','how much','charge','charges'], replies: ["Rates depend on project scope — best to reach out directly via email or the contact form so Razu can give you an accurate quote."] },
    { topic: 'timezone', keys: ['timezone','time zone','working hours','office hours','when does he work'], replies: ["Razu is based in Dhaka, Bangladesh (GMT+6), and typically works standard business hours there."] },
    { topic: 'languages_spoken', keys: ['speak','speaks','language he speaks','bengali','bangla','english fluent'], replies: ["Razu is fluent in both Bengali and English."] },
    { topic: 'strengths', keys: ['strength','strengths','best at','specialize','specializes','specialty','specialization'], replies: ["Razu's strongest area is building production-grade Flutter apps end-to-end — architecture, state management, API integration, and App Store/Play Store deployment.","He specializes in cross-platform Flutter development, from clean architecture to shipping on both app stores."] },
    { topic: 'teamwork', keys: ['team player','leadership','lead','leads','manage','managing','mentoring','mentor'], replies: ["As a Senior Flutter Developer, Razu leads the mobile team, mentors junior developers, and handles architecture decisions on client projects."] },
    { topic: 'fun_fact', keys: ['fun fact','something interesting','surprise me','random fact','tell me something cool'], replies: ["Fun fact: Razu has shipped 30+ production Flutter apps across fintech, e-commerce, and crypto — from solo builds to leading a team."] },

    //-----Project description-------//
    { topic: 'giftily', keys: ['giftily', 'game'], replies: ["Play Store: https://play.google.com/store/apps/details?id=com.giftily_dz.app&hl=en\nCodeCanyon: https://codecanyon.net/item/gamers-arena-on-demand-game-shop-cross-platform-mobile-application/51225336\n\nGame top-ups & gift cards platform for gamers in Algeria — fast, secure, feature-packed for pros and enthusiasts. Stack: Flutter, Riverpod, Firebase, Pusher, REST API, Dio+Retrofit, Dart Isolate, Isar."] },
    { topic: 'lamang', keys: ['lama ng','lamang','lama', 'lama.ng'], replies: ["Play Store: https://play.google.com/store/apps/details?id=com.lama.ng&hl=en\nApp Store: https://apps.apple.com/us/app/lama-ng/id6756806464\n\nConnects users with trusted service providers across categories — explore, compare, and hire professionals easily. Stack: Flutter, Riverpod, Firebase, Google Map, Pusher."] },
    { topic: 'golala', keys: ['golala','billpay','bill pay'], replies: ["Play Store: https://play.google.com/store/apps/details?id=com.golala.billpayment&hl=en\nApp Store: https://apps.apple.com/us/app/golala-billpay-solutions/id6743252509\nCodeCanyon: https://codecanyon.net/item/bill-pay-topup-recharge-and-utility-bill-payment-mobile-app/50124639?s_rank=26\n\nOne-stop payment app for top-ups, recharges, and utility bill management. Stack: Flutter, Riverpod, Pusher, REST API."] },
    { topic: 'agriwealth', keys: ['agriwealth'], replies: ["Play Store: https://play.google.com/store/apps/details?id=com.stip.club\nCodeCanyon: https://codecanyon.net/item/agriwealth-agricultural-hyip-investment-mobile-application-android-ios/55396787?s_rank=15\n\nAgricultural investment companion app — portfolio access, transactions, real-time updates. Stack: Flutter, Riverpod, Firebase, Hive."] },
    { topic: 'listplace', keys: ['listplace'], replies: ["CodeCanyon: https://codecanyon.net/item/listplace-business-directory-listing-flutter-app-android-ios/57380835?s_rank=10\n\nBusiness directory listing app — explore, add, and manage listings on the go. Stack: Flutter, GetX, Pusher, Google Map."] },
    { topic: 'hyippro', keys: ['hyip','hyip pro'], replies: ["CodeCanyon: https://codecanyon.net/item/hyip-pro-cross-platform-mobile-application/49701045?s_rank=28\n\nHigh Yield Investment Platform companion app for building and managing an investment venture. Stack: Flutter, Riverpod, Pusher, REST API."] },
    { topic: 'coinectra', keys: ['coinectra'], replies: ["CodeCanyon: https://codecanyon.net/item/coinectra-buy-sell-and-crypto-currency-exchange-flutter-app-android-ios/58421141?s_rank=6\n\nCrypto exchange app — trade swaps, fiat transactions, monitor balances securely. Stack: Flutter, GetX, Pusher, REST API."] },
    { topic: 'waiz', keys: ['waiz'], replies: ["CodeCanyon: https://codecanyon.net/item/waiz-digital-wallet-and-remittance-app-and-website-with-admin-panel/53238316?s_rank=22\n\nGlobal digital wallet & remittance app — fast, reliable international transfers at lower cost. Stack: Flutter, GetX, Pusher, Hive."] },
    { topic: 'paysecureuser', keys: ['paysecure-user','paysecure user'], replies: ["CodeCanyon: https://codecanyon.net/item/paysecure-digital-wallet-flutter-app-android-ios/58040829?s_rank=7\n\nDigital wallet app — manage money, transfer balances, secure transactions. Stack: Flutter, GetX, Pusher, REST API."] },
    { topic: 'paysecuremerchant', keys: ['paysecure-merchant','paysecure merchant'], replies: ["CodeCanyon: https://codecanyon.net/item/pay-secure-digital-wallet-application-for-merchant-android-ios/58793831?s_rank=1\n\nBusiness payment app — accept payments, track history, check settlements. Stack: Flutter, GetX, Pusher, Hive."] },
    { topic: 'paysecureagent', keys: ['paysecure-agent','paysecure agent'], replies: ["CodeCanyon: https://codecanyon.net/item/pay-secure-digital-wallet-application-for-agent-android-ios/58793829?s_rank=2\n\nField agent app — assist with cash deposits, withdrawals, wallet transactions. Stack: Flutter, GetX, Pusher, REST API."] },
    { topic: 'paysecure', keys: ['paysecure'], replies: ["User: https://codecanyon.net/item/paysecure-digital-wallet-flutter-app-android-ios/58040829?s_rank=7\nMerchant: https://codecanyon.net/item/pay-secure-digital-wallet-application-for-merchant-android-ios/58793831?s_rank=1\nAgent: https://codecanyon.net/item/pay-secure-digital-wallet-application-for-agent-android-ios/58793829?s_rank=2\n\nThree-app ecosystem — User (wallet), Merchant (payments), Agent (field cash ops). All Flutter, GetX, Pusher."]},
  ];

  function normalize(s) {
    return s.toLowerCase().replace(/[^a-z0-9'\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function matchScore(query, keys) {
    let score = 0;
    for (const k of keys) {
      const re = new RegExp('\\b' + escapeRegex(k) + '\\b', 'i');
      if (re.test(query)) score += k.length;
    }
    return score;
  }

  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
      }
    }
    return dp[m][n];
  }

  function fuzzyMatch(q) {
    const tokens = q.split(/[^a-z0-9']+/).filter(w => w.length >= 4);
    if (!tokens.length) return null;
    let best = null, bestScore = 0;
    for (const entry of KB) {
      let s = 0;
      for (const k of entry.keys) {
        for (const kw of k.split(' ')) {
          if (kw.length < 4) continue;
          for (const t of tokens) {
            const d = levenshtein(t, kw);
            const thresh = kw.length >= 7 ? 2 : 1;
            if (d <= thresh) s += kw.length - d;
          }
        }
      }
      if (s > bestScore) { bestScore = s; best = entry; }
    }
    return bestScore > 0 ? best : null;
  }

  function isMoreRequest(q) {
    return /\b(more|elaborate|expand|explain further|go on|continue|tell me more|any more details|anything else about (that|this))\b/.test(q);
  }

 function linkify(text) {
    return text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color:#3b82f6;text-decoration:underline;">$1</a>').replace(/\n/g, '<br>');
 }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function finalize(entry) {
    return { reply: pick(entry.replies), topic: entry.smalltalk ? null : entry.topic };
  }

  function getLocalResponse(rawQuery, lastTopic) {
    const q = normalize(rawQuery);
    if (!q) return { reply: pick(FALLBACK_REPLIES), topic: null, isFallback: true };
    let best = null, bestScore = 0;
    for (const entry of KB) {
      const s = matchScore(q, entry.keys);
      if (s > bestScore) { bestScore = s; best = entry; }
    }
    if (best) return { ...finalize(best), isFallback: false };
    if (isMoreRequest(q)) {
      if (lastTopic) {
        const entry = KB.find(e => e.topic === lastTopic);
        if (entry && entry.more) return { reply: entry.more, topic: lastTopic, isFallback: false };
        if (entry) return { reply: "That's about everything I've got on that — ask me something else!", topic: lastTopic, isFallback: false };
      }
      return { reply: "More about what? Try asking about skills, projects, experience, education, or contact first.", topic: null, isFallback: false };
    }
    const fuzzy = fuzzyMatch(q);
    if (fuzzy) return { ...finalize(fuzzy), isFallback: false };
    return { reply: pick(FALLBACK_REPLIES), topic: null, isFallback: true };
  }

  function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  function initEchoTerminal() {
    const fabHtml = `<button class="echo-fab echo-fab-pulse" id="echo-fab" aria-label="Open Echo Terminal"><i class="fas fa-terminal"></i></button>\n<div class="echo-tooltip" id="echo-tooltip">${TOOLTIP_TEXTS[0]}</div>`;

    const windowHtml = `
      <div class="echo-window echo-terminal-font" id="echo-window">
        <div class="echo-header">
          <div class="echo-dots">
            <span class="echo-dot echo-dot-red" id="echo-dot-close" title="Close"></span>
            <span class="echo-dot echo-dot-yellow"></span>
            <span class="echo-dot echo-dot-green"></span>
          </div>
          <div class="echo-title"><span>&gt;_</span> Echo Terminal</div>
          <button class="echo-close-btn" id="echo-close-x" aria-label="Close terminal">&times;</button>
        </div>
        <div class="echo-messages-container" id="echo-messages">
          <div class="echo-message-box">
            <div class="echo-label-welcome">✨ Welcome to Echo Terminal</div>
            <div>Type a message or pick a suggestion below:</div>
          </div>
          <div class="echo-suggestions" id="echo-suggestions"></div>
        </div>
        <div class="echo-input-area">
          <div class="echo-input-row">
            <textarea class="echo-textarea echo-terminal-font" id="echo-input" placeholder="Type your message here.." rows="1"></textarea>
            <button class="echo-send-btn" id="echo-send" disabled aria-label="Send Message"><i class="fas fa-arrow-up"></i></button>
          </div>
          <div class="echo-input-hints">
            <span>Press Enter to send</span>
            <span>Shift+Enter for newline</span>
          </div>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = fabHtml + windowHtml;
    document.body.appendChild(container);

    const fab = document.getElementById('echo-fab');
    const tooltip = document.getElementById('echo-tooltip');
    const windowEl = document.getElementById('echo-window');
    const closeDot = document.getElementById('echo-dot-close');
    const closeX = document.getElementById('echo-close-x');
    const messagesContainer = document.getElementById('echo-messages');
    const inputField = document.getElementById('echo-input');
    const sendBtn = document.getElementById('echo-send');
    const suggestionsEl = document.getElementById('echo-suggestions');

    let tooltipIndex = 0;

    function rotateTooltip() {
      tooltipIndex = (tooltipIndex + 1) % TOOLTIP_TEXTS.length;
      tooltip.textContent = TOOLTIP_TEXTS[tooltipIndex];
    }

    const tooltipInterval = setInterval(rotateTooltip, 3000);

    let availableQuestions = SUGGESTED_QUESTIONS.slice();

    function renderSuggestions() {
      suggestionsEl.innerHTML = '';
      availableQuestions.forEach(function(q) {
        const chip = document.createElement('button');
        chip.className = 'echo-chip';
        chip.textContent = q;
        chip.addEventListener('click', function() {
          chip.remove();
          availableQuestions = availableQuestions.filter(function(x) { return x !== q; });
          inputField.value = q;
          sendMessage();
        });
        suggestionsEl.appendChild(chip);
      });
    }
    let chatHistory = [];
    let lastTopic = null;

    function loadHistory() {
      const saved = sessionStorage.getItem('echo_chat_history');
      if (!saved) return;
      try {
        chatHistory = JSON.parse(saved);
        chatHistory.forEach(msg => appendInstant(msg.role === 'user' ? 'You' : 'Echo', msg.content, msg.role, false));
        for (let i = chatHistory.length - 1; i >= 0; i--) {
          if (chatHistory[i].role === 'model' && chatHistory[i].topic) { lastTopic = chatHistory[i].topic; break; }
        }
        availableQuestions = SUGGESTED_QUESTIONS.filter(function(q) {
          return !chatHistory.some(function(m) { return m.role === 'user' && m.content === q; });
        });
      } catch (e) {}
    }

    function saveHistory() {
      sessionStorage.setItem('echo_chat_history', JSON.stringify(chatHistory));
    }

    function pauseLenis() {
      if (window.lenis) window.lenis.stop();
    }

    function resumeLenis() {
      if (window.lenis) window.lenis.start();
    }

    function toggleWindow(forceClose = null) {
      const shouldOpen = forceClose !== null ? !forceClose : !windowEl.classList.contains('open');
      if (shouldOpen) {
        windowEl.classList.add('open');
        fab.classList.remove('echo-fab-pulse');
        fab.innerHTML = '<i class="fas fa-times"></i>';
        tooltip.classList.add('hidden');
        setTimeout(() => inputField.focus(), 100);
        scrollToBottom();
        pauseLenis();
      } else {
        windowEl.classList.remove('open');
        fab.classList.add('echo-fab-pulse');
        fab.innerHTML = '<i class="fas fa-terminal"></i>';
        tooltip.classList.remove('hidden');
        resumeLenis();
      }
    }

    fab.addEventListener('click', () => toggleWindow());
    closeDot.addEventListener('click', () => toggleWindow(true));
    closeX.addEventListener('click', () => toggleWindow(true));
    windowEl.addEventListener('mouseenter', pauseLenis);
    windowEl.addEventListener('mouseleave', resumeLenis);

    inputField.addEventListener('input', () => {
      sendBtn.disabled = !inputField.value.trim();
      inputField.style.height = 'auto';
      inputField.style.height = `${inputField.scrollHeight}px`;
    });

    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    sendBtn.addEventListener('click', () => sendMessage());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && windowEl.classList.contains('open')) {
        toggleWindow(true);
      }
    });

    function appendInstant(senderName, text, role, isNew) {
      const box = document.createElement('div');
      box.className = `echo-message-box ${role === 'user' ? 'user-box' : 'ai-box'}`;
      if (isNew) box.classList.add('echo-msg-new');
      const label = document.createElement('span');
      label.className = role === 'user' ? 'echo-label-user' : 'echo-label-ai';
      label.textContent = senderName + ':';
      box.appendChild(label);
      const span = document.createElement('span');
      span.innerHTML = ' ' + linkify(text);
      box.appendChild(span);
      messagesContainer.appendChild(box);
      scrollToBottom();
    }

    function appendStreaming(text) {
      return new Promise(resolve => {
        const box = document.createElement('div');
        box.className = 'echo-message-box ai-box echo-msg-new';
        const label = document.createElement('span');
        label.className = 'echo-label-ai';
        label.textContent = 'Echo:';
        const body = document.createElement('span');
        const cursor = document.createElement('span');
        cursor.className = 'echo-cursor';
        box.appendChild(label);
        box.appendChild(document.createTextNode(' '));
        box.appendChild(body);
        box.appendChild(cursor);
        messagesContainer.appendChild(box);
        scrollToBottom();

        const total = Math.min(2400, 600 + text.length * 6);
        const steps = Math.max(10, Math.ceil(text.length / 2));
        const chunkSize = Math.max(1, Math.ceil(text.length / steps));
        const perDelay = total / steps;
        let i = 0;

        function tick() {
          if (i >= text.length) { cursor.remove(); resolve(); return; }
          i += chunkSize;
          body.innerHTML = linkify(text.slice(0, i));
          scrollToBottom();
          setTimeout(tick, perDelay);
        }
        tick();
      });
    }

    function scrollToBottom() {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    messagesContainer.addEventListener('wheel', function(e) {
      e.preventDefault();
      e.stopPropagation();
      messagesContainer.scrollTop += e.deltaY;
    }, { passive: false });

    let typingEl = null;
    function showTypingIndicator(label) {
      if (typingEl) return;
      typingEl = document.createElement('div');
      typingEl.className = 'echo-message-box ai-box echo-msg-new';
      const lab = document.createElement('span');
      lab.className = 'echo-label-ai';
      lab.textContent = 'Echo:';
      const cursor = document.createElement('span');
      cursor.className = 'echo-cursor';
      typingEl.appendChild(lab);
      typingEl.appendChild(document.createTextNode(' ' + label));
      typingEl.appendChild(cursor);
      messagesContainer.appendChild(typingEl);
      scrollToBottom();
    }

    function removeTypingIndicator() {
      if (typingEl) { typingEl.remove(); typingEl = null; }
    }

    async function sendMessage() {
      const text = inputField.value.trim();
      if (!text) return;

      inputField.value = '';
      inputField.disabled = true;
      sendBtn.disabled = true;
      inputField.style.height = 'auto';

      appendInstant('You', text, 'user', true);
      chatHistory.push({ role: 'user', content: text });
      saveHistory();

      showTypingIndicator(pick(THINKING_LABELS));
      const { reply, topic, isFallback } = getLocalResponse(text, lastTopic);
      if (isFallback) {
        removeTypingIndicator();
        showTypingIndicator('✨ Searching depths...');
        await wait(4000);
      } else {
        await wait(250 + Math.random() * 450);
      }
      removeTypingIndicator();
      await appendStreaming(reply);

      if (topic) lastTopic = topic;
      chatHistory.push({ role: 'model', content: reply, topic: topic || null });
      saveHistory();

      inputField.disabled = false;
      inputField.focus();
    }

    loadHistory();
    renderSuggestions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEchoTerminal);
  } else {
    initEchoTerminal();
  }
})();