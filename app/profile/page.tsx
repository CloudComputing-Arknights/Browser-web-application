"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Star, Package, Clock, LogOut, Plus, Trash2, Edit2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { logoutUser } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    label: "",
  })

  const user = {
    name: "Sarah Johnson",
    location: "Austin, TX",
    joinedDate: "January 2024",
    rating: 4.8,
    totalTrades: 24,
    avatar: "/diverse-user-avatars.png",
    bio: "College student passionate about sustainability and community building. Love trading books, plants, and tech gadgets!",
  }

  const activeListings = [
    {
      id: 1,
      title: "Vintage Film Camera",
      image: "/vintage-film-camera.jpg",
      type: "Trade",
      status: "Active",
    },
    {
      id: 2,
      title: "Programming Books",
      image: "/programming-books-stack.jpg",
      type: "Give Away",
      status: "Active",
    },
  ]

  const completedTrades = [
    {
      id: 1,
      title: "Office Chair",
      partner: "Mike Chen",
      date: "2 days ago",
      type: "Trade",
    },
    {
      id: 2,
      title: "Desk Lamp",
      partner: "Emma Wilson",
      date: "1 week ago",
      type: "Lend",
    },
  ]

  const savedAddresses = [
    {
      id: "addr_1",
      label: "Home",
      street: "123 Main St",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "USA",
    },
    {
      id: "addr_2",
      label: "Office",
      street: "456 Tech Ave",
      city: "Austin",
      state: "TX",
      zip: "78702",
      country: "USA",
    },
    {
      id: "addr_3",
      label: "Campus",
      street: "789 University Blvd",
      city: "Austin",
      state: "TX",
      zip: "78703",
      country: "USA",
    },
  ]

  const handleLogout = () => {
    logoutUser()
    router.push("/")
  }

  const handleAddAddress = () => {
    setEditingAddressId(null)
    setFormData({ street: "", city: "", state: "", zip: "", country: "", label: "" })
    setShowAddForm(true)
  }

  const handleEditAddress = (address: (typeof savedAddresses)[0]) => {
    setEditingAddressId(address.id)
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      label: address.label,
    })
    setShowAddForm(true)
  }

  const handleSaveAddress = () => {
    console.log("SIMULATE: Submitting New Address Data")
    setShowAddForm(false)
  }

  const handleUpdateAddress = () => {
    console.log(`SIMULATE: Updating Address ID: ${editingAddressId} with new data`)
    setShowAddForm(false)
  }

  const handleCancelForm = () => {
    setShowAddForm(false)
    setEditingAddressId(null)
    setFormData({ street: "", city: "", state: "", zip: "", country: "", label: "" })
  }

  const handleDeleteAddress = (addressId: string) => {
    console.log(`SIMULATE: Delete Address ID: ${addressId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Image
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-primary/20"
                    />
                    <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-semibold">{user.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Total Trades</span>
                  <span className="font-semibold">{user.totalTrades}</span>
                </div>
                <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {user.joinedDate}</span>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/profile/edit">Edit Profile</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Profile Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="listings">
                  <Package className="h-4 w-4 mr-2" />
                  Listings
                </TabsTrigger>
                <TabsTrigger value="history">
                  <Clock className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
                <TabsTrigger value="addresses">
                  <MapPin className="h-4 w-4 mr-2" />
                  Addresses
                </TabsTrigger>
              </TabsList>

              <TabsContent value="listings" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Active Listings</h2>
                    <Button size="sm" asChild>
                      <Link href="/add-item">Add New Item</Link>
                    </Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {activeListings.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            <Badge variant="secondary">{item.type}</Badge>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                              <Link href={`/item/${item.id}/edit`}>Edit</Link>
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                              <Link href={`/item/${item.id}`}>View</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Trade History</h2>
                  <div className="space-y-3">
                    {completedTrades.map((trade) => (
                      <Card key={trade.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{trade.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {trade.type} with {trade.partner}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline">{trade.type}</Badge>
                              <p className="text-xs text-muted-foreground mt-1">{trade.date}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="addresses" className="mt-6">
                <div className="space-y-4">
                  {showAddForm && (
                    <Card className="border-primary/50 bg-primary/5">
                      <CardHeader>
                        <h3 className="text-lg font-semibold">
                          {editingAddressId ? "Edit Address" : "Add New Address"}
                        </h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium mb-1">Label (e.g., Home, Office)</label>
                            <input
                              type="text"
                              placeholder="Label"
                              value={formData.label}
                              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                              className="w-full px-3 py-2 border rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Country</label>
                            <input
                              type="text"
                              placeholder="Country"
                              value={formData.country}
                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                              className="w-full px-3 py-2 border rounded-md text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Street Address (Line 1)</label>
                          <input
                            type="text"
                            placeholder="Street Address"
                            value={formData.street}
                            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md text-sm"
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                          <div>
                            <label className="block text-sm font-medium mb-1">City</label>
                            <input
                              type="text"
                              placeholder="City"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                              className="w-full px-3 py-2 border rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">State/Province</label>
                            <input
                              type="text"
                              placeholder="State/Province"
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              className="w-full px-3 py-2 border rounded-md text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Postal Code</label>
                            <input
                              type="text"
                              placeholder="Postal Code"
                              value={formData.zip}
                              onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                              className="w-full px-3 py-2 border rounded-md text-sm"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button
                            onClick={editingAddressId ? handleUpdateAddress : handleSaveAddress}
                            className="flex-1"
                          >
                            {editingAddressId ? "Save Changes" : "Save Address"}
                          </Button>
                          <Button variant="outline" onClick={handleCancelForm} className="flex-1 bg-transparent">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Manage Addresses</h2>
                    {!showAddForm && (
                      <Button size="sm" onClick={handleAddAddress}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Address
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {savedAddresses.map((address) => (
                      <Card key={address.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{address.label}</h3>
                                <Badge variant="secondary" className="text-xs">
                                  Saved
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{address.street}</p>
                              <p className="text-sm text-muted-foreground">
                                {address.city}, {address.state} {address.zip}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditAddress(address)}
                                className="text-primary hover:text-primary hover:bg-primary/10"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteAddress(address.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
