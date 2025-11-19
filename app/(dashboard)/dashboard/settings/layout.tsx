"use client";

import { Separator } from "@/components/ui/separator";

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-medium">Settings</h3>
				<p className="text-sm text-muted-foreground">
					Manage your account settings and set e-mail preferences.
				</p>
			</div>
			<Separator />
			<div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
				{/* <aside className="-mx-4 lg:w-1/5">
					<SettingsSidebarNav items={sidebarNavItems} />
				</aside> */}
				<div className="flex-1 lg:max-w-2xl">{children}</div>
			</div>
		</div>
	);
}
