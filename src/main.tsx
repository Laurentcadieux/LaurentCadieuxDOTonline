import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import {
  ArrowDownToLine,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ExternalLink,
  Globe2,
  Languages,
  Linkedin,
  LockKeyhole,
  Mail,
  MessageCircle,
  Mic,
  MicOff,
  MapPin,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Store,
  Trophy,
  Waves,
  X,
} from "lucide-react";
import "./styles.css";

const contact = {
  email: "laurentcadieux@gmail.com",
  phone: "+1 514-838-2236",
  location: "Beaconsfield (Montreal), QC",
  linkedin: "https://www.linkedin.com/in/laurent-cadieux-99a5705a",
};

const elevenLabsTalkUrl =
  "https://elevenlabs.io/app/talk-to?agent_id=agent_5901kzp8c51dfgwaqcs4h2cf199v&branch_id=agtbrch_1201kzp8c62gf5qbgtzgpp68gsrj";

const buildRevision = "20260814-1220";

const highlights = [
  {
    value: "25+",
    label: "years across IT infrastructure, automation, AI, and enterprise architecture",
  },
  {
    value: "3",
    label: "UiPath vertical chapters: Canada Public Sector, SUMMIT, and FINS",
  },
  {
    value: "8 mos",
    label: "to land and scale a net-new large Canadian FINS account to multi-million ARR",
  },
];

const wins = [
  "Canada PubSec: two years leading CS for the Canadian federal book and vertical, with TAM, CSM, AE, Protected B, account, and partner context. I know everyone.",
  "SUMMIT: carried a 7+ enterprise account book across telecommunications, manufacturers, utilities, forestry and wood products, and water technology.",
  "FINS: landed and scaled a large Canadian financial services institution to multi-million-dollar ARR in 8 months, from 8-vendor evaluation to production with ATO.",
  "AE / SE bridge: owned discovery, demos, RFP responses, French validation, architecture reviews, and executive sessions when coverage disappeared.",
  "New logo via partners: a partner-first motion with global and specialist automation/SI partners turns ecosystems into an outbound engine.",
  "Retention: zero-escalation account management, 13/13 cases resolved, 100% SLA, and Flex-to-Unified transition playbooks adopted by GTM.",
];

const experience = [
  {
    company: "UiPath Inc.",
    role: "Field CTO / Sr. Technical Account Manager, AMER",
    period: "June 2024 - Present",
    bullets: [
      "Lead SUMMIT vertical account strategy across 7+ enterprises in telecommunications, global manufacturing, provincial utilities, forestry and wood products, and water technology.",
      "Landed a net-new large Canadian financial services institution from 8-vendor evaluation to full UiPath platform production with ATO through GAIA, CRA, and CVOP governance.",
      "Drive Captiva modernization and a 15-use-case expansion pipeline, with the customer projecting nine-figure automation value over three years.",
      "Originated a large provincial energy utility agentic/CX expansion as the sole technical resource, including discovery, demos, French validation, EA engagement, and executive alignment.",
      "Bridge AE and SE coverage gaps through successive org changes, owning pre-sale motions from a post-sale seat to keep accounts and deals moving.",
      "Built data-driven engagement frameworks, adoption playbooks, and the Flex-to-Unified transition standard adopted as AMER GTM best practice.",
      "Member of the TAM Council and Technical Enablement / Product Adoption group; designed CSM/TAM engagement model v2.0 and partner-portfolio alignment.",
    ],
  },
  {
    company: "UiPath Inc.",
    role: "Technical Account Manager II / Senior - Canadian Public Sector",
    period: "2022 - May 2024",
    bullets: [
      "Led the Canadian federal public sector book across major departments and agencies, including post-sale strategy for a high-seven-figure book across 9+ accounts.",
      "Spearheaded Canadian Public Sector collaboration and vertical leadership across an eight-figure vertical as interim gap owner.",
      "Aligned TAM, CSM, and AE motions across federal accounts and partners.",
      "Created the EASYLAB enablement baseline and the UiPath skills-badge certification proposal; championed Automation Suite as a Service partner offerings.",
    ],
  },
  {
    company: "Technicolor",
    role: "Infrastructure Architect",
    period: "2016 - 2022",
    bullets: [
      "Designed hybrid and cloud-native platforms across OpenStack, Azure VDI, HCI, secure content environments, and VOD-scale media systems.",
      "Delivered work-from-home VDI for 2,200+ corporate staff and 5,000+ VFX artists.",
      "Automated DR pipelines and air-gapped networks, with governance and CI/CD using GitHub and Terraform.",
    ],
  },
  {
    company: "Technicolor",
    role: "Senior System Engineer IV",
    period: "2007 - 2016",
    bullets: [
      "Ran Citrix XenApp at scale across 225+ apps, AWS/Azure migrations, MPA-aligned security architecture, and Platform9 transitions.",
      "Drove data-center consolidation and custom ServiceNow modules for enterprise infrastructure operations.",
    ],
  },
  {
    company: "NOVASYS Corp. / IBM Canada",
    role: "System Administrator / Level 2 & 3 Supervisor",
    period: "2002 - 2007",
    bullets: [
      "Built the operational foundation in infrastructure support, administration, escalation handling, and enterprise service delivery.",
    ],
  },
];

const skills = [
  "UiPath Automation Cloud",
  "Orchestrator",
  "Studio & Autopilot",
  "IDP / DU / IXP",
  "Agentic & Maestro",
  "Insights",
  "Test Suite",
  "Process Mining",
  "AI Units & consumption models",
  "Azure",
  "AWS",
  "OpenStack",
  "VMware",
  "Citrix / VDI",
  "Nutanix / HCI",
  "Terraform",
  "Packer",
  "GitHub Actions",
  "Splunk / ITSI",
  "ServiceNow",
  "SecOps",
  "CI/CD & IaC",
];

const education = [
  "D.E.P. - IT Infrastructure Support & Administration, 1998-2002",
  "Continuous professional development since 1998 across UiPath platform, OpenStack, AWS, Azure, Splunk, PowerShell, VMware vSphere, Citrix XenDesktop, and CompTIA A+.",
];

const mindset = [
  "Empathic Sherpa",
  "Theory of Constraints practitioner",
  "Mr. Fix It problem solver",
  "C-level communication",
  "Ownership mentality",
  "Bridge-builder across Sales, SE, Product, and Partners",
  "High-energy, bilingual, hit-the-ground-running",
];

const personalHighlights = [
  {
    icon: Waves,
    title: "Kitesurfer",
    copy: "A lifelong appetite for wind, water, timing, and calculated risk outside the enterprise room.",
  },
  {
    icon: Store,
    title: "Co-founder of Kiteforce Montreal",
    copy: "Co-founded Kiteforce Montreal and helped grow it into one of the three biggest kiteboarding stores in North America.",
  },
  {
    icon: PhoneCall,
    title: "Direct contact",
    copy: `${contact.phone} for personal and professional follow-up.`,
  },
];

function VoiceAgentPanel() {
  const [secret, setSecret] = useState("");
  const [notice, setNotice] = useState("Password required before the conversation opens.");
  const [isStarting, setIsStarting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const conversation = useConversation({
    onConnect: () => setNotice("Connected. LaurentContext is listening."),
    onDisconnect: () => setNotice("Conversation ended."),
    onError: () => setNotice("Voice agent error. Check the secret or try again."),
  });

  const startVoice = async () => {
    setIsStarting(true);
    setNotice("Checking access...");
    try {
      const response = await fetch("/api/voice/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });

      if (response.status === 403) {
        setNotice("Access denied. The conversation was not started.");
        return;
      }

      if (!response.ok) {
        setIsUnlocked(true);
        setNotice("Access accepted. Open the private Laurent conversation.");
        return;
      }

      const payload = (await response.json()) as { signedUrl?: string };
      if (!payload.signedUrl) {
        setIsUnlocked(true);
        setNotice("Access accepted. Open the private Laurent conversation.");
        return;
      }

      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({ signedUrl: payload.signedUrl });
    } catch {
      setNotice("Could not start the voice conversation.");
    } finally {
      setIsStarting(false);
    }
  };

  const isConnected = conversation.status === "connected";
  const isConnecting = conversation.status === "connecting" || isStarting;

  return (
    <aside className={`voice-widget${isOpen ? " open" : ""}`} aria-label="LaurentContext assistant">
      {isOpen && (
        <div className="voice-popover" role="dialog" aria-labelledby="voice-widget-heading">
          <div className="voice-popover-header">
            <div>
              <p className="eyebrow">Private CV agent</p>
              <h2 id="voice-widget-heading">LaurentContext</h2>
            </div>
            <button className="icon-button" type="button" onClick={() => setIsOpen(false)} aria-label="Close LaurentContext">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <p className="voice-widget-copy">
            Password-protected voice conversation about Laurent's CV, enterprise automation background, and technical leadership profile.
          </p>
          <label htmlFor="voice-secret">
            <LockKeyhole size={16} aria-hidden="true" />
            Password
          </label>
          <input
            id="voice-secret"
            type="password"
            value={secret}
            autoComplete="off"
            placeholder="Enter password"
            onChange={(event) => {
              setSecret(event.target.value);
              setIsUnlocked(false);
              setNotice("Password required before the conversation opens.");
            }}
            disabled={isConnected || isConnecting}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !isConnected && !isConnecting) {
                void startVoice();
              }
            }}
          />
          <div className="voice-actions">
            {isConnected ? (
              <button className="button primary dark" type="button" onClick={() => conversation.endSession()}>
                <MicOff size={18} aria-hidden="true" />
                End voice
              </button>
            ) : (
              <button className="button primary" type="button" onClick={startVoice} disabled={isConnecting || secret.length === 0}>
                <Mic size={18} aria-hidden="true" />
                {isConnecting ? "Checking..." : "Unlock"}
              </button>
            )}
            {isUnlocked && (
              <a className="button secondary" href={elevenLabsTalkUrl} target="_blank" rel="noreferrer">
                <ExternalLink size={18} aria-hidden="true" />
                Open chat
              </a>
            )}
          </div>
          <p className="voice-status" aria-live="polite">
            {notice}
          </p>
        </div>
      )}
      <button
        className="voice-launcher"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close LaurentContext assistant" : "Open LaurentContext assistant"}
      >
        <span>LC</span>
        <MessageCircle size={24} aria-hidden="true" />
      </button>
    </aside>
  );
}

function App() {
  return (
    <ConversationProvider>
      <main>
      <span className="build-revision" aria-hidden="true">
        {buildRevision}
      </span>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Laurent Cadieux CV home">
          <span className="brand-mark">LC</span>
          <span>Laurent Cadieux</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#profile">Profile</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <a href="#personal">Personal</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Enterprise AI & Automation • Field CTO • Sr. TAM</p>
          <h1>Strategic technology leader for enterprise automation and agentic systems.</h1>
          <p className="hero-lede">
            Bilingual FR/EN leader across Canadian Public Sector, SUMMIT, and FINS, combining deep architecture, customer trust, discovery, demos, executive alignment, and revenue impact.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="/Laurent-Cadieux-CV-2026-August.pdf">
              <ArrowDownToLine size={18} aria-hidden="true" />
              Download PDF CV
            </a>
            <a className="button secondary" href={`mailto:${contact.email}`}>
              <Mail size={18} aria-hidden="true" />
              Contact Laurent
            </a>
          </div>
        </div>

        <aside className="cv-card" aria-label="CV summary">
          <img
            className="profile-photo"
            src="/laurent-cadieux-linkedin.jpg"
            alt="LinkedIn profile photo of Laurent Cadieux"
          />
          <h2>Laurent Cadieux</h2>
          <p>Field CTO / Sr. Technical Account Manager, AMER</p>
          <div className="contact-list compact">
            <a href={`mailto:${contact.email}`}>
              <Mail size={16} aria-hidden="true" />
              {contact.email}
            </a>
            <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>
              <Phone size={16} aria-hidden="true" />
              {contact.phone}
            </a>
            <span>
              <MapPin size={16} aria-hidden="true" />
              {contact.location}
            </span>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} aria-hidden="true" />
              LinkedIn profile
            </a>
          </div>
        </aside>
      </section>

      <section className="metric-strip" aria-label="Career highlights">
        {highlights.map((item) => (
          <div className="metric" key={item.value}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section two-column" id="profile">
        <div className="section-heading">
          <p className="eyebrow">Profile</p>
          <h2>Enterprise architect of tomorrow, applied to revenue.</h2>
        </div>
        <div className="body-copy">
          <p>
            Laurent Cadieux is a strategic technology leader with 25+ years across IT infrastructure, automation, AI, and agentic systems: the profile of the Enterprise Architect of tomorrow, applied to revenue. His UiPath journey spans the three verticals that define the Canadian territory: two years leading Canadian Public Sector accounts, then the SUMMIT vertical, and most recently landing and scaling a net-new FINS account.
          </p>
          <p>
            Always post-sale by title, he consistently bridges AE and SE gaps through every org change: running discovery, demos, architecture, RFP responses, French-language validation, and executive alignment when no one else can. He is strongest where the room needs both technical precision and commercial momentum.
          </p>
          <p>
            Fluent in English and French, Laurent is deeply networked across the federal account base, Quebec enterprise, and the partner ecosystem. He runs as an Empathic Sherpa and one-man army: his own solution engineer, architect, and closer in the room.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="wins-heading">
        <div className="section-heading narrow">
          <p className="eyebrow">Where Laurent wins</p>
          <h2 id="wins-heading">Trusted when enterprise deals need architecture, urgency, and account control.</h2>
        </div>
        <div className="win-grid">
          {wins.map((win) => (
            <article className="win-card" key={win}>
              <Trophy size={22} aria-hidden="true" />
              <p>{win}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="experience-band" id="experience">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2>Professional timeline</h2>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item" key={`${item.company}-${item.role}`}>
              <div>
                <span className="period">{item.period}</span>
                <h3>{item.role}</h3>
                <p className="company">
                  <Building2 size={17} aria-hidden="true" />
                  {item.company}
                </p>
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="education-band" aria-labelledby="education-heading">
        <div>
          <p className="eyebrow">Education & Certifications</p>
          <h2 id="education-heading">Infrastructure roots, continuous platform depth.</h2>
        </div>
        <ul>
          {education.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section" id="skills">
        <div className="section-heading narrow">
          <p className="eyebrow">Technical depth</p>
          <h2>Automation, cloud, infrastructure, and governance fluency.</h2>
        </div>
        <div className="skill-cloud">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="systems-band">
        <div>
          <p className="eyebrow">Mindset</p>
          <h2>The Empathic Sherpa</h2>
          <p>
            Guiding customers and colleagues through complex landscapes with empathy, precision, and impact.
          </p>
        </div>
        <div className="principles">
          {mindset.map((item) => (
            <div className="principle" key={item}>
              <CheckCircle2 size={18} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Ready for enterprise AI, automation, and technical account leadership conversations.</h2>
        </div>
        <div className="contact-actions">
          <a className="button primary dark" href={`mailto:${contact.email}`}>
            <Mail size={18} aria-hidden="true" />
            Email Laurent
          </a>
          <a className="button secondary" href={contact.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={18} aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </section>

      <section className="personal-band" id="personal">
        <div className="section-heading">
          <p className="eyebrow">Personal</p>
          <h2>Kitesurfer, builder, and co-founder.</h2>
          <p>
            Laurent's operator mindset also comes from outside enterprise technology: founder energy, retail execution, outdoor discipline, and the timing instincts that come from kitesurfing.
          </p>
        </div>
        <div className="personal-grid">
          {personalHighlights.map(({ icon: Icon, title, copy }) => (
            <article className="personal-card" key={title}>
              <Icon size={22} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div>
          <BriefcaseBusiness size={18} aria-hidden="true" />
          <span>Laurent Cadieux CV</span>
        </div>
        <div>
          <Languages size={18} aria-hidden="true" />
          <span>Bilingual FR / EN</span>
        </div>
        <div>
          <Globe2 size={18} aria-hidden="true" />
          <span>www.laurentcadieux.online</span>
        </div>
        <div>
          <ShieldCheck size={18} aria-hidden="true" />
          <span>Updated 2026</span>
        </div>
        <Sparkles className="footer-spark" size={18} aria-hidden="true" />
      </footer>
      <VoiceAgentPanel />
      </main>
    </ConversationProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
