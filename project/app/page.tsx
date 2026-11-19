'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleDot,
  Command,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Search,
  Send,
  Sparkles,
  Terminal,
  X,
  Zap,
} from 'lucide-react';

const sections = [
  ['About', 'about'],
  ['Education', 'education'],
  ['Skills', 'skills'],
  ['Work', 'work'],
  ['Credentials', 'credentials'],
  ['Journey', 'journey'],
  ['Contact', 'contact'],
];

const skills = {
  practicing: ['Python', 'SQL', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Data Visualization'],
  fundamentals: ['Statistics', 'Probability', 'Data Cleaning', 'EDA', 'Data Structures', 'Database Design', 'Responsive Web Design', 'React', 'TypeScript', 'Machine Learning Fundamentals', 'Authentication', 'REST APIs'],
  exploring: ['Neural Networks', 'Deep Learning', 'Generative AI', 'LLMs', 'NLP', 'RAG', 'AI Agents', 'Vector Search', 'Apache Spark', 'Data Pipelines', 'Docker', 'Cloud Computing', 'Responsible AI'],
};

const roleFits = {
  'Data Science Intern': { fit: 'Strongest alignment', body: 'Your Data Science degree, statistics foundation, Python practice, and interest in exploratory analysis create a credible starting point for analytical work.', tags: ['Python', 'Statistics', 'EDA', 'Data Visualization'] },
  'Machine Learning Intern': { fit: 'Building toward', body: 'Your current academic foundation maps well to the field. Continued model-building and evaluation projects will strengthen the evidence of readiness.', tags: ['Python', 'Probability', 'Machine Learning', 'Analytical Problem Solving'] },
  'AI Engineering Intern': { fit: 'Exploratory fit', body: 'Your interest in intelligent systems and modern software gives you a thoughtful entry point, with deeper systems and AI implementation still developing.', tags: ['Python', 'JavaScript', 'Generative AI', 'LLMs'] },
  'Junior Data Analyst': { fit: 'Strongest alignment', body: 'A practical combination of SQL, spreadsheets-to-data thinking, visualization, and an analytical science background supports this direction.', tags: ['SQL', 'Data Cleaning', 'EDA', 'Data Visualization'] },
  'Data Engineering Intern': { fit: 'Early foundation', body: 'Database, SQL, and computational thinking are useful building blocks. Pipeline orchestration and cloud work are clear next learning areas.', tags: ['SQL', 'Database Design', 'Data Pipelines', 'Data Quality'] },
  'Software Development Intern': { fit: 'Growing alignment', body: 'Hands-on web projects, Git, and programming practice demonstrate a willingness to build. More shipped projects will continue to deepen this profile.', tags: ['Python', 'JavaScript', 'Git', 'Responsive Web Design'] },
};

type Role = keyof typeof roleFits;
type ChatMessage = { role: 'user' | 'assistant'; content: string };

function answerQuestion(question: string) {
  const q = question.toLowerCase();
  if (q.includes('rolesync')) return 'RoleSync is Harris’s featured repository project. Visit the GitHub repository to see the verified project details and current implementation: github.com/harrismirr/RoleSync.';
  if (q.includes('study') || q.includes('education')) return 'Harris is pursuing two separate academic pathways: a B.S. in Data Science and Applications at IIT Madras beginning in 2026, and an undergraduate Computer Applications / Computer Science pathway at Cluster University of Srinagar beginning in 2025.';
  if (q.includes('skill')) return 'Harris is currently practicing Python, SQL, JavaScript, HTML, CSS, Git, Jupyter, Pandas, NumPy, and data visualization. Statistics, machine learning, and modern AI are important learning areas.';
  if (q.includes('contact') || q.includes('reach')) return 'You can reach Harris at harrismirr99@gmail.com, or connect through LinkedIn and GitHub using the links on this page.';
  if (q.includes('ai') || q.includes('technology')) return 'Harris is exploring machine learning, neural networks, generative AI, large language models, natural language processing, RAG, AI agents, and vector search.';
  if (q.includes('candidate') || q.includes('intern')) return 'Harris brings a science foundation, two academic learning pathways, practical software projects, independent learning, and discipline developed through skiing and outdoor activities. His profile is growing through evidence and continued practice.';
  return 'Harris is an ambitious learner building a foundation in Data Science, Artificial Intelligence, and modern software development through education, independent learning, and practical projects.';
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [role, setRole] = useState<Role>('Data Science Intern');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
      if (event.key === 'Escape') {
        setCommandOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const sendChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = chatInput.trim();
    if (!value) return;
    setChat((messages) => [...messages, { role: 'user', content: value }, { role: 'assistant', content: answerQuestion(value) }]);
    setChatInput('');
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText('harrismirr99@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !message) {
      setFormStatus('Please complete your name, email, and message.');
      return;
    }
    const subject = encodeURIComponent(String(data.get('subject') || 'Portfolio opportunity'));
    const body = encodeURIComponent(`Hello Harris,\n\nMy name is ${name}.\n\n${message}\n\nReply to: ${email}`);
    window.location.href = `mailto:harrismirr99@gmail.com?subject=${subject}&body=${body}`;
    setFormStatus('Your email app is ready with this message. Thank you for reaching out.');
  };

  const filteredSkills = useMemo(() => {
    const normalized = query.toLowerCase();
    return Object.entries(skills).map(([key, values]) => [key, values.filter((skill) => skill.toLowerCase().includes(normalized))] as const).filter(([, values]) => values.length);
  }, [query]);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setCommandOpen(false);
  };

  return (
    <main>
      <div className="top-line" />
      <header className="site-header">
        <a className="brand" href="#home" onClick={() => jump('home')}><span>HM</span><b>HARRIS MIR</b></a>
        <nav className="desktop-nav" aria-label="Primary navigation">{sections.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <div className="header-actions"><button className="command-trigger" onClick={() => setCommandOpen(true)} aria-label="Open command search"><Command size={15} /> <span>Search</span><kbd>⌘ K</kbd></button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></div>
      </header>
      {menuOpen && <div className="mobile-nav">{sections.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<ChevronRight size={16} /></a>)}</div>}

      <section id="home" className="hero section-pad">
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR LEARNING & COLLABORATION</div>
          <p className="hero-kicker">Hello, and welcome.</p>
          <h1>Building at the intersection of <em>data,</em> intelligence and technology.</h1>
          <p className="hero-intro">I&apos;m Harris Mir, a student exploring Data Science, Artificial Intelligence, and modern software engineering. I&apos;m passionate about understanding data, building useful digital products, and exploring how intelligent systems can solve real-world problems.</p>
          <div className="hero-actions"><button className="button button-light" onClick={() => jump('work')}>Explore my work <ArrowUpRight size={17} /></button><button className="text-button" onClick={() => jump('contact')}>Let&apos;s connect <ChevronRight size={16} /></button></div>
          <div className="hero-meta"><span><CircleDot size={13} /> Srinagar, India</span><span>Currently learning in public</span></div>
        </div>
        <div className="portrait-wrap"><div className="portrait-frame"><img src="/images/IMG_20261002_160137.png" alt="Portrait of Harris Mir" /></div><div className="portrait-label"><span>01</span><span>HARRIS MIR / DIGITAL IDENTITY</span></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></a>
      </section>

      <section id="about" className="section-pad about-section"><div className="section-heading"><span className="section-index">01 / ABOUT</span><h2>Curiosity is the<br /><em>starting point.</em></h2></div><div className="about-content"><p className="lead">My journey into technology began with a science background and a simple curiosity about how systems, information, and people connect.</p><p>I&apos;m building my foundation through two separate academic pathways, practical software projects, and independent learning. I enjoy the combination of mathematics, statistics, programming, and analytical thinking that turns a question into something useful.</p><p>Outside the classroom, skiing, trekking, camping, and school activities have taught me patience, teamwork, adaptability, and the value of showing up consistently. These experiences shape how I learn: with discipline, curiosity, and a willingness to improve.</p><div className="about-note"><Zap size={18} /><span>Focused on learning deeply, building honestly, and growing through practice.</span></div></div></section>

      <section id="education" className="dark-section section-pad"><div className="section-heading light"><span className="section-index">02 / EDUCATION</span><h2>Two paths.<br /><em>One direction.</em></h2></div><p className="section-subtitle">Two separate academic pathways are shaping my perspective across data, computing, and intelligent systems.</p><div className="education-grid"><article className="edu-card featured"><div className="card-top"><span className="card-number">01</span><span className="card-status">CURRENT / 2026—2029</span></div><GraduationCap size={28} className="card-icon" /><h3>Indian Institute of Technology Madras</h3><p className="degree">Bachelor of Science in Data Science and Applications</p><div className="topic-list"><span>Mathematics</span><span>Statistics & Probability</span><span>Python Programming</span><span>Data Handling</span><span>Machine Learning</span><span>Business Analytics</span></div><div className="card-footer">Curriculum areas and relevant learning topics</div></article><article className="edu-card"><div className="card-top"><span className="card-number">02</span><span className="card-status">CURRENT / 2025—2029</span></div><Terminal size={28} className="card-icon" /><h3>Cluster University of Srinagar</h3><p className="degree">Bachelor&apos;s degree pathway in Computer Applications / Computer Science</p><div className="topic-list"><span>Programming Fundamentals</span><span>Data Structures</span><span>Operating Systems</span><span>Databases & SQL</span><span>Web Development</span><span>AI Fundamentals</span></div><div className="card-footer">Areas of study and continued development</div></article></div><div className="school-strip"><div><span className="mini-label">FOUNDATION</span><h3>Tyndale Biscoe and Mallinson Society</h3></div><p>Nursery through Class 12 · Science with Information Practices · English-medium education</p><span className="strip-arrow"><ArrowUpRight /></span></div></section>

      <section id="skills" className="section-pad skills-section"><div className="section-heading"><span className="section-index">03 / SKILLS</span><h2>A map of what I<br /><em>practice next.</em></h2></div><div className="skills-toolbar"><p>My technology map is organized by evidence and stage, not inflated proficiency claims.</p><div className="skill-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search skills" aria-label="Search skills" /></div></div><div className="skills-layout"><div className="skill-categories"><button className={category === 'All' ? 'active' : ''} onClick={() => setCategory('All')}>All areas</button><button className={category === 'practicing' ? 'active' : ''} onClick={() => setCategory('practicing')}>Currently practicing</button><button className={category === 'fundamentals' ? 'active' : ''} onClick={() => setCategory('fundamentals')}>Academic foundations</button><button className={category === 'exploring' ? 'active' : ''} onClick={() => setCategory('exploring')}>Exploring next</button></div><div className="skill-panels">{filteredSkills.filter(([key]) => category === 'All' || key === category).map(([key, values]) => <div className="skill-panel" key={key}><div className="skill-panel-title"><span className={`skill-marker ${key}`} /><h3>{key === 'practicing' ? 'Currently practicing' : key === 'fundamentals' ? 'Academic knowledge / fundamentals' : 'Exploring next'}</h3><span>{values.length.toString().padStart(2, '0')}</span></div><div className="skill-tags">{values.map((skill) => <span key={skill}>{skill}</span>)}</div></div>)}</div></div></section>

      <section id="work" className="dark-section section-pad work-section"><div className="section-heading light"><span className="section-index">04 / SELECTED WORK</span><h2>Small projects.<br /><em>Real momentum.</em></h2></div><div className="project-feature"><div className="project-art"><div className="grid-art"><span>ROLESYNC</span><div className="data-bars"><i /><i /><i /><i /><i /></div><div className="art-node node-a" /><div className="art-node node-b" /><div className="art-node node-c" /></div></div><div className="project-copy"><div className="project-label"><span>FEATURED REPOSITORY</span><span>01 / 01</span></div><h3>RoleSync</h3><p>A featured project repository by Harris Mir. Explore the verified implementation, technology choices, and current progress directly on GitHub.</p><div className="project-tags"><span>Repository</span><span>Software project</span><span>In development</span></div><a className="button button-outline" href="https://github.com/harrismirr/RoleSync" target="_blank" rel="noreferrer">Open on GitHub <ExternalLink size={16} /></a></div></div><div className="github-banner"><Github size={25} /><div><strong>More work lives on GitHub.</strong><span>Follow the learning trail, one repository at a time.</span></div><a href="https://github.com/harrismirr" target="_blank" rel="noreferrer">View profile <ArrowUpRight size={16} /></a></div></section>

      <section id="journey" className="section-pad journey-section"><div className="section-heading"><span className="section-index">05 / LEARNING JOURNEY</span><h2>Always in<br /><em>motion.</em></h2></div><div className="timeline"><div className="timeline-item"><span className="timeline-year">FOUNDATION</span><div><h3>Science, communication, and outdoor learning</h3><p>School education through Class 12, with Physics, Chemistry, Biology, and Information Practices. School activities, annual camps, trekking, and teamwork shaped the foundation.</p></div></div><div className="timeline-item"><span className="timeline-year">2025—2029</span><div><h3>Computer applications / computer science pathway</h3><p>Building fluency in programming, problem solving, databases, software development, and the systems behind modern technology.</p></div></div><div className="timeline-item current"><span className="timeline-year">2026—2029</span><div><h3>Data Science and Applications at IIT Madras</h3><p>Developing a deeper understanding of mathematics, statistics, computation, data handling, and machine learning.</p></div></div><div className="timeline-item future"><span className="timeline-year">NEXT HORIZON</span><div><h3>More useful things, built carefully</h3><p>Future goals include deepening AI and data engineering knowledge, shipping thoughtful projects, and learning alongside ambitious teams.</p></div></div></div></section>

      <section className="dark-section section-pad sport-section"><div className="sport-copy"><span className="section-index">06 / BEYOND THE SCREEN</span><h2>Discipline is<br /><em>also a practice.</em></h2><p>Skiing, trekking, and camping have been an important part of Harris&apos;s growth. Through the school&apos;s Winter Sports Department, WSC/TBMS, and the Jammu and Kashmir Winter Games Association, he completed Basic, Intermediate, Advanced, and Refresher skiing courses and earned positions across them.</p><p>These experiences are not a claim to a podium. They are evidence of patience, perseverance, adaptability, and a willingness to learn in unfamiliar conditions.</p><a className="text-button light-button" href="https://www.linkedin.com/in/harris-mir-a6384a354?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">Explore verified achievements on LinkedIn <ArrowUpRight size={16} /></a></div><div className="sport-mark"><span>SKI</span><strong>04</strong><small>COURSES COMPLETED</small><div className="mountain-line" /></div></section>

      <section id="credentials" className="section-pad credentials-section"><div className="section-heading"><span className="section-index">07 / CREDENTIALS</span><h2>Evidence over<br /><em>assumptions.</em></h2></div><div className="credentials-grid"><article><span className="credential-mark">MS</span><div><h3>Microsoft learning experiences</h3><p>Learning experiences associated with Microsoft are part of Harris&apos;s professional development. Exact certificate titles, dates, and credential details will be added from the original records.</p></div></article><article><span className="credential-mark">D</span><div><h3>Deloitte learning experiences</h3><p>Deloitte-related learning experiences are noted without inventing certificate names or dates. Verified details can be explored through Harris&apos;s professional profile.</p></div></article></div><div className="credentials-footer"><span>Certificate images and credential IDs will be added when supplied.</span><a href="https://www.linkedin.com/in/harris-mir-a6384a354?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">Explore professional journey on LinkedIn <ArrowUpRight size={15} /></a></div></section>

      <section className="section-pad recruiter-section"><div className="section-heading"><span className="section-index">08 / WHY HARRIS?</span><h2>Potential needs<br /><em>proof and patience.</em></h2></div><div className="recruiter-grid"><div className="recruiter-copy"><p className="lead">An ambitious learner with a science foundation, two academic pathways, practical project work, and a genuine interest in how intelligent systems can help people.</p><p>The strongest evidence today is curiosity backed by consistent learning: technical practice, repository-based work, independent development, and the communication and perseverance built through school and outdoor activities.</p><button className="button button-dark" onClick={() => jump('contact')}>Start a conversation <ArrowUpRight size={16} /></button></div><div className="role-fit"><span className="mini-label">EXPLORE ROLE FIT</span><div className="role-tabs">{Object.keys(roleFits).map((name) => <button key={name} className={role === name ? 'active' : ''} onClick={() => setRole(name as Role)}>{name}</button>)}</div><div className="role-result"><div><span className="fit-label">{roleFits[role].fit}</span><h3>{role}</h3></div><p>{roleFits[role].body}</p><div className="fit-tags">{roleFits[role].tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div></div></section>

      <section id="assistant" className="dark-section section-pad assistant-section"><div className="assistant-intro"><span className="section-index">09 / ASK HARRIS AI</span><h2>Curious about<br /><em>Harris?</em></h2><p>Ask questions about education, skills, projects, achievements, and professional interests. This guide answers from the verified content on this portfolio.</p><div className="assistant-badge"><BrainCircuit size={17} /> AI-POWERED PORTFOLIO GUIDE</div></div><div className="chat-box"><div className="chat-top"><span><span className="status-dot" /> Guide online</span><span>Fallback knowledge base</span></div><div className="chat-messages">{chat.length === 0 && <div className="chat-welcome"><Sparkles size={19} /><p>Try asking who Harris is, what he is studying, or what he is exploring next.</p></div>}{chat.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}><span>{message.role === 'assistant' ? 'HM' : 'YOU'}</span><p>{message.content}</p></div>)}</div><div className="suggestions">{['Who is Harris Mir?', 'What is he studying?', 'Tell me about RoleSync.'].map((suggestion) => <button key={suggestion} onClick={() => { setChatInput(suggestion); setChat((messages) => [...messages, { role: 'user', content: suggestion }, { role: 'assistant', content: answerQuestion(suggestion) }]); }}>{suggestion}</button>)}</div><form className="chat-form" onSubmit={sendChat}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder="Ask a question..." aria-label="Ask Harris AI a question" maxLength={500} /><button aria-label="Send question"><Send size={17} /></button></form></div></section>

      <section id="contact" className="section-pad contact-section"><div className="section-heading"><span className="section-index">10 / CONTACT</span><h2>Have an opportunity,<br /><em>an idea, or a project?</em></h2></div><div className="contact-grid"><div className="contact-copy"><p className="lead">I&apos;m always interested in meaningful conversations about technology, learning opportunities, projects, and collaboration.</p><div className="contact-links"><a href="mailto:harrismirr99@gmail.com"><Mail size={17} /> harrismirr99@gmail.com</a><a href="https://www.linkedin.com/in/harris-mir-a6384a354?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a><a href="https://github.com/harrismirr" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a></div><button className="copy-button" onClick={copyEmail}>{copied ? <Check size={15} /> : <Mail size={15} />} {copied ? 'Email copied' : 'Copy email address'}</button></div><form className="contact-form" onSubmit={submitContact}><label>Full name<input name="name" placeholder="Your name" required /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label><label>Subject<input name="subject" placeholder="What would you like to discuss?" /></label><label>Message<textarea name="message" placeholder="Tell me a little about the opportunity or idea..." rows={5} required /></label><button className="button button-dark" type="submit">Prepare email <Send size={16} /></button>{formStatus && <p className="form-status">{formStatus}</p>}<small>This form opens your email app. No message is stored on this website.</small></form></div></section>

      <footer className="site-footer"><div className="footer-brand"><a className="brand" href="#home"><span>HM</span><b>HARRIS MIR</b></a><p>Learning. Building. Exploring Intelligence.</p></div><div className="footer-links">{sections.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div><div className="footer-social"><a href="https://www.linkedin.com/in/harris-mir-a6384a354?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer"><Linkedin size={17} /></a><a href="https://github.com/harrismirr" target="_blank" rel="noreferrer"><Github size={17} /></a><a href="mailto:harrismirr99@gmail.com"><Mail size={17} /></a></div><p className="copyright">© {new Date().getFullYear()} Harris Mir. All rights reserved.</p></footer>

      {commandOpen && <div className="command-overlay" onClick={() => setCommandOpen(false)}><div className="command-modal" onClick={(event) => event.stopPropagation()}><div className="command-input"><Search size={17} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search portfolio..." /><kbd>ESC</kbd></div><div className="command-results">{sections.map(([label, id]) => <button key={id} onClick={() => jump(id)}><span>{label}</span><ChevronRight size={16} /></button>)}<button onClick={() => jump('assistant')}><span>Ask Harris AI</span><ChevronRight size={16} /></button></div></div></div>}
    </main>
  );
}
