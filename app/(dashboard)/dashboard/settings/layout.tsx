"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface SettingsSidebarNavProps extends React.HTMLAttributes<HTMLElement> {
	items: {
		href: string;
		title: string;
	}[];
}

function SettingsSidebarNav({
	className,
	items,
	...props
}: SettingsSidebarNavProps) {
	const pathname = usePathname();

	return (
		<nav
			className={cn(
				"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
				className,
			)}
			{...props}
		>
			{items.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					className={cn(
						"w-full",
						"inline-flex items-center justify-start whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
						"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
						pathname === item.href
							? "bg-muted hover:bg-muted"
							: "hover:bg-transparent hover:underline",
					)}
				>
					{item.title}
				</Link>
			))}
		</nav>
	);
}

import { Separator } from "@/components/ui/separator";

const sidebarNavItems = [
	{
		title: "Profile",
		href: "/dashboard/settings",
	},
	{
		title: "Account",
		href: "/dashboard/settings/account",
	},
	{
		title: "Appearance",
		href: "/dashboard/settings/appearance",
	},
	{
		title: "Notifications",
		href: "/dashboard/settings/notifications",
	},
	{
		title: "Display",
		href: "/dashboard/settings/display",
	},
	{
		title: "API Keys",
		href: "/dashboard/settings/api-keys",
	},
];

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
