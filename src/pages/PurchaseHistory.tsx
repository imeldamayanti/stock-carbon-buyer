import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, MapPin, Calendar, Leaf, Award } from "lucide-react";

const mockPurchases = [
  {
    id: "CERT-2024-001",
    projectName: "Amazon Rainforest Conservation",
    location: "Acre, Brazil",
    coordinates: [-9.0238, -70.812],
    carbonCredits: 500,
    purchaseDate: "2024-01-15",
    price: 12500,
    certificateUrl: "/certificates/cert-001.pdf",
    projectDetails: {
      area: "2,500 hectares",
      biodiversity: "High",
      communities: 3,
      methodology: "VCS Standard"
    }
  },
  {
    id: "CERT-2024-002", 
    projectName: "Mangrove Restoration Initiative",
    location: "Sundarbans, Bangladesh",
    coordinates: [22.3569, 89.0785],
    carbonCredits: 750,
    purchaseDate: "2024-02-20",
    price: 18750,
    certificateUrl: "/certificates/cert-002.pdf",
    projectDetails: {
      area: "1,800 hectares",
      biodiversity: "Very High",
      communities: 5,
      methodology: "Gold Standard"
    }
  },
  {
    id: "CERT-2024-003",
    projectName: "Reforestation Project Kenya",
    location: "Nakuru County, Kenya", 
    coordinates: [-0.3031, 36.0800],
    carbonCredits: 1000,
    purchaseDate: "2024-03-10",
    price: 25000,
    certificateUrl: "/certificates/cert-003.pdf",
    projectDetails: {
      area: "3,200 hectares",
      biodiversity: "Medium",
      communities: 8,
      methodology: "VCS Standard"
    }
  }
];

export default function PurchaseHistory() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof mockPurchases[0] | null>(null);

  const totalCredits = mockPurchases.reduce((sum, purchase) => sum + purchase.carbonCredits, 0);
  const totalSpent = mockPurchases.reduce((sum, purchase) => sum + purchase.price, 0);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Purchase History</h1>
        <div className="flex gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-lg font-semibold">{totalCredits.toLocaleString()} tCO2</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Investment</p>
                <p className="text-lg font-semibold">${totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid gap-6">
        {mockPurchases.map((purchase) => (
          <Card key={purchase.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{purchase.projectName}</CardTitle>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{purchase.location}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Certificate #{purchase.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Carbon Credits</p>
                      <p className="text-lg font-semibold">{purchase.carbonCredits} tCO2</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Purchase Date</p>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Price</p>
                      <p className="text-lg font-semibold">${purchase.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price per Credit</p>
                      <p className="text-lg font-semibold">${(purchase.price / purchase.carbonCredits).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Project Area</p>
                      <p className="font-medium">{purchase.projectDetails.area}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Biodiversity</p>
                      <p className="font-medium">{purchase.projectDetails.biodiversity}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Communities</p>
                      <p className="font-medium">{purchase.projectDetails.communities} communities</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Methodology</p>
                      <p className="font-medium">{purchase.projectDetails.methodology}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedCertificate(purchase)}>
                          View Certificate
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Carbon Offset Certificate</DialogTitle>
                        </DialogHeader>
                        {selectedCertificate && (
                          <div className="space-y-4">
                            <div className="border rounded-lg p-6 bg-gradient-to-br from-green-50 to-blue-50">
                              <div className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                                  <Award className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold">Carbon Offset Certificate</h3>
                                  <p className="text-muted-foreground">Certificate ID: {selectedCertificate.id}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <p className="font-semibold">Project:</p>
                                    <p>{selectedCertificate.projectName}</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold">Location:</p>
                                    <p>{selectedCertificate.location}</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold">Carbon Credits:</p>
                                    <p>{selectedCertificate.carbonCredits} tCO2</p>
                                  </div>
                                  <div>
                                    <p className="font-semibold">Issue Date:</p>
                                    <p>{new Date(selectedCertificate.purchaseDate).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <Button>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF Certificate
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}