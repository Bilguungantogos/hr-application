import { ClientDashboard } from "@/components/app/clientDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HR-application website",
  description: "",
};

export default function Home() {
  return (
    <main className="w-full bg-slate-100">
      <div>
        <ClientDashboard />
      </div>
    </main>
  );
}
