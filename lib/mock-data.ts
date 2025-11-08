export const mockItems = [
  {
    id: "1",
    title: "Vintage Film Camera",
    category: "electronics",
    condition: "good",
    description:
      "Beautiful vintage 35mm film camera in excellent working condition. Comes with original leather case and strap.",
    exchangeType: "trade",
    lookingFor: "Books, plants, or vintage items",
    location: "Near UT Austin campus",
    images: ["/vintage-film-camera.jpg"],
  },
  {
    id: "2",
    title: "Modern Office Chair",
    category: "furniture",
    condition: "like-new",
    description: "Ergonomic office chair with adjustable height and lumbar support.",
    exchangeType: "trade",
    lookingFor: "Desk or bookshelf",
    location: "Downtown area",
    images: ["/modern-office-chair.png"],
  },
  {
    id: "3",
    title: "Programming Books Stack",
    category: "books",
    condition: "good",
    description: "Collection of programming books including JavaScript, React, and Node.js.",
    exchangeType: "trade",
    lookingFor: "Electronics or plants",
    location: "University district",
    images: ["/programming-books-stack.jpg"],
  },
]

export const mockTransactions = [
  {
    id: "1",
    status: "canceled",
    type: "trade",
    created_at: "2 hours ago",
    updated_at: "2 hours ago",
    requestedItem: {
      id: "1",
      title: "Vintage Film Camera",
      image: "/vintage-film-camera.jpg",
      owner: {
        name: "Sarah Johnson",
        avatar: "/diverse-user-avatars.png",
      },
    },
    offeredItem: {
      id: "2",
      title: "Collection of Programming Books",
      image: "/programming-books-stack.jpg",
    },
    offered_price: "50.00",
    requester: {
      name: "Mike Chen",
      avatar: "/diverse-user-avatars.png",
    },
    message: "Hi! I'd love to trade my programming books for your camera. They're in excellent condition!",
    timeline: [
      { status: "Request Sent", date: "2 hours ago", completed: true },
      { status: "Awaiting Response", date: "Pending", completed: false },
      { status: "Arrange Meetup", date: "Pending", completed: false },
      { status: "Complete Trade", date: "Pending", completed: false },
    ],
  },
  {
    id: "2",
    status: "accepted",
    type: "purchase",
    created_at: "1 day ago",
    updated_at: "12 hours ago",
    requestedItem: {
      id: "2",
      title: "Modern Office Chair",
      image: "/modern-office-chair.png",
      owner: {
        name: "John Doe",
        avatar: "/diverse-user-avatars.png",
      },
    },
    offeredItem: null,
    offered_price: "75.00",
    requester: {
      name: "Emma Wilson",
      avatar: "/diverse-user-avatars.png",
    },
    message: "This looks perfect for my home office setup!",
    timeline: [
      { status: "Request Sent", date: "1 day ago", completed: true },
      { status: "Awaiting Response", date: "12 hours ago", completed: true },
      { status: "Arrange Meetup", date: "Pending", completed: false },
      { status: "Complete Trade", date: "Pending", completed: false },
    ],
  },
  {
    id: "3",
    status: "pending",
    type: "trade",
    created_at: "30 minutes ago",
    updated_at: "30 minutes ago",
    requestedItem: {
      id: "3",
      title: "Programming Books Stack",
      image: "/programming-books-stack.jpg",
      owner: {
        name: "Alex Kumar",
        avatar: "/diverse-user-avatars.png",
      },
    },
    offeredItem: {
      id: "1",
      title: "Indoor Plants Collection",
      image: "/indoor-plants-collection.jpg",
    },
    offered_price: null,
    requester: {
      name: "Lisa Park",
      avatar: "/diverse-user-avatars.png",
    },
    message: "I have a great collection of plants that would brighten up your space!",
    timeline: [
      { status: "Request Sent", date: "30 minutes ago", completed: true },
      { status: "Awaiting Response", date: "Pending", completed: false },
      { status: "Arrange Meetup", date: "Pending", completed: false },
      { status: "Complete Trade", date: "Pending", completed: false },
    ],
  },
]
