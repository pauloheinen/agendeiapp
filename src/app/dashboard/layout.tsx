import { ProviderProvider } from "@/contexts/ProviderContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProviderProvider>{children}</ProviderProvider>;
}
