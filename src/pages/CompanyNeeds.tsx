import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Download, MapPin, Leaf, Calendar, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CompanyNeeds = () => {
  const { toast } = useToast();
  const [carbonNeeds, setCarbonNeeds] = useState({
    annualEmissions: "",
    // targetReduction: "",
    // timeline: "",
    // budget: "",
    preferredRegion: "",
    // projectType: "",
    additionalNotes: "",
    agreeTnC: false,
  });

  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  // Mock data for land projects
  const landProjects = [
    {
      id: "1",
      name: "Amazon Rainforest Conservation",
      location: "Brazil",
      carbonOffset: "500 tons CO2/year",
      pricePerTon: "$25",
      totalPrice: "$12,500",
      certification: "VCS Standard",
      description: "Protecting 1,000 hectares of pristine Amazon rainforest",
      coordinates: [-60.0, -3.0]
    },
    {
      id: "2", 
      name: "Mangrove Restoration Project",
      location: "Indonesia",
      carbonOffset: "300 tons CO2/year",
      pricePerTon: "$30",
      totalPrice: "$9,000",
      certification: "Gold Standard",
      description: "Restoring coastal mangrove ecosystems",
      coordinates: [106.8, -6.2]
    },
    {
      id: "3",
      name: "Reforestation Initiative",
      location: "Kenya",
      carbonOffset: "750 tons CO2/year", 
      pricePerTon: "$20",
      totalPrice: "$15,000",
      certification: "VCS Standard",
      description: "Planting native trees across degraded landscapes",
      coordinates: [37.9, -0.02]
    }
  ];

  // Mock purchase history
  const purchaseHistory = [
    {
      id: "PH001",
      projectName: "Costa Rica Forest Protection",
      purchaseDate: "2024-01-15",
      carbonOffset: "200 tons CO2",
      amount: "$5,000",
      certificateId: "CERT-CR-001",
      status: "Active"
    },
    {
      id: "PH002", 
      projectName: "Madagascar Biodiversity Project",
      purchaseDate: "2023-12-10",
      carbonOffset: "150 tons CO2",
      amount: "$3,750",
      certificateId: "CERT-MG-002",
      status: "Completed"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setCarbonNeeds(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitNeeds = () => {
    toast({
      title: "Carbon needs submitted",
      description: "We'll analyze your requirements and show personalized recommendations."
    });
  };

  const toggleProjectSelection = (projectId: string) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handlePurchase = () => {
    if (selectedProjects.length === 0) {
      toast({
        title: "No projects selected",
        description: "Please select at least one project to purchase.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Processing payment",
      description: `Purchasing ${selectedProjects.length} carbon offset project(s)...`
    });

    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Purchase successful!",
        description: "Your carbon offset certificates will be available shortly."
      });
      setSelectedProjects([]);
    }, 2000);
  };

  const downloadCertificate = (certificateId: string) => {
    toast({
      title: "Downloading certificate",
      description: `Certificate ${certificateId} is being prepared for download.`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Carbon Offset Needs</h1>
          <p className="text-muted-foreground">Manage your company's carbon offset requirements and purchases</p>
        </div>

        <Tabs defaultValue="needs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="needs">Input Needs</TabsTrigger>
            <TabsTrigger value="projects">Payment</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="history">Purchase History</TabsTrigger>
          </TabsList>

          <TabsContent value="needs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Carbon Offset Requirements
                </CardTitle>
                <CardDescription>
                  Tell us about your company's carbon footprint and offset goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emissions">Carbon Needs (tons CO2)</Label>
                    <Input
                      id="emissions"
                      placeholder="e.g., 1000"
                      value={carbonNeeds.annualEmissions}
                      onChange={(e) => handleInputChange("annualEmissions", e.target.value)}
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="reduction">Target Reduction (%)</Label>
                    <Input
                      id="reduction"
                      placeholder="e.g., 50"
                      value={carbonNeeds.targetReduction}
                      onChange={(e) => handleInputChange("targetReduction", e.target.value)}
                    />
                  </div> */}
                  {/* <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline (years)</Label>
                    <Input
                      id="timeline"
                      placeholder="e.g., 5"
                      value={carbonNeeds.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                    />
                  </div> */}
                  {/* <div className="space-y-2">
                    <Label htmlFor="budget">Annual Budget (USD)</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., 50000"
                      value={carbonNeeds.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                    />
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="region">Preferred Forest</Label>
                    <Input
                      id="region"
                      placeholder="e.g., South America"
                      value={carbonNeeds.preferredRegion}
                      onChange={(e) => handleInputChange("preferredRegion", e.target.value)}
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="type">Project Type</Label>
                    <Input
                      id="type"
                      placeholder="e.g., Forest Conservation"
                      value={carbonNeeds.projectType}
                      onChange={(e) => handleInputChange("projectType", e.target.value)}
                    />
                  </div> */}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any specific requirements or preferences..."
                      value={carbonNeeds.additionalNotes}
                      onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                    />
                  </div>
         
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={carbonNeeds.agreeTnC}
                        onChange={(e) => handleInputChange("agreeTnC", e.target.checked.toString())}
                        className="h-4 w-4"
                      />
                      <label htmlFor="agree" className="text-sm text-muted-foreground">
                        By clicking this I agree to the Terms and Conditions
                      </label>
                    </div>
                  </div>

                <Button onClick={handleSubmitNeeds} className="w-full">
                  Submit Requirements
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Recommended Land Projects</h2>
              <div className="flex gap-2">
                <Button 
                  onClick={handlePurchase}
                  disabled={selectedProjects.length === 0}
                  className="flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Purchase Selected ({selectedProjects.length})
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {landProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedProjects.includes(project.id) 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : ''
                  }`}
                  onClick={() => toggleProjectSelection(project.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge variant="secondary">{project.certification}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Carbon Offset:</span>
                        <span className="text-sm text-primary font-semibold">{project.carbonOffset}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Price per ton:</span>
                        <span className="text-sm">{project.pricePerTon}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Price:</span>
                        <span className="text-sm font-bold text-primary">{project.totalPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Certificates</CardTitle>
                <CardDescription>Download your carbon offset certificates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{purchase.projectName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Certificate ID: {purchase.certificateId}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {purchase.carbonOffset} • {purchase.amount}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadCertificate(purchase.certificateId)}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Purchase History
                </CardTitle>
                <CardDescription>View all your carbon offset purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div key={purchase.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{purchase.projectName}</h4>
                        <Badge variant={purchase.status === "Active" ? "default" : "secondary"}>
                          {purchase.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Purchase Date:</span>
                          <p className="font-medium">{purchase.purchaseDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Carbon Offset:</span>
                          <p className="font-medium">{purchase.carbonOffset}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <p className="font-medium">{purchase.amount}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Certificate:</span>
                          <p className="font-medium">{purchase.certificateId}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyNeeds;