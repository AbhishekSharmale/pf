# DevOps Roadmap Portfolio v2.0

A **roadmap.sh-inspired** portfolio showcasing my DevOps journey with interactive roadmaps, Tech Nerd Mode, and modern UI/UX.

## 🚀 Features

### 🗺️ **Interactive Roadmap**
- **Collapsible sections** with learning paths
- **Progress tracking** (completed, in-progress, planned)
- **Skill tags** and project connections
- **Visual connectors** between sections

### 🎨 **Modern UI/UX**
- **roadmap.sh-style** clean design
- **Dark/Light mode** toggle
- **Responsive** mobile-first design
- **Smooth animations** and transitions

### 🤓 **Tech Nerd Mode**
- **Grid overlay** with tech aesthetics
- **Component labels** showing architecture
- **API connection visualization**
- **Real-time metrics** dashboard

### 📱 **Responsive Design**
- **Mobile-optimized** navigation
- **Tablet-friendly** layouts
- **Desktop-enhanced** experience

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Markdown** - Content rendering

## 📁 Project Structure

```
roadmap-version/
├── components/
│   ├── Navbar.tsx           # Navigation with dark mode
│   ├── RoadmapSection.tsx   # Collapsible roadmap sections
│   ├── TechDashboard.tsx    # Tech Nerd Mode overlay
│   └── ProjectCard.tsx      # Project showcase cards
├── pages/
│   ├── index.tsx            # Homepage with roadmap
│   ├── projects.tsx         # Detailed projects page
│   └── admin.tsx            # Content management
├── data/
│   └── roadmap.json         # Roadmap content structure
├── styles/
│   └── globals.css          # Global styles + Tech Nerd Mode
└── api/
    ├── contact.ts           # Contact form handler
    ├── analytics.ts         # Analytics tracking
    └── metrics.ts           # Performance metrics
```

## 🎯 Key Components

### **RoadmapSection**
- Expandable/collapsible sections
- Progress indicators
- Skill tags and project links
- Visual connecting lines

### **Tech Nerd Mode**
- Grid overlay effect
- Component architecture labels
- API call visualization
- Performance dashboard

### **Responsive Navbar**
- Dark/light mode toggle
- Tech Nerd Mode activation
- Mobile hamburger menu
- Smooth scroll navigation

## 📊 Content Management

### **JSON-based Content**
```json
{
  "devopsRoadmap": {
    "sections": [
      {
        "id": "foundations",
        "title": "Foundations",
        "color": "bg-blue-500",
        "items": [...]
      }
    ]
  }
}
```

### **Admin Panel**
- Add/edit roadmap items
- Manage projects and skills
- Real-time content updates
- Simple authentication

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Customization

### **Colors & Themes**
- Edit `tailwind.config.js` for color schemes
- Modify `globals.css` for Tech Nerd Mode styling
- Update `roadmap.json` for content structure

### **Roadmap Content**
- Add new sections in `data/roadmap.json`
- Include skills, projects, and progress
- Link projects to roadmap items

## 🔧 Tech Nerd Mode

Activate with the ⚡ button to see:
- **Grid overlay** showing technical structure
- **Component labels** revealing architecture
- **API connections** with real-time data
- **Performance metrics** dashboard

## 📱 Mobile Experience

- **Touch-friendly** navigation
- **Collapsible sections** for easy browsing
- **Optimized typography** for readability
- **Fast loading** with Next.js optimization

## 🎭 Why This Design?

- **Professional**: Clean, roadmap.sh-inspired layout
- **Interactive**: Engaging user experience
- **Technical**: Shows both skills and architecture
- **Memorable**: Unique Tech Nerd Mode feature
- **Scalable**: Easy to add new content and sections

Perfect for **DevOps engineers**, **developers**, and **technical professionals** who want to showcase their journey in an interactive, visually appealing way!

## 🌟 Live Demo

Visit the live version to experience the interactive roadmap and Tech Nerd Mode in action!