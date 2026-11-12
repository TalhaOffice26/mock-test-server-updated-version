import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpenCheck,
  Headphones,
  PencilLine,
  Mic,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  Check,
  X,
  RefreshCcw,
  Save,
  Download,
  TimerReset,
} from "lucide-react";

// ---------- Utility Components ----------
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-md bg-white/80 border border-gray-100 ${className}`}>{children}</div>
);

const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    ghost: "bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-200",
    subtle: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
  };
  return (
    <button
      className={`px-4 py-2 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Tag = ({ children }) => (
  <span className="px-2 py-1 rounded-lg text-xs bg-indigo-50 text-indigo-700 border border-indigo-100">{children}</span>
);

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    <div className="p-2 rounded-xl bg-indigo-600 text-white"><Icon size={20} /></div>
    <div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  </div>
);

// ---------- Mock Data ----------
const READING_TYPES = [
  { id: "mcq", label: "Multiple Choice" },
  { id: "tfn", label: "True/False/Not Given" },
  { id: "match", label: "Matching Headings" },
  { id: "fill", label: "Fill in the Blanks" },
];

const LISTENING_TYPES = [
  { id: "mcq", label: "Multiple Choice" },
  { id: "map", label: "Map/Plan Labelling" },
  { id: "form", label: "Form Completion" },
  { id: "short", label: "Short Answer" },
];

const SAMPLE_READING = {
  mcq: [
    {
      passage:
        "In recent years, urban planners have experimented with \"15-minute cities\"—neighbourhoods where residents can access most daily needs within a short walk or bike ride.",
      question: "What is the main idea of the paragraph?",
      choices: [
        "A description of long-distance commuting benefits",
        "An explanation of the 15-minute city concept",
        "A criticism of neighbourhood walkability",
        "A history of urban planning since 1900",
      ],
      answer: 1,
      explain:
        "The paragraph defines the 15-minute city concept rather than criticising or discussing history.",
    },
  ],
  tfn: [
    {
      passage:
        "Studies suggest that reduced car dependency can improve public health by encouraging active travel and lowering air pollution.",
      statement: "Reducing car use has no measurable effect on public health.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      explain: "The text states improvements in public health; the statement contradicts it (False).",
    },
  ],
  match: [
    {
      passage:
        "Paragraph A: Early experiments. Paragraph B: Community feedback. Paragraph C: Economic outcomes.",
      directions: "Match the headings to paragraphs:",
      headings: [
        "1. Financial results",
        "2. Trial phase",
        "3. Residents' opinions",
      ],
      items: [
        { para: "A", correct: 1 },
        { para: "B", correct: 3 },
        { para: "C", correct: 1 },
      ],
      explain:
        "A relates to trials (2), B to opinions (3), C to financial results (1).",
    },
  ],
  fill: [
    {
      passage:
        "The initiative aimed to reduce average travel time to essential services to just ____ minutes by improving local amenities.",
      answer: "15",
      explain: "The blank refers to the \"15-minute\" concept.",
    },
  ],
};

const SAMPLE_LISTENING = {
  mcq: [
    {
      audio:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // placeholder
      question: "What is the main purpose of the talk?",
      choices: [
        "To announce a schedule change",
        "To describe a research project",
        "To advertise a concert",
        "To provide safety instructions",
      ],
      answer: 1,
      explain: "Generic academic talk describing a project (placeholder).",
    },
  ],
  form: [
    {
      audio:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      prompts: [
        { label: "Student Name", key: "name", answer: "Mira Patel" },
        { label: "Course Code", key: "code", answer: "BIO204" },
      ],
      explain: "Listen and complete the form with correct spellings.",
    },
  ],
  short: [
    {
      audio:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      question: "What is the recommended study duration per day? (number only)",
      answer: "2",
      explain: "Short-answer questions usually require one to three words/numbers.",
    },
  ],
  map: [
    {
      audio:
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      question: "Which building is to the north of the library?",
      choices: ["Cafeteria", "Gym", "Auditorium", "Parking Lot"],
      answer: 2,
      explain: "Placeholder logic; in a real test this is based on a map.",
    },
  ],
};

const WRITING_TOPICS = [
  { id: "task1-ac", label: "Task 1 (Academic): Graph/Chart Description" },
  { id: "task1-gt", label: "Task 1 (General): Letter Writing" },
  { id: "task2", label: "Task 2: Opinion Essay" },
];

const WRITING_PROMPTS = {
  "task1-ac": [
    "Summarise the information given in the line chart about energy consumption between 2000 and 2020.",
    "Describe the process of glass recycling shown in the diagram.",
  ],
  "task1-gt": [
    "Write a letter to your landlord about a problem with the heating system.",
    "Write a letter to a friend inviting them to a cultural festival in your city.",
  ],
  task2: [
    "Some people think that the government should invest more in public transport than in building new roads. To what extent do you agree or disagree?",
    "In many countries, people are choosing to live alone. Why is this the case, and is it a positive or negative development?",
  ],
};

const SPEAKING_PARTS = {
  part1: [
    "Do you work or study? Why did you choose this field?",
    "What kind of music do you enjoy?",
  ],
  part2: [
    "Describe a book you recently read that left a strong impression on you. You should say: what the book is, what it is about, why you chose it, and explain why it impressed you.",
  ],
  part3: [
    "How has technology changed the way people read books?",
    "Do you think libraries will become obsolete in the future?",
  ],
};

// ---------- Helpers ----------
const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
};

const WordCount = ({ text }) => (
  <span className="text-sm text-gray-500">{(text?.trim()?.split(/\s+/).filter(Boolean) || []).length} words</span>
);

const Timer = ({ running, seconds, onToggle, onReset }) => (
  <div className="flex items-center gap-2">
    <Tag>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</Tag>
    <Button variant="subtle" onClick={onToggle}>{running ? <Pause size={16}/> : <Play size={16}/>}<span className="ml-2">{running ? "Pause" : "Start"}</span></Button>
    <Button variant="ghost" onClick={onReset}><TimerReset size={16}/><span className="ml-2">Reset</span></Button>
  </div>
);

// ---------- Reading Module ----------
function ReadingModule() {
  const [type, setType] = useState(READING_TYPES[0].id);
  const bank = SAMPLE_READING[type] || [];
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAns, setShowAns] = useState(false);

  useEffect(() => {
    setIdx(0); setSelected(null); setShowAns(false);
  }, [type]);

  const item = bank[idx];

  const go = (d) => {
    const n = (idx + d + bank.length) % bank.length;
    setIdx(n); setSelected(null); setShowAns(false);
  };

  return (
    <div>
      <SectionHeader icon={BookOpenCheck} title="Reading Practice" subtitle="Choose a question type and practise one at a time."/>
      <div className="flex flex-wrap gap-2 mb-5">
        {READING_TYPES.map((t) => (
          <Button key={t.id} variant={t.id === type ? "primary" : "ghost"} onClick={() => setType(t.id)}>
            {t.label}
          </Button>
        ))}
      </div>

      {item ? (
        <Card className="p-5">
          <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">{item.passage}</p>

          {type === "mcq" && (
            <div>
              <p className="font-medium mb-3">{item.question}</p>
              <div className="space-y-2">
                {item.choices.map((c, i) => (
                  <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${selected === i ? "border-indigo-400 bg-indigo-50" : "border-gray-200"}`}>
                    <input type="radio" name="r-mcq" checked={selected === i} onChange={() => setSelected(i)} />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {type === "tfn" && (
            <div>
              <p className="font-medium mb-3">Statement: {item.statement}</p>
              <div className="flex gap-2 flex-wrap">
                {item.options.map((o, i) => (
                  <Button key={o} variant={selected === i ? "primary" : "ghost"} onClick={() => setSelected(i)}>{o}</Button>
                ))}
              </div>
            </div>
          )}

          {type === "match" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">{item.directions}</p>
                <ul className="list-disc list-inside text-gray-700 mb-3">
                  {item.headings.map((h, i) => (<li key={i}>{h}</li>))}
                </ul>
                <p className="text-sm text-gray-500">Type the correct number for each paragraph.</p>
              </div>
              <div className="space-y-3">
                {item.items.map((it, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-10">{it.para}</span>
                    <input className="border rounded-lg px-3 py-2 w-24" placeholder="#" onChange={(e)=> it.user = e.target.value } />
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === "fill" && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span>Fill:</span>
                <input className="border rounded-lg px-3 py-2 w-28" placeholder="answer" onChange={(e)=> item.user = e.target.value } />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => go(-1)}><ChevronLeft size={16}/><span className="ml-2">Prev</span></Button>
              <Button variant="ghost" onClick={() => go(1)}><span className="mr-2">Next</span><ChevronRight size={16}/></Button>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowAns(true)}><Check size={16}/><span className="ml-2">Check Answer</span></Button>
              <Button variant="subtle" onClick={() => { setSelected(null); if(item.items) item.items.forEach(it=> it.user=""); if("user" in item) item.user=""; setShowAns(false); }}><RefreshCcw size={16}/><span className="ml-2">Reset</span></Button>
            </div>
          </div>

          <AnimatePresence>
            {showAns && (
              <motion.div initial={{opacity:0, y:-6}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="mt-5 p-4 border rounded-xl bg-green-50 border-green-200">
                <p className="font-medium text-green-800 mb-1">Answer & Explanation</p>
                {type === "mcq" && <p className="text-sm text-green-900">Correct: <b>{item.choices[item.answer]}</b>. {item.explain}</p>}
                {type === "tfn" && <p className="text-sm text-green-900">Correct: <b>{item.options[item.answer]}</b>. {item.explain}</p>}
                {type === "match" && (
                  <ul className="text-sm text-green-900 list-disc list-inside">
                    {item.items.map((it, i)=> (
                      <li key={i}>Paragraph {it.para}: <b>{it.correct}</b></li>
                    ))}
                  </ul>
                )}
                {type === "fill" && <p className="text-sm text-green-900">Correct: <b>{item.answer}</b>. {item.explain}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ) : (
        <p>No questions loaded.</p>
      )}
    </div>
  );
}

// ---------- Listening Module ----------
function ListeningModule() {
  const [type, setType] = useState(LISTENING_TYPES[0].id);
  const bank = SAMPLE_LISTENING[type] || [];
  const [idx, setIdx] = useState(0);
  const [showAns, setShowAns] = useState(false);
  const [mcqChoice, setMcqChoice] = useState(null);
  const item = bank[idx];

  useEffect(()=>{ setIdx(0); setShowAns(false); setMcqChoice(null); }, [type]);

  const go = (d) => {
    const n = (idx + d + bank.length) % bank.length;
    setIdx(n); setShowAns(false); setMcqChoice(null);
  };

  return (
    <div>
      <SectionHeader icon={Headphones} title="Listening Practice" subtitle="Select a type and answer while the audio plays."/>
      <div className="flex flex-wrap gap-2 mb-5">
        {LISTENING_TYPES.map((t) => (
          <Button key={t.id} variant={t.id === type ? "primary" : "ghost"} onClick={() => setType(t.id)}>
            {t.label}
          </Button>
        ))}
      </div>

      {item && (
        <Card className="p-5">
          <audio controls className="w-full mb-4">
            <source src={item.audio} type="audio/mpeg" />
          </audio>

          {type === "mcq" && (
            <div>
              <p className="font-medium mb-3">{item.question}</p>
              <div className="space-y-2">
                {item.choices.map((c, i) => (
                  <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${mcqChoice === i ? "border-indigo-400 bg-indigo-50" : "border-gray-200"}`}>
                    <input type="radio" name="l-mcq" checked={mcqChoice === i} onChange={() => setMcqChoice(i)} />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {type === "form" && (
            <div>
              <p className="text-sm text-gray-600 mb-2">{item.explain}</p>
              <div className="grid md:grid-cols-2 gap-3">
                {item.prompts.map((p) => (
                  <div key={p.key} className="flex items-center gap-3">
                    <label className="w-40 text-gray-700">{p.label}</label>
                    <input className="border rounded-lg px-3 py-2 flex-1" placeholder="…" onChange={(e)=> p.user = e.target.value } />
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === "short" && (
            <div>
              <p className="font-medium mb-2">{item.question}</p>
              <input className="border rounded-lg px-3 py-2 w-40" placeholder="answer" onChange={(e)=> item.user = e.target.value } />
            </div>
          )}

          {type === "map" && (
            <div>
              <p className="font-medium mb-3">{item.question}</p>
              <div className="space-y-2">
                {item.choices.map((c, i) => (
                  <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${mcqChoice === i ? "border-indigo-400 bg-indigo-50" : "border-gray-200"}`}>
                    <input type="radio" name="l-map" checked={mcqChoice === i} onChange={() => setMcqChoice(i)} />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => go(-1)}><ChevronLeft size={16}/><span className="ml-2">Prev</span></Button>
              <Button variant="ghost" onClick={() => go(1)}><span className="mr-2">Next</span><ChevronRight size={16}/></Button>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowAns(true)}><Check size={16}/><span className="ml-2">Check Answer</span></Button>
              <Button variant="subtle" onClick={() => { setShowAns(false); setMcqChoice(null); if(item.prompts) item.prompts.forEach(p=> p.user=""); if("user" in item) item.user=""; }}><RefreshCcw size={16}/><span className="ml-2">Reset</span></Button>
            </div>
          </div>

          <AnimatePresence>
            {showAns && (
              <motion.div initial={{opacity:0, y:-6}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="mt-5 p-4 border rounded-xl bg-blue-50 border-blue-200">
                <p className="font-medium text-blue-800 mb-1">Answer & Tips</p>
                {type === "mcq" && <p className="text-sm text-blue-900">Correct: <b>{item.choices[item.answer]}</b>. {item.explain}</p>}
                {type === "map" && <p className="text-sm text-blue-900">Correct: <b>{item.choices[item.answer]}</b>. {item.explain}</p>}
                {type === "short" && <p className="text-sm text-blue-900">Expected: <b>{item.answer}</b>. {item.explain}</p>}
                {type === "form" && (
                  <ul className="text-sm text-blue-900 list-disc list-inside">
                    {item.prompts.map((p) => (
                      <li key={p.key}><b>{p.label}:</b> {p.answer}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      )}
    </div>
  );
}

// ---------- Writing Module ----------
function WritingModule() {
  const [task, setTask] = useState(WRITING_TOPICS[0].id);
  const [promptIdx, setPromptIdx] = useState(0);
  const [text, setText] = useLocalStorage("ielts-writing-text", "");
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (timerRunning) setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  useEffect(() => { setPromptIdx(0); }, [task]);

  const prompts = WRITING_PROMPTS[task] || [];
  const prompt = prompts[promptIdx] || "";

  const downloadTxt = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `writing_${task}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <SectionHeader icon={PencilLine} title="Writing Practice" subtitle="Pick a task, get a prompt, and write. Your work auto-saves locally."/>

      <div className="flex flex-wrap gap-2 mb-4">
        {WRITING_TOPICS.map((t) => (
          <Button key={t.id} variant={t.id === task ? "primary" : "ghost"} onClick={() => setTask(t.id)}>{t.label}</Button>
        ))}
      </div>

      <Card className="p-5 mb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-gray-900">Prompt</p>
            <p className="text-gray-700 mt-1">{prompt}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setPromptIdx((p) => (p + 1) % prompts.length)} title="Next prompt">
              <ChevronRight size={16}/>
            </Button>
            <Timer
              running={timerRunning}
              seconds={seconds}
              onToggle={() => setTimerRunning((r) => !r)}
              onReset={() => { setSeconds(0); setTimerRunning(false); }}
            />
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Tag>Autosaved</Tag>
            <WordCount text={text} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="subtle" onClick={() => setText("")}>{<X size={16}/>}&nbsp;Clear</Button>
            <Button variant="ghost" onClick={downloadTxt}><Download size={16}/>&nbsp;Download</Button>
          </div>
        </div>
        <textarea
          className="w-full min-h-[320px] border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Start writing here…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Card>
    </div>
  );
}

// ---------- Speaking Module ----------
function SpeakingModule() {
  const [part, setPart] = useState("part1");
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };
      mr.start();
      setRecording(true);
    } catch (err) {
      alert("Microphone permission is required.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const prompts = SPEAKING_PARTS[part] || [];

  return (
    <div>
      <SectionHeader icon={Mic} title="Speaking Practice" subtitle="Use the mic to record answers and play them back for self‑assessment."/>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(SPEAKING_PARTS).map((p) => (
          <Button key={p} variant={p === part ? "primary" : "ghost"} onClick={() => setPart(p)}>
            {p.replace("part", "Part ")}
          </Button>
        ))}
      </div>

      <Card className="p-5">
        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-4">
          {prompts.map((q, i) => (<li key={i}>{q}</li>))}
        </ul>

        <div className="flex items-center gap-3">
          {!recording ? (
            <Button onClick={startRecording}><Mic size={16}/><span className="ml-2">Start Recording</span></Button>
          ) : (
            <Button variant="danger" onClick={stopRecording}><Pause size={16}/><span className="ml-2">Stop</span></Button>
          )}
          {audioURL && (
            <audio controls src={audioURL} className="flex-1" />
          )}
        </div>
      </Card>
    </div>
  );
}

// ---------- Layout & App ----------
const ModuleCard = ({ title, icon: Icon, desc, onOpen }) => (
  <Card className="p-5">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-xl bg-indigo-600 text-white"><Icon size={18} /></div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-sm text-gray-600 mb-4">{desc}</p>
    <Button onClick={onOpen} className="">Open</Button>
  </Card>
);

const tabs = [
  { id: "reading", title: "Reading", icon: BookOpenCheck },
  { id: "listening", title: "Listening", icon: Headphones },
  { id: "writing", title: "Writing", icon: PencilLine },
  { id: "speaking", title: "Speaking", icon: Mic },
];

export default function App() {
  const [active, setActive] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-600 text-white"><BookOpenCheck size={18} /></div>
            <h1 className="font-semibold text-lg">IELTS Practice Hub</h1>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-3 py-2 rounded-xl text-sm border ${active === t.id ? "bg-indigo-600 text-white border-indigo-600" : "hover:bg-gray-50 border-gray-200"}`}
              >
                <span className="inline-flex items-center gap-2"><t.icon size={16}/>{t.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {!active && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Choose a module</h2>
              <p className="text-gray-600">Four modules designed for targeted IELTS practice. Pick one to begin.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <ModuleCard
                title="Reading"
                icon={BookOpenCheck}
                desc="Practise individual question types like MCQ, T/F/NG, Matching, and more."
                onOpen={() => setActive("reading")}
              />
              <ModuleCard
                title="Listening"
                icon={Headphones}
                desc="Answer while audio plays: MCQ, Form Completion, Map Labelling, Short Answers."
                onOpen={() => setActive("listening")}
              />
              <ModuleCard
                title="Writing"
                icon={PencilLine}
                desc="Task 1 & Task 2 prompts with a distraction‑free editor, timer, and autosave."
                onOpen={() => setActive("writing")}
              />
              <ModuleCard
                title="Speaking"
                icon={Mic}
                desc="Part 1–3 prompts with built‑in recording for self‑review."
                onOpen={() => setActive("speaking")}
              />
            </div>
          </>
        )}

        <AnimatePresence mode="wait">
          {active && (
            <motion.div key={active} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0}}>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Button variant="ghost" onClick={() => setActive(null)}><ChevronLeft size={16}/><span className="ml-2">Back</span></Button>
                  <Tag>{tabs.find(t=>t.id===active)?.title}</Tag>
                </div>
              </div>

              {active === "reading" && <ReadingModule />}
              {active === "listening" && <ListeningModule />}
              {active === "writing" && <WritingModule />}
              {active === "speaking" && <SpeakingModule />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-5xl mx-auto px-4 py-10 text-center text-sm text-gray-500">
        Built for focused practice. Add your own question bank or connect an API later.
      </footer>
    </div>
  );
}
