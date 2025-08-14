import { Home, Users, Tv, Store, Bell, Menu } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function MobileNav() {
  const [location] = useLocation();
  
  const navItems = [
    { href: "/", icon: Home, label: "Trang chủ", testId: "mobile-link-home" },
    { href: "/friends", icon: Users, label: "Bạn bè", testId: "mobile-link-friends" },
    { href: "/videos", icon: Tv, label: "Cuộc thi", testId: "mobile-link-watch" },
    { href: "/groups", icon: Store, label: "Nhóm", testId: "mobile-link-marketplace" },
    { href: "/notifications", icon: Bell, label: "Thông báo", testId: "mobile-link-notifications" },
    { href: "/profile", icon: Menu, label: "Menu", testId: "mobile-link-menu" }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 shadow-lg" data-testid="mobile-nav">
      <div className="flex justify-around py-1">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href === "/" && location === "/home");
          const Icon = item.icon;
          
          return (
            <Link key={item.href} href={item.href}>
              <div 
                className={`flex flex-col items-center space-y-1 p-2 min-w-[60px] ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid={item.testId}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
