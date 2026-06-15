export default function Equipment() {
  const items = [
    {
      icon: "\uD83C\uDFCB",
      title: "Free Weights",
      desc: "Full rack of dumbbells from 2kg to 50kg+, barbells, and Olympic plates for compound and isolation training.",
    },
    {
      icon: "\u2699\uFE0F",
      title: "Resistance Machines",
      desc: "Cable systems, chest press, lat pulldown, leg press and more — targeting every muscle group with precision.",
    },
    {
      icon: "\uD83C\uDFC3",
      title: "Cardio Zone",
      desc: "Treadmills, rowing machines, cycles and steppers to keep your cardiovascular fitness in top shape.",
    },
    {
      icon: "\uD83D\uDCAA",
      title: "Powerlifting Area",
      desc: "Dedicated squat racks and deadlift platforms with bumper plates for serious strength athletes.",
    },
    {
      icon: "\uD83E\uDDD8",
      title: "Stretching Area",
      desc: "Mats, foam rollers and mobility tools to help you warm up properly and recover faster.",
    },
    {
      icon: "\uD83E\uDE9E",
      title: "Clean Facilities",
      desc: "Spacious, well-lit, clean changing rooms and lockers to make your experience comfortable end-to-end.",
    },
  ];

  return (
    <section className="equipment" id="equipment">
      <div className="eq-inner">
        <div className="eq-header">
          <div className="section-label">What We Offer</div>
          <h2 className="section-title">World-Class Facilities</h2>
        </div>
        <div className="eq-grid">
          {items.map((item) => (
            <div className="eq-card" key={item.title}>
              <div className="eq-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
