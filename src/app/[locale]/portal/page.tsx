import { StatsCard } from "@/components/portal/stats-card";
import { DashboardCharts } from "@/components/portal/dashboard-charts";
import { DollarSign, FolderKanban, Clock, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/projects";
import { invoices } from "@/data/invoices";
import { getDictionary, toLocale } from "@/i18n/config";

export default async function PortalDashboard({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const locale = toLocale((await params).locale);
    const dict = await getDictionary(locale);
    const t = dict.portal.dashboard;

    const activeProjects = projects.filter(p => p.status === "In Progress").length;
    const completedProjects = projects.filter(p => p.status === "Completed").length;
    const pendingInvoices = invoices.filter(i => i.status === "Pending").length;
    const totalSpent = invoices.filter(i => i.status === "Paid").reduce((acc, curr) => {
        return acc + parseFloat(curr.amount.replace(/[^0-9.-]+/g, ""));
    }, 0);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
                <p className="text-muted-foreground">{t.subtitle}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title={t.totalSpent}
                    value={`$${totalSpent.toLocaleString()}`}
                    description={t.totalSpentDesc}
                    icon={DollarSign}
                    trend="+12%"
                    trendUp={true}
                />
                <StatsCard
                    title={t.activeProjects}
                    value={activeProjects.toString()}
                    description={t.activeProjectsDesc}
                    icon={FolderKanban}
                />
                <StatsCard
                    title={t.pendingInvoices}
                    value={pendingInvoices.toString()}
                    description={t.pendingInvoicesDesc}
                    icon={Clock}
                    trend={t.pendingInvoicesTrend}
                    trendUp={false}
                />
                <StatsCard
                    title={t.completedProjects}
                    value={completedProjects.toString()}
                    description={t.completedProjectsDesc}
                    icon={CheckCircle2}
                />
            </div>

            <DashboardCharts locale={locale} dict={dict} />
        </div>
    );
}
