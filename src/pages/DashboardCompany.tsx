import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Map from '@/components/Map';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';


import { 
  TreePine, 
  Award, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  DollarSign,
  Download,
  Eye,
  Target,
  Leaf,
  Globe,
  ChartBar
} from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DashboardCompany = () => {
const { theme } = useTheme();
const isDark = theme === 'dark';
const strokeColor = isDark ? '#22D3EE' : '#10B981'; // cyan-400 vs green-500
const gridColor = isDark ? '#334155' : '#E5E7EB';   // slate-700 vs gray-200
const axisColor = isDark ? '#94A3B8' : '#a3bdb9ff'; 

const MotionCard = motion(Card);

const [carbonData] = useState({
    totalOffset: 1250,
    monthlyGoal: 500,
    currentMonth: 380,
    activeProjects: 8,
    certificates: 12,
    totalInvestment: 45000,
    projectedImpact: 2500
  });

  const data = [
    { month: 'Jan 2024', offset: 300 },
    { month: 'Feb 2024', offset: 250 },
    { month: 'Mar 2024', offset: 320 },
    { month: 'Apr 2024', offset: 380 }
  ];

  const [purchasedProjects] = useState([
    {
      id: '1',
      name: 'Amazon Rainforest Conservation',
      coordinates: [-60.0261, -3.4653] as [number, number],
      carbonUptake: 450,
      area: 120,
      status: 'Active',
      certificate: 'AMZ-2024-001',
      purchaseDate: '2024-01-15',
      price: 12000,
      projectType: 'Forest Conservation',
      verification: 'Gold Standard'
    },
    {
      id: '2',
      name: 'Indonesian Mangrove Restoration',
      coordinates: [106.8456, -6.2088] as [number, number],
      carbonUptake: 320,
      area: 85,
      status: 'Active',
      certificate: 'MNG-2024-002',
      purchaseDate: '2024-02-10',
      price: 8500,
      projectType: 'Mangrove Restoration',
      verification: 'VCS'
    },
    {
      id: '3',
      name: 'Kenya Reforestation Initiative',
      coordinates: [37.9062, -0.0236] as [number, number],
      carbonUptake: 280,
      area: 75,
      status: 'Pending',
      certificate: 'KEN-2024-003',
      purchaseDate: '2024-03-05',
      price: 7200,
      projectType: 'Reforestation',
      verification: 'CDM'
    },
    {
      id: '4',
      name: 'Canadian Forest Protection',
      coordinates: [-106.3468, 52.9399] as [number, number],
      carbonUptake: 200,
      area: 60,
      status: 'Completed',
      certificate: 'CAN-2024-004',
      purchaseDate: '2024-01-28',
      price: 6500,
      projectType: 'Forest Protection',
      verification: 'Gold Standard'
    }
  ]);

  const [recentActivities] = useState([
    { id: 1, action: 'Certificate Downloaded', project: 'Amazon Rainforest Conservation', date: '2024-07-28' },
    { id: 2, action: 'Payment Completed', project: 'Indonesian Mangrove Restoration', date: '2024-07-25' },
    { id: 3, action: 'Project Verified', project: 'Kenya Reforestation Initiative', date: '2024-07-22' },
    { id: 4, action: 'Impact Report Generated', project: 'Canadian Forest Protection', date: '2024-07-20' }
  ]);

  const progressPercentage = (carbonData.currentMonth / carbonData.monthlyGoal) * 100;


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Company Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Monitor your carbon offset portfolio and environmental impact
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Total Carbon Offset</CardTitle>
              <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">{carbonData.totalOffset.toLocaleString()}</div>
              <p className="text-xs text-green-600 dark:text-green-400">tons CO₂ equivalent</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Carbon Uptake</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">{carbonData.currentMonth}</div>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">of {carbonData.monthlyGoal} tons goal</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50 border-purple-200 dark:border-purple-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Active Projects</CardTitle>
              <TreePine className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-200">{carbonData.activeProjects}</div>
              <p className="text-xs text-purple-600 dark:text-purple-400">across 4 countries</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 border-amber-200 dark:border-amber-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">${carbonData.totalInvestment.toLocaleString()}</div>
              <p className="text-xs text-amber-600 dark:text-amber-400">For Environmental Impact</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{carbonData.certificates}</div>
              <p className="text-xs text-muted-foreground">verified certificates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projected Impact</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{carbonData.projectedImpact.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">tons CO₂ by year-end</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
              <ChartBar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">projects verified</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Project Map</TabsTrigger>
            {/* <TabsTrigger value="projects">My Projects</TabsTrigger> */}
            {/* <TabsTrigger value="activity">Activity</TabsTrigger> */}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Offset Timeline</CardTitle>
                  <CardDescription>Your carbon offset journey over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: axisColor }} />
                        <YAxis unit="t" tick={{ fontSize: 12, fill: axisColor }} />
                        <Tooltip
                          contentStyle={{
                            fontSize: 12,
                            backgroundColor: isDark ? '#1e293b' : '#ffffff',
                            borderColor: isDark ? '#334155' : '#e5e7eb',
                            color: isDark ? '#f1f5f9' : '#0f172a'
                          }}
                        />
                      <Line
                        type="monotone"
                        dataKey="offset"
                        stroke="#10B981" // green-500
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Summary</CardTitle>
                  <CardDescription>Environmental benefits achieved</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <TreePine className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Trees Protected</span>
                      </div>
                      <span className="font-bold text-green-700 dark:text-green-300">125,000</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Land Protected</span>
                      </div>
                      <span className="font-bold text-blue-700 dark:text-blue-300">340 hectares</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-purple-600" />
                        <span className="font-medium">Communities Supported</span>
                      </div>
                      <span className="font-bold text-purple-700 dark:text-purple-300">12</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Global Project Portfolio
                </CardTitle>
                <CardDescription>
                  Interactive map showing your purchased carbon offset projects worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px] w-full rounded-lg overflow-hidden">
                  <Map projects={purchasedProjects} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-6">
              {purchasedProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span>Certificate: {project.certificate}</span>
                          <Badge variant={project.status === 'Active' ? 'default' : project.status === 'Completed' ? 'secondary' : 'outline'}>
                            {project.status}
                          </Badge>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{project.carbonUptake}</div>
                        <div className="text-sm text-muted-foreground">tons CO₂</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Project Type</div>
                        <div className="text-sm">{project.projectType}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Area</div>
                        <div className="text-sm">{project.area} hectares</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Verification</div>
                        <div className="text-sm">{project.verification}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Investment</div>
                        <div className="text-sm">${project.price.toLocaleString()}</div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Purchased on {new Date(project.purchaseDate).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Certificate
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent> */}

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest carbon offset activities and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <div>
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-muted-foreground">{activity.project}</div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()}
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

export default DashboardCompany;