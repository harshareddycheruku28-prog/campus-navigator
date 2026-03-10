import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─── Course Knowledge Base ────────────────────────────────────────────────
const courseDatabase = {
  python: {
    title: "🐍 Python Programming",
    courses: [
      {
        name: "Python for Everybody",
        platform: "Coursera",
        url: "https://www.coursera.org/specializations/python",
        level: "Beginner",
      },
      {
        name: "Complete Python Bootcamp",
        platform: "Udemy",
        url: "https://www.udemy.com/course/complete-python-bootcamp/",
        level: "Beginner to Advanced",
      },
      {
        name: "Introduction to Computer Science and Programming Using Python",
        platform: "edX",
        url: "https://www.edx.org/course/introduction-to-computer-science-and-programming-7",
        level: "Beginner",
      },
      {
        name: "Python Full Course for Beginners",
        platform: "YouTube (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
        level: "Beginner",
      },
    ],
  },
  "machine learning": {
    title: "🤖 Machine Learning",
    courses: [
      {
        name: "Machine Learning Specialization",
        platform: "Coursera (Andrew Ng)",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        level: "Beginner to Intermediate",
      },
      {
        name: "Machine Learning A-Z",
        platform: "Udemy",
        url: "https://www.udemy.com/course/machinelearning/",
        level: "Beginner to Advanced",
      },
      {
        name: "Machine Learning with Python",
        platform: "edX",
        url: "https://www.edx.org/course/machine-learning-with-python-from-linear-models-to",
        level: "Intermediate",
      },
      {
        name: "Machine Learning Full Course",
        platform: "YouTube (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=NWONeJKn6kc",
        level: "Beginner",
      },
    ],
  },
  "web development": {
    title: "🌐 Web Development",
    courses: [
      {
        name: "The Web Developer Bootcamp",
        platform: "Udemy",
        url: "https://www.udemy.com/course/the-web-developer-bootcamp/",
        level: "Beginner to Advanced",
      },
      {
        name: "HTML, CSS, and JavaScript for Web Developers",
        platform: "Coursera",
        url: "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
        level: "Beginner",
      },
      {
        name: "CS50's Web Programming with Python and JavaScript",
        platform: "edX",
        url: "https://www.edx.org/course/cs50s-web-programming-with-python-and-javascript",
        level: "Intermediate",
      },
      {
        name: "Full Stack Web Development Course",
        platform: "YouTube (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=nu_pCVPKzTk",
        level: "Beginner",
      },
    ],
  },
  "data science": {
    title: "📊 Data Science",
    courses: [
      {
        name: "IBM Data Science Professional Certificate",
        platform: "Coursera",
        url: "https://www.coursera.org/professional-certificates/ibm-data-science",
        level: "Beginner",
      },
      {
        name: "The Data Science Course: Complete Data Science Bootcamp",
        platform: "Udemy",
        url: "https://www.udemy.com/course/the-data-science-course-complete-data-science-bootcamp/",
        level: "Beginner to Advanced",
      },
      {
        name: "Data Science MicroMasters",
        platform: "edX",
        url: "https://www.edx.org/micromasters/uc-san-diegox-data-science",
        level: "Intermediate",
      },
      {
        name: "Data Science Full Course",
        platform: "YouTube (Edureka)",
        url: "https://www.youtube.com/watch?v=-ETQ97mXXF0",
        level: "Beginner",
      },
    ],
  },
  "artificial intelligence": {
    title: "🧠 Artificial Intelligence",
    courses: [
      {
        name: "AI For Everyone",
        platform: "Coursera (Andrew Ng)",
        url: "https://www.coursera.org/learn/ai-for-everyone",
        level: "Beginner",
      },
      {
        name: "Artificial Intelligence A-Z",
        platform: "Udemy",
        url: "https://www.udemy.com/course/artificial-intelligence-az/",
        level: "Intermediate",
      },
      {
        name: "CS50's Introduction to Artificial Intelligence with Python",
        platform: "edX",
        url: "https://www.edx.org/course/cs50s-introduction-to-artificial-intelligence-with-python",
        level: "Intermediate",
      },
      {
        name: "AI Full Course",
        platform: "YouTube (Simplilearn)",
        url: "https://www.youtube.com/watch?v=JMUxmLyrhSk",
        level: "Beginner",
      },
    ],
  },
  "deep learning": {
    title: "🔬 Deep Learning",
    courses: [
      {
        name: "Deep Learning Specialization",
        platform: "Coursera (Andrew Ng)",
        url: "https://www.coursera.org/specializations/deep-learning",
        level: "Intermediate",
      },
      {
        name: "PyTorch for Deep Learning",
        platform: "Udemy",
        url: "https://www.udemy.com/course/pytorch-for-deep-learning/",
        level: "Intermediate",
      },
      {
        name: "Deep Learning with TensorFlow",
        platform: "edX",
        url: "https://www.edx.org/course/deep-learning-with-tensorflow",
        level: "Intermediate",
      },
      {
        name: "Deep Learning Full Course",
        platform: "YouTube (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=VyWAvY2CF9c",
        level: "Beginner to Intermediate",
      },
    ],
  },
  java: {
    title: "☕ Java Programming",
    courses: [
      {
        name: "Java Programming and Software Engineering Fundamentals",
        platform: "Coursera",
        url: "https://www.coursera.org/specializations/java-programming",
        level: "Beginner",
      },
      {
        name: "Java Programming Masterclass",
        platform: "Udemy",
        url: "https://www.udemy.com/course/java-the-complete-java-developer-course/",
        level: "Beginner to Advanced",
      },
      {
        name: "Java Full Course",
        platform: "YouTube (Programming with Mosh)",
        url: "https://www.youtube.com/watch?v=eIrMbAQSU34",
        level: "Beginner",
      },
    ],
  },
  javascript: {
    title: "⚡ JavaScript",
    courses: [
      {
        name: "The Complete JavaScript Course",
        platform: "Udemy",
        url: "https://www.udemy.com/course/the-complete-javascript-course/",
        level: "Beginner to Advanced",
      },
      {
        name: "JavaScript for Beginners",
        platform: "Coursera",
        url: "https://www.coursera.org/learn/javascript-basics",
        level: "Beginner",
      },
      {
        name: "JavaScript Full Course",
        platform: "YouTube (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        level: "Beginner",
      },
    ],
  },
  react: {
    title: "⚛️ React.js",
    courses: [
      {
        name: "React — The Complete Guide",
        platform: "Udemy",
        url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
        level: "Beginner to Advanced",
      },
      {
        name: "Meta Front-End Developer Professional Certificate",
        platform: "Coursera",
        url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        level: "Beginner",
      },
      {
        name: "React Full Course",
        platform: "YouTube (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
        level: "Beginner",
      },
    ],
  },
  "cloud computing": {
    title: "☁️ Cloud Computing",
    courses: [
      {
        name: "Google Cloud Professional Certificate",
        platform: "Coursera",
        url: "https://www.coursera.org/professional-certificates/cloud-engineering-gcp",
        level: "Intermediate",
      },
      {
        name: "AWS Certified Solutions Architect",
        platform: "Udemy",
        url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
        level: "Intermediate",
      },
      {
        name: "Cloud Computing Full Course",
        platform: "YouTube (Edureka)",
        url: "https://www.youtube.com/watch?v=2LaAJq1lB1Q",
        level: "Beginner",
      },
    ],
  },
  cybersecurity: {
    title: "🔒 Cybersecurity",
    courses: [
      {
        name: "Google Cybersecurity Professional Certificate",
        platform: "Coursera",
        url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
        level: "Beginner",
      },
      {
        name: "The Complete Cyber Security Course",
        platform: "Udemy",
        url: "https://www.udemy.com/course/the-complete-internet-security-privacy-course-volume-1/",
        level: "Beginner to Intermediate",
      },
      {
        name: "Cybersecurity Full Course",
        platform: "YouTube (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=U_P23SqJaDc",
        level: "Beginner",
      },
    ],
  },
  sql: {
    title: "🗄️ SQL & Databases",
    courses: [
      {
        name: "SQL for Data Science",
        platform: "Coursera",
        url: "https://www.coursera.org/learn/sql-for-data-science",
        level: "Beginner",
      },
      {
        name: "The Complete SQL Bootcamp",
        platform: "Udemy",
        url: "https://www.udemy.com/course/the-complete-sql-bootcamp/",
        level: "Beginner to Advanced",
      },
      {
        name: "SQL Full Course",
        platform: "YouTube (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
        level: "Beginner",
      },
    ],
  },
  "c++": {
    title: "💻 C++ Programming",
    courses: [
      {
        name: "C++ For C Programmers",
        platform: "Coursera",
        url: "https://www.coursera.org/learn/c-plus-plus-a",
        level: "Intermediate",
      },
      {
        name: "Beginning C++ Programming",
        platform: "Udemy",
        url: "https://www.udemy.com/course/beginning-c-plus-plus-programming/",
        level: "Beginner",
      },
      {
        name: "C++ Full Course",
        platform: "YouTube (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
        level: "Beginner",
      },
    ],
  },
  "node.js": {
    title: "🟢 Node.js",
    courses: [
      {
        name: "Server-side Development with NodeJS, Express and MongoDB",
        platform: "Coursera",
        url: "https://www.coursera.org/learn/server-side-nodejs",
        level: "Intermediate",
      },
      {
        name: "NodeJS — The Complete Guide",
        platform: "Udemy",
        url: "https://www.udemy.com/course/nodejs-the-complete-guide/",
        level: "Beginner to Advanced",
      },
      {
        name: "Node.js Full Course",
        platform: "YouTube (freeCodeCamp)",
        url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
        level: "Beginner",
      },
    ],
  },
  "devops": {
    title: "🔧 DevOps",
    courses: [
      {
        name: "DevOps on AWS Specialization",
        platform: "Coursera",
        url: "https://www.coursera.org/specializations/aws-devops",
        level: "Intermediate",
      },
      {
        name: "Docker and Kubernetes: The Complete Guide",
        platform: "Udemy",
        url: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
        level: "Intermediate",
      },
      {
        name: "DevOps Full Course",
        platform: "YouTube (Edureka)",
        url: "https://www.youtube.com/watch?v=hQcFE0RD0cQ",
        level: "Beginner",
      },
    ],
  },
  "blockchain": {
    title: "⛓️ Blockchain",
    courses: [
      {
        name: "Blockchain Specialization",
        platform: "Coursera",
        url: "https://www.coursera.org/specializations/blockchain",
        level: "Intermediate",
      },
      {
        name: "Blockchain A-Z",
        platform: "Udemy",
        url: "https://www.udemy.com/course/build-your-blockchain-az/",
        level: "Beginner to Intermediate",
      },
      {
        name: "Blockchain Full Course",
        platform: "YouTube (Simplilearn)",
        url: "https://www.youtube.com/watch?v=QCvL-DWcojc",
        level: "Beginner",
      },
    ],
  },
};

// ─── Topic Aliases ────────────────────────────────────────────────────────
const aliases = {
  ml: "machine learning",
  ai: "artificial intelligence",
  dl: "deep learning",
  "web dev": "web development",
  webdev: "web development",
  frontend: "web development",
  "front end": "web development",
  backend: "node.js",
  "back end": "node.js",
  ds: "data science",
  "data analytics": "data science",
  analytics: "data science",
  js: "javascript",
  ts: "javascript",
  typescript: "javascript",
  reactjs: "react",
  "react.js": "react",
  aws: "cloud computing",
  cloud: "cloud computing",
  azure: "cloud computing",
  gcp: "cloud computing",
  security: "cybersecurity",
  "cyber security": "cybersecurity",
  hacking: "cybersecurity",
  database: "sql",
  databases: "sql",
  mysql: "sql",
  postgresql: "sql",
  mongodb: "sql",
  cpp: "c++",
  "c plus plus": "c++",
  node: "node.js",
  nodejs: "node.js",
  express: "node.js",
  docker: "devops",
  kubernetes: "devops",
  ci_cd: "devops",
  crypto: "blockchain",
  "web3": "blockchain",
};

// ─── Helper: Find matching topic ────────────────────────────────────────
function findTopic(message) {
  const lower = message.toLowerCase();

  // Direct match
  for (const key of Object.keys(courseDatabase)) {
    if (lower.includes(key)) return key;
  }

  // Alias match
  for (const [alias, topic] of Object.entries(aliases)) {
    if (lower.includes(alias)) return topic;
  }

  return null;
}

// ─── Helper: Format course response ─────────────────────────────────────
function formatCourseResponse(topicKey) {
  const topic = courseDatabase[topicKey];
  let response = `Great question! Here are the best resources for **${topic.title}**:\n\n`;

  topic.courses.forEach((course, i) => {
    response += `${i + 1}. **${course.name}**\n`;
    response += `   📌 Platform: ${course.platform}\n`;
    response += `   📈 Level: ${course.level}\n`;
    response += `   🔗 [Start Learning](${course.url})\n\n`;
  });

  response += `💡 **Tip:** Start with beginner-level courses and gradually move up. Consistency is key! 🚀`;
  return response;
}

// ─── Greeting & helper responses ────────────────────────────────────────
function getGreeting() {
  return `Hey there! 👋 I'm your **Campus Navigator Course Assistant**!\n\nI can help you find the best online courses and learning resources. Just ask me about any topic, for example:\n\n• "I want to learn Python"\n• "Recommend AI courses"\n• "Best web development resources"\n• "Help me with data science"\n\nWhat would you like to learn today? 🎯`;
}

function getHelpResponse() {
  const topics = Object.values(courseDatabase).map((t) => t.title).join("\n• ");
  return `Here are the topics I can help you with:\n\n• ${topics}\n\nJust type a topic name and I'll recommend the best courses for you! 📚`;
}

function getDefaultResponse() {
  return `I'm not sure I understand that topic yet. 🤔\n\nTry asking about popular subjects like:\n• **Python**, **Java**, **JavaScript**, **C++**\n• **Machine Learning**, **AI**, **Deep Learning**\n• **Web Development**, **Data Science**\n• **Cloud Computing**, **Cybersecurity**\n• **SQL**, **Node.js**, **React**\n• **DevOps**, **Blockchain**\n\nOr type **"help"** to see all available topics! 📖`;
}

// ─── Chat Endpoint ────────────────────────────────────────────────────────
app.post("/chat", (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required." });
  }

  const trimmed = message.trim().toLowerCase();
  let reply;

  // Greetings
  if (
    ["hi", "hello", "hey", "hola", "howdy", "sup", "yo"].some(
      (g) => trimmed === g || trimmed === g + "!" || trimmed === g + "."
    )
  ) {
    reply = getGreeting();
  }
  // Help
  else if (["help", "topics", "what can you do", "menu", "options"].some((h) => trimmed.includes(h))) {
    reply = getHelpResponse();
  }
  // Thanks
  else if (["thank", "thanks", "thx", "appreciate"].some((t) => trimmed.includes(t))) {
    reply = "You're welcome! 😊 Happy learning! If you need more recommendations, just ask. 🚀";
  }
  // Topic matching
  else {
    const topic = findTopic(trimmed);
    if (topic) {
      reply = formatCourseResponse(topic);
    } else {
      reply = getDefaultResponse();
    }
  }

  res.json({ reply });
});

// ─── Health Check ─────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Start Server ─────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Campus Navigator Chat Server running on http://localhost:${PORT}`);
});
