import { useState } from "react"
import { BarChart3, Target, Building2, MapPin, FileText, Settings, User, HelpCircle, History, Globe, Sun, Moon } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { LogOut } from "lucide-react"
import { logout } from "@/lib/auth";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"

const companyItems = [
  { title: "Dashboard", url: "/dashboard-company", icon: BarChart3 },
  { title: "Carbon Needs", url: "/company-needs", icon: Target },
]

const buyerItems = [
  { title: "Purchase History", url: "/purchase-history", icon: History },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Help", url: "/help", icon: HelpCircle },
]

// const additionalItems = [
  // { title: "Register Company", url: "/register-company", icon: Building2 },
  // { title: "Admin", url: "/admin", icon: Settings },
// ]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const { theme, setTheme } = useTheme()
  const [language, setLanguage] = useState("EN")

  const isActive = (path: string) => currentPath === path
  const isCompanyExpanded = companyItems.some((i) => isActive(i.url))
  const isBuyerExpanded = buyerItems.some((i) => isActive(i.url))
  // const isOtherExpanded = additionalItems.some((i) => isActive(i.url))
  const isCollapsed = state === "collapsed"
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "text-sidebar-foreground hover:bg-muted/50 hover:text-sidebar-foreground"

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "ID" : "EN")
  }

  return (
    <Sidebar
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-3 py-2">
          <SidebarTrigger className="-ml-1" />
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <img
                src={theme === "dark" ? "/logo-white.png" : "/logo.png"}
                alt="Logo"
                className="w-12 h-12 object-contain rounded-md"
              />
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Company Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider font-semibold">
            Company Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {companyItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="inherit">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Buyer Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider font-semibold">
            Buyer Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {buyerItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="inherit">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs uppercase tracking-wider font-semibold">
              Settings
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 py-2 space-y-3">
                {/* Language Switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Language</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleLanguage}
                    className="h-6 px-2 text-xs"
                  >
                    {language}
                  </Button>
                </div>
                
                {/* Theme Switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {theme === "dark" ? (
                      <Moon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Sun className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-xs text-muted-foreground">Theme</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                    className="h-6 px-2 text-xs"
                  >
                    {theme === "dark" ? "Dark" : "Light"}
                  </Button>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      
        <div className="mt-auto p-3 border-t border-sidebar-border">
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={() => {
              localStorage.clear()
              window.location.href = "/login-company" // arahkan ulang ke halaman login
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
    </SidebarContent>
    </Sidebar>
  )
}
