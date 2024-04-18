import { Dashboard } from "@/components/app/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR-application website",
  description: "",
};

export default function Home() {
  return (
    <main className="w-full bg-slate-900">
      <div>
        <Dashboard />
      </div>
    </main>
  );
}
