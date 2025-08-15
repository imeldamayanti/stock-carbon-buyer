import { useState, useEffect } from "react";
import { authorizedFetch } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Download, MapPin, Leaf, Calendar, CreditCard, Building2, Smartphone, X, Lock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Certificate } from "crypto";

const Index = () => {
  const { toast } = useToast();
  const [carbonNeeds, setCarbonNeeds] = useState({
    annualEmissions: "",
    preferredRegion: "",
    additionalNotes: "",
    agreeTnC: false,
  });


  const handleInputChange = (field: string, value: string) => {
    setCarbonNeeds(prev => ({ ...prev, [field]: value }));
  };

  // handle transaksi
  const handleSubmitNeeds = async() => {
    try {
    const response = await authorizedFetch("/api/buyer/transactions", {
      method: "POST",
        body: JSON.stringify({
        carbon_needs: parseFloat(carbonNeeds.annualEmissions),
        prefered_forest: carbonNeeds.preferredRegion,
        notes: carbonNeeds.additionalNotes,
      }),
    });
    console.log({
    carbon_needs: parseFloat(carbonNeeds.annualEmissions),
    prefered_forest: carbonNeeds.preferredRegion,
    notes: carbonNeeds.additionalNotes,
  });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to submit carbon needs");
    }

    toast({
      title: "Success!",
      description: "Your carbon needs have been submitted. Check the payment page for the next steps.",
    });
    setTimeout(() => {
    window.location.reload();
    }, 2000);

    // Clear the form if needed
    setCarbonNeeds({
      annualEmissions: "",
      preferredRegion: "",
      additionalNotes: "",
      agreeTnC: false,
    });

  } catch (error: any) {
    toast({
      title: "Submission failed",
      description: error.message,
      variant: "destructive",
    });
  }
  };

  // handle payment
  type Transaction = {
    transaction_id: number;
    zone_name: string;
    zone_location: string;
    total_carbon: number;
    price_per_ton: number;
    total_price: number;
    tax: number;
    grand_total: number;
  };

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await authorizedFetch(`/api/buyer/transactions/list?isToday=yes&status=pending_payment`);
        const json = await res.json();

        
        if (json.status === "success") {
          
          setTransactions(json.data);
        } else {
          console.error("Fetch failed:", json.message);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions(); //ini line 162
  }, []);

  // handle proses payment
  const completePayment = async (transactionId: string) => {
  try {
    const res = await authorizedFetch(`/api/buyer/transactions/${transactionId}/proceed-payment`, {
      method: "get",
    });

    const json = await res.json();

    if (res.ok && json.status === "success") {
      toast({
        title: "Payment Completed",
        description: `Payment for transaction #${transactionId} is now marked as completed.`,
      });
      // opsional: refresh data

      

      setTimeout(() => {
      window.location.reload();
      // setActiveTab("history");
      }, 2000);

      setShowConfirm(false);
      setSelectedProjectId(null);
    } else {
      toast({
        title: "Payment Failed",
        description: json.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  } catch (error) {
    toast({
      title: "Network Error",
      description: "Failed to connect to the server.",
      variant: "destructive",
    });
    console.error("Payment error:", error);
  }
};


  const [showModal, setShowModal] = useState(false);
  // const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("e_wallet");
  const [showConfirm, setShowConfirm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
    bankAccount: "",
    routingNumber: "",
    walletId: ""
  });

  const openPaymentModal = (projectId: number) => {
    setSelectedProjectId(projectId);
    setShowModal(true);
  };

  const handlePurchase = async () => {
    if (!selectedProjectId) return;

    const project = transactions.find((p) => p.transaction_id == selectedProjectId);
    if (!project) return;

    toast({
      title: "Processing payment",
      description: `Paying for "${project.zone_name}" with ${paymentMethod.replace("_", " ")}...`,
    });

    await completePayment(`${selectedProjectId}`)

  };

  const selectedProject = selectedProjectId ? transactions.find(p => p.transaction_id === Number(selectedProjectId)) : null;


  // handle history pembelian
  type PurchaseHistoryItem = Transaction & {
  transaction_date: Date;
  formattedDate: string;
  formattedTime: string;
  certificate_url: string;
  };
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[]>([]);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
    try {
      const res = await authorizedFetch(
        `/api/buyer/transactions/list?isToday=yes&status=paid`
      );
      const json = await res.json();

      if (json.status === "success") {
        const history: PurchaseHistoryItem[] = json.data.map((item: any) => {
          // Proses certificate_url
          let certUrl = item.certificate_url || "";
          certUrl = certUrl.replace("/app/public/storage/", "");
          certUrl = certUrl.replace(/\.pdf\.pdf$/, ".pdf");

          return {
            ...item,
            certificate_url: certUrl,
            transaction_date: item.transaction_date,
            formattedDate: new Date(item.transaction_date).toLocaleDateString(
              "id-ID",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            ),
            formattedTime: new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

        setPurchaseHistory(history);
      } else {
        console.error("Fetch failed (paid):", json.message);
      }
    } catch (error) {
      console.error("Error fetching purchase history:", error);
    }
  };

  fetchPurchaseHistory();
  }, []);

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "credit_card":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardHolder" className="text-sm font-medium">Cardholder Name</Label>
              <Input
                id="cardHolder"
                placeholder="John Doe"
                value={paymentDetails.cardHolder}
                onChange={(e) => setPaymentDetails(prev => ({...prev, cardHolder: e.target.value}))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cardNumber" className="text-sm font-medium">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails(prev => ({...prev, cardNumber: e.target.value}))}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-sm font-medium">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails(prev => ({...prev, expiryDate: e.target.value}))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-sm font-medium">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails(prev => ({...prev, cvv: e.target.value}))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );
      case "bank_transfer":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="bankAccount" className="text-sm font-medium">Bank Account Number</Label>
              <Input
                id="bankAccount"
                placeholder="123456789"
                value={paymentDetails.bankAccount}
                onChange={(e) => setPaymentDetails(prev => ({...prev, bankAccount: e.target.value}))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="routingNumber" className="text-sm font-medium">Routing Number</Label>
              <Input
                id="routingNumber"
                placeholder="987654321"
                value={paymentDetails.routingNumber}
                onChange={(e) => setPaymentDetails(prev => ({...prev, routingNumber: e.target.value}))}
                className="mt-1"
              />
            </div>
          </div>
        );
      case "e_wallet":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="walletId" className="text-sm font-medium">E-Wallet ID</Label>
              <Input
                id="walletId"
                placeholder="wallet@example.com"
                value={paymentDetails.walletId}
                onChange={(e) => setPaymentDetails(prev => ({...prev, walletId: e.target.value}))}
                className="mt-1"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Carbon Offset Needs</h1>
          <p className="text-muted-foreground">Manage your company's carbon offset requirements and purchases</p>
        </div>

        <Tabs defaultValue="needs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="needs">Input Needs</TabsTrigger>
            <TabsTrigger value="projects">Payment</TabsTrigger>
            <TabsTrigger value="history">Current Transaction</TabsTrigger>
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
           
                  <div className="space-y-2">
                    <Label htmlFor="region">Preferred Forest</Label>
                    <Input
                      id="region"
                      placeholder="e.g., Peatlands"
                      value={carbonNeeds.preferredRegion}
                      onChange={(e) => handleInputChange("preferredRegion", e.target.value)}
                    />
                  </div>
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
                      required
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
              <h2 className="text-2xl font-semibold">Need Payment</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transactions.map((project) => (
                <Card key={project.transaction_id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{project.zone_name}</CardTitle>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {project.zone_location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* <p className="text-sm text-muted-foreground">{project.description}</p> */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Carbon Offset:</span>
                        <span className="text-sm text-primary font-semibold">{project.total_carbon}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Price per ton:</span>
                        <span className="text-sm text-primary">${project.price_per_ton}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Total Price:</span>
                        <span className="text-sm text-primary">${project.total_price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Tax (10%):</span>
                        <span className="text-sm text-primary">${(project.tax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Grand Total:</span>
                        <span className="text-sm font-bold text-primary">${(project.grand_total.toFixed(2))}</span>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button onClick={() => openPaymentModal(project.transaction_id)} className="w-full">
                        Proceed to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Current Transaction
                </CardTitle>
                <CardDescription>View all your carbon offset purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div key={purchase.transaction_id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{purchase.zone_name}</h4>
                          <Badge variant="default">
                            Paid
                          </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Purchase Date:</span>
                          <p className="font-medium">{purchase.formattedDate}</p>
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
                        <div>
                          <span className="text-muted-foreground">Certificate:</span>
                          <br />
                          
                         <a
                         
                          href={`${purchase.certificate_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }} // biar gak ada underline
                        >
                          <Badge variant="outline">
                            Link
                          </Badge>
                        </a>


                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="space-y-4">
                  
                  {purchaseHistory.map((purchase) => {
                    // console.log("purchaseHistory sebelum map:", purchaseHistory);

                    // console.log("certificate_url dari FE:", purchase.certificate_url);
                    // console.log("Apakah diawali http?", purchase.certificate_url.startsWith("http"));

                    return (
                      <div key={purchase.transaction_id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{purchase.zone_name}</h4>
                          <Badge variant="default">Paid</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Purchase Date:</span>
                            <p className="font-medium">{purchase.formattedDate}</p>
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
                        </div>
                        <div>
                          <span className="text-muted-foreground">Certificate:</span>
                          <br />
                          <a
                            href={purchase.certificate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: "none" }}
                          >
                            <Badge variant="outline">Link</Badge>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div> */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Professional Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background border rounded-xl w-full max-w-lg mx-4 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Lock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Secure Payment</h2>
                  <p className="text-sm text-muted-foreground">Complete your carbon offset purchase</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Project Summary */}
            {selectedProject && (
              <div className="p-6 bg-muted/30 border-b">
                <h3 className="font-medium mb-2">{selectedProject.zone_name}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Carbon Offset:</span>
                    <span className="font-medium">{selectedProject.total_carbon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="font-semibold text-primary">
                      ${Number(selectedProject.grand_total)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Selection */}
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-medium mb-4">Select Payment Method</h4>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors">
                    <input
                      type="radio"
                      value="credit_card"
                      checked={paymentMethod === "credit_card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "credit_card" ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                        {paymentMethod === "credit_card" && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Credit Card</p>
                        <p className="text-xs text-muted-foreground">Visa, Mastercard, American Express</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors">
                    <input
                      type="radio"
                      value="bank_transfer"
                      checked={paymentMethod === "bank_transfer"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "bank_transfer" ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                        {paymentMethod === "bank_transfer" && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-xs text-muted-foreground">Direct bank transfer</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors">
                    <input
                      type="radio"
                      value="e_wallet"
                      checked={paymentMethod === "e_wallet"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "e_wallet" ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                        {paymentMethod === "e_wallet" && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">E-Wallet</p>
                        <p className="text-xs text-muted-foreground">PayPal, Apple Pay, Google Pay</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-4">
                <h4 className="font-medium">Payment Details</h4>
                {renderPaymentForm()}
              </div>

              {/* Security Notice */}
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <Shield className="h-4 w-4 text-green-600" />
                <p className="text-xs text-muted-foreground">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                  setShowModal(false);
                  setShowConfirm(true);
                  
                }}
                className="flex-1"
                >
                  Complete Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background border rounded-xl w-full max-w-md mx-4 shadow-2xl p-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Confirm Payment</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  You are about to complete this purchase. This action cannot be undone.
                </p>
              </div>
              {selectedProject && (
                <div className="bg-muted/30 rounded-lg p-4 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Total Amount:</span>
                    <span className="font-bold text-primary">
                      ${selectedProject.grand_total}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Payment Method:</span>
                    <span className="capitalize">{paymentMethod.replace("_", " ")}</span>
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowConfirm(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handlePurchase();
                    setShowConfirm(false);
                  }}
                  className="flex-1"
                >
                  Yes, Complete Purchase
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
