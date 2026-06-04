import Image from "next/image";

export default function LogoShowcase() {
  return (
    <div className="logo-section">
      <Image
        src="/uploads/1.svg"
        alt="Active Fitness Logo"
        width={520}
        height={180}
        style={{ maxWidth: 520, width: "100%", height: "auto" }}
      />
      <p>Chandragiri 12, Balambu · Get a Membership Now</p>
    </div>
  );
}
