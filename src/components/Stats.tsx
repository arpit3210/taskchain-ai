const stats = [
  { label: "Active Users", value: "10K+" },
  { label: "Tasks Completed", value: "1M+" },
  { label: "Blockchain Transactions", value: "500K+" },
];

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="text-center p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 animate-fade-up"
          style={{ animationDelay: `${index * 200}ms` }}
        >
          <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-white/70">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Stats;