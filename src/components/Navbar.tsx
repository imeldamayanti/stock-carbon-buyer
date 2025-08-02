import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Logo component inspired by the reference
const Logo = ({ isScrolled }: { isScrolled: boolean }) => (
  <Link to="/" className="flex items-center space-x-2 transition-all duration-300">
    <div className={cn(
      "bg-primary rounded-lg flex items-center justify-center transition-all duration-300",
      isScrolled ? "w-7 h-7" : "w-8 h-8"
    )}>
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "text-primary-foreground transition-all duration-300",
          isScrolled ? "w-4 h-4" : "w-5 h-5"
        )}
        fill="currentColor"
      >
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className={cn(
        "font-bold text-primary transition-all duration-300",
        isScrolled ? "text-base" : "text-lg"
      )}>STO</span>
      <span className={cn(
        "text-muted-foreground transition-all duration-300 -mt-1",
        isScrolled ? "text-[10px]" : "text-xs"
      )}>CARBON</span>
    </div>
  </Link>
);

const ListItem = ({ className, title, children, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      "fixed z-50 transition-all duration-300 ease-in-out",
      isScrolled 
        ? "top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl" 
        : "top-0 left-0 right-0 w-full"
    )}>
      <div className={cn(
        "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border transition-all duration-300 ease-in-out",
        isScrolled 
          ? "rounded-full shadow-elevated border-border/20" 
          : "rounded-none border-b border-border shadow-none"
      )}>
        <div className={cn(
          "container flex items-center justify-between px-4 transition-all duration-300 mx-auto",
          isScrolled ? "h-12" : "h-16"
        )}>
        <Logo isScrolled={isScrolled} />
        
        <NavigationMenu className={cn("hidden md:flex transition-all duration-300", isScrolled && "scale-95")}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>How It Works</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-eco p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          Carbon Offset Platform
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Connect companies with verified carbon offset projects worldwide.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Documentation">
                    Learn how our platform works and get started.
                  </ListItem>
                  <ListItem href="/calculator" title="Carbon Calculator">
                    Calculate your company's carbon footprint.
                  </ListItem>
                  <ListItem href="/verification" title="Verification Process">
                    Understand our rigorous verification standards.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>For Landowners</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem title="Project Registration" href="/register-project">
                    Register your conservation project on our platform.
                  </ListItem>
                  <ListItem title="Verification Support" href="/verification-support">
                    Get help with the verification process.
                  </ListItem>
                  <ListItem title="Payment Tracking" href="/payments">
                    Track your payments and project performance.
                  </ListItem>
                  <ListItem title="Resources" href="/landowner-resources">
                    Access guides and best practices.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>For Companies</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <ListItem title="Carbon Marketplace" href="/marketplace">
                    Browse and purchase verified carbon credits.
                  </ListItem>
                  <ListItem title="Company Dashboard" href="/dashboard-company">
                    Track your offset investments and impact.
                  </ListItem>
                  <ListItem title="Bulk Purchasing" href="/bulk-purchase">
                    Purchase credits at scale for your organization.
                  </ListItem>
                  <ListItem title="API Integration" href="/api">
                    Integrate carbon offsets into your systems.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/marketplace" className={navigationMenuTriggerStyle()}>
                Marketplace
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/impact-map" className={navigationMenuTriggerStyle()}>
                Impact Map
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button className={cn(
            "hidden md:inline-flex bg-primary hover:bg-primary/90 transition-all duration-300",
            isScrolled ? "h-8 px-3 text-sm" : "h-9 px-4"
          )}>
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  </div>
  );
}