
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const quotes = [
  "Elke smoothie is een stap richting de troon.",
  "Sjoefito skips geen supps.",
  "Detox is het nieuwe rock-’n-roll.",
  "GlyNAC today, hero tomorrow.",
  "Je blender is je beste vriend vandaag."
];

export default function SjoefitoResetFlow() {
  const [completed, setCompleted] = useState(0);
  const [checkedSupps, setCheckedSupps] = useState({});
  const [checkedGroceries, setCheckedGroceries] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  const tasks = [
    { time: "08:00", label: "🍒 Cherry Smoothie + GlyNAC & Multi" },
    { time: "09:00", label: "🚶‍♂️ Detox-wandeling" },
    { time: "12:00", label: "🧠 Brain Boost Smoothie + L-Theanine" },
    { time: "15:00", label: "⚡ Dopamine Delight Smoothie" },
    { time: "18:00", label: "🥗 Lichte maaltijd + Cell Shield" },
    { time: "21:00", label: "🌙 Magnesium, Ashwagandha & 5-HTP" }
  ];

  const supplements = [
    { name: "GlyNAC", time: "08:00" },
    { name: "Multivitamine (Viteezy)", time: "08:00" },
    { name: "Cell Shield", time: "18:00" },
    { name: "Magnesium", time: "21:00" },
    { name: "Ashwagandha", time: "21:00" },
    { name: "5-HTP", time: "21:00" },
    { name: "L-Theanine", time: "12:00" }
  ];

  const groceries = [
    "Spinazie", "Kersen (diepvries)", "Bananen", "Avocado", "Amandelboter",
    "Kefir / plantaardige yoghurt", "Chiazaad", "Boerenkool", "Wortels",
    "Frambozen", "Sinaasappels", "Kaneel", "Kurkuma", "Eiwitpoeder"
  ];

  const toggleTask = (index) => {
    setCompleted((prev) => prev ^ (1 << index));
  };

  const toggleSupp = (name) => {
    setCheckedSupps((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleGrocery = (item) => {
    setCheckedGroceries((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const completionPercentage =
    (tasks.filter((_, i) => completed & (1 << i)).length / tasks.length) * 100;

  return (
    <div className={`p-4 max-w-md mx-auto space-y-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center">🧪🔥 Sjoefito Reset Flow</h1>
        <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </Button>
      </div>

      <Progress value={completionPercentage} />

      {tasks.map((task, index) => (
        <Card key={index}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">{task.time}</p>
              <p>{task.label}</p>
            </div>
            <Button
              variant={completed & (1 << index) ? "default" : "outline"}
              onClick={() => toggleTask(index)}
            >
              {completed & (1 << index) ? "✔️ Done" : "Doen"}
            </Button>
          </CardContent>
        </Card>
      ))}

      <h2 className="text-xl font-bold mt-6">💊 Supplementen Checker</h2>
      {supplements.map((s, i) => (
        <div key={i} className="flex items-center justify-between py-1">
          <p>{s.time} - {s.name}</p>
          <Switch checked={checkedSupps[s.name]} onCheckedChange={() => toggleSupp(s.name)} />
        </div>
      ))}

      <h2 className="text-xl font-bold mt-6">🛒 Boodschappen Checker</h2>
      {groceries.map((item, i) => (
        <div key={i} className="flex items-center justify-between py-1">
          <p>{item}</p>
          <Switch checked={checkedGroceries[item]} onCheckedChange={() => toggleGrocery(item)} />
        </div>
      ))}

      <h2 className="text-xl font-bold mt-6">📱 Lockscreen Detox Visual</h2>
      <p>Gebruik je dagelijkse flow als visual of widget op je lockscreen voor motivatie!</p>

      <h2 className="text-xl font-bold mt-6">💬 Dagelijkse Quote</h2>
      <p className="italic text-center">"{quote}"</p>
    </div>
  );
}
