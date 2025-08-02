import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit, Plus, Upload, Download } from "lucide-react";

// Mock data
const mockProjects = [
  { id: 1, title: "Amazon Reforestation Project", location: "Brazil", size: "1,250 hectares", carbonOffset: "2,500 tons/year", image: "forest.jpg", status: "Active" },
  { id: 2, title: "Solar Farm Initiative", location: "California, USA", size: "500 hectares", carbonOffset: "5,000 tons/year", image: "solar.jpg", status: "Active" },
  { id: 3, title: "Wetland Restoration", location: "Florida, USA", size: "800 hectares", carbonOffset: "1,800 tons/year", image: "wetland.jpg", status: "Pending" },
];

const mockCompanies = [
  { id: 1, name: "TechCorp Inc.", email: "contact@techcorp.com", industry: "Technology", registeredDate: "2024-01-15", status: "Active" },
  { id: 2, name: "Green Manufacturing", email: "info@greenmfg.com", industry: "Manufacturing", registeredDate: "2024-02-20", status: "Active" },
  { id: 3, name: "EcoLogistics", email: "hello@ecologistics.com", industry: "Logistics", registeredDate: "2024-03-10", status: "Pending" },
];

const mockTransactions = [
  { id: 1, company: "TechCorp Inc.", project: "Amazon Reforestation Project", amount: "$5,000", carbonOffset: "250 tons", date: "2024-07-10", status: "Completed" },
  { id: 2, company: "Green Manufacturing", project: "Solar Farm Initiative", amount: "$12,000", carbonOffset: "600 tons", date: "2024-07-08", status: "Completed" },
  { id: 3, company: "EcoLogistics", project: "Wetland Restoration", amount: "$3,500", carbonOffset: "175 tons", date: "2024-07-05", status: "Processing" },
];

export function AdminDashboard() {
  const [projects, setProjects] = useState(mockProjects);
  const [companies, setCompanies] = useState(mockCompanies);
  const [transactions] = useState(mockTransactions);

  const [newProject, setNewProject] = useState({
    title: "", location: "", size: "", carbonOffset: "", status: "Active"
  });

  const [newCompany, setNewCompany] = useState({
    name: "", email: "", industry: "", status: "Active"
  });

  const handleAddProject = () => {
    if (newProject.title && newProject.location) {
      setProjects([...projects, {
        id: Date.now(),
        ...newProject,
        image: "placeholder.jpg"
      }]);
      setNewProject({ title: "", location: "", size: "", carbonOffset: "", status: "Active" });
    }
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleAddCompany = () => {
    if (newCompany.name && newCompany.email) {
      setCompanies([...companies, {
        id: Date.now(),
        ...newCompany,
        registeredDate: new Date().toISOString().split('T')[0]
      }]);
      setNewCompany({ name: "", email: "", industry: "", status: "Active" });
    }
  };

  const handleDeleteCompany = (id: number) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage carbon offset projects and company registrations</p>
        </div>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Project
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    placeholder="Enter project title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newProject.location}
                    onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                    placeholder="Enter location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    value={newProject.size}
                    onChange={(e) => setNewProject({...newProject, size: e.target.value})}
                    placeholder="e.g., 1,000 hectares"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbon">Carbon Offset</Label>
                  <Input
                    id="carbon"
                    value={newProject.carbonOffset}
                    onChange={(e) => setNewProject({...newProject, carbonOffset: e.target.value})}
                    placeholder="e.g., 2,500 tons/year"
                  />
                </div>
              </div>
              <Button onClick={handleAddProject} className="w-full">
                Add Project
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>{project.location}</CardDescription>
                    </div>
                    <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-1">
                    <p><span className="font-medium">Size:</span> {project.size}</p>
                    <p><span className="font-medium">Carbon Offset:</span> {project.carbonOffset}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Company
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={newCompany.name}
                    onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newCompany.email}
                    onChange={(e) => setNewCompany({...newCompany, email: e.target.value})}
                    placeholder="Enter email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={newCompany.industry}
                    onChange={(e) => setNewCompany({...newCompany, industry: e.target.value})}
                    placeholder="Enter industry"
                  />
                </div>
              </div>
              <Button onClick={handleAddCompany} className="w-full">
                Add Company
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registered Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companies.map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{company.name}</h4>
                      <p className="text-sm text-muted-foreground">{company.email}</p>
                      <p className="text-sm text-muted-foreground">{company.industry} • Registered: {company.registeredDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={company.status === "Active" ? "default" : "secondary"}>
                        {company.status}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteCompany(company.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Track company purchases and carbon offset transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">{transaction.company}</h4>
                      <p className="text-sm text-muted-foreground">{transaction.project}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.carbonOffset} • {transaction.date}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-semibold text-lg">{transaction.amount}</p>
                      <Badge variant={transaction.status === "Completed" ? "default" : "secondary"}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Management</CardTitle>
              <CardDescription>Upload and manage carbon offset certificates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Certificates</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop certificate files or click to browse
                </p>
                <Button>Choose Files</Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Recent Certificates</h4>
                {transactions.filter(t => t.status === "Completed").map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h5 className="font-medium">Certificate - {transaction.company}</h5>
                      <p className="text-sm text-muted-foreground">
                        {transaction.project} • {transaction.carbonOffset}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}