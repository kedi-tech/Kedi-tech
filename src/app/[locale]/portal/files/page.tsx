"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { FileText, Download, MoreVertical, Upload, X, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Locale } from "@/i18n/config";
import { useDictionary } from "@/components/providers/dictionary-provider";

// Simple toast implementation using browser alert for demo
const showToast = (title: string, description?: string) => {
    // In a real app, you'd use a proper toast library
    // For demo, we'll use alert
    alert(`${title}\n${description || ""}`);
};

interface FileItem {
    id: string;
    name: string;
    size: string;
    date: string;
    type: string;
}

const initialFiles: FileItem[] = [
    { id: "1", name: "Project_Proposal.pdf", size: "2.4 MB", date: "2023-10-01", type: "PDF" },
    { id: "2", name: "Design_Assets.zip", size: "156 MB", date: "2023-10-15", type: "ZIP" },
    { id: "3", name: "Contract_Signed.pdf", size: "1.2 MB", date: "2023-10-05", type: "PDF" },
    { id: "4", name: "Meeting_Notes_Nov.docx", size: "45 KB", date: "2023-11-02", type: "DOCX" },
];

export default function PortalFilesPage() {
    const params = useParams();
    const locale = (params.locale as Locale) || "fr";
    const dict = useDictionary();
    const [files, setFiles] = useState<FileItem[]>(initialFiles);
    const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const fileName = selectedFile.name;
        setIsUploading(true);

        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Add file to list
        const newFile: FileItem = {
            id: Date.now().toString(),
            name: fileName,
            size: formatFileSize(selectedFile.size),
            date: new Date().toISOString().split("T")[0],
            type: fileName.split(".").pop()?.toUpperCase() || "FILE",
        };

        setFiles([newFile, ...files]);
        setSelectedFile(null);
        setIsUploadDialogOpen(false);
        setIsUploading(false);

        showToast(
            locale === "fr" ? "Fichier téléversé" : "File uploaded",
            locale === "fr" 
                ? `${fileName} a été téléversé avec succès.`
                : `${fileName} has been uploaded successfully.`
        );
    };

    const handleDelete = (fileId: string) => {
        setFiles(files.filter((f) => f.id !== fileId));
        showToast(
            locale === "fr" ? "Fichier supprimé" : "File deleted",
            locale === "fr" 
                ? "Le fichier a été supprimé avec succès."
                : "The file has been deleted successfully."
        );
    };

    const handleDownload = (file: FileItem) => {
        // Dummy download - just show a toast
        showToast(
            locale === "fr" ? "Téléchargement" : "Download",
            locale === "fr" 
                ? `Téléchargement de ${file.name}...`
                : `Downloading ${file.name}...`
        );
    };
    const t = dict.portal.files;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
                    <p className="text-muted-foreground">{t.subtitle}</p>
                </div>
                <Button onClick={() => setIsUploadDialogOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    {t.upload}
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{t.allFiles || (locale === "fr" ? "Tous les Fichiers" : "All Files")}</CardTitle>
                    <CardDescription>{t.allFilesDesc || (locale === "fr" ? "Une liste de tous les fichiers associés à vos projets." : "A list of all files associated with your projects.")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t.name}</TableHead>
                                <TableHead>{t.type}</TableHead>
                                <TableHead>{t.size}</TableHead>
                                <TableHead>{t.date}</TableHead>
                                <TableHead className="text-right">{t.actions}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {files.map((file) => (
                                <TableRow key={file.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        {file.name}
                                    </TableCell>
                                    <TableCell>{file.type}</TableCell>
                                    <TableCell>{file.size}</TableCell>
                                    <TableCell>{file.date}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleDownload(file)}>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    {dict.common.download}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    className="text-destructive"
                                                    onClick={() => handleDelete(file.id)}
                                                >
                                                    {dict.common.delete}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{locale === "fr" ? "Téléverser un Fichier" : "Upload File"}</DialogTitle>
                        <DialogDescription>
                            {locale === "fr" 
                                ? "Sélectionnez un fichier à téléverser. (Fonctionnalité de démonstration)"
                                : "Select a file to upload. (Demo functionality)"}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="file">{locale === "fr" ? "Fichier" : "File"}</Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={handleFileSelect}
                                accept="*/*"
                            />
                            {selectedFile && (
                                <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-sm flex-1 truncate">{selectedFile.name}</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => setSelectedFile(null)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsUploadDialogOpen(false);
                                setSelectedFile(null);
                            }}
                        >
                            {dict.common.cancel}
                        </Button>
                        <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
                            {isUploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {locale === "fr" ? "Téléversement..." : "Uploading..."}
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    {t.upload}
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
