import Link from "next/link";
import { projects } from "@/data/projects";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Calendar, DollarSign } from "lucide-react";
import { getDictionary, type Locale } from "@/i18n/config";

export default async function PortalProjectsPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const t = dict.portal.projects;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
                <p className="text-muted-foreground">{t.subtitle}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Card key={project.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant={project.status === "Completed" ? "default" : project.status === "In Progress" ? "secondary" : "outline"}>
                                    {dict.portal.projects.status[project.status.toLowerCase().replace(" ", "") as keyof typeof dict.portal.projects.status] || project.status}
                                </Badge>
                            </div>
                            <CardTitle>{project.name}</CardTitle>
                            <CardDescription>{project.client}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">{t.progress}</span>
                                    <span className="font-medium">{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2" />
                            </div>
                            <div className="flex justify-between text-sm">
                                <div className="flex items-center text-muted-foreground">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {t.due} {project.dueDate}
                                </div>
                                <div className="flex items-center text-muted-foreground">
                                    <DollarSign className="mr-1 h-4 w-4" />
                                    {project.budget}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" asChild>
                                <Link href={`/${locale}/portal/projects/${project.id}`}>
                                    {t.viewDetails}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
