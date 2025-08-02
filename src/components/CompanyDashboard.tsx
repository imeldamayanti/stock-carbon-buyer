import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, TreePine, TrendingUp, Award, Calendar, Target } from "lucide-react";
import Map from "./Map";
import { Link } from "react-router-dom";

export const CompanyDashboard = () => {
  // Mock data for demonstration
  const carbonData = {
    totalOffset: 2847,
    monthlyTarget: 500,
    currentMonth: 387,
    totalProjects: 8,
    activeProjects: 5,
    completedProjects: 3
  };

  const purchasedProjects = [
    {
      id: "1",
      name: "Amazon Rainforest Conservation",
      coordinates: [-60.0, -3.0] as [number, number],
      carbonUptake: 1200,
      area: 450,
      status: "Active",
      purchaseDate: "2024-01-15",
      certificate: "AMZ-2024-001"
    },
    {
      id: "2", 
      name: "Indonesian Mangrove Restoration",
      coordinates: [106.8, -6.2] as [number, number],
      carbonUptake: 850,
      area: 320,
      status: "Active",
      purchaseDate: "2024-02-20",
      certificate: "IDN-2024-002"
    },
    {
      id: "3",
      name: "Canadian Boreal Forest Protection",
      coordinates: [-106.0, 52.0] as [number, number],
      carbonUptake: 797,
      area: 600,
      status: "Completed",
      purchaseDate: "2023-11-10",
      certificate: "CAN-2023-003"
    }
  ];

  const recentTransactions = [
    { id: 1, project: "Amazon Rainforest Conservation", amount: 1200, date: "2024-01-15", status: "Completed" },
    { id: 2, project: "Indonesian Mangrove Restoration", amount: 850, date: "2024-02-20", status: "Completed" },
    { id: 3, project: "Canadian Boreal Forest Protection", amount: 797, date: "2023-11-10", status: "Completed" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Carbon Offset Dashboard</h1>
          <p className="text-muted-foreground">Track your environmental impact and carbon offset investments</p>
        </div>
        <div className="flex gap-2">
          <Link to="/register-company">
            <Button variant="outline">Register</Button>
          </Link>
          <Button>Input New Needs</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon Offset</CardTitle>
            <TreePine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carbonData.totalOffset.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">tons CO₂ equivalent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carbonData.currentMonth}</div>
            <p className="text-xs text-muted-foreground">of {carbonData.monthlyTarget} tons target</p>
            <Progress value={(carbonData.currentMonth / carbonData.monthlyTarget) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carbonData.activeProjects}</div>
            <p className="text-xs text-muted-foreground">out of {carbonData.totalProjects} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carbonData.completedProjects}</div>
            <p className="text-xs text-muted-foreground">verified certificates</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="map" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">Project Map</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Project Locations</CardTitle>
              <CardDescription>
                View your purchased carbon offset projects across the globe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full">
                <Map projects={purchasedProjects} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-6">
            {purchasedProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription>Certificate: {project.certificate}</CardDescription>
                    </div>
                    <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Carbon Uptake</p>
                      <p className="font-semibold">{project.carbonUptake} tons CO₂</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Area</p>
                      <p className="font-semibold">{project.area} hectares</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Purchase Date</p>
                      <p className="font-semibold">{new Date(project.purchaseDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Button size="sm" variant="outline">Download Certificate</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Your carbon offset purchase history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <TreePine className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.project}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{transaction.amount} tons CO₂</p>
                      <Badge variant="outline" className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};