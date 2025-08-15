import { useState, useEffect } from "react";
import { authorizedFetch } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, MapPin, Calendar, Leaf, Award } from "lucide-react";

export default function PurchaseHistory() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof paidTransactions[0] | null>(null);
  type PaidTransaction = {
    transaction_id: string;
    zone_name: string;
    zone_location: string;
    total_carbon: number;
    price_per_ton: number;
    total_price: number;
    tax: number;
    grand_total: number;
    transaction_date: string;
    certificate_url: string;
    // kalau nanti ada purchase date atau detail project, tinggal tambahkan
  };

const [paidTransactions, setPaidTransactions] = useState<PaidTransaction[]>([]);
const [loading, setLoading] = useState(true);
// const [selectedCertificate, setSelectedCertificate] = useState<PaidTransaction | null>(null);

useEffect(() => {
  const fetchPaidTransactions = async () => {
    try {
      const res = await authorizedFetch("/api/buyer/transactions/list?status=paid");
      const json = await res.json();
      
    // console.log("RESPONS MENTAH DARI API:", json);'
    
      if (json.status === "success") {
         const cleanedData = json.data.map(item => {
          let url = item.certificate_url.replace("/app/public/storage/", "");

          // Hilangkan ".pdf.pdf" jadi cukup ".pdf"
          url = url.replace(/\.pdf\.pdf$/, ".pdf");

          return {
            ...item,
            certificate_url: url
          };
        });

        
        setPaidTransactions(cleanedData);
      } else {
        console.error("Failed to fetch:", json.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchPaidTransactions();
}, []);


  const totalCredits = paidTransactions.reduce((sum, purchase) => sum + purchase.total_carbon, 0);
  const totalSpent = paidTransactions.reduce((sum, purchase) => sum + purchase.grand_total, 0);

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
        {paidTransactions.map((purchase) => (
          
          <Card key={purchase.transaction_id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{purchase.zone_name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{purchase.zone_location}</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Certificate #{purchase.certificate_url}
                </Badge>
                </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                                        
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 text-sm">
                        <div>
                          <span className="text-muted-foreground">Purchase Date:</span>
                          <br />
                            <span>
                            {new Date(purchase.transaction_date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>

                        </div>

                      <div>
                          <span className="text-muted-foreground">Purchase Time:</span>
                          <br />
                            <span>
                              {new Date(purchase.transaction_date).toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                        </div>

                        <div>
                          <span className="text-muted-foreground">Carbon Offset:</span>
                          <p className="font-medium">${purchase.total_carbon}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <p className="font-medium">${purchase.grand_total.toFixed(2)}</p>
                        </div>
                        <div className="space-y-4">
                                 <div className="flex gap-2">
                    <Dialog>
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
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
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
                    <a
                        href={`${purchase.certificate_url}`}
                        target="_blank"
                      >
                        <Button>
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF Certificate
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              
              {/* ppppppp ganti */}
              {/* <div className="grid md:grid-cols-5 gap-6 text-sm items-center">
                <div className="flex items-center gap-2">  
                  <span className="text-muted-foreground">Purchase Date:</span>
                  <br />
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(purchase.transaction_date).toLocaleDateString()}</span>
                </div>

                <div>
                  <span className="text-muted-foreground block">Carbon Offset:</span>
                  <p className="font-medium">${purchase.total_carbon}</p>
                </div>

                <div>
                  <span className="text-muted-foreground block">Amount:</span>
                  <p className="font-medium">${purchase.grand_total.toFixed(2)}</p>
                </div>

                <div className="col-span-2 flex gap-3 justify-end">
                  <a
                    href={`http://localhost:8000/storage/${purchase.certificate_url}`}
                    download
                  >
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </a>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Award className="h-4 w-4 mr-2" />
                        View Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Carbon Offset Certificate</DialogTitle>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div> */}

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}