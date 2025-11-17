import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";

interface UnauthorizedPageProps {
	pageName?: string;
}

export default function UnauthorizedPage({
	pageName = "This Page",
}: UnauthorizedPageProps) {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
			<Card className="w-full max-w-md text-center shadow-lg">
				<CardHeader>
					<div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
						<AlertTriangle className="h-12 w-12 text-red-600" />
					</div>
					<CardTitle className="text-2xl">Unauthorized Access</CardTitle>
					<CardDescription className="text-base">
						Sorry, you do not have permission to access this page.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="text-sm text-muted-foreground rounded-lg bg-red-50 p-3">
						<p className="font-medium text-red-800">
							❌ {pageName} is not available
						</p>
						<p className="text-xs text-red-700 mt-1">
							Only Dashboard and Ticket Management are accessible.
						</p>
					</div>
					<div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
						<Button asChild className="bg-primary">
							<Link href="/dashboard">
								<Home className="mr-2 h-4 w-4" />
								Back to Dashboard
							</Link>
						</Button>
						<Button asChild variant="outline">
							<Link href="/dashboard/tickets">
								<AlertTriangle className="mr-2 h-4 w-4" />
								Ticket Management
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
