import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft, Check, ChevronRight, CircleHelp, Cloud, Crown, Flower2, Gift, Heart,
  LockKeyhole, Moon, Music2, Pause, Play, RotateCcw, Settings, Sparkles, Star,
  Trophy, Volume2, VolumeX, Wand2, X, Zap, Cat, Shirt, CakeSlice, CircleDot,
  KeyRound, Ticket, Camera, Coffee, Gem, Timer, Waves, Dices, Palette, Shield
} from 'lucide-react';
import './styles.css';

type ActivityId =
  | 'anger' | 'cafe' | 'garden' | 'cloud' | 'cozy' | 'arcade' | 'dress' | 'carnival'
  | 'music' | 'chocolate' | 'pet' | 'dance' | 'mystery' | 'compliment' | 'button'
  | 'quiz' | 'castle' | 'moon';

type Activity = {
  id: ActivityId;
  title: string;
  kicker: string;
  subtitle: string;
  collectible: string;
  theme: string;
  icon: React.ReactNode;
};

type GameState = {
  version: 4;
  completed: ActivityId[];
  collectibles: string[];
  achievements: string[];
  bonks: number;
  flowers: number;
  petCare: number;
  compliments: string[];
  outfit: string[];
  stars: number;
  danceScore: number;
  mysterySolved: number;
  buttonPresses: number;
  cafeOrders: number;
  musicScore: number;
  chocolateScore: number;
  quizScore: number;
  sound: boolean;
  reducedMotion: boolean;
  revealSeen: boolean;
};

// ============================ PERSONALIZATION ============================
// Change these values only. Everything else is generated from this config.
const CONFIG = {
  HER_NAME: 'Zainab',
  YOUR_NAME: 'Me',
  NICKNAME: '',
  GREETING: 'A private little universe, built one ridiculous detail at a time.',
  FINAL_MESSAGE: [
    'You made it all the way here.',
    'Look closely.',
    'Every little thing you touched became part of this room.',
    'The stars you caught. The flowers you grew. The ridiculous buttons you pressed.',
    'None of it was filler.',
    'I wanted to make you a place where you could simply wander, play, laugh, and stay as long as you wanted.',
    'So this is yours.',
    'Your tiny universe.',
    'And yes, I made an entire universe just to steal a smile from you.'
  ],
  COMPLIMENTS: [
    'You have an unfair talent for making ordinary moments feel important.',
    'Somehow, even your unimpressed face has main-character energy.',
    'You are the kind of person a tiny universe would build itself around.',
    'Your smile has been scientifically classified as a severe distraction.',
    'You make being around you feel like finding the warm side of the pillow.'
  ]
};

const ACTIVITIES: Activity[] = [
  { id: 'anger', title: 'The Anger Room', kicker: '01 · COMIC RELIEF', subtitle: 'A safe little room for spectacularly dramatic bonks.', collectible: 'Impact Star', theme: 'anger', icon: <Zap /> },
  { id: 'cafe', title: 'Strawberry Café', kicker: '02 · PATISSERIE', subtitle: 'Design a dessert that absolutely did not need this much ceremony.', collectible: 'Strawberry Charm', theme: 'cafe', icon: <CakeSlice /> },
  { id: 'garden', title: 'Cherry Blossom Garden', kicker: '03 · GARDEN', subtitle: 'Plant, water, and grow a tiny constellation of flowers.', collectible: 'Blossom', theme: 'garden', icon: <Flower2 /> },
  { id: 'cloud', title: 'Cloud Kingdom', kicker: '04 · SKY', subtitle: 'Catch falling stars before they disappear into the clouds.', collectible: 'Star Fragment', theme: 'cloud', icon: <Cloud /> },
  { id: 'cozy', title: 'The Cozy Room', kicker: '05 · HIDEAWAY', subtitle: 'Find the little things hiding in the lamplight.', collectible: 'Firefly', theme: 'cozy', icon: <Coffee /> },
  { id: 'arcade', title: 'Neon Arcade', kicker: '06 · ARCADE', subtitle: 'A reflex game with absolutely no mercy for slow fingers.', collectible: 'Arcade Token', theme: 'arcade', icon: <CircleDot /> },
  { id: 'dress', title: 'The Wardrobe', kicker: '07 · COUTURE', subtitle: 'Build a look from chaos and call it intentional.', collectible: 'Ribbon', theme: 'dress', icon: <Shirt /> },
  { id: 'carnival', title: 'Midnight Carnival', kicker: '08 · CARNIVAL', subtitle: 'Spin the wheel. Accept your fate. Blame physics.', collectible: 'Golden Ticket', theme: 'carnival', icon: <Dices /> },
  { id: 'music', title: 'Magic Music Box', kicker: '09 · SOUND', subtitle: 'Conduct a tiny orchestra made of stars and moonlight.', collectible: 'Music Note', theme: 'music', icon: <Music2 /> },
  { id: 'chocolate', title: 'Chocolate Atelier', kicker: '10 · CONFECTIONERY', subtitle: 'Shape, coat, decorate. Quality control is extremely serious.', collectible: 'Cocoa Gem', theme: 'chocolate', icon: <Gem /> },
  { id: 'pet', title: 'Tiny Pet Society', kicker: '11 · COMPANION', subtitle: 'Someone small has opinions about how you should spend your time.', collectible: 'Pet Heart', theme: 'pet', icon: <Cat /> },
  { id: 'dance', title: 'The Spotlight', kicker: '12 · PERFORMANCE', subtitle: 'Follow the rhythm and direct the most dramatic show alive.', collectible: 'Spotlight', theme: 'dance', icon: <Wand2 /> },
  { id: 'mystery', title: 'The Mystery House', kicker: '13 · PUZZLES', subtitle: 'Five rooms. Five clues. One secret waiting behind the last lock.', collectible: 'Mystery Key', theme: 'mystery', icon: <KeyRound /> },
  { id: 'compliment', title: 'Compliment Laboratory', kicker: '14 · RESEARCH', subtitle: 'A machine trained in the extremely important science of you.', collectible: 'Love Formula', theme: 'compliment', icon: <Heart /> },
  { id: 'button', title: 'The Forbidden Button', kicker: '15 · DO NOT', subtitle: 'It says do not press it. Which is obviously a challenge.', collectible: 'Warning Badge', theme: 'button', icon: <Shield /> },
  { id: 'quiz', title: 'The Extremely Official Quiz', kicker: '16 · CLASSIFIED', subtitle: 'A completely legitimate examination of highly questionable facts.', collectible: 'Quiz Seal', theme: 'quiz', icon: <CircleHelp /> },
  { id: 'castle', title: 'Achievement Castle', kicker: '17 · ARCHIVE', subtitle: 'A living gallery of everything you have collected.', collectible: 'Crown Fragment', theme: 'castle', icon: <Crown /> },
  { id: 'moon', title: 'Moonlight Observatory', kicker: '18 · FINALE', subtitle: 'Connect the stars and see what constellation has been waiting for you.', collectible: 'Moonstone', theme: 'moon', icon: <Moon /> }
];

const ACHIEVEMENTS = [
  ['Comic Menace', 'Land 12 bonks in the Anger Room'],
  ['Garden Architect', 'Grow five flowers'],
  ['Sugar Architect', 'Complete three café orders'],
  ['Star Catcher', 'Catch 12 stars'],
  ['Tiny Detective', 'Solve the Mystery House'],
  ['Certified Softie', 'Care for the tiny pet five times'],
  ['Main Character', 'Complete a dance sequence with a high score'],
  ['Button Criminal', 'Press the forbidden button 15 times'],
  ['Compliment Scientist', 'Generate three compliments'],
  ['Confectioner', 'Finish a chocolate design'],
  ['Quiz Menace', 'Score 3/3 on the quiz'],
  ['Collector', 'Collect 12 world artifacts'],
  ['World Explorer', 'Visit every room'],
  ['The Final Door', 'Open the hidden final room'],
  ['Luckiest Girl', 'Reach the final celebration']
] as const;

const defaultState = (): GameState => ({
  version: 4, completed: [], collectibles: [], achievements: [], bonks: 0, flowers: 0,
  petCare: 0, compliments: [], outfit: [], stars: 0, danceScore: 0, mysterySolved: 0,
  buttonPresses: 0, cafeOrders: 0, musicScore: 0, chocolateScore: 0, quizScore: 0,
  sound: false, reducedMotion: false, revealSeen: false
});

function loadState(): GameState {
  try {
    const raw = localStorage.getItem('tiny-universe-v4');
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 4) return defaultState();
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

function addUnique<T>(list: T[], value: T) {
  return list.includes(value) ? list : [...list, value];
}

function pct(value: number, max: number) { return Math.min(100, Math.round((value / max) * 100)); }

function completeRoom(s: GameState, id: ActivityId, collectible: string): GameState {
  return {
    ...s,
    completed: addUnique(s.completed, id),
    collectibles: addUnique(s.collectibles, collectible)
  };
}

function Stars({ count = 40 }: { count?: number }) {
  return <div className="ambient-stars" aria-hidden="true">
    {Array.from({ length: count }, (_, i) => (
      <span key={i} style={{
        left: `${(i * 47.3) % 100}%`, top: `${(i * 71.7) % 100}%`,
        animationDelay: `${(i % 9) * 0.45}s`, opacity: `${0.25 + ((i * 13) % 70) / 100}`
      }} />
    ))}
  </div>;
}

function Avatar({ mood = 'idle', label = 'Character' }: { mood?: string; label?: string }) {
  return <div className={`character ${mood}`} aria-label={label}>
    <div className="character-shadow" />
    <div className="character-hair" />
    <div className="character-face"><i /><i /><b /></div>
    <div className="character-neck" />
    <div className="character-body" />
    <div className="character-arm left" />
    <div className="character-arm right" />
    <div className="character-leg left" />
    <div className="character-leg right" />
  </div>;
}

function ProgressRing({ value }: { value: number }) {
  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  return <div className="progress-ring" style={{ '--ring': `${circumference - (value / 100) * circumference}px` } as React.CSSProperties}>
    <svg viewBox="0 0 64 64"><circle className="ring-track" cx="32" cy="32" r={radius}/><circle className="ring-value" cx="32" cy="32" r={radius}/></svg>
    <b>{value}%</b>
  </div>;
}

function RoomShell({ activity, state, setState, onBack, children }: {
  activity: Activity; state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; onBack?: () => void; children: React.ReactNode;
}) {
  const done = state.completed.includes(activity.id);
  const goBack = onBack ?? (() => window.dispatchEvent(new Event('tiny-universe-back')));
  return <div className={`room-page theme-${activity.theme}`}>
    <Stars count={28}/>
    <div className="room-noise" />
    <header className="room-nav">
      <button className="glass-icon" onClick={goBack} aria-label="Back to world map"><ArrowLeft /></button>
      <div className="room-title-block"><span>{activity.kicker}</span><h1>{activity.title}</h1></div>
      <div className={`room-status ${done ? 'complete' : ''}`}>{done ? <><Check size={14}/> COMPLETE</> : 'EXPLORING'}</div>
    </header>
    <main className="room-content">
      <div className="room-intro"><p>{activity.subtitle}</p><div className="artifact-chip"><Sparkles size={14}/> Artifact: <b>{activity.collectible}</b></div></div>
      {children}
    </main>
  </div>;
}

function BonkRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [hits, setHits] = useState(0);
  const [tool, setTool] = useState('Foam Hammer');
  const [message, setMessage] = useState('The responsible party is standing directly in the middle of the room.');
  const [shake, setShake] = useState(false);
  const tools = ['Foam Hammer', 'Slipper', 'Newspaper', 'Teddy', 'Tomato', 'Confetti Cannon'];
  const bonk = () => {
    const next = hits + 1;
    setHits(next); setShake(true); setTimeout(() => setShake(false), 180);
    const lines = ['That felt personal.', 'Okay. Message received.', 'The helmet was not enough.', 'I built this room and I regret everything.', 'You have excellent aim.', 'The tiny universe is concerned.'];
    setMessage(lines[next % lines.length]);
    setState(prev => {
      const n = { ...prev, bonks: prev.bonks + 1 };
      return next >= 12 ? completeRoom(n, activity.id, activity.collectible) : n;
    });
  };
  return <RoomShell activity={activity} state={state} setState={setState} onBack={() => {}}>
    <div className="anger-room">
      <div className="comic-speed-lines" />
      <div className={`bonk-stage ${shake ? 'shake' : ''}`}>
        <div className="impact-word">BONK</div><Avatar mood={shake ? 'bonked' : 'nervous'} label="Responsible party" />
        <div className="damage-meter"><span>COMIC DAMAGE</span><b>{hits.toString().padStart(2, '0')}</b><div><i style={{ width: `${Math.min(100, hits * 4)}%` }}/></div></div>
      </div>
      <div className="room-panel"><div className="panel-label">CHOOSE YOUR INSTRUMENT</div><div className="tool-grid">{tools.map(t => <button className={tool === t ? 'selected' : ''} key={t} onClick={() => setTool(t)}>{t}</button>)}</div><button className="mega-action danger" onClick={bonk}>BONK WITH {tool.toUpperCase()} <Zap/></button><p className="live-caption">{message}</p></div>
    </div>
  </RoomShell>;
}

function CafeRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [step, setStep] = useState(0); const [recipe, setRecipe] = useState<string[]>([]);
  const ingredients = ['Strawberry', 'Cloud Cream', 'Moon Sugar', 'Berry Jam', 'Tiny Sprinkles', 'Vanilla'];
  const order = ['Strawberry', 'Cloud Cream', 'Tiny Sprinkles'];
  const add = (x: string) => { if (recipe.includes(x)) return; const r = [...recipe, x]; setRecipe(r); if (r.length === order.length) setStep(1); };
  const finish = () => setState(prev => completeRoom({ ...prev, cafeOrders: prev.cafeOrders + 1 }, activity.id, activity.collectible));
  return <RoomShell activity={activity} state={state} setState={setState} onBack={() => {}}>
    <div className="cafe-room"><div className="cafe-counter"><div className="cafe-sign">STRAWBERRY<br/><em>CAFÉ</em></div><div className="cake-display"><div className="cake-layer top"/><div className="cake-layer mid"/><div className="cake-layer bottom"/><span>✦</span></div></div>
      <div className="recipe-card"><span className="mini-kicker">TODAY'S IMPOSSIBLY IMPORTANT ORDER</span><h2>Pink Cloud No. 07</h2><div className="recipe-steps">{order.map((x,i)=><div className={recipe.includes(x) ? 'done' : ''} key={x}><b>0{i+1}</b>{x}{recipe.includes(x)&&<Check/>}</div>)}</div><div className="ingredient-grid">{ingredients.map(x=><button disabled={recipe.includes(x)} key={x} onClick={() => add(x)}>{x}</button>)}</div><button className="mega-action" disabled={step===0} onClick={finish}>{step===0?'FOLLOW THE RECIPE':'SERVE THE MASTERPIECE'} <CakeSlice/></button></div>
    </div>
  </RoomShell>;
}

function GardenRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [selected, setSelected] = useState<number | null>(null); const [water, setWater] = useState(0);
  const plants = Array.from({ length: 6 }, (_, i) => ({ id: i, x: 10 + i * 16, y: 58 + (i % 2) * 7 }));
  const grow = (i: number) => { setSelected(i); setWater(0); };
  const waterPlant = () => { const n = water + 1; setWater(n); if (n >= 3) setState(prev => ({ ...prev, flowers: Math.min(12, prev.flowers + 1), ...(prev.flowers + 1 >= 5 ? completeRoom({ ...prev }, activity.id, activity.collectible) : {}) })); };
  return <RoomShell activity={activity} state={state} setState={setState} onBack={() => {}}>
    <div className="garden-room"><div className="garden-sky"><div className="sun"/><div className="mountain m1"/><div className="mountain m2"/><div className="petals">✦　✿　·　✧　✿　·</div></div><div className="garden-ground">{plants.map(p=><button key={p.id} className={`plant ${state.flowers > p.id ? 'grown' : ''} ${selected === p.id ? 'selected' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} onClick={() => grow(p.id)}><span className="stem"/><span className="flower-head">✿</span></button>)}</div><div className="garden-hud"><div><small>GROWN</small><strong>{state.flowers}/5</strong></div>{selected !== null ? <><span className="selected-seed">Selected patch #{selected + 1}</span><button className="water-btn" onClick={waterPlant}>WATER <Waves/> {water}/3</button></> : <p>Choose a little patch of earth.</p>}</div></div>
  </RoomShell>;
}

function CloudRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [score, setScore] = useState(0); const [running, setRunning] = useState(false); const [time, setTime] = useState(20); const [target, setTarget] = useState(0); const interval = useRef<number | null>(null);
  useEffect(() => () => { if (interval.current) window.clearInterval(interval.current); }, []);
  const start = () => { setScore(0); setTime(20); setRunning(true); interval.current = window.setInterval(() => setTime(t => { if (t <= 1) { window.clearInterval(interval.current!); setRunning(false); return 0; } return t - 1; }), 1000); };
  useEffect(() => { if (!running && score >= 12) setState(prev => ({ ...prev, stars: Math.max(prev.stars, score), ...(score >= 12 ? completeRoom(prev, activity.id, activity.collectible) : {}) })); }, [running, score, activity, setState]);
  const catchStar = () => { if (!running) return; setScore(v => v + 1); setTarget(v => (v + 1) % 8); };
  return <RoomShell activity={activity} state={state} setState={setState} onBack={() => {}}>
    <div className="cloud-room"><div className="cloud-stats"><span><Star/> {score} stars</span><span><Timer/> {time}s</span></div><div className="sky-arena">{Array.from({length:8},(_,i)=><button key={i} className={`sky-star ${i===target?'active':''}`} style={{ left: `${10 + ((i*31)%80)}%`, top: `${16 + ((i*43)%64)}%` }} onClick={catchStar}><Star fill="currentColor"/></button>)}<div className="cloud-bank one"/><div className="cloud-bank two"/></div><div className="center-cta">{!running?<button className="mega-action" onClick={start}>START STARFALL <Star/></button>:<p>Catch the glowing star. Ignore the suspicious clouds.</p>}</div></div>
  </RoomShell>;
}

function CozyRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [found, setFound] = useState<number[]>([]); const objects = ['lamp', 'book', 'mug', 'cat', 'key', 'letter'];
  const click = (i:number) => { const f=addUnique(found,i); setFound(f); if(f.length>=5) setState(prev=>completeRoom(prev,activity.id,activity.collectible)); };
  return <RoomShell activity={activity} state={state} setState={setState} onBack={() => {}}><div className="cozy-room"><div className="window"><div className="moon-window"/><span>2:17 AM</span></div><div className="room-furniture"><div className="sofa"/><div className="table"/><div className="rug"/></div>{objects.map((o,i)=><button key={o} className={`hidden-object object-${o} ${found.includes(i)?'found':''}`} onClick={()=>click(i)}>{found.includes(i)?<Check/>:o==='cat'?<Cat/>:<Sparkles/>}</button>)}<div className="cozy-caption">{found.length}/5 little things found · {found.length===5?'The room feels warmer.':'Look carefully. The quiet things are usually hiding.'}</div></div></RoomShell>;
}

function ArcadeRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [score,setScore]=useState(0); const [active,setActive]=useState(0); const [started,setStarted]=useState(false); const [seconds,setSeconds]=useState(15); const timer=useRef<number|null>(null);
  const start=()=>{setScore(0);setSeconds(15);setStarted(true);timer.current=window.setInterval(()=>setSeconds(v=>{if(v<=1){window.clearInterval(timer.current!);setStarted(false);return 0;}return v-1}),1000)};
  useEffect(()=>()=>{if(timer.current)window.clearInterval(timer.current)},[]); useEffect(()=>{if(!started&&score>=10)setState(prev=>completeRoom(prev,activity.id,activity.collectible))},[started,score,activity,setState]);
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="arcade-room"><div className="arcade-cabinet"><div className="screen"><div className="scanline"/><span className="score-big">{score.toString().padStart(2,'0')}</span>{started?<button className="neon-target" style={{left:`${12+((active*37)%72)}%`,top:`${16+((active*53)%66)}%`}} onClick={()=>{setScore(v=>v+1);setActive(v=>v+1)}}><CircleDot/></button>:<span className="insert">INSERT COURAGE</span>}</div><div className="controls"><span>TIME {seconds}</span><span>NEON ARCADE // 198X</span><span>HIGH {Math.max(score, state.stars)}</span></div></div><button className="mega-action neon" onClick={start}>{started?'KEEP GOING':'START GAME'} <Zap/></button></div></RoomShell>;
}

function DressRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const pieces = ['Pearl Jacket','Midnight Bow','Cherry Boots','Star Glasses','Cloud Skirt','Silver Crown'];
  const toggle=(x:string)=>setState(prev=>({...prev,outfit:prev.outfit.includes(x)?prev.outfit.filter(v=>v!==x):[...prev.outfit,x]}));
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="dress-room"><div className="runway"><div className="spotlight-cone"/><Avatar mood="fashion"/><div className="runway-label">LOOK {String(state.outfit.length).padStart(2,'0')}</div></div><div className="wardrobe"><div className="panel-label">WARDROBE / SELECT ANYTHING</div>{pieces.map(x=><button className={state.outfit.includes(x)?'selected':''} key={x} onClick={()=>toggle(x)}>{x}{state.outfit.includes(x)&&<Check/>}</button>)}<button className="mega-action" disabled={state.outfit.length<3} onClick={()=>setState(prev=>completeRoom(prev,activity.id,activity.collectible))}>LOCK THE LOOK <Shirt/></button></div></div></RoomShell>;
}

function CarnivalRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [spin,setSpin]=useState(false); const [result,setResult]=useState(''); const prizes=['Tiny hug','Golden star','Suspicious cake','Compliment','Bonus ticket','Dramatic applause'];
  const go=()=>{if(spin)return;setSpin(true);setTimeout(()=>{const r=prizes[Math.floor(Math.random()*prizes.length)];setResult(r);setSpin(false);setState(prev=>completeRoom(prev,activity.id,activity.collectible))},900)};
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="carnival-room"><div className={`wheel ${spin?'spinning':''}`}>{prizes.map((p,i)=><span key={p} style={{transform:`rotate(${i*60}deg)`}}>{i+1}</span>)}<div className="wheel-core">★</div></div><div className="wheel-pointer">▼</div><div className="carnival-copy"><span>PRIZE WHEEL 01</span><h2>{result||'The universe has prepared something questionable.'}</h2><button className="mega-action gold" onClick={go}>SPIN THE UNIVERSE <Dices/></button></div></div></RoomShell>;
}

function MusicRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [sequence,setSequence]=useState<number[]>([]); const [playing,setPlaying]=useState(false); const [melody,setMelody]=useState<number[]>([]); const notes=['C','E','G','A','B','G','E','D'];
  const tap=(i:number)=>{const next=[...melody,i];setMelody(next);if(next.length>=6)setState(prev=>completeRoom({...prev,musicScore:Math.max(prev.musicScore,next.length)},activity.id,activity.collectible))};
  const generate=()=>setSequence(Array.from({length:6},()=>Math.floor(Math.random()*8)));
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="music-room"><div className="music-orbit">{Array.from({length:8},(_,i)=><button key={i} className={melody.includes(i)?'lit':''} onClick={()=>tap(i)} style={{transform:`rotate(${i*45}deg) translateY(-150px) rotate(-${i*45}deg)`}}>{notes[i]}</button>)}<div className="music-core"><Music2/></div></div><div className="music-console"><button className="secondary" onClick={generate}>GENERATE MELODY</button><button className="primary" onClick={()=>setPlaying(!playing)}>{playing?<Pause/>:<Play/>}{playing?'PLAYING':'PLAY'}</button><p>{sequence.length?`Sequence: ${sequence.map(i=>notes[i]).join(' · ')}`:'Make your own tiny song.'}</p></div></div></RoomShell>;
}

function ChocolateRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [selected,setSelected]=useState('Moon'); const [coating,setCoating]=useState('Ruby'); const [decor,setDecor]=useState('Star'); const [finished,setFinished]=useState(false);
  const finish=()=>{setFinished(true);setState(prev=>completeRoom({...prev,chocolateScore:1},activity.id,activity.collectible))};
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="choco-room"><div className="choco-lab"><div className="conveyor"><div className="choco-piece" style={{'--coating':coating} as React.CSSProperties}>{decor==='Star'?'★':decor==='Heart'?'♥':'✦'}</div><div className="conveyor-line"/></div><div className="choco-brief"><span>ATELIER // 10</span><h2>{finished?'Approved by the Chocolate Council':'Design your signature piece.'}</h2><p>Three decisions. No wrong answers. Several suspiciously fancy ones.</p></div></div><div className="three-columns"><div><small>SHAPE</small>{['Moon','Heart','Square'].map(x=><button className={selected===x?'selected':''} onClick={()=>setSelected(x)} key={x}>{x}</button>)}</div><div><small>COATING</small>{['Ruby','Dark','Vanilla'].map(x=><button className={coating===x?'selected':''} onClick={()=>setCoating(x)} key={x}>{x}</button>)}</div><div><small>DECOR</small>{['Star','Heart','Spark'].map(x=><button className={decor===x?'selected':''} onClick={()=>setDecor(x)} key={x}>{x}</button>)}</div></div><button className="mega-action" onClick={finish}>SEND TO QUALITY CONTROL <Check/></button></div></RoomShell>;
}

function PetRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [mood,setMood]=useState('curious'); const care=['Pet','Treat','Toy','Brush'];
  const act=(x:string)=>{setMood(x.toLowerCase());setState(prev=>{const n={...prev,petCare:prev.petCare+1};return n.petCare>=5?completeRoom(n,activity.id,activity.collectible):n})};
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="pet-room"><div className="pet-card"><div className="pet-halo"/><Cat className={`big-cat ${mood}`}/><div className="pet-name">MISO</div><span className="pet-status">{mood === 'pet'?'Extremely pleased.':'Waiting for something nice.'}</span></div><div className="care-console"><div className="care-meter"><span>TRUST</span><b>{Math.min(100,state.petCare*20)}%</b><i><em style={{width:`${Math.min(100,state.petCare*20)}%`}}/></i></div>{care.map(x=><button key={x} onClick={()=>act(x)}>{x}</button>)}</div></div></RoomShell>;
}

function DanceRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const patterns=[[0,1,2,1],[2,0,3,1],[1,3,2,0]]; const [pattern,setPattern]=useState<number[]>(patterns[0]); const [step,setStep]=useState(0); const [score,setScore]=useState(0); const pads=['LEFT','UP','DOWN','RIGHT'];
  const hit=(i:number)=>{if(i===pattern[step]){const n=score+10;setScore(n);setStep(v=>v+1);if(step+1===pattern.length){setState(prev=>completeRoom({...prev,danceScore:Math.max(prev.danceScore,n)},activity.id,activity.collectible));setStep(0);setPattern(patterns[(score/10+1)%patterns.length])}}else setScore(v=>Math.max(0,v-5))};
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="dance-room"><div className="stage-floor"><div className="spotlight"/><Avatar mood={step%2?'dance':'proud'}/><div className="scoreboard">SCORE <b>{score}</b></div></div><div className="dance-console"><div className="beat-line">{pattern.map((p,i)=><span key={i} className={i<step?'hit':i===step?'next':''}>{pads[p]}</span>)}</div><div className="dance-pads">{pads.map((x,i)=><button key={x} onClick={()=>hit(i)}>{x}</button>)}</div><small>Follow the glowing sequence.</small></div></div></RoomShell>;
}

function MysteryRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const puzzles=[['The clock only likes odd numbers.','1 · 3 · 5 · ?','7'],['Three petals face east. Which follows?','🌸 🌸 🌸','🌸'],['The key has no lock. The lock has no door.','What opens both?','Curiosity'],['Stars hide a word.','★ L ★ O ★ V ★ E','LOVE']]; const [i,setI]=useState(0); const [solved,setSolved]=useState(false);
  const solve=(answer:string)=>{if(answer===puzzles[i][2]){if(i===puzzles.length-1){setSolved(true);setState(prev=>completeRoom({...prev,mysterySolved:puzzles.length},activity.id,activity.collectible))}else{setI(v=>v+1);}}};
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="mystery-room"><div className="mystery-door"><div className="lock-face"><KeyRound/></div><div className="lock-rings">{[1,2,3].map(n=><i key={n}/>)}</div></div><div className="puzzle-card">{solved?<><span className="mini-kicker">CASE CLOSED</span><h2>The drawer opens.</h2><p>A tiny key falls out. It has no practical purpose whatsoever.</p><div className="secret-box"><Sparkles/> MYSTERY KEY</div></>:<><span className="mini-kicker">CASE {i+1} / {puzzles.length}</span><h2>{puzzles[i][0]}</h2><p className="cipher">{puzzles[i][1]}</p><div className="answer-row">{(i===0?['6','7','8']:i===1?['🌸','🌙','☀️']:i===2?['Curiosity','Silence','Gravity']:['LOVE','MOON','STAR']).map(x=><button key={x} onClick={()=>solve(x)}>{x}</button>)}</div></>}</div></div></RoomShell>;
}

function ComplimentRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [text,setText]=useState(''); const [scan,setScan]=useState(false);
  const generate=()=>{setScan(true);setTimeout(()=>{const pool=[...CONFIG.COMPLIMENTS,...state.compliments];const line=pool[Math.floor(Math.random()*pool.length)];setText(line);setScan(false);setState(prev=>{const n={...prev,compliments:[...prev.compliments,line]};return n.compliments.length>=3?completeRoom(n,activity.id,activity.collectible):n})},600)};
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="compliment-room"><div className={`scanner ${scan?'scanning':''}`}><div className="scanner-glow"/><Heart/><span>SUBJECT: {CONFIG.HER_NAME.toUpperCase()}</span><small>MEASURING UNFAIR LEVELS OF LOVELINESS</small></div><div className="compliment-result">{text||'Press the button. The machine has opinions.'}</div><button className="mega-action pink" onClick={generate}>GENERATE ANALYSIS <Wand2/></button><div className="lab-readouts"><span>PRECISION <b>99.7%</b></span><span>OBJECTIVITY <b>0%</b></span><span>BIAS <b>OBVIOUSLY</b></span></div></div></RoomShell>;
}

function ForbiddenRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const [press,setPress]=useState(0); const [alert,setAlert]=useState('SYSTEM STABLE'); const pressButton=()=>{const n=press+1;setPress(n);setAlert(n%5===0?'WHY ARE YOU STILL DOING THIS?':n%3===0?'Curiosity level: catastrophic.':'System stable. Probably.');setState(prev=>n>=15?completeRoom({...prev,buttonPresses:n},activity.id,activity.collectible):{...prev,buttonPresses:n})};
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="button-room"><div className={`forbidden-core p${Math.min(5,Math.floor(press/3))}`}><div className="warning-ring"/><button onClick={pressButton}><Zap/><span>DO NOT<br/>PRESS</span></button></div><div className="button-terminal"><span>SECURITY EVENT LOG</span><div>{Array.from({length:6},(_,i)=><p key={i}><b>0{i+1}:17:4{i}</b> {i<press?`USER ACTION DETECTED // ${alert}`:'AWAITING USER DECISION'}</p>)}</div><strong>{press.toString().padStart(2,'0')} / 15</strong></div></div></RoomShell>;
}

function QuizRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const questions=[['Who is more likely to say “I am not angry” while clearly being angry?',['Me','Her','The cat']],['What belongs in a perfect tiny universe?',['More stars','More snacks','Both. Obviously.']],['What is the most scientific compliment?',['Cute','Extremely statistically adorable','Nice hair']]]; const [q,setQ]=useState(0); const [score,setScore]=useState(0); const answer=(i:number)=>{const correct=[1,2,1][q];const next=score+(i===correct?1:0);setScore(next);if(q===questions.length-1)setState(prev=>completeRoom({...prev,quizScore:Math.max(prev.quizScore,next)},activity.id,activity.collectible));else setQ(v=>v+1)};
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="quiz-room"><div className="quiz-header"><span>CLASSIFIED TEST / {q+1} OF 3</span><div><b>{score}</b><small>SCORE</small></div></div><div className="quiz-question"><span>QUESTION {String(q+1).padStart(2,'0')}</span><h2>{questions[q][0]}</h2><div className="quiz-options">{questions[q][1].map((x,i)=><button key={x} onClick={()=>answer(i)}><i>{String.fromCharCode(65+i)}</i>{x}<ChevronRight/></button>)}</div></div></div></RoomShell>;
}

function CastleRoom({ state, setState, activity }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity }) {
  const ratio=pct(state.collectibles.length,18); return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="castle-room"><div className="castle-sky"><div className="castle-stars">✦　✧　★　✦　·　✧　★</div><div className="castle-building"><div className="castle-tower left"/><div className="castle-tower right"/><div className="castle-main"><Crown/><span>THE LITTLE ARCHIVE</span></div></div></div><div className="archive-panel"><div><span>WORLD COMPLETION</span><strong>{ratio}%</strong></div><ProgressRing value={ratio}/><div className="artifact-grid">{ACTIVITIES.map(a=><div key={a.id} className={state.collectibles.includes(a.collectible)?'found':''}><span>{a.icon}</span><small>{state.collectibles.includes(a.collectible)?a.collectible:'???'}</small></div>)}</div></div></div></RoomShell>;
}

function MoonRoom({ state, setState, activity, onFinal }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; activity: Activity; onFinal:()=>void }) {
  const points=Array.from({length:9},(_,i)=>({x:12+((i*27)%78),y:15+((i*43)%62)})); const [connected,setConnected]=useState<number[]>([]); const done=connected.length>=9;
  const connect=(i:number)=>{if(connected.includes(i))return;const n=[...connected,i];setConnected(n);if(n.length===9)setState(prev=>completeRoom(prev,activity.id,activity.collectible))};
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="moon-room"><div className="observatory"><div className="moon-orb"><div/></div><div className="constellation-lines">{connected.slice(1).map((x,j)=>{const a=points[connected[j]],b=points[x];return <span key={x} style={{left:`${a.x}%`,top:`${a.y}%`,width:`${Math.hypot((b.x-a.x)*9,(b.y-a.y)*9)}px`,transform:`rotate(${Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI}deg)`}}/>})}</div>{points.map((p,i)=><button key={i} className={connected.includes(i)?'connected':''} style={{left:`${p.x}%`,top:`${p.y}%`}} onClick={()=>connect(i)}><Star fill="currentColor"/></button>)}</div><div className="moon-copy"><span>OBSERVATORY // LAST CONSTELLATION</span><h2>{done?'The hidden pattern is complete.':'There is a shape hiding in the stars.'}</h2><p>{done?'Something just unlocked somewhere you have not seen before.':'Connect every star. No timer. Just curiosity.'}</p>{done&&<button className="mega-action moon" onClick={onFinal}>OPEN THE DOOR <ChevronRight/></button>}</div></div></RoomShell>;
}

function GenericRoom({ activity, state, setState }: { activity: Activity; state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>> }) {
  return <RoomShell activity={activity} state={state} setState={setState} onBack={()=>{}}><div className="generic-room"><div className="generic-emblem">{activity.icon}</div><h2>{activity.title}</h2><p>{activity.subtitle}</p><button className="mega-action" onClick={()=>setState(prev=>completeRoom(prev,activity.id,activity.collectible))}>COMPLETE EXPEDITION <Sparkles/></button></div></RoomShell>;
}

function FinalWorld({ state, setState, onBack }: { state: GameState; setState: React.Dispatch<React.SetStateAction<GameState>>; onBack:()=>void }) {
  const [line,setLine]=useState(0); const [done,setDone]=useState(false);
  useEffect(()=>{if(line<CONFIG.FINAL_MESSAGE.length){const t=window.setTimeout(()=>setLine(v=>v+1),line===0?900:1700);return()=>window.clearTimeout(t)}setDone(true)},[line]);
  useEffect(()=>setState(prev=>({...prev,revealSeen:true,achievements:addUnique(prev.achievements,'Luckiest Girl')})),[setState]);
  const artifacts=ACTIVITIES.filter(a=>state.collectibles.includes(a.collectible));
  return <div className="final-world"><Stars count={60}/><div className="final-aurora"/><div className="final-ring"/><div className="final-artifacts">{artifacts.slice(0,18).map((a,i)=><span key={a.id} style={{'--i':i} as React.CSSProperties}>{a.icon}</span>)}</div><div className="final-stage"><div className="final-crown"><Crown/></div><div className="final-avatars"><Avatar mood="soft" label="You"/><Avatar mood="soft" label={CONFIG.HER_NAME}/></div><div className="final-copy"><span>THE PLACE BEHIND THE DOOR</span>{CONFIG.FINAL_MESSAGE.slice(0,line).map((x,i)=><p key={i} className={i===CONFIG.FINAL_MESSAGE.length-1?'final-big':''}>{x.replaceAll('[HER_NAME]',CONFIG.HER_NAME)}</p>)}{done&&<div className="final-badge"><Trophy/><span>ACHIEVEMENT UNLOCKED</span><b>Luckiest Girl in This Tiny Universe</b></div>}</div>{done&&<button className="secondary final-exit" onClick={onBack}>RETURN TO THE UNIVERSE</button>}</div></div>;
}

function App() {
  const [state,setState]=useState<GameState>(loadState); const [active,setActive]=useState<ActivityId|null>(null); const [settings,setSettings]=useState(false);
  const activity=useMemo(()=>ACTIVITIES.find(a=>a.id===active),[active]);
  const completedCount=state.completed.length; const progress=pct(state.collectibles.length,18); const finalUnlocked=state.completed.length>=12 || state.collectibles.length>=12;
  useEffect(()=>{try{localStorage.setItem('tiny-universe-v4',JSON.stringify(state))}catch{}},[state]);
  useEffect(()=>{const back=()=>setActive(null);window.addEventListener('tiny-universe-back',back);return()=>window.removeEventListener('tiny-universe-back',back)},[]);
  useEffect(()=>{setState(prev=>{let a=[...prev.achievements];const add=(x:string)=>{if(!a.includes(x))a.push(x)};if(prev.bonks>=12)add('Comic Menace');if(prev.flowers>=5)add('Garden Architect');if(prev.cafeOrders>=3)add('Sugar Architect');if(prev.stars>=12)add('Star Catcher');if(prev.mysterySolved>=4)add('Tiny Detective');if(prev.petCare>=5)add('Certified Softie');if(prev.danceScore>=40)add('Main Character');if(prev.buttonPresses>=15)add('Button Criminal');if(prev.compliments.length>=3)add('Compliment Scientist');if(prev.chocolateScore>=1)add('Confectioner');if(prev.quizScore>=3)add('Quiz Menace');if(prev.collectibles.length>=12)add('Collector');if(prev.completed.length===18)add('World Explorer');if(finalUnlocked)add('The Final Door');return a.length===prev.achievements.length?prev:{...prev,achievements:a}})},[state.bonks,state.flowers,state.cafeOrders,state.stars,state.mysterySolved,state.petCare,state.danceScore,state.buttonPresses,state.compliments.length,state.chocolateScore,state.quizScore,state.collectibles.length,state.completed.length,finalUnlocked]);
  const reset=()=>{if(window.confirm('Reset the entire universe?'))setState(defaultState())};
  if(active==='moon' && activity)return <MoonRoom activity={activity} state={state} setState={setState} onFinal={()=>setActive('final')} />;
  if(active && activity){
    const common={state,setState,activity};
    const room = active==='anger'?<BonkRoom {...common}/> : active==='cafe'?<CafeRoom {...common}/> : active==='garden'?<GardenRoom {...common}/> : active==='cloud'?<CloudRoom {...common}/> : active==='cozy'?<CozyRoom {...common}/> : active==='arcade'?<ArcadeRoom {...common}/> : active==='dress'?<DressRoom {...common}/> : active==='carnival'?<CarnivalRoom {...common}/> : active==='music'?<MusicRoom {...common}/> : active==='chocolate'?<ChocolateRoom {...common}/> : active==='pet'?<PetRoom {...common}/> : active==='dance'?<DanceRoom {...common}/> : active==='mystery'?<MysteryRoom {...common}/> : active==='compliment'?<ComplimentRoom {...common}/> : active==='button'?<ForbiddenRoom {...common}/> : active==='quiz'?<QuizRoom {...common}/> : active==='castle'?<CastleRoom {...common}/> : <GenericRoom {...common}/>;
    return React.cloneElement(room,{onBack:()=>setActive(null)} as never);
  }
  if(active==='final') return <FinalWorld state={state} setState={setState} onBack={()=>setActive(null)}/>;
  return <div className={`home-page ${state.reducedMotion?'reduced-motion':''}`}><Stars/><div className="aurora aurora-a"/><div className="aurora aurora-b"/>
    <header className="site-nav"><div className="wordmark"><span>✦</span> A LITTLE UNIVERSE</div><div className="nav-right"><div className="artifact-count"><Sparkles size={15}/><b>{state.collectibles.length}</b>/18 artifacts</div><ProgressRing value={progress}/><button className="glass-icon" onClick={()=>setSettings(true)}><Settings/></button></div></header>
    <main className="home-shell"><section className="hero-section"><div className="hero-copy"><span className="eyebrow"><i/> PRIVATE WORLD // FOR {CONFIG.HER_NAME.toUpperCase()}</span><h1>Somewhere between<br/><em>magic</em> and mischief.</h1><p>{CONFIG.GREETING}</p><div className="hero-actions"><button className="primary hero-start" onClick={()=>setActive('anger')}>ENTER THE UNIVERSE <ChevronRight/></button><span><span className="pulse-dot"/> {completedCount === 0 ? '18 destinations are waiting' : `${completedCount} destinations explored`}</span></div></div><div className="hero-scene"><div className="planet-ring"/><div className="planet"/><div className="floating-card card-a"><Sparkles/><span>18</span><small>tiny worlds</small></div><div className="floating-card card-b"><Heart/><span>{state.achievements.length}</span><small>achievements</small></div><div className="hero-characters"><Avatar mood="proud" label="You"/><Avatar mood="soft" label={CONFIG.HER_NAME}/></div></div></section>
      <section className="world-heading"><div><span>THE ATLAS</span><h2>Choose a destination.</h2><p>No gates. No pressure. Just wander.</p></div><div className="world-stats"><div><b>{completedCount}</b><small>EXPLORED</small></div><div><b>{state.achievements.length}</b><small>ACHIEVEMENTS</small></div><div><b>{state.collectibles.length}</b><small>ARTIFACTS</small></div></div></section>
      <section className="atlas-grid">{ACTIVITIES.map((a,i)=><button key={a.id} className={`atlas-card atlas-${a.theme} ${state.completed.includes(a.id)?'visited':''}`} onClick={()=>setActive(a.id)}><div className="card-number">{String(i+1).padStart(2,'0')}</div><div className="atlas-icon">{a.icon}</div><div className="atlas-text"><span>{a.kicker}</span><h3>{a.title}</h3><p>{a.subtitle}</p></div><div className="atlas-arrow"><ChevronRight/></div>{state.completed.includes(a.id)&&<div className="visited-mark"><Check/></div>}</button>)}
      {finalUnlocked&&<button className="final-door-card" onClick={()=>setActive('final')}><div className="door-stars">✦　·　★　·　✧　·　★</div><div className="door-icon"><Sparkles/></div><div><span>HIDDEN DESTINATION</span><h3>The Room Behind the Stars</h3><p>It wasn't on the map five minutes ago.</p></div><ChevronRight/></button>}
      </section>
    </main>
    <footer className="site-footer"><span>MADE FOR {CONFIG.HER_NAME.toUpperCase()}</span><span>WITH AN UNREASONABLE AMOUNT OF EFFORT</span><span>LOCAL PROGRESS SAVED</span></footer>
    {settings&&<div className="modal-layer" onClick={()=>setSettings(false)}><div className="settings-panel" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSettings(false)}><X/></button><span>CONTROL ROOM</span><h2>Universe settings</h2><div className="setting-row"><div><b>Sound effects</b><small>Optional little clicks and celebrations.</small></div><button onClick={()=>setState(p=>({...p,sound:!p.sound}))}>{state.sound?<Volume2/>:<VolumeX/>}</button></div><div className="setting-row"><div><b>Reduced motion</b><small>Slow the ambient movement down.</small></div><button className={state.reducedMotion?'on':''} onClick={()=>setState(p=>({...p,reducedMotion:!p.reducedMotion}))}>{state.reducedMotion?<Check/>:<CircleDot/>}</button></div><button className="reset-button" onClick={reset}><RotateCcw/> Reset this universe</button><p className="settings-note">Personalization lives at the top of <code>src/main.tsx</code>.</p></div></div>}
  </div>;
}

createRoot(document.getElementById('root')!).render(<App/>);
