import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Package, AlertTriangle, TrendingUp, Search, MoreVertical, Ban, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default function AdminDashboardPage() {
  // Mock statistics
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Active Listings",
      value: "456",
      change: "+8%",
      icon: Package,
      trend: "up",
    },
    {
      title: "Completed Trades",
      value: "789",
      change: "+15%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Reported Items",
      value: "12",
      change: "-3%",
      icon: AlertTriangle,
      trend: "down",
    },
  ]

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/diverse-user-avatars.png",
      joinDate: "Jan 2024",
      trades: 24,
      status: "active",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.c@example.com",
      avatar: "/diverse-user-avatars.png",
      joinDate: "Feb 2024",
      trades: 18,
      status: "active",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@example.com",
      avatar: "/diverse-user-avatars.png",
      joinDate: "Mar 2024",
      trades: 12,
      status: "suspended",
    },
  ]

  // Mock reported content
  const reportedItems = [
    {
      id: 1,
      title: "Suspicious Electronics Listing",
      reporter: "John Doe",
      reason: "Potential scam",
      date: "2 hours ago",
      status: "pending",
      itemImage: "/vintage-film-camera.jpg",
    },
    {
      id: 2,
      title: "Inappropriate Item Description",
      reporter: "Jane Smith",
      reason: "Offensive content",
      date: "5 hours ago",
      status: "pending",
      itemImage: "/programming-books-stack.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage users, content, and platform activity</p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className={`text-xs mt-1 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="content">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Reported Content
              <Badge variant="destructive" className="ml-2">
                {reportedItems.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="listings">
              <Package className="h-4 w-4 mr-2" />
              All Listings
            </TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search users..." className="pl-9" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{user.name}</h3>
                            <Badge variant={user.status === "active" ? "default" : "destructive"}>{user.status}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span>Joined {user.joinDate}</span>
                            <span>•</span>
                            <span>{user.trades} trades</span>
                          </div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Ban className="h-4 w-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reported Content */}
          <TabsContent value="content" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Reported Content</CardTitle>
                <CardDescription>Review and moderate flagged items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportedItems.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="relative h-20 w-20 rounded-lg overflow-hidden border flex-shrink-0">
                          <Image
                            src={item.itemImage || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                Reported by {item.reporter} • {item.date}
                              </p>
                            </div>
                            <Badge variant="destructive">{item.status}</Badge>
                          </div>
                          <div className="p-3 bg-destructive/10 rounded-lg mb-3">
                            <p className="text-sm">
                              <span className="font-medium">Reason:</span> {item.reason}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Eye className="h-4 w-4 mr-2" />
                              Review Item
                            </Button>
                            <Button size="sm" variant="destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Item
                            </Button>
                            <Button size="sm" variant="ghost">
                              Dismiss Report
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Listings */}
          <TabsContent value="listings" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>All Listings</CardTitle>
                    <CardDescription>View and manage all platform listings</CardDescription>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search listings..." className="pl-9" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Listings Management</h3>
                  <p className="text-sm text-muted-foreground">View and moderate all item listings on the platform</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
