import { Home, Users, Tv, Store, Bell, Menu } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40" data-testid="mobile-nav">
      <div className="flex justify-around py-2">
        <a 
          href="#" 
          className="flex flex-col items-center space-y-1 p-2 text-primary"
          data-testid="mobile-link-home"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </a>
        <a 
          href="#" 
          className="flex flex-col items-center space-y-1 p-2 text-muted-foreground"
          data-testid="mobile-link-friends"
        >
          <Users className="h-5 w-5" />
          <span className="text-xs">Friends</span>
        </a>
        <a 
          href="#" 
          className="flex flex-col items-center space-y-1 p-2 text-muted-foreground"
          data-testid="mobile-link-watch"
        >
          <Tv className="h-5 w-5" />
          <span className="text-xs">Watch</span>
        </a>
        <a 
          href="#" 
          className="flex flex-col items-center space-y-1 p-2 text-muted-foreground"
          data-testid="mobile-link-marketplace"
        >
          <Store className="h-5 w-5" />
          <span className="text-xs">Marketplace</span>
        </a>
        <a 
          href="#" 
          className="flex flex-col items-center space-y-1 p-2 text-muted-foreground"
          data-testid="mobile-link-notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="text-xs">Notifications</span>
        </a>
        <a 
          href="#" 
          className="flex flex-col items-center space-y-1 p-2 text-muted-foreground"
          data-testid="mobile-link-menu"
        >
          <Menu className="h-5 w-5" />
          <span className="text-xs">Menu</span>
        </a>
      </div>
    </nav>
  );
}
