import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// Logo component for footer
const FooterLogo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-primary-foreground"
        fill="currentColor"
      >
        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="text-lg font-bold text-primary">STO</span>
      <span className="text-xs text-muted-foreground -mt-1">CARBON</span>
    </div>
  </Link>
);

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted border-t">
      <div className="container px-4 py-12 lg:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <FooterLogo />
            <p className="text-sm text-muted-foreground max-w-xs">
              Indonesia's first community-based carbon stock platform. Connecting landowners with companies through transparent carbon incentive mechanisms.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/landowners" className="text-muted-foreground hover:text-primary transition-colors">
                  For Landowners
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-muted-foreground hover:text-primary transition-colors">
                  For Companies
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-muted-foreground hover:text-primary transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/impact-map" className="text-muted-foreground hover:text-primary transition-colors">
                  Impact Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/knowledge-base" className="text-muted-foreground hover:text-primary transition-colors">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  Carbon Calculator
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground hover:text-primary transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>Jakarta, Indonesia</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <span>info@stocarbon.id</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Newsletter</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="flex-1 h-8 text-xs"
                />
                <Button size="sm" className="h-8 px-3 bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground">
            © 2024 Stocarbon. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}