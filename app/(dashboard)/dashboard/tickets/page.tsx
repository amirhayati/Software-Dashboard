"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}
interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in-progress" | "resolved";
  createdAt: string;
  updatedAt: string;
  category: string;
  comments?: Comment[];
  reviewed?: boolean;
}
// Helper function to convert Gregorian date to Jalali using Intl
function gregorianToJalali(date: Date): string {
  return date.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}
const getStatusPriority = (status: "open" | "in-progress" | "resolved"): number => {
  switch (status) {
    case "open": return 1;
    case "in-progress": return 2;
    case "resolved": return 3;
    default: return 4;
  }
};
const persianNames = [
  "احمد شریفی",
  "فاطمه کریمی",
  "علی رضایی",
  "مریم احمدی",
  "محمد حسنی",
  "نازنین علوی",
  "حسن پاکنژاد",
  "زهرا صادقی",
  "رضا مرادی",
  "سارا خوشقدم",
  "کامران راهبری",
  "امیر موسوی",
  "نیلا شاهی",
  "یاسین رفیعی",
  "لیلا قاسمی",
  "بابک میرزایی",
  "شیما هاشمی",
  "حمید دستجردی",
  "الناز فلاح",
  "محسن جمالی",
  "نسیم کاظمی",
  "میلاد صفری",
  "پریسا ایرانی",
  "فرهاد کامیابی",
  "دیانا رستمی",
  "علیرضا اسلامی",
  "مهتاب زاده",
  "جواد ملکی",
  "نوشین رشیدی",
  "آرش بهاری",
  "دریا سلیمانی",
  "سینا اسماعیلی",
  "شقایق حدادی",
  "امین طاهری",
  "الهام حاج‌علی",
  "محمدرضا رحیمی",
  "مائده دهقان",
  "اسماعیل منصوری",
  "الیزابت برومند",
  "شهرام موسوی",
  "ندا پهلوی",
  "کیوان مقدسی",
  "سپیده کرمی",
  "علیا ابراهیمی",
  "منصور رحیمی",
  "تینا شریفی",
  "شریف اکبری",
  "پرستو داودی",
  "فیروز حاج‌حسنی",
  "سپهر شاکری",
];
const ticketDescriptions = [
  "هنگام تلاش برای ورود، خطای ۴۰۴ یافت نشد دریافت می‌شود. مدیریت مسیر برای نقطه پایانی /auth/login حل نمی‌شود.",
  "زمان بارگذاری صفحات پیشخوان بیش از ۵ ثانیه است. حجم بسته جاوااسکریپت بیش از ۲ مگابایت و تصاویر فشرده نشده‌اند.",
  "استثنای اعتبارسنجی در اعتبارسنج پس‌زمینه برای فیلد ایمیل در فرم ثبت‌نام پرتاب می‌شود. الگوی منظم ناسازگار است.",
  "بازگشت تراکنش در ذخیره‌سازی داده‌ها رخ می‌دهد. نقض محدودیت در رابطه کلید خارجی جدول کاربران.",
  "تایم‌اوت اتصال به پایگاه داده پسست‌اس‌کیوال. اندازه استخر بیشینه تجاوز کرده و صف پرس‌وجو پر شده است.",
  "اعتبارسنجی کد توتی‌پی در احراز هویت دو مرحله‌ای شکست می‌خورد. انحراف زمانی بین مشتری و سرور همگام‌سازی ان‌تی‌پی نشده است.",
  "نشت حافظه در فرآیند نود.جی‌اس. استفاده از هیپ هر ۶۰ ثانیه ۱۰ درصد افزایش می‌یابد بدون فعال‌سازی جمع‌آوری زباله.",
  "بازنشانی اتصال تی‌سی‌پی توسط دیوار آتش. بسته سین-ایک به دلیل محدودیت نرخ رها می‌شود.",
  "خط لوله تجمیع در مانگودبی برای تولید گزارش شکست می‌خورد. مرحله گروه‌بندی با مسیر فیلد نامعتبر.",
  "فیلتر پرس‌وجوی الستیک‌سرچ با تجزیه‌گر نادرست پیکربندی شده. ریشه‌یابی توکن‌سازی برای کلمات فارسی نادرست است.",
  "جداسازی شنونده رویداد در دستکاری دی‌او‌ام شکست می‌خورد. چرخه مرجع حافظه در محدوده بسته.",
  "خروجی سی‌اس‌وی از طریق کتابخانه آپاچی پی‌اوآی سقوط می‌کند. خطای کمبود حافظه در رندرینگ شیت با مجموعه داده بزرگ.",
  "شکست رله اس‌ام‌تی‌پی در نودمی‌لر. عدم تطابق امضای دی‌کیم و رکورد اس‌پی‌اف نامعتبر.",
  "آسیب‌پذیری تصاحب جلسه. بازتولید توکن سی‌اس‌آر‌اف پس از خروج پیاده‌سازی نشده.",
  "تأخیر ابطال کش ردیش. انقضای تی‌تی‌ال همگام با به‌روزرسانی پایگاه داده تأخیر دارد.",
  "شکست اعتبارسنجی هش بی‌کریپت. عدم تطابق دور نمک در نقطه پایانی به‌روزرسانی رمز عبور.",
  "خطای اعمال سیاست آر‌بی‌ای‌سی. واسط میانی برای کنترل دسترسی مبتنی بر نقش رد می‌شود.",
  "شکست ایدم‌پوتانسی حذف شی اس۳. خاتمه بارگذاری چندبخشی ناقص و متاداده کهنه.",
  "عدم تطابق هیدراتاسیون اس‌اس‌آر در نکست.جی‌اس. راه‌اندازی حالت سمت مشتری با ای‌اچ‌تی‌ام‌ال رندر شده سرور تعارض دارد.",
  "از دست رفتن حالت دکمه بازگشت مرورگر. فشار حالت تاریخچه بدون سریال‌سازی حالت.",
  "تلاش تزریق اس‌کیوال مسدود شد اما تجزیه پرس‌وجو شکست. عدم تطابق پارامتر بستن دستور آماده.",
  "شمارش دستگاه یو‌اس‌بی اچ‌آی‌دی در درایور هسته شکست. عدم تطابق شناسه فروشنده با قوانین یودو.",
  "فعال‌سازی خفه‌سازی حرارتی سی‌پی‌یو. دمای هسته بیش از ۸۵ درجه سانتی‌گراد و مقیاس فرکانس به ۸۰۰ مگاهرتز کاهش می‌یابد.",
  "پایداری روت‌کیت از طریق ال‌دی_پری‌لود. تزریق کتابخانه مخرب قلاب لینک‌کننده پویا.",
  "شکست فعال‌سازی سیگنال تعلیق دی‌پی‌ام‌اس. افزونه سرور ایکس غیرفعال و حلقه کنترل نور پس‌زمینه.",
  "تایم‌اوت دست‌دهی ۸۰۲.۱۱. احراز هویت دبلیو‌پی‌ای۳ اس‌ای‌ای با پارامتر گروه دی‌اچ ضعیف.",
  "شکست بازپخش ژورنال ان‌تی‌اف‌اس پس از سقوط. فساد $LogFile و تعمیر اف‌اس‌سی‌کی مورد نیاز.",
  "خطای استقرار به‌روزرسانی دبلیو‌اس‌یو‌اس. عدم تطابق هش فایل کَب و قطع انتقال بی‌تس.",
  "شکست مذاکره پروتکل آی‌پی‌پی. پس‌زمینه چاپگر کاپس با مجموعه رمزنگاری تی‌ال‌اس ۱.۳ ناسازگار.",
  "خطای نظرسنجی وضعیت باتری ای‌سی‌پی‌آی. تجزیه جدول اس‌ام‌بی‌آی‌اس شکست و برآورد ظرفیت نادقیق.",
];
const ticketTitles = [
  "خطای ۴۰۴ در آی‌پی لاگین",
  "بهینه‌سازی عملکرد پیشخوان",
  "شکست اعتبارسنجی در فرم ثبت‌نام",
  "خطای تراکنش در پایداری داده",
  "سرریز استخر اتصال پایگاه داده",
  "مشکل همگام‌سازی توتی‌پی ۲اف‌ای",
  "شناسایی نشت حافظه هیپ",
  "ناهنجاری بازنشانی تی‌سی‌پی شبکه",
  "باگ خط لوله تجمیع مانگودبی",
  "کاهش ارتباط‌پذیری جستجوی الستیک‌سرچ",
  "نشت رویداد دی‌او‌ام",
  "سقوط خروجی اکسل کمبود حافظه",
  "شکست اعتبارسنجی دی‌کیم/اس‌پی‌اف ایمیل",
  "نقض امنیت جلسه",
  "نقض سازگاری کش",
  "عدم تطابق هش رمز عبور",
  "رد واسط میانی آر‌بی‌ای‌سی",
  "ایدم‌پوتانسی حذف ذخیره فایل",
  "عدم تطابق هیدراتاسیون اس‌اس‌آر",
  "از دست رفتن حالت تاریخچه مرورگر",
  "اثر جانبی مسدودسازی تزریق اس‌کیوال",
  "شمارش درایور دستگاه یو‌اس‌بی",
  "شکست مدیریت حرارتی سی‌پی‌یو",
  "شناسایی بارگذار روت‌کیت",
  "خطای سیگنال تعلیق نمایش",
  "تایم‌اوت احراز وای‌فای دبلیو‌پی‌ای۳",
  "فساد ژورنال فایل‌سیستم",
  "عدم تطابق هش به‌روزرسانی ویندوز",
  "مذاکره تی‌ال‌اس آی‌پی‌پی چاپگر",
  "نادقیق نظرسنجی باتری ای‌سی‌پی‌آی",
];
const categories = ["نرم افزار", "سخت افزار", "شبکه", "سامانه", "پایگاه داده", "امنیت"];
const supportAcks = [
  "تیکت دریافت شد. فایل‌های لاگ را بررسی می‌کنیم.",
  "مشکل را تکرار کردیم. تحلیل علت ریشه شروع شده.",
  "اولویت بالا تنظیم شد. تیم توسعه割り当て گردید.",
  "جزئیات محیط نیاز است: نسخه سیستم عامل، نوع مرورگر.",
];
const userQuestions = [
  "چرا این استثنا پرتاب می‌شود؟ ردپای پشته کامل را بفرستید.",
  "راه‌حل موقت برای تولید چیست؟",
  "آیا وصله فوری در نقشه راه هست؟ زمان تقریبی؟",
  "تغییرات پیکربندی لازم است؟ نمونه یام‌ال بدهید.",
  "هشدار نظارت برای این معیار راه‌اندازی کنیم؟",
  "تعارض نسخه وابستگی است؟ فهرست الزامات چک شد؟",
  "پیکربندی تعادل‌کننده بار تأثیر دارد؟ شکست بررسی سلامت؟",
  "لاگ‌های کانتینر داکر را به اشتراک بگذاریم؟",
  "محدودیت نرخ آی‌پی فعال شده؟ زمان بازنشانی سهمیه؟",
  "قانون دیوار آتش مسدود کرده؟ خروجی ردیابی مسیر؟",
];
const supportAnswers = [
  "استثنا به دلیل اشاره‌گر خالی در اعتبارسنج است. رفع در درخواست کش #۴۵۶ ادغام شد.",
  "راه‌حل موقت: پاک کردن کش و راه‌اندازی مجدد سرویس. رفع دائمی نسخه ۲.۱.۳.",
  "زمان تقریبی ۴۸ ساعت. موارد آزمون در صحنه‌سازی گذرانده شده.",
  "نمونه پیکربندی: احراز هویت: { ttl: ۳۶۰۰ }. استقرار از طریق کیوبکتل اعمال.",
  "راه‌اندازی هشدار: قانون پرومته‌وس برای استفاده_هیپ >۸۰%. یام‌ال پیوست.",
  "تعارض نسخه با لادش ۴.۱۷. مشکلی در ۵.ایکس نیست.",
  "بررسی سلامت تعادل‌کننده /healthz نقطه پایانی. فاصله ۱۰ ثانیه تنظیم کنید.",
  "لاگ‌ها: داکر لاگ‌ها -ف کانتینر_آی‌دی | گِرِپ خطا. خروجی را به اشتراک بگذارید.",
  "محدودیت نرخ ۱۰۰ درخواست در دقیقه. بازنشانی در نیمه‌شب یوتی‌سی.",
  "دیوار آتش: یو‌اف‌دبلو اجازه ۴۴۳/تی‌سی‌پی. ردیابی: بدون از دست رفتن بسته.",
];
const generateCommentText = (ticketIndex: number, commentIndex: number): string => {
  const responses = [...supportAcks, ...userQuestions, ...supportAnswers];
  return responses[(ticketIndex + commentIndex) % responses.length];
};
// Generate 750 tickets with proper date distribution
const generateTickets = (): Ticket[] => {
  const tickets: Ticket[] = [];
  const priorities: Array<"high" | "medium" | "low"> = ["high", "medium", "low"];
  const today = new Date();
  for (let i = 1; i <= 750; i++) {
    const daysOffset = Math.floor(((750 - i) / 750) * 183);
    const ticketDate = new Date(today.getTime() - daysOffset * 24 * 60 * 60 * 1000);
    const jalaliDate = gregorianToJalali(ticketDate);
    let status: "open" | "in-progress" | "resolved";
    if (i <= 740) {
      status = "resolved";
    } else if (i <= 744) {
      status = "open";
    } else {
      status = "in-progress";
    }
    const hasComments = i !== 1 && i !== 750;
    const comments: Comment[] = [];
    if (hasComments) {
      const commentCount = 2 + Math.floor(Math.random() * 3); // 2-4
      let isSupportTurn = true; // Start with support ack
      for (let j = 0; j < commentCount; j++) {
        const author = isSupportTurn ? "تیم پشتیبانی" : `کاربر ${i % 5}`;
        comments.push({
          id: `C-${i}-${j}`,
          author,
          text: generateCommentText(i, j),
          timestamp: jalaliDate,
        });
        isSupportTurn = !isSupportTurn; // Alternate
      }
    }
    const userName = persianNames[i % persianNames.length];
    tickets.push({
      id: `${userName}-${i}`,
      title: ticketTitles[i % ticketTitles.length],
      description: ticketDescriptions[i % ticketDescriptions.length],
      priority: priorities[i % 3],
      status,
      createdAt: jalaliDate,
      updatedAt: jalaliDate,
      category: categories[i % categories.length],
      comments,
      reviewed: i % 5 === 0,
    });
  }
  return tickets.sort((a, b) => {
    const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
    if (statusDiff !== 0) return statusDiff;
    const dateA = a.createdAt.split('/').map(Number);
    const dateB = b.createdAt.split('/').map(Number);
    if (dateA[0] !== dateB[0]) return dateB[0] - dateA[0];
    if (dateA[1] !== dateB[1]) return dateB[1] - dateA[1];
    if (dateA[2] !== dateB[2]) return dateB[2] - dateA[2];
    return 0;
  });
};
const tickets = generateTickets();
const softwareTickets = tickets.filter(t => t.category === "نرم افزار");
const getPriorityColor = (priority: "high" | "medium" | "low") => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
const getStatusColor = (status: "open" | "in-progress" | "resolved") => {
  switch (status) {
    case "open":
      return "bg-blue-100 text-blue-800";
    case "in-progress":
      return "bg-purple-100 text-purple-800";
    case "resolved":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
const getStatusLabel = (status: string) => {
  const labels: { [key: string]: string } = {
    open: "باز",
    "in-progress": "در حال انجام",
    resolved: "حل شده",
  };
  return labels[status] || status;
};
const getPriorityLabel = (priority: string) => {
  const labels: { [key: string]: string } = {
    high: "بالا",
    medium: "متوسط",
    low: "پایین",
  };
  return labels[priority] || priority;
};
export default function TicketsPage() {
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [ticketComments, setTicketComments] = useState<{ [key: string]: Comment[] }>({});
  const [showCommentForm, setShowCommentForm] = useState<{ [key: string]: boolean }>({});
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [reviewedTickets, setReviewedTickets] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;
  const totalPages = Math.ceil(softwareTickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTickets = softwareTickets.slice(startIndex, endIndex);
  const handleAddComment = (ticketId: string) => {
    if (!commentText[ticketId]?.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: "شما",
      text: commentText[ticketId],
      timestamp: new Date().toLocaleString("fa-IR"),
    };
    setTicketComments((prev) => ({
      ...prev,
      [ticketId]: [...(prev[ticketId] || []), newComment],
    }));
    setCommentText((prev) => ({
      ...prev,
      [ticketId]: "",
    }));
  };
  const handleReviewTicket = (ticketId: string) => {
    setReviewedTickets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ticketId)) {
        newSet.delete(ticketId);
      } else {
        newSet.add(ticketId);
      }
      return newSet;
    });
  };
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <h1 className="text-4xl font-bold tracking-tight">
            Ticket Management
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          List of {softwareTickets.length} software problems of site and management app reported from the past 6 months
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{softwareTickets.length}</div>
            <p className="text-xs text-muted-foreground mt-2">All tickets</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {softwareTickets.filter((t) => t.status === "open").length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Pending review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {softwareTickets.filter((t) => t.status === "in-progress").length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Being resolved
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {softwareTickets.filter((t) => t.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Resolved issues</p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Ticket Details</h2>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </div>
        <div className="space-y-3">
          {paginatedTickets.map((ticket) => (
            <Card
              key={ticket.id}
              className="hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
            >
              <div
                onClick={() =>
                  setExpandedTicket(
                    expandedTicket === ticket.id ? null : ticket.id,
                  )
                }
                className="p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-muted-foreground">
                        {ticket.id}
                      </span>
                      <h3 className="text-lg font-semibold">{ticket.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">
                      {ticket.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {getPriorityLabel(ticket.priority)}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {getStatusLabel(ticket.status)}
                      </Badge>
                      <Badge variant="outline">{ticket.category}</Badge>
                      {reviewedTickets.has(ticket.id) && (
                        <Badge className="bg-black-100 text-green-800">بررسی شده</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {ticket.createdAt}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                  >
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        expandedTicket === ticket.id && "rotate-180",
                      )}
                    />
                  </Button>
                </div>
              </div>
              {expandedTicket === ticket.id && (
                <div className="border-t px-6 py-4 bg-muted/30">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">توضیح کامل</h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        {ticket.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          تاریخ ایجاد
                        </p>
                        <p className="font-medium">{ticket.createdAt}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          آخرین به‌روزرسانی
                        </p>
                        <p className="font-medium">{ticket.updatedAt}</p>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">نظرات ({ticketComments[ticket.id]?.length || ticket.comments?.length || 0})</h4>
                      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                        {(ticketComments[ticket.id] || ticket.comments || []).map((comment) => (
                          <div key={comment.id} className="bg-gray-100 dark:bg-black  p-3 rounded border border-gray-200">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-medium text-sm">{comment.author}</p>
                              <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                            </div>
                            <p className="text-sm text-foreground">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                      {!showCommentForm[ticket.id] ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowCommentForm((prev) => ({ ...prev, [ticket.id]: true }))}
                          className="w-full"
                        >
                          افزودن نظر
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <textarea
                            placeholder="نظرتان را اینجا بنویسید..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            rows={3}
                            value={commentText[ticket.id] || ""}
                            onChange={(e) => setCommentText((prev) => ({ ...prev, [ticket.id]: e.target.value }))}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                handleAddComment(ticket.id);
                                setShowCommentForm((prev) => ({ ...prev, [ticket.id]: false }));
                              }}
                            >
                              ارسال نظر
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowCommentForm((prev) => ({ ...prev, [ticket.id]: false }))}
                            >
                              لغو
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 border-t pt-4">
                      <Button
                        size="sm"
                        variant={reviewedTickets.has(ticket.id) ? "default" : "outline"}
                        onClick={() => handleReviewTicket(ticket.id)}
                      >
                        {reviewedTickets.has(ticket.id) ? "✓ بررسی شده" : "بررسی"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
        <div className="flex items-center justify-between border-t pt-6">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, softwareTickets.length)} of {softwareTickets.length} tickets
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {(() => {
                const pages: (number | string)[] = [];
                const maxPagesToShow = 5;
                if (totalPages <= maxPagesToShow) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  pages.push(1);
                  const halfWindow = Math.floor(maxPagesToShow / 2);
                  let start = Math.max(2, currentPage - halfWindow);
                  let end = Math.min(totalPages - 1, currentPage + halfWindow);
                  if (start === 2) {
                    end = Math.min(totalPages - 1, maxPagesToShow - 1);
                  }
                  if (end === totalPages - 1) {
                    start = Math.max(2, totalPages - maxPagesToShow + 2);
                  }
                  if (start > 2) {
                    pages.push("...");
                  }
                  for (let i = start; i <= end; i++) {
                    pages.push(i);
                  }
                  if (end < totalPages - 1) {
                    pages.push("...");
                  }
                  pages.push(totalPages);
                }
                return pages.map((page, idx) => {
                  if (page === "...") {
                    return (
                      <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    );
                  }
                  const pageNum = page as number;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="min-w-10"
                    >
                      {pageNum}
                    </Button>
                  );
                });
              })()}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
// Helper function for cn
function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}