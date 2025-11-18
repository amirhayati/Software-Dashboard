"use client";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";



export function Topbar() {
	return (
		<div className="flex h-16 items-center justify-between border-b px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			{/* Search */}
			<div className="flex items-center max-w-2xl flex-1">
				<div className="relative w-full max-w-lg">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search anything..."
						className="pl-10 pr-4 py-2 h-10 bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all duration-200"
					/>
				</div>
			</div>

			{/* Right Section */}
			<div className="flex items-center gap-3">
				{/* App Switcher */}
				{/* <AppSwitcher /> */}

				{/* Theme Toggle */}
				<ThemeToggle />

				{/* Notifications */}
				<Link
					href={"/dashboard/tickets"}
					className="relative h-9 w-9 hover:bg-muted transition-colors"
					aria-label="Notifications"
				>
					<Bell className="absolute h-4 w-4 top-3 left-1" />
					<span className="absolute -top-0 right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium">
						3
					</span>
				</Link>

				{/* Profile */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="relative h-9 w-9 rounded-full hover:bg-muted transition-colors"
						>
							<Avatar className="h-8 w-8 ring-2 ring-background">
								<AvatarImage src="/user-logo.png" alt="امیر رضا موذنی" />
								<AvatarFallback className="bg-primary text-primary-foreground font-semibold">
									ام
								</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-64 p-2" align="end" forceMount>
						<DropdownMenuLabel className="font-normal p-3">
							<div className="flex items-center gap-3">
								<Avatar className="h-10 w-10">
									<AvatarImage src="/user-logo.png" alt="امیر رضا موذنی" />
									<AvatarFallback className="bg-primary text-primary-foreground">
										ام
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">امیر رضا موذنی</p>

								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuItem className="p-3 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors">
							<Link href={'/'} className="flex items-center gap-2">🚪 Log out</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}