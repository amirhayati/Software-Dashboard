"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  Activity,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Open Issues",
    value: "1",
    icon: AlertTriangle,
    description: "+0 from last week",
    trend: "up",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    title: "Resolved Bugs",
    value: "61",
    icon: CheckCircle,
    description: "+0 from last month",
    trend: "up",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Critical Errors",
    value: "1",
    icon: AlertTriangle,
    description: "+0 from last week",
    trend: "up",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Active Reports",
    value: "0",
    icon: Activity,
    description: "+0 since yesterday",
    trend: "up",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Overview of site and management app software problems.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="group hover:shadow-lg transition-all duration-200"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Content Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Recent Issues
            </CardTitle>
            <p className="text-muted-foreground">
              Latest software problems and fixes
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg border">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="flex-1">
                <p className="font-medium">خطای ۴۰۴ در آی‌پی لاگین</p>
                <p className="text-sm text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg border">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="flex-1">
                <p className="font-medium">بهینه‌سازی عملکرد پیشخوان</p>
                <p className="text-sm text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg border">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <div className="flex-1">
                <p className="font-medium">شکست اعتبارسنجی در فرم ثبت‌نام</p>
                <p className="text-sm text-muted-foreground">1 hour ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Issues
            </CardTitle>
            <p className="text-muted-foreground">Manage software issues</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg border hover:bg-muted transition-colors"
              >
                <AlertTriangle className="h-6 w-6" />
                <span className="text-sm font-medium">Report Issue</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg border hover:bg-muted transition-colors"
              >
                <Users className="h-6 w-6" />
                <span className="text-sm font-medium">View Tickets</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg border hover:bg-muted transition-colors"
              >
                <Activity className="h-6 w-6" />
                <span className="text-sm font-medium">Assign Dev</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-2 p-6 rounded-lg border hover:bg-muted transition-colors"
              >
                <CheckCircle className="h-6 w-6" />
                <span className="text-sm font-medium">Resolve Bug</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}