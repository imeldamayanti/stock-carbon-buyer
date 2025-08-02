import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Trees, Leaf, Building2 } from "lucide-react";

const StatsCard = ({ icon: Icon, value, label, iconColor }: {
  icon: any;
  value: string;
  label: string;
  iconColor: string;
}) => (
  <Card className="group hover:shadow-green transition-all duration-300 hover:scale-105 animate-fade-in">
    <CardContent className="p-6 text-center">
      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${iconColor} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </CardContent>
  </Card>
);

const ProcessStep = ({ number, icon: Icon, title, description, iconBg }: {
  number: number;
  icon: any;
  title: string;
  description: string;
  iconBg: string;
}) => (
  <div className="text-center group animate-fade-in" style={{ animationDelay: `${number * 200}ms` }}>
    <div className="relative mb-6">
      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold absolute -top-2 -right-2 z-10">
        {number}
      </div>
      <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center ${iconBg} group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-10 h-10 text-white" />
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
      {description}
    </p>
  </div>
);

export function HeroSection() {
  const stats = [
    { icon: Users, value: "4", label: "Land Contributors", iconColor: "bg-blue-500" },
    { icon: MapPin, value: "50 ha", label: "Protected Area", iconColor: "bg-green-500" },
    { icon: Trees, value: "256", label: "Total Trees Recorded", iconColor: "bg-emerald-400" },
    { icon: Leaf, value: "1,587 tC", label: "Estimated Carbon Stock", iconColor: "bg-teal-500" },
    { icon: Building2, value: "2", label: "Industry Partners", iconColor: "bg-purple-500" },
  ];

  const processSteps = [
    {
      icon: MapPin,
      title: "Register Land",
      description: "Farmers and landowners register their areas with natural vegetation to the platform.",
      iconBg: "bg-blue-500"
    },
    {
      icon: Trees,
      title: "Verification & Measurement",
      description: "Expert teams conduct surveys and measure carbon stock potential.",
      iconBg: "bg-green-500"
    },
    {
      icon: Building2,
      title: "Industry Matching",
      description: "Platform connects verified land with companies needing carbon offset.",
      iconBg: "bg-purple-500"
    },
    {
      icon: Leaf,
      title: "Sustainable Payments",
      description: "Landowners receive regular incentives while maintaining area conservation.",
      iconBg: "bg-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Stats Section */}
      <section className="pt-4 pb-16">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
                <StatsCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 hidden">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-eco bg-clip-text text-transparent">
              How Does It Work?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Community-based platform connecting landowners with companies through
              <br className="hidden md:block" />
              transparent carbon credit mechanisms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                number={index + 1}
                {...step}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hidden">
        <div className="container px-4 mx-auto text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-eco text-white border-none shadow-elevated">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Make an Impact?
              </h3>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Join Indonesia's first community-based carbon stock platform and contribute to a sustainable future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-primary">
                  For Landowners
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  For Companies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}