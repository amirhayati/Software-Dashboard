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
  "کاربران نمی‌توانند به برنامه وارد شوند. پیام خطای 404 نمایش داده می‌شود.",
  "بارگذاری صفحات بسیار کند است. صفحات بیش از 5 ثانیه برای بارگذاری کامل زمان می‌برد.",
  "هنگام پر کردن فرم ثبت‌نام، سیستم پیام خطای غیرمنتظره نمایش می‌دهد.",
  "داده‌ها به درستی ذخیره نمی‌شوند. برخی از اطلاعات ورودی از بین می‌روند.",
  "سیستم نمی‌تواند به پایگاه داده متصل شود. پیام خطای Connection refused دریافت می‌کنند.",
  "سیستم احراز هویت دو مرحله‌ای کار نمی‌کند. کدهای تایید دریافت نمی‌شوند.",
  "استفاده از حافظه رم هر دقیقه 10 درصد افزایش می‌یابد.",
  "اتصال اینترنت کاربران به طور ناگهانی قطع می‌شود.",
  "گزارش‌های خروجی به صورت صحیح تولید نمی‌شوند. اعداد نادرست هستند.",
  "سیستم فیلتر جستجو درست کار نمی‌کند و نتایج نامرتبط نمایش می‌دهد.",
  "دکمه‌های ذخیره تغییرات گاهی کار نمی‌کنند.",
  "مشکل در صادرات داده‌ها به فایل Excel.",
  "سیستم اطلاع‌رسانی ایمیل کار نمی‌کند.",
  "خروج از حساب کاربری نادرست انجام می‌شود.",
  "کش کردن داده‌ها منجر به داده‌های قدیمی شده است.",
  "پسورد تغییر نمی‌کند و خطا نمایش می‌دهد.",
  "سیستم مجوز دسترسی درست کار نمی‌کند.",
  "فایل‌های آپلود شده حذف نمی‌شوند.",
  "صفحه تنظیمات بارگذاری نمی‌شود.",
  "دکمه بازگشت به صفحه قبل کار نمی‌کند.",
  "نرم‌افزار کرش می‌کند هنگام اجرای دستورات پیچیده.",
  "مشکل در شناسایی سخت‌افزار USB متصل.",
  "سرعت پردازنده کاهش یافته و فن‌ها با صدای بلند کار می‌کنند.",
  "ویروس یا بدافزار سیستم را کند کرده است.",
  "صفحه نمایش سیاه می‌شود پس از بیدار شدن از حالت خواب.",
  "اتصال Wi-Fi ناپایدار است و مدام قطع و وصل می‌شود.",
  "فایل‌های سیستم حذف شده و بازیابی نمی‌شوند.",
  "به‌روزرسانی ویندوز با خطا مواجه شده است.",
  "پرینتر به شبکه متصل نمی‌شود.",
  "باتری لپ‌تاپ سریع خالی می‌شود.",
];

const ticketTitles = [
  "خرابی دسترسی به برنامه",
  "سرعت کند برنامه",
  "خطا در فرم ورودی",
  "مشکل در ذخیره داده‌ها",
  "اتصال پایگاه داده شکسته است",
  "مشکل در احراز هویت کاربر",
  "نشتِ حافظه در برنامه",
  "قطع اتصال ناگهانی شبکه",
  "خطا در گزارش‌ها",
  "سیستم جستجو کار نمی‌کند",
  "کرش نرم‌افزار",
  "مشکل USB",
  "کاهش سرعت CPU",
  "عفونت ویروسی",
  "مشکل نمایشگر",
];

const categories = ["نرم افزار", "سخت افزار", "شبکه", "سامانه", "پایگاه داده", "امنیت"];

const sampleCommentResponses = [
  "مشکل شناسایی شد و در حال رفع می‌باشد.",
  "درخواست را بررسی کردیم و به زودی حل خواهد شد.",
  "این موضوع با تیم فنی مطرح شده است.",
  "موارد گزارش شده را اصلاح کردیم.",
  "به دلیل اولویت بالا در دستور کار قرار گرفته است.",
  "بروزرسانی جدید این مشکل را حل می‌کند.",
  "از طریق تیکت شماره ۱۲۳۴ در حال بررسی است.",
  "برنامه‌ریزی برای رفع در نسخه بعدی شده است.",
  "کاربران دیگری نیز این مشکل را گزارش کرده‌اند.",
  "راه حل موقتی برای شما ارسال خواهد شد.",
];

// Generate 375 tickets with proper date distribution
const generateTickets = (): Ticket[] => {
  const tickets: Ticket[] = [];
  const priorities: Array<"high" | "medium" | "low"> = ["high", "medium", "low"];
  const today = new Date();
  for (let i = 1; i <= 375; i++) {
    // Distribute tickets evenly across 6 months (from today backwards to 6 months ago)
    const daysOffset = Math.floor(((375 - i) / 375) * 183);
    const ticketDate = new Date(today.getTime() - daysOffset * 24 * 60 * 60 * 1000);
    const jalaliDate = gregorianToJalali(ticketDate);
    let status: "open" | "in-progress" | "resolved";
    if (i <= 370) {
      status = "resolved";
    } else if (i <= 372) {
      status = "open";
    } else {
      status = "in-progress";
    }
    // Only 2 tickets have no comments (first and last)
    const hasComments = i !== 1 && i !== 375;
    const comments: Comment[] = [];
    if (hasComments) {
      // Add 1-3 comments for each ticket
      const commentCount = (i % 3) + 1;
      for (let j = 0; j < commentCount; j++) {
        comments.push({
          id: `C-${i}-${j}`,
          author: j === 0 ? "Support Team" : `User ${i % 5}`,
          text: sampleCommentResponses[i % sampleCommentResponses.length],
          timestamp: jalaliDate,
        });
      }
    }
    const userName = persianNames[i % persianNames.length];
    tickets.push({
      id: userName,
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
  // Sort tickets by status priority first (open, in-progress, resolved), then by date descending (newest first)
  return tickets.sort((a, b) => {
    const statusDiff = getStatusPriority(a.status) - getStatusPriority(b.status);
    if (statusDiff !== 0) return statusDiff;
    // Same status, compare dates descending
    const dateA = a.createdAt.split('/').map(Number);
    const dateB = b.createdAt.split('/').map(Number);
    // Compare year, month, day in reverse order (newest first)
    if (dateA[0] !== dateB[0]) return dateB[0] - dateA[0];
    if (dateA[1] !== dateB[1]) return dateB[1] - dateA[1];
    if (dateA[2] !== dateB[2]) return dateB[2] - dateA[2];
    return 0;
  });
};

const tickets = generateTickets();

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
    open: "Open",
    "in-progress": "In Progress",
    resolved: "Resolved",
  };
  return labels[status] || status;
};

const getPriorityLabel = (priority: string) => {
  const labels: { [key: string]: string } = {
    high: "High",
    medium: "Medium",
    low: "Low",
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
  const totalPages = Math.ceil(tickets.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTickets = tickets.slice(startIndex, endIndex);

  const handleAddComment = (ticketId: string) => {
    if (!commentText[ticketId]?.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: "You",
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
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <h1 className="text-4xl font-bold tracking-tight">
            Ticket Management
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          List of 375 software and system-related issues and problems reported from the past 6 months
        </p>
      </div>
      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tickets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tickets.length}</div>
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
              {tickets.filter((t) => t.status === "open").length}
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
              {tickets.filter((t) => t.status === "in-progress").length}
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
              {tickets.filter((t) => t.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Resolved issues</p>
          </CardContent>
        </Card>
      </div>
      {/* Tickets List */}
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
              {/* Collapsed View */}
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
                        <Badge className="bg-green-100 text-green-800">Reviewed</Badge>
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
              {/* Expanded View */}
              {expandedTicket === ticket.id && (
                <div className="border-t px-6 py-4 bg-muted/30">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Full Description</h4>
                      <p className="text-sm text-foreground leading-relaxed">
                        {ticket.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Created Date
                        </p>
                        <p className="font-medium">{ticket.createdAt}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Last Updated
                        </p>
                        <p className="font-medium">{ticket.updatedAt}</p>
                      </div>
                    </div>
                    {/* Comments Section */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Comments ({ticketComments[ticket.id]?.length || 0})</h4>
                      {/* Existing Comments */}
                      <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                        {ticketComments[ticket.id]?.map((comment) => (
                          <div key={comment.id} className="bg-white p-3 rounded border border-gray-200">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-medium text-sm">{comment.author}</p>
                              <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                            </div>
                            <p className="text-sm text-foreground">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                      {/* Comment Form */}
                      {!showCommentForm[ticket.id] ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowCommentForm((prev) => ({ ...prev, [ticket.id]: true }))}
                          className="w-full"
                        >
                          Add Comment
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          <textarea
                            placeholder="Write your comment here..."
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
                              Post Comment
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowCommentForm((prev) => ({ ...prev, [ticket.id]: false }))}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-2 border-t pt-4">
                      <Button
                        size="sm"
                        variant={reviewedTickets.has(ticket.id) ? "default" : "outline"}
                        onClick={() => handleReviewTicket(ticket.id)}
                      >
                        {reviewedTickets.has(ticket.id) ? "✓ Reviewed" : "Review"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex items-center justify-between border-t pt-6">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, tickets.length)} of {tickets.length} tickets
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
                  // Show all pages if total is less than max
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  // Always show first page
                  pages.push(1);
                  // Calculate range around current page
                  const halfWindow = Math.floor(maxPagesToShow / 2);
                  let start = Math.max(2, currentPage - halfWindow);
                  let end = Math.min(totalPages - 1, currentPage + halfWindow);
                  // Adjust if too close to start or end
                  if (start === 2) {
                    end = Math.min(totalPages - 1, maxPagesToShow - 1);
                  }
                  if (end === totalPages - 1) {
                    start = Math.max(2, totalPages - maxPagesToShow + 2);
                  }
                  // Add ellipsis if needed
                  if (start > 2) {
                    pages.push("...");
                  }
                  // Add middle pages
                  for (let i = start; i <= end; i++) {
                    pages.push(i);
                  }
                  // Add ellipsis if needed
                  if (end < totalPages - 1) {
                    pages.push("...");
                  }
                  // Always show last page
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