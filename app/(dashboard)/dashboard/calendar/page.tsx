"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Plus,
	Calendar as CalendarIcon,
	Clock,
	MapPin,
	Users,
} from "lucide-react";

const events = [
	{
		id: 1,
		title: "کارگاه برنامه‌نویسی پایتون",
		date: "1404-09-26",
		time: "10:00",
		duration: "1 ساعت",
		location: "آنلاین",
		attendees: ["علی رضایی", "فاطمه احمدی", "محمد حسینی"],
		type: "کارگاه",
	},
	{
		id: 2,
		title: "کارگاه طراحی وب",
		date: "1404-09-27",
		time: "14:00",
		duration: "2 ساعت",
		location: "آنلاین",
		attendees: ["سورایا محمدی", "رضا کریمی"],
		type: "کارگاه",
	},
	{
		id: 3,
		title: "کارگاه هوش مصنوعی",
		date: "1404-09-30",
		time: "17:00",
		duration: "تمام روز",
		location: "آنلاین",
		attendees: ["حسن نوری", "مریم رضوی"],
		type: "کارگاه",
	},
	{
		id: 4,
		title: "کارگاه بازاریابی دیجیتال",
		date: "1404-10-02",
		time: "12:00",
		duration: "1 ساعت",
		location: "آنلاین",
		attendees: ["بهرام صادقی"],
		type: "کارگاه",
	},
];

export default function CalendarPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
					<p className="text-muted-foreground">
						Manage your schedule and upcoming events.
					</p>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				{/* Calendar View */}
				<div className="lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<CalendarIcon className="h-5 w-5" />
								آبان ۱۴۰۴
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="h-[400px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
								<div className="text-center">
									<CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<p className="text-muted-foreground">
										Calendar view placeholder
									</p>
									<p className="text-sm text-muted-foreground">
										Interactive calendar component would go here
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Upcoming Events */}
				<div className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>رویدادهای پیش رو</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{events.map((event) => (
								<div
									key={event.id}
									className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
								>
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h4 className="font-medium text-sm">{event.title}</h4>
											<div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
												<CalendarIcon className="h-3 w-3" />
												<span>{event.date}</span>
											</div>
											<div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
												<Clock className="h-3 w-3" />
												<span>{event.time}</span>
												<span>•</span>
												<span>{event.duration}</span>
											</div>
											<div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
												<MapPin className="h-3 w-3" />
												<span>{event.location}</span>
											</div>
											<div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
												<Users className="h-3 w-3" />
												<span>{event.attendees.length} شرکت‌کننده</span>
											</div>
										</div>
										<Badge
											variant="secondary"
											className="text-xs"
										>
											{event.type}
										</Badge>
									</div>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Quick Actions */}
					
				</div>
			</div>
		</div>
	);
}