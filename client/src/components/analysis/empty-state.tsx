import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { UploadModal } from "../modals/upload-modal";

interface iEmptyStateProps {
    title: string;
    description: string;
}

export default function EmptyState({ title, description } : iEmptyStateProps) {
    const [isUploadModalOpen,setIsUploadModalOpen] = useState(false);

    return (
    <>
        <div className="flex items-center justify-center p-4 mt-10">
            <Card className="w-full max-w-md">
        <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <p>To receive your analysis, you need to upload an PDF.</p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <div className="flex items-center">
                        <p className="text-sm text-blue-700 text-left">
                            <strong>Note:</strong>
                            <br />
                            You can upload your contract in PDF format.
                        </p>
                    </div>
                </div>
            </div>
        </CardContent>
        <CardFooter>
            <div className="flrx flex-col w-full space-y-2">   
            <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="w-full"
            >
                Upload for Full Analysis
            </Button>
            <Button
            className="w-full" asChild variant={"outline"}>
                <Link href="/dashboard">
                Go to Dashboard
                </Link>
            </Button>
            </div>
        </CardFooter>
        </Card>
        </div>
        <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={() => setIsUploadModalOpen(false)}
        />
    </>
    );
}