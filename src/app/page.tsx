import Image from "next/image";

export default function Home() {
  const REPORT_CATEGORIES = [
    {
      name: "Bot",
      class: "badge-bot",
      description: "A suspected bot account such as a server scanner or automated player."
    },
    {
      name: "Hacker",
      class: "badge-hacker",
      description: "A player suspected to have a hacked client or hacked account."
    },
    {
      name: "Malicious Player",
      class: "badge-malicious",
      description: "A player suspected to have malicious intents."
    },
    {
      name: "Unknown",
      class: "badge-unknown",
      description: "An unknown entity that has shown up in server logs."
    },
  ]
  return (
    <>
      <Image src="/logo.png" alt="BlockGuard Logo" width={128} height={128} className="mt-8 mb-6"/>
      <h1>BlockGuard</h1>
      <h6 className="mt-2">Coming soon.</h6>
      <div className="card h-fit w-85 rounded-4xl my-16">
        <div className="flex row justify-center items-center gap-2">
          <Image src="/logo.png" alt="BlockGuard Logo" width={64} height={64} className="mt-2 mb-4"/>
          <h2>BlockGuard</h2>
        </div>
        <p>
          A community-maintained database of suspicious/bot Minecraft accounts to help server
          owners keep their server safe.
        </p>
        <hr className="border-primary-dark mt-2 mb-4"/>
        <h4>Reports</h4>
        <p>
          Users will be able to report suspicious entities (usernames or IP addresses). With
          enough reports on one entity, it will show up on BlockGuard&apos;s watch list.
        </p>
        <div className="my-3"/>
        <h5>Report Categories</h5>
        <div className="flex flex-col gap-2 mt-4">
          {REPORT_CATEGORIES.map((category) => (
            <div key={category.name} className="flex flex-row justify-center items-center gap-2">
              <span className={`badge ${category.class} w-fit`}>{category.name}</span>
              <span>—</span>
              <p className="text-sm w-full text-right">{category.description}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}
