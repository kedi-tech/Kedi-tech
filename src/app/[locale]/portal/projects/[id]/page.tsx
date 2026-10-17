import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, Circle, Clock } from "lucide-react";
import { getDictionary, toLocale } from "@/i18n/config";

export default async function PortalProjectDetailPage({ 
    params 
}: { 
    params: Promise<{ id: string; locale: string }> 
}) {
    const { id, locale: rawLocale } = await params;
    const locale = toLocale(rawLocale);
    const dict = await getDictionary(locale);
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={`/${locale}/portal/projects`}>
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
                    <p className="text-muted-foreground">{locale === "fr" ? "Détails du Projet et Jalons" : "Project Details and Milestones"}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>{dict.portal.projects.milestones?.title || (locale === "fr" ? "Jalons" : "Milestones")}</CardTitle>
                        <CardDescription>{dict.portal.projects.milestones?.description || (locale === "fr" ? "Suivez la progression des livrables clés du projet." : "Track the progress of key project deliverables.")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {project.milestones.map((milestone, index) => (
                                <div key={milestone.id} className="relative pl-8 pb-8 last:pb-0">
                                    {/* Vertical Line */}
                                    {index !== project.milestones.length - 1 && (
                                        <div className="absolute left-[11px] top-3 bottom-0 w-px bg-border" />
                                    )}

                                    {/* Status Icon */}
                                    <div className="absolute left-0 top-1">
                                        {milestone.status === "Completed" ? (
                                            <CheckCircle2 className="h-6 w-6 text-green-500 bg-background" />
                                        ) : milestone.status === "In Progress" ? (
                                            <Clock className="h-6 w-6 text-blue-500 bg-background" />
                                        ) : (
                                            <Circle className="h-6 w-6 text-muted-foreground bg-background" />
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold">{milestone.title}</h3>
                                            <Badge variant={milestone.status === "Completed" ? "default" : milestone.status === "In Progress" ? "secondary" : "outline"}>
                                                {milestone.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{dict.portal.projects.due} {milestone.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{dict.portal.projects.projectInfo?.title || (locale === "fr" ? "Informations du Projet" : "Project Info")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">{dict.portal.projects.projectInfo?.status || "Status"}</div>
                                <div className="font-semibold">{dict.portal.projects.status[project.status.toLowerCase().replace(" ", "") as keyof typeof dict.portal.projects.status] || project.status}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">{dict.portal.projects.projectInfo?.dueDate || dict.portal.projects.due || "Due Date"}</div>
                                <div className="font-semibold">{project.dueDate}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-muted-foreground">{dict.portal.projects.projectInfo?.budget || "Budget"}</div>
                                <div className="font-semibold">{project.budget}</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-muted-foreground mb-2">{dict.portal.projects.projectInfo?.overallProgress || (locale === "fr" ? "Progression Globale" : "Overall Progress")}</div>
                                <Progress value={project.progress} className="h-2" />
                                <div className="text-right text-xs text-muted-foreground mt-1">{project.progress}%</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{dict.portal.projects.quickActions?.title || (locale === "fr" ? "Actions Rapides" : "Quick Actions")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start" asChild>
                                <Link href={`/${locale}/portal/messages`}>{dict.portal.projects.quickActions?.contactManager || (locale === "fr" ? "Contacter le Gestionnaire" : "Contact Manager")}</Link>
                            </Button>
                            <Button variant="outline" className="w-full justify-start" asChild>
                                <Link href={`/${locale}/portal/files`}>{dict.portal.projects.quickActions?.viewFiles || dict.common.view || "View Files"}</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
