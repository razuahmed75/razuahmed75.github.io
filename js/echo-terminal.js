(function () {
  const FALLBACK_REPLIES = [
    "I'm not sure I follow — try asking about Razu's skills, projects, experience, education, or contact info.",
    "Hmm, could you rephrase that? I can talk about Razu's work, background, or how to reach him.",
    "I don't have info on that. Ask me about skills, projects, experience, education, or contact."
  ];

  const THINKING_LABELS = ['Thinking', 'Processing', 'One moment', 'Looking that up'];

  const KB = [
    { topic: 'education', keys: ['education','educational','degree','degrees','background','study','studied','studies','university','universities','college','academic','academics','qualification','qualifications','school','graduate','graduated','bsc','diploma','gpa','learn'], replies: ["BSc in Computer Science, European University of Bangladesh (2024–Current). Diploma in Computer Science, Munshiganj Polytechnic Institute (2018–2022, GPA 3.48/4.00).","Razu is currently pursuing a BSc in Computer Science at European University of Bangladesh (2024–Current), and holds a Diploma in Computer Science from Munshiganj Polytechnic Institute (2018–2022, GPA 3.48/4.00)."], more: "Razu's diploma coursework covered structured programming, databases, and software engineering fundamentals, which built the foundation for his current BSc studies." },
    { topic: 'skills', keys: ['skill','skills','skilled','tech','technical','technology','technologies','stack','framework','frameworks','language','languages','proficient','proficiency','expertise','know','knows','good at','capable','capabilities','tools','toolset','programming'], replies: ["Razu works with Dart, Flutter, JavaScript, HTML/CSS. State management: Riverpod, GetX, Bloc, Provider. Local DB: Hive, Isar, SQLite, ObjectBox. Networking: Dio, Retrofit, Chopper. Also Git, Firebase, REST APIs, Clean Architecture.","His core toolkit: Dart & Flutter for cross-platform apps, GetX/Riverpod/Bloc/Provider for state management, Hive/Isar/SQLite/ObjectBox for local storage, and Dio/Retrofit for networking — all backed by Firebase and Clean Architecture."], more: "Beyond the basics: Razu also handles CI/CD pipelines, REST API integration, third-party SDK integration (payments, maps, push notifications), app performance profiling, and reducing APK/IPA build sizes." },
    { topic: 'projects', keys: ['project','projects','app','apps','application','applications','portfolio','built','build','made','make','created','create','developed','develop','shipped','launched'], replies: ["Razu built: Giftily, Lama.ng, Golala BillPay, Agriwealth, Listplace, HYIP PRO, Coinectra, Waiz, Paysecure-User, Paysecure-Merchant, Paysecure-Agent. Check the Projects section above!","Some standout builds include Giftily, Lama.ng, Golala BillPay, Agriwealth, Listplace, HYIP PRO, Coinectra, Waiz, and the three-app Paysecure ecosystem."], more: "A few highlights: Giftily handles real-time game top-ups with Pusher signaling; Lama.ng is a full service marketplace with Google Maps integration; Paysecure spans three connected apps (User, Merchant, Agent) for a complete digital wallet ecosystem." },
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
    { topic: 'who', keys: ['who','yourself','razu','tell me about','introduce','introduction','bio','about him','about you'], replies: ["Razu Ahmed is a Senior Flutter Developer with 4+ years building cross-platform apps for Android & iOS. Leads mobile dev, architects solutions, mentors developers.","Meet Razu — a Senior Flutter Developer with 4+ years shipping Android & iOS apps, leading teams, and mentoring junior developers."], more: "Outside of Flutter, Razu enjoys exploring new mobile architectures, mentoring junior devs, and tackling coding challenges on Codewars." },
    { topic: 'help', keys: ['help','commands','options','what can you do'], replies: ["Ask about skills, projects, experience, education, contact, resume, or socials!"], smalltalk: true },
    { topic: 'greeting', keys: ['hello','hi','hey','sup','yo','greetings','good morning','good afternoon','good evening'], replies: ["Hi there! I'm Echo, your AI terminal assistant. Ask me about Razu's skills, projects, experience, or how to contact him!","Hello! I'm Echo. Curious about Razu's skills, projects, or background? Just ask.","Hey! Ask me anything about Razu — skills, projects, experience, education, or contact."], smalltalk: true },
    { topic: 'howareyou', keys: ['how are you','hows it going',"how's it going",'how are you doing'], replies: ["Running smoothly, thanks for asking! What would you like to know about Razu?","All systems good here. Ask me anything about Razu's work!"], smalltalk: true },
    { topic: 'identity', keys: ['are you real','are you ai','are you human','are you a bot','are you chatgpt','are you gpt','are you gemini','what are you'], replies: ["I'm Echo — a lightweight assistant built into this portfolio to answer questions about Razu. Not a general-purpose AI, just here to help you learn about his work!"], smalltalk: true },
    { topic: 'thanks', keys: ['thank','thanks','thank you','appreciate'], replies: ["You're welcome! Anything else you'd like to know about Razu?","Anytime! Let me know if you want to know more about Razu's work."], smalltalk: true },
    { topic: 'bye', keys: ['bye','goodbye','see you','later'], replies: ["Goodbye! Feel free to come back anytime.","See you! Come back if you have more questions about Razu."], smalltalk: true }
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
      box.appendChild(document.createTextNode(' ' + text));
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
          body.textContent += text.slice(i, i + chunkSize);
          i += chunkSize;
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