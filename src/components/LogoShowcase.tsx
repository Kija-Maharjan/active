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
      <p>M7W2+77J Chundevi Repair Road, Chandragiri 44600 · Get a Membership Now</p>
    </div>
  );
}
