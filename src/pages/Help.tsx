import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageCircle, Phone, Mail, FileText, HelpCircle, Zap, Shield } from "lucide-react";

const faqData = [
  {
    id: "carbon-credits",
    question: "What are carbon credits and how do they work?",
    answer: "Carbon credits represent one metric ton of carbon dioxide that has been removed from or prevented from entering the atmosphere. When you purchase carbon credits, you're funding projects that reduce greenhouse gas emissions, such as reforestation, renewable energy, or methane capture projects."
  },
  {
    id: "purchase-process",
    question: "How do I purchase carbon offsets?",
    answer: "You can purchase carbon offsets through our platform by browsing available projects, selecting the amount of credits you need, and completing the payment process. Once purchased, you'll receive a certificate documenting your offset contribution."
  },
  {
    id: "project-verification",
    question: "How are offset projects verified?",
    answer: "All projects on our platform are verified by internationally recognized standards such as VCS (Verified Carbon Standard), Gold Standard, or Climate Action Reserve. These standards ensure projects meet strict criteria for additionality, permanence, and measurability."
  },
  {
    id: "certificate-validity",
    question: "How long are certificates valid?",
    answer: "Carbon offset certificates are permanent once issued. The carbon reduction or removal they represent has already occurred and been verified. Certificates serve as proof of your environmental contribution and can be used for reporting purposes indefinitely."
  },
  {
    id: "pricing",
    question: "How is carbon credit pricing determined?",
    answer: "Carbon credit prices vary based on project type, location, verification standard, and market demand. Factors include project development costs, monitoring requirements, and the additional benefits (biodiversity, community impact) that projects provide."
  },
  {
    id: "corporate-reporting",
    question: "Can I use these credits for corporate sustainability reporting?",
    answer: "Yes, our verified carbon credits can be used for various sustainability reporting frameworks including CDP, GRI, TCFD, and Science-Based Targets initiatives. We provide detailed documentation to support your reporting requirements."
  }
];

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat",
    available: "Available 24/7"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message",
    action: "Send Email",
    available: "Response within 24 hours"
  },
  {
    icon: Phone,
    title: "Phone Support", 
    description: "Speak with a specialist",
    action: "Call Now",
    available: "Mon-Fri, 9AM-6PM EST"
  }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium"
  });

  const filteredFAQs = faqData.filter(
    faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormChange = (field: string, value: string) => {
    setSupportForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions or get in touch with our support team for personalized assistance.
        </p>
      </div>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="status">System Status</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <CardTitle>Search FAQs</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <method.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{method.title}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{method.available}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={supportForm.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={supportForm.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input
                  value={supportForm.subject}
                  onChange={(e) => handleFormChange("subject", e.target.value)}
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  value={supportForm.message}
                  onChange={(e) => handleFormChange("message", e.target.value)}
                  placeholder="Please provide detailed information about your question or issue..."
                  rows={5}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Priority:</label>
                  <select
                    value={supportForm.priority}
                    onChange={(e) => handleFormChange("priority", e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <Button>Submit Request</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Getting Started Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn how to create your account, browse projects, and make your first carbon offset purchase.
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Read Guide →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <HelpCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Understanding Carbon Credits</h3>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive guide to carbon credits, verification standards, and project types.
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Read Guide →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Corporate Reporting</h3>
                    <p className="text-sm text-muted-foreground">
                      How to use carbon offsets for sustainability reporting and compliance requirements.
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Read Guide →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Security & Privacy</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn about our security measures and how we protect your data and transactions.
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      Read Guide →
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium">Platform Services</h4>
                    <p className="text-sm text-muted-foreground">All systems operational</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-500">Operational</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium">Payment Processing</h4>
                    <p className="text-sm text-muted-foreground">All payment methods available</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-500">Operational</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium">Certificate Generation</h4>
                    <p className="text-sm text-muted-foreground">Automated certificate delivery</p>
                  </div>
                </div>
                <Badge variant="default" className="bg-green-500">Operational</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Minor delays in delivery</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-yellow-500 text-yellow-700">Delayed</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium">Platform Maintenance</p>
                  <p className="text-sm text-muted-foreground">
                    Scheduled maintenance completed. All services restored.
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-medium">New Project Added</p>
                  <p className="text-sm text-muted-foreground">
                    Added new mangrove restoration project in Thailand.
                  </p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}