import { MapPin, TrendingUp, Plane, Smile } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  { icon: MapPin, label: "Total Places", value: 250, suffix: "+" },
  { icon: TrendingUp, label: "Popular Places", value: 120, suffix: "+" },
  { icon: Plane, label: "Our Trips", value: 850, suffix: "+" },
  { icon: Smile, label: "Happy Clients", value: 5000, suffix: "+" }
];

export default function Statistics() {
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.round(increment * currentStep);
            return newCounters;
          });
        } else {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="text-emerald-100 font-semibold text-sm uppercase tracking-wider">Our</span>
          <h2 className="text-4xl font-bold text-white mt-2 mb-4">Tours Statistics</h2>
          <p className="text-emerald-100 text-lg">Still.......Counting on</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-5xl font-bold text-white mb-2">
                  {stat.suffix}{counters[index]}
                </h3>
                <p className="text-emerald-100 font-medium text-lg">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
