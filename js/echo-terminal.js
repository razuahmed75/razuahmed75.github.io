(function () {
  const FALLBACK_REPLIES = [
    "I'm not sure I follow — try asking about Razu's skills, projects, experience, education, or contact info.",
    "Hmm, could you rephrase that? I can talk about Razu's work, background, or how to reach him.",
    "I don't have info on that. Ask me about skills, projects, experience, education, or contact.",
    "Not sure about that — ask about skills, projects, experience, education, or contact.",
    "Try asking about Razu's skills, projects, experience, education, or contact.",
    "Not in my knowledge base. Ask about skills, projects, experience, education, or contact.",
  ];

  const THINKING_LABELS = ['Thinking', 'Processing', 'One moment', 'Looking that up', 'Analyzing', 'Computing', 'Working on it', 'Just a sec', 'Fetching data', 'Crunching numbers'];

  const KB = [
    //-----General-------//
    { topic: 'education', keys: ['education','educational','degree','degrees','background','study','studied','studies','university','universities','college','academic','academics','qualification','qualifications','school','graduate','graduated','bsc','diploma','gpa','learn'], replies: ["BSc in Computer Science, European University of Bangladesh (2024–Current). Diploma in Computer Science, Munshiganj Polytechnic Institute (2018–2022, GPA 3.48/4.00).","Razu is currently pursuing a BSc in Computer Science at European University of Bangladesh (2024–Current), and holds a Diploma in Computer Science from Munshiganj Polytechnic Institute (2018–2022, GPA 3.48/4.00)."], more: "Razu's diploma coursework covered structured programming, databases, and software engineering fundamentals, which built the foundation for his current BSc studies." },
    { topic: 'skills', keys: ['skill','skills','skilled','tech','technical','technology','technologies','stack','framework','frameworks','language','languages','proficient','proficiency','expertise','know','knows','good at','capable','capabilities','tools','toolset','programming'], replies: ["Razu works with Dart, Flutter, JavaScript, HTML/CSS. State management: Riverpod, GetX, Bloc, Provider. Local DB: Hive, Isar, SQLite, ObjectBox. Networking: Dio, Retrofit, Chopper. Also Git, Firebase, REST APIs, Clean Architecture.","His core toolkit: Dart & Flutter for cross-platform apps, GetX/Riverpod/Bloc/Provider for state management, Hive/Isar/SQLite/ObjectBox for local storage, and Dio/Retrofit for networking — all backed by Firebase and Clean Architecture."], more: "Beyond the basics: Razu also handles CI/CD pipelines, REST API integration, third-party SDK integration (payments, maps, push notifications), app performance profiling, and reducing APK/IPA build sizes." },
    { topic: 'projects', keys: ['project','projects','app','apps','application','applications','portfolio','built','build','made','make','created','create','developed','develop','shipped','launched'], replies: ["Razu's projects:\n\n\n• Giftily — Play Store: https://play.google.com/store/apps/details?id=com.giftily_dz.app&hl=en | CodeCanyon: https://codecanyon.net/item/gamers-arena-on-demand-game-shop-cross-platform-mobile-application/51225336\n\n\n• Lama.ng — Play Store: https://play.google.com/store/apps/details?id=com.lama.ng&hl=en | App Store: https://apps.apple.com/us/app/lama-ng/id6756806464\n\n\n• Golala BillPay — Play Store: https://play.google.com/store/apps/details?id=com.golala.billpayment&hl=en | App Store: https://apps.apple.com/us/app/golala-billpay-solutions/id6743252509 | CodeCanyon: https://codecanyon.net/item/bill-pay-topup-recharge-and-utility-bill-payment-mobile-app/50124639?s_rank=26\n\n\n• Agriwealth — Play Store: https://play.google.com/store/apps/details?id=com.stip.club | CodeCanyon: https://codecanyon.net/item/agriwealth-agricultural-hyip-investment-mobile-application-android-ios/55396787?s_rank=15\n\n\n• Listplace — CodeCanyon: https://codecanyon.net/item/listplace-business-directory-listing-flutter-app-android-ios/57380835?s_rank=10\n\n\n• HYIP PRO — CodeCanyon: https://codecanyon.net/item/hyip-pro-cross-platform-mobile-application/49701045?s_rank=28\n\n\n• Coinectra — CodeCanyon: https://codecanyon.net/item/coinectra-buy-sell-and-crypto-currency-exchange-flutter-app-android-ios/58421141?s_rank=6\n\n\n• Waiz — CodeCanyon: https://codecanyon.net/item/waiz-digital-wallet-and-remittance-app-and-website-with-admin-panel/53238316?s_rank=22\n\n\n• Paysecure-User — CodeCanyon: https://codecanyon.net/item/paysecure-digital-wallet-flutter-app-android-ios/58040829?s_rank=7\n\n\n• Paysecure-Merchant — CodeCanyon: https://codecanyon.net/item/pay-secure-digital-wallet-application-for-merchant-android-ios/58793831?s_rank=1\n\n\n• Paysecure-Agent — CodeCanyon: https://codecanyon.net/item/pay-secure-digital-wallet-application-for-agent-android-ios/58793829?s_rank=2"], more: "A few highlights: Giftily handles real-time game top-ups with Pusher signaling; Lama.ng is a full service marketplace with Google Maps integration; Paysecure spans three connected apps (User, Merchant, Agent) for a complete digital wallet ecosystem." },
    { topic: 'experience', keys: ['experience','experienced','job','jobs','career','company','companies','role','roles','position','positions','employer','employers','work history','professional','years of experience','current job','current role'], replies: ["Senior Flutter Developer @ Bug Finder (Nov 2023–Present): leads mobile dev team, architects apps, mentors juniors, optimizes performance, CI/CD. Previously Junior Flutter Developer @ Bringin Technologies Ltd (Feb–Sep 2023).","Currently Senior Flutter Developer at Bug Finder since Nov 2023, leading the mobile team and mentoring developers. Before that, he was a Junior Flutter Developer at Bringin Technologies Ltd (Feb–Sep 2023)."], more: "At Bug Finder, Razu also handles client communication for international projects, sets up CI/CD pipelines, and profiles apps to cut load times and build sizes. At Bringin Technologies, he worked closely with backend teams on secure payment and bank-transfer flows." },
    { topic: 'contact', keys: ['contact','email','e-mail','hire','hiring','reach','linkedin','connect','get in touch','message him','talk to him'], replies: ["Reach Razu at razuahmed8641@gmail.com, LinkedIn: linkedin.com/in/razuahmed75, or via the contact form on this page.","You can email razuahmed8641@gmail.com, connect on LinkedIn (linkedin.com/in/razuahmed75), or use the contact form above."] },
    { topic: 'resume', keys: ['resume','cv','curriculum vitae'], replies: ["Download Razu's CV: https://surl.li/wledoq"] },
    { topic: 'github', keys: ['github','git hub','repo','repos','repository'], replies: ["GitHub: https://github.com/razuahmed75"] },
    { topic: 'twitter', keys: ['twitter','tweet','tweets','x profile'], replies: ["Twitter/X: https://twitter.com/razuahmed8641"] },
    { topic: 'facebook', keys: ['facebook','fb'], replies: ["Facebook: https://www.facebook.com/razu8641/"] },
    { topic: 'blog', keys: ['blog','blogs','writing','articles'], replies: ["Blog: https://razuahmed75.blogspot.com/"] },
    { topic: 'photos', keys: ['photo','photos','gallery','pictures','images'], replies: ["Photo Gallery: https://razuahmed75.blogspot.com/p/photo-gallery.html"] },
    { topic: 'codewars', keys: ['codewars','coding challenges','katas'], replies: ["Codewars: https://www.codewars.com/users/razuahmed75"] },
    { topic: 'location', keys: ['location','where','based','dhaka','bangladesh','live','lives','living','from'], replies: ["Razu is based in Dhaka, Bangladesh."] },
    { topic: 'phone', keys: ['phone','number','call','mobile','whatsapp'], replies: ["Phone: +880 1706-084790"] },
    { topic: 'who', keys: ['who','yourself','razu','introduce','introduction','bio','about him','about you'], replies: ["Razu Ahmed is a Senior Flutter Developer with 4+ years building cross-platform apps for Android & iOS. Leads mobile dev, architects solutions, mentors developers.","Meet Razu — a Senior Flutter Developer with 4+ years shipping Android & iOS apps, leading teams, and mentoring junior developers."], more: "Outside of Flutter, Razu enjoys exploring new mobile architectures, mentoring junior devs, and tackling coding challenges on Codewars." },
    { topic: 'help', keys: ['help','commands','options','what can you do'], replies: ["Ask about skills, projects, experience, education, contact, resume, or socials!"], smalltalk: true },
    { topic: 'greeting', keys: ['hello','hi','hey','sup','yo','greetings','good morning','good afternoon','good evening'], replies: ["Hi there! I'm Echo, your AI terminal assistant. Ask me about Razu's skills, projects, experience, or how to contact him!","Hello! I'm Echo. Curious about Razu's skills, projects, or background? Just ask.","Hey! Ask me anything about Razu — skills, projects, experience, education, or contact."], smalltalk: true },
    { topic: 'howareyou', keys: ['how are you','hows it going',"how's it going",'how are you doing'], replies: ["Running smoothly, thanks for asking! What would you like to know about Razu?","All systems good here. Ask me anything about Razu's work!"], smalltalk: true },
    { topic: 'identity', keys: ['are you real','are you ai','are you human','are you a bot','are you chatgpt','are you gpt','are you gemini','what are you'], replies: ["I'm Echo — a lightweight assistant built into this portfolio to answer questions about Razu. Not a general-purpose AI, just here to help you learn about his work!"], smalltalk: true },
    { topic: 'thanks', keys: ['thank','thanks','thank you','appreciate'], replies: ["You're welcome! Anything else you'd like to know about Razu?","Anytime! Let me know if you want to know more about Razu's work."], smalltalk: true },
    { topic: 'bye', keys: ['bye','goodbye','see you','later'], replies: ["Goodbye! Feel free to come back anytime.","See you! Come back if you have more questions about Razu."], smalltalk: true },

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
    if (!q) return { reply: pick(FALLBACK_REPLIES), topic: null };
    let best = null, bestScore = 0;
    for (const entry of KB) {
      const s = matchScore(q, entry.keys);
      if (s > bestScore) { bestScore = s; best = entry; }
    }
    if (best) return finalize(best);
    if (isMoreRequest(q)) {
      if (lastTopic) {
        const entry = KB.find(e => e.topic === lastTopic);
        if (entry && entry.more) return { reply: entry.more, topic: lastTopic };
        if (entry) return { reply: "That's about everything I've got on that — ask me something else!", topic: lastTopic };
      }
      return { reply: "More about what? Try asking about skills, projects, experience, education, or contact first.", topic: null };
    }
    const fuzzy = fuzzyMatch(q);
    if (fuzzy) return finalize(fuzzy);
    return { reply: pick(FALLBACK_REPLIES), topic: null };
  }

  function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  function initEchoTerminal() {
    const fabHtml = `<button class="echo-fab echo-fab-pulse" id="echo-fab" aria-label="Open Echo Terminal"><i class="fas fa-terminal"></i></button>`;

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
            <div>Type your message below and press Enter to chat with Echo.</div>
          </div>
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
    const windowEl = document.getElementById('echo-window');
    const closeDot = document.getElementById('echo-dot-close');
    const closeX = document.getElementById('echo-close-x');
    const messagesContainer = document.getElementById('echo-messages');
    const inputField = document.getElementById('echo-input');
    const sendBtn = document.getElementById('echo-send');

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
      } catch (e) {}
    }

    function saveHistory() {
      sessionStorage.setItem('echo_chat_history', JSON.stringify(chatHistory));
    }

    function toggleWindow(forceClose = null) {
      const shouldOpen = forceClose !== null ? !forceClose : !windowEl.classList.contains('open');
      if (shouldOpen) {
        windowEl.classList.add('open');
        fab.classList.remove('echo-fab-pulse');
        fab.innerHTML = '<i class="fas fa-times"></i>';
        setTimeout(() => inputField.focus(), 100);
        scrollToBottom();
      } else {
        windowEl.classList.remove('open');
        fab.classList.add('echo-fab-pulse');
        fab.innerHTML = '<i class="fas fa-terminal"></i>';
      }
    }

    fab.addEventListener('click', () => toggleWindow());
    closeDot.addEventListener('click', () => toggleWindow(true));
    closeX.addEventListener('click', () => toggleWindow(true));

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
      const { reply, topic } = getLocalResponse(text, lastTopic);
      await wait(250 + Math.random() * 450);
      removeTypingIndicator();
      await appendStreaming(reply);

      if (topic) lastTopic = topic;
      chatHistory.push({ role: 'model', content: reply, topic: topic || null });
      saveHistory();

      inputField.disabled = false;
      inputField.focus();
    }

    loadHistory();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEchoTerminal);
  } else {
    initEchoTerminal();
  }
})();