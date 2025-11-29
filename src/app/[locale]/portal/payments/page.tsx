"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { invoices } from "@/data/invoices";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Download, Eye, FileText, Building2, Calendar, DollarSign } from "lucide-react";
// Simple toast implementation using browser alert for demo
const showToast = (title: string, description?: string) => {
    // In a real app, you'd use a proper toast library
    console.log(`Toast: ${title}`, description);
    // For demo, we'll use alert
    alert(`${title}\n${description || ""}`);
};
import { type Locale } from "@/i18n/config";

export default function PortalPaymentsPage() {
    const params = useParams();
    const locale = (params.locale as Locale) || "fr";
    const [dict, setDict] = useState<any>(null);
    const [previewInvoice, setPreviewInvoice] = useState<any>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        import(`@/i18n/dictionaries/${locale}.json`).then((module) => {
            setDict(module.default);
        });
    }, [locale]);

    const handlePreview = (invoice: any) => {
        setPreviewInvoice(invoice);
        setIsPreviewOpen(true);
    };

    const handleDownload = (invoice: any) => {
        // Dummy download - just show a toast
        showToast(
            locale === "fr" ? "Téléchargement" : "Download",
            locale === "fr" 
                ? `Téléchargement de la facture ${invoice.id}...`
                : `Downloading invoice ${invoice.id}...`
        );
    };

    if (!dict) return <div>Loading...</div>;
    const t = dict.portal.payments;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
                    <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>{t.totalPaid}</CardDescription>
                        <CardTitle className="text-3xl">
                            ${invoices
                                .filter(i => i.status === "Paid")
                                .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[^0-9.-]+/g, "")), 0)
                                .toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>{t.pending}</CardDescription>
                        <CardTitle className="text-3xl">
                            ${invoices
                                .filter(i => i.status === "Pending")
                                .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[^0-9.-]+/g, "")), 0)
                                .toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>{t.overdue}</CardDescription>
                        <CardTitle className="text-3xl text-destructive">
                            ${invoices
                                .filter(i => i.status === "Overdue")
                                .reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/[^0-9.-]+/g, "")), 0)
                                .toLocaleString()}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t.invoiceHistory || (locale === "fr" ? "Historique des Factures" : "Invoice History")}</CardTitle>
                    <CardDescription>{t.invoiceHistoryDesc || (locale === "fr" ? "Une liste de toutes vos factures et leur statut de paiement." : "A list of all your invoices and their payment status.")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t.invoiceId}</TableHead>
                                <TableHead>{t.project}</TableHead>
                                <TableHead>{t.date}</TableHead>
                                <TableHead>{t.amount}</TableHead>
                                <TableHead>{t.statusLabel || "Status"}</TableHead>
                                <TableHead className="text-right">{dict.common.actions || "Actions"}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell className="font-medium">{invoice.id}</TableCell>
                                    <TableCell>{invoice.project}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.amount}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                invoice.status === "Paid"
                                                    ? "default"
                                                    : invoice.status === "Pending"
                                                        ? "secondary"
                                                        : "destructive"
                                            }
                                        >
                                            {dict.portal.payments.status?.[invoice.status.toLowerCase() as keyof typeof dict.portal.payments.status] || invoice.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button 
                                                variant="ghost" 
                                                size="icon"
                                                onClick={() => handlePreview(invoice)}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon"
                                                onClick={() => handleDownload(invoice)}
                                            >
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            {locale === "fr" ? "Aperçu de la Facture" : "Invoice Preview"}
                        </DialogTitle>
                        <DialogDescription>
                            {locale === "fr" 
                                ? "Aperçu de la facture (Fonctionnalité de démonstration)"
                                : "Invoice preview (Demo functionality)"}
                        </DialogDescription>
                    </DialogHeader>
                    {previewInvoice && (
                        <div className="space-y-6 py-4">
                            <div className="border rounded-lg p-6 bg-card">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold">Kedi Tech</h2>
                                        <p className="text-sm text-muted-foreground">
                                            {locale === "fr" ? "Développement de Logiciels" : "Software Development"}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium">{locale === "fr" ? "Facture" : "Invoice"}</p>
                                        <p className="text-2xl font-bold">{previewInvoice.id}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                            <Building2 className="h-4 w-4" />
                                            {locale === "fr" ? "Facturé à" : "Bill To"}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            John Doe<br />
                                            Acme Corporation<br />
                                            john@example.com
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium mb-2 flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            {locale === "fr" ? "Date" : "Date"}
                                        </p>
                                        <p className="text-sm text-muted-foreground">{previewInvoice.date}</p>
                                        <p className="text-sm font-medium mt-4 mb-2">{locale === "fr" ? "Statut" : "Status"}</p>
                                        <Badge
                                            variant={
                                                previewInvoice.status === "Paid"
                                                    ? "default"
                                                    : previewInvoice.status === "Pending"
                                                        ? "secondary"
                                                        : "destructive"
                                            }
                                        >
                                            {dict.portal.payments.status?.[previewInvoice.status.toLowerCase() as keyof typeof dict.portal.payments.status] || previewInvoice.status}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-medium flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            {locale === "fr" ? "Projet" : "Project"}
                                        </p>
                                        <p className="text-muted-foreground">{previewInvoice.project}</p>
                                    </div>
                                </div>

                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold flex items-center gap-2">
                                            <DollarSign className="h-5 w-5" />
                                            {locale === "fr" ? "Montant Total" : "Total Amount"}
                                        </p>
                                        <p className="text-2xl font-bold">{previewInvoice.amount}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/50 p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                    {locale === "fr" 
                                        ? "Ceci est un aperçu de démonstration. Dans une application réelle, cette facture serait générée dynamiquement à partir des données du serveur."
                                        : "This is a demo preview. In a real application, this invoice would be dynamically generated from server data."}
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
