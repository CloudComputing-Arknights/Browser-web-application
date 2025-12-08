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
import { useState, useEffect } from "react"

// Import existing client logic wrappers
import UserClient from "@/lib/clients/UserClient"
import ItemUserClient from "@/lib/clients/ItemUserClient"

// Import generated types from the backend contract
// AddressDTO matches the Pydantic model defined in the backend
import { SignedInUserRes, ItemRead, AddressDTO } from "@/client" 

export default function ProfilePage() {
  const router = useRouter()
  
  // --- Data State Management ---
  const [user, setUser] = useState<SignedInUserRes | null>(null)
  const [items, setItems] = useState<ItemRead[]>([])
  
  // Loading and Error states
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState("") 

  // --- UI State for Forms ---
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  })

  // --- Mock Data for History ---
  // Using static data for the History tab since the backend transaction endpoint is currently unstable.
  const fakeTrades = [
    { id: "t1", title: "Office Chair", partner: "Mike Chen", date: "2025-11-20", type: "Trade", status: "COMPLETED" },
    { id: "t2", title: "Desk Lamp", partner: "Emma Wilson", date: "2025-11-15", type: "Lend", status: "PENDING" },
  ]

  // --- Data Fetching Effect ---
  // Retrieves user profile and items using the generated clients.
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token")
      
      // Redirect to login if no token is found
      if (!token) {
        setLoading(false)
        return
      }

      try {
        // Initialize the working clients
        const userClient = new UserClient()
        const itemUserClient = new ItemUserClient()
        
        // Execute requests sequentially or independently to ensure one failure doesn't crash the page.
        // We deliberately skip TransactionClient to avoid the known 500 error.

        // 1. Fetch User Profile
        try {
            const userData = await userClient.authMe()
            setUser(userData)
        } catch(e) {
            console.error("Failed to fetch user profile", e)
        }

        // 2. Fetch User Items
        try {
            const itemsData = await itemUserClient.listMyItems()
            // Ensure the result is an array before setting state
            setItems(Array.isArray(itemsData) ? itemsData : [])
        } catch(e) {
            console.error("Failed to fetch items", e)
        }

      } catch (err: any) {
        console.error("General Profile Fetch Error:", err)
        if (err.status === 401) {
           // Handle potential token expiration logic here
        }
        setErrorMsg("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // --- Event Handlers ---

  const handleLogout = () => {
    logoutUser()
    router.push("/")
  }

  // Prepares the form for adding a new address
  const handleAddAddress = () => {
    setEditingAddressId(null)
    setFormData({ street: "", city: "", state: "", zip: "", country: "" })
    setShowAddForm(true)
  }

  // Prepares the form for editing an existing address
  // Maps DTO fields to form state, handling optional backend fields (id, state, postal_code)
  const handleEditAddress = (address: AddressDTO) => {
    setEditingAddressId(address.id || null)
    setFormData({
      street: address.street, 
      city: address.city,     
      country: address.country, 
      // Provide default empty strings for optional fields to satisfy React inputs
      state: address.state || "",
      zip: address.postal_code || "",
    })
    setShowAddForm(true)
  }

  // --- Address Mutations (Using standard fetch) ---
  // We use fetch here because UserClient.ts does not yet support address operations.

  // ACTION: Create Address (POST)
  const handleSaveAddress = async () => {
    const token = localStorage.getItem("access_token")
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

    try {
      const res = await fetch(`${API_BASE}/me/addresses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postal_code: formData.zip,
          country: formData.country
        })
      })

      if (res.ok) {
        window.location.reload()
      } else {
        console.error("Failed to add address")
        alert("Failed to add address.")
      }
    } catch (e) {
      console.error(e)
      alert("Network error")
    }
    
    setShowAddForm(false)
  }

  // ACTION: Update Address (PUT)
  const handleUpdateAddress = async () => { 
    if (!editingAddressId) return

    const token = localStorage.getItem("access_token")
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

    try {
      const res = await fetch(`${API_BASE}/addresses/${editingAddressId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postal_code: formData.zip, 
          country: formData.country
        })
      })

      if (res.ok) {
        window.location.reload()
      } else {
        console.error("Failed to update address")
        alert("Failed to update address.")
      }
    } catch (e) {
      console.error(e)
      alert("Network error")
    }

    setShowAddForm(false) 
  }

  // Resets form state and closes the modal
  const handleCancelForm = () => {
    setShowAddForm(false)
    setEditingAddressId(null)
    setFormData({ street: "", city: "", state: "", zip: "", country: "" })
  }

  // ACTION: Delete Address (DELETE)
  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm("Are you sure?")) return

    const token = localStorage.getItem("access_token")
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

    try {
      const res = await fetch(`${API_BASE}/addresses/${addressId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (res.ok) {
        window.location.reload()
      } else {
        console.error("Failed to delete address")
        alert("Failed to delete address.")
      }
    } catch (e) {
      console.error(e)
      alert("Network error")
    }
  }

  // --- UI Rendering ---

  if (errorMsg) {
    return (
        <div className="p-10 flex flex-col items-center justify-center min-h-screen">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative max-w-lg mb-4">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{errorMsg}</span>
            </div>
            <Button onClick={() => router.push("/login")}>Go back to Login</Button>
        </div>
    )
  }

  if (loading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <Image
                      src={user?.avatar_url || "/placeholder.svg"}
                      alt={user?.username || "User"}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-primary/20 object-cover h-[120px] w-[120px]"
                    />
                    <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2">
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                </div>
                <h1 className="text-2xl font-bold">{user?.username || "User"}</h1>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4" />
                  {/* Display first address if available, otherwise show default text */}
                  {user?.addresses && user.addresses.length > 0 
                    ? `${user.addresses[0].city}, ${user.addresses[0].country}` 
                    : "No Location Set"}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    {/* Cast to 'any' to access potential future fields 'rating' not yet in DTO */}
                    <span className="font-semibold">{(user as any)?.rating || "N/A"}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm text-muted-foreground">Total Trades</span>
                  {/* Cast to 'any' to access potential future fields 'totalTrades' not yet in DTO */}
                  <span className="font-semibold">{(user as any)?.totalTrades || 0}</span>
                </div>
                <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Recently"}</span>
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

          {/* Main Content Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="listings"><Package className="h-4 w-4 mr-2" />Listings</TabsTrigger>
                <TabsTrigger value="history"><Clock className="h-4 w-4 mr-2" />History</TabsTrigger>
                <TabsTrigger value="addresses"><MapPin className="h-4 w-4 mr-2" />Addresses</TabsTrigger>
              </TabsList>

              {/* Listings Tab */}
              <TabsContent value="listings" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Active Listings</h2>
                    <Button size="sm" asChild><Link href="/add-item">Add New Item</Link></Button>
                  </div>
                  {items.length === 0 ? (
                      <div className="text-center py-10 text-muted-foreground border rounded-md">
                          No items listed yet.
                      </div>
                  ) : (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Using 'any' for item mapping to handle potential naming discrepancies in DTO */}
                        {items.map((item: any) => (
                          <Card key={item.item_UUID || item.id} className="overflow-hidden">
                            <div className="aspect-video relative bg-gray-100">
                              {item.image_url ? (
                                  <Image src={item.image_url} alt={item.title} fill className="object-cover"/>
                              ) : (
                                  <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                              )}
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <Badge variant="secondary">{item.type || "Item"}</Badge>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                                        <Link href={`/item/${item.item_UUID || item.id}/edit`}>Edit</Link>
                                    </Button>
                                    <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                                        <Link href={`/item/${item.item_UUID || item.id}`}>View</Link>
                                    </Button>
                                </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                  )}
                </div>
              </TabsContent>

              {/* History Tab (Using Fake Data) */}
              <TabsContent value="history" className="mt-6">
                <div className="space-y-4">
                   <h2 className="text-xl font-semibold">Trade History</h2>
                   <div className="space-y-3">
                       {fakeTrades.length === 0 ? (
                           <div className="text-center py-10 text-muted-foreground border rounded-md">
                               No transaction history found.
                           </div>
                       ) : (
                           fakeTrades.map((trade: any) => (
                               <Card key={trade.id}>
                                   <CardContent className="p-4">
                                       <div className="flex items-center justify-between">
                                           <div>
                                               <h3 className="font-semibold">{trade.title}</h3>
                                               <p className="text-sm text-muted-foreground">{trade.type} with {trade.partner}</p>
                                           </div>
                                           <div className="text-right">
                                               <Badge variant="outline">{trade.status}</Badge>
                                               <p className="text-xs text-muted-foreground mt-1">
                                                   {trade.date}
                                               </p>
                                           </div>
                                       </div>
                                   </CardContent>
                               </Card>
                           ))
                       )}
                   </div>
                </div>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="mt-6">
                 <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Manage Addresses</h2>
                    {!showAddForm && (
                        <Button size="sm" onClick={handleAddAddress}>
                            <Plus className="h-4 w-4 mr-2"/> Add Address
                        </Button>
                    )}
                 </div>

                 {/* Address Form */}
                 {showAddForm && (
                    <Card className="mb-4 border-primary/50 bg-primary/5">
                        <CardHeader>
                            <h3 className="text-lg font-semibold">{editingAddressId ? "Edit Address" : "Add New Address"}</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Street Address</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-md text-sm" 
                                        value={formData.street} onChange={(e) => setFormData({...formData, street: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">City</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-md text-sm" 
                                        value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                                </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">State</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-md text-sm" 
                                        value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-md text-sm" 
                                        value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Country</label>
                                    <input type="text" className="w-full px-3 py-2 border rounded-md text-sm" 
                                        value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button onClick={editingAddressId ? handleUpdateAddress : handleSaveAddress} className="flex-1">
                                    {editingAddressId ? "Save Changes" : "Save Address"}
                                </Button>
                                <Button variant="outline" onClick={handleCancelForm} className="flex-1 bg-transparent">Cancel</Button>
                            </div>
                        </CardContent>
                    </Card>
                 )}

                 {/* Address List */}
                 <div className="space-y-3">
                     {user?.addresses && user.addresses.length > 0 ? (
                         // Explicitly using 'any' in the map to prevent TS conflicts with strict DTO types,
                         // assuming the structure matches AddressDTO effectively.
                         user.addresses.map((address: any) => (
                             <Card key={address.id}>
                                 <CardContent className="p-4">
                                     <div className="flex items-start justify-between gap-4">
                                         <div className="flex-1">
                                             <div className="flex items-center gap-2">
                                                 <h3 className="font-semibold">{address.street || "My Address"}</h3>
                                                 <Badge variant="secondary" className="text-xs">Saved</Badge>
                                             </div>
                                             <p className="text-sm text-muted-foreground mt-1">{address.city}, {address.state} {address.postal_code}</p>
                                             <p className="text-sm text-muted-foreground">{address.country}</p>
                                         </div>
                                         <div className="flex gap-2">
                                             <Button size="sm" variant="ghost" onClick={() => handleEditAddress(address)} className="text-primary hover:bg-primary/10">
                                                 <Edit2 className="h-4 w-4" />
                                             </Button>
                                             <Button size="sm" variant="ghost" onClick={() => handleDeleteAddress(address.id)} className="text-destructive hover:bg-destructive/10">
                                                 <Trash2 className="h-4 w-4" />
                                             </Button>
                                         </div>
                                     </div>
                                 </CardContent>
                             </Card>
                         ))
                     ) : (
                         <div className="text-sm text-muted-foreground">No addresses saved yet.</div>
                     )}
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}