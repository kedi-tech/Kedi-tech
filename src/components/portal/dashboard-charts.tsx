"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { type Locale, type Dictionary } from "@/i18n/config";

interface DashboardChartsProps {
    locale: Locale;
    dict: Dictionary;
}

const projectData = [
    { name: "Jan", hours: 40, cost: 2400 },
    { name: "Feb", hours: 30, cost: 1398 },
    { name: "Mar", hours: 20, cost: 9800 },
    { name: "Apr", hours: 27, cost: 3908 },
    { name: "May", hours: 18, cost: 4800 },
    { name: "Jun", hours: 23, cost: 3800 },
    { name: "Jul", hours: 34, cost: 4300 },
];

const activityData = [
    { name: "Mon", tasks: 4 },
    { name: "Tue", tasks: 3 },
    { name: "Wed", tasks: 7 },
    { name: "Thu", tasks: 5 },
    { name: "Fri", tasks: 8 },
    { name: "Sat", tasks: 2 },
    { name: "Sun", tasks: 1 },
];

export function DashboardCharts({ locale, dict }: DashboardChartsProps) {
    const charts = dict.portal?.dashboard?.charts || {
        projectSpending: locale === "fr" ? "Dépenses du Projet" : "Project Spending",
        weeklyActivity: locale === "fr" ? "Activité Hebdomadaire" : "Weekly Activity",
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>{charts.projectSpending}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={projectData}>
                                <defs>
                                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0A84FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="name" className="text-xs" />
                                <YAxis className="text-xs" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px' }}
                                    itemStyle={{ color: 'var(--foreground)' }}
                                />
                                <Area type="monotone" dataKey="cost" stroke="#0A84FF" fillOpacity={1} fill="url(#colorCost)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>{charts.weeklyActivity}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis dataKey="name" className="text-xs" />
                                <YAxis className="text-xs" />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px' }}
                                />
                                <Bar dataKey="tasks" fill="#22C55E" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
