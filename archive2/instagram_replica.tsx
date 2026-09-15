import React, { useState } from 'react';
import { 
  Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, 
  Menu, MoreHorizontal, Bookmark, MessageCircle as CommentIcon, 
  Send, Smile
} from 'lucide-react';

// Mock Data for Stories
const mockStories = [
  { id: 1, username: 'your_story', avatar: 'https://i.pravatar.cc/150?u=1', isUser: true },
  { id: 2, username: 'nature_lover', avatar: 'https://i.pravatar.cc/150?u=2', hasUnseen: true },
  { id: 3, username: 'tech_guru', avatar: 'https://i.pravatar.cc/150?u=3', hasUnseen: true },
  { id: 4, username: 'foodie_delight', avatar: 'https://i.pravatar.cc/150?u=4', hasUnseen: false },
  { id: 5, username: 'travel_bug', avatar: 'https://i.pravatar.cc/150?u=5', hasUnseen: true },
  { id: 6, username: 'fitness_junkie', avatar: 'https://i.pravatar.cc/150?u=6', hasUnseen: true },
  { id: 7, username: 'art_daily', avatar: 'https://i.pravatar.cc/150?u=7', hasUnseen: false },
  { id: 8, username: 'music_vibes', avatar: 'https://i.pravatar.cc/150?u=8', hasUnseen: true },
];

// Mock Data for Posts
const mockPosts = [
  {
    id: 1,
    username: 'nature_lover',
    avatar: 'https://i.pravatar.cc/150?u=2',
    location: 'Yosemite National Park',
    imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&q=80&w=1000',
    likes: 1245,
    caption: 'Majestic views everywhere you look. #yosemite #nature #hiking',
    comments: [
      { id: 1, username: 'travel_bug', text: 'Stunning!' },
      { id: 2, username: 'hiker_joe', text: 'Was there last week!' }
    ],
    timeAgo: '2 HOURS AGO',
    isLiked: false,
    isSaved: false
  },
  {
    id: 2,
    username: 'tech_guru',
    avatar: 'https://i.pravatar.cc/150?u=3',
    location: 'Silicon Valley',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000',
    likes: 892,
    caption: 'My new setup is finally complete! 💻🚀 #workspace #developer #coding',
    comments: [
      { id: 1, username: 'dev_guy', text: 'Clean setup!' }
    ],
    timeAgo: '5 HOURS AGO',
    isLiked: true,
    isSaved: true
  },
  {
    id: 3,
    username: 'foodie_delight',
    avatar: 'https://i.pravatar.cc/150?u=4',
    location: 'Luigi\'s Pizzeria',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000',
    likes: 3421,
    caption: 'The best slice in town! 🍕 #pizza #foodporn #yummy',
    comments: [
      { id: 1, username: 'pizza_lover', text: 'Looks amazing!' },
      { id: 2, username: 'hungry_hippo', text: 'I need this right now.' },
      { id: 3, username: 'chef_boy', text: 'Classic margherita, perfect.' }
    ],
    timeAgo: '1 DAY AGO',
    isLiked: false,
    isSaved: false
  }
];

// Mock Data for Suggestions
const mockSuggestions = [
  { id: 1, username: 'photography_hub', avatar: 'https://i.pravatar.cc/150?u=10', reason: 'Followed by tech_guru + 2 more' },
  { id: 2, username: 'sneaker_head', avatar: 'https://i.pravatar.cc/150?u=11', reason: 'Suggested for you' },
  { id: 3, username: 'coffee_addict', avatar: 'https://i.pravatar.cc/150?u=12', reason: 'New to Instagram' },
  { id: 4, username: 'puppy_love', avatar: 'https://i.pravatar.cc/150?u=13', reason: 'Followed by nature_lover' },
  { id: 5, username: 'vintage_style', avatar: 'https://i.pravatar.cc/150?u=14', reason: 'Suggested for you' },
];

const Sidebar = ({ isMobile }) => {
  const navItems = [
    { icon: <Home size={24} className="md:mr-4" />, label: 'Home', active: true },
    { icon: <Search size={24} className="md:mr-4" />, label: 'Search' },
    { icon: <Compass size={24} className="md:mr-4" />, label: 'Explore', hiddenMobile: true },
    { icon: <Film size={24} className="md:mr-4" />, label: 'Reels' },
    { icon: <MessageCircle size={24} className="md:mr-4" />, label: 'Messages' },
    { icon: <Heart size={24} className="md:mr-4" />, label: 'Notifications', hiddenMobile: true },
    { icon: <PlusSquare size={24} className="md:mr-4" />, label: 'Create' },
    { 
      icon: <img src="https://i.pravatar.cc/150?u=1" alt="Profile" className="w-6 h-6 rounded-full md:mr-4 border border-[#bbf7d0]" />, 
      label: 'Profile' 
    },
  ];

  if (isMobile) {
    return (
      <div className="fixed bottom-0 w-full bg-white border-t border-[#bbf7d0] flex justify-around items-center h-12 z-50 px-2 sm:hidden text-black font-sans">
        {navItems.filter(item => !item.hiddenMobile).map((item, index) => (
          <button key={index} className="p-2 flex-1 flex justify-center hover:bg-[#f0fdf4] transition-colors">
            {item.icon}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden sm:flex flex-col w-[72px] xl:w-64 border-r border-[#bbf7d0] h-screen fixed left-0 top-0 bg-white z-50 py-4 xl:px-4 shrink-0 transition-all duration-300 text-black font-sans">
      <div className="mb-8 mt-4 flex items-center justify-center xl:justify-start xl:px-2 cursor-pointer h-14">
        {/* Brand Logo for XL screens */}
        <div className="hidden xl:flex flex-col select-none">
          <span className="font-extrabold text-xl tracking-tight text-black leading-none">
            goGULF.online
          </span>
          <span className="text-[10px] font-bold text-gray-800 mt-[2px]">
            by Rabbani's
          </span>
          <span className="text-[11px] italic text-gray-600 mt-1 font-semibold">
            naukri 9 minute me !
          </span>
        </div>
        {/* Brand Logo for smaller screens */}
        <div className="xl:hidden font-extrabold text-2xl text-black">
          gG
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-1 xl:space-y-2 w-full px-2 xl:px-0 mt-2">
        {navItems.map((item, index) => (
          <button 
            key={index} 
            className={`flex items-center justify-center xl:justify-start w-full p-3 rounded-lg hover:bg-[#f0fdf4] transition-colors group ${item.active ? 'font-bold text-black' : 'font-normal'}`}
          >
            <div className="relative group-hover:scale-105 transition-transform">
              {item.icon}
            </div>
            <span className="hidden xl:block text-base">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto px-2 xl:px-0 mb-4">
        <button className="flex items-center justify-center xl:justify-start w-full p-3 rounded-lg hover:bg-[#f0fdf4] transition-colors group">
          <div className="relative group-hover:scale-105 transition-transform">
            <Menu size={24} className="xl:mr-4" />
          </div>
          <span className="hidden xl:block text-base">More</span>
        </button>
      </div>
    </div>
  );
};

const Stories = () => {
  return (
    <div className="w-full bg-white sm:bg-transparent border-b sm:border-0 sm:border-b-[#bbf7d0] py-3 sm:py-4 px-0 sm:mb-6 sm:mt-6 max-w-full overflow-hidden">
      <div className="flex space-x-4 overflow-x-auto px-4 pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {mockStories.map((story) => (
          <div key={story.id} className="flex flex-col items-center flex-shrink-0 cursor-pointer max-w-[70px] sm:max-w-[80px]">
            <div className={`relative w-16 h-16 sm:w-16 sm:h-16 rounded-full p-[2px] ${story.hasUnseen ? 'bg-gradient-to-tr from-[#86efac] via-[#4ade80] to-[#22c55e]' : 'bg-[#bbf7d0]'}`}>
              <div className="bg-white p-[2px] rounded-full w-full h-full">
                <img 
                  src={story.avatar} 
                  alt={story.username} 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {story.isUser && (
                <div className="absolute bottom-0 right-0 bg-[#15803d] rounded-full border-2 border-white w-5 h-5 flex items-center justify-center">
                  <PlusSquare size={12} className="text-white" />
                </div>
              )}
            </div>
            <span className="text-xs mt-1 truncate w-full text-center text-black tracking-tight">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Post = ({ post, onLike, onSave }) => {
  return (
    <div className="bg-white border-b sm:border border-[#bbf7d0] sm:rounded-sm sm:mb-4 max-w-lg w-full mx-auto sm:max-w-xl pb-3 text-black font-sans">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#86efac] to-[#22c55e] p-[2px]">
            <img src={post.avatar} alt={post.username} className="w-full h-full rounded-full border-2 border-white object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold hover:text-gray-600 transition-colors">{post.username}</p>
            {post.location && <p className="text-xs text-gray-500">{post.location}</p>}
          </div>
        </div>
        <button className="text-gray-600 hover:text-black transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Image */}
      <div className="w-full bg-[#f0fdf4] flex items-center justify-center relative overflow-hidden" style={{ minHeight: '300px' }}>
         <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full h-auto object-cover max-h-[600px]"
            onDoubleClick={() => onLike(post.id)}
          />
      </div>

      {/* Post Actions */}
      <div className="px-3 pt-3 flex justify-between items-center">
        <div className="flex space-x-4">
          <button onClick={() => onLike(post.id)} className="hover:opacity-50 transition-opacity">
            <Heart size={24} fill={post.isLiked ? "#ed4956" : "none"} color={post.isLiked ? "#ed4956" : "currentColor"} className={post.isLiked ? "animate-pulse" : ""} />
          </button>
          <button className="hover:opacity-50 transition-opacity">
            <CommentIcon size={24} className="-scale-x-100" />
          </button>
          <button className="hover:opacity-50 transition-opacity">
            <Send size={24} />
          </button>
        </div>
        <button onClick={() => onSave(post.id)} className="hover:opacity-50 transition-opacity">
          <Bookmark size={24} fill={post.isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Likes */}
      <div className="px-3 mt-2">
        <p className="text-sm font-semibold cursor-pointer">{post.likes.toLocaleString()} likes</p>
      </div>

      {/* Caption */}
      <div className="px-3 mt-1">
        <p className="text-sm">
          <span className="font-semibold cursor-pointer hover:text-gray-600 mr-2">{post.username}</span>
          {post.caption}
        </p>
      </div>

      {/* Comments */}
      <div className="px-3 mt-1">
        {post.comments.length > 0 && (
          <p className="text-sm text-gray-500 cursor-pointer hover:text-black">
            View all {post.comments.length} comments
          </p>
        )}
        {post.comments.slice(0, 1).map((comment) => (
           <p key={comment.id} className="text-sm mt-1">
             <span className="font-semibold cursor-pointer hover:text-gray-600 mr-2">{comment.username}</span>
             {comment.text}
           </p>
        ))}
      </div>

      {/* Time */}
      <div className="px-3 mt-2">
        <p className="text-[10px] text-gray-500 uppercase tracking-wide">{post.timeAgo}</p>
      </div>

      {/* Add Comment (Desktop only) */}
      <div className="hidden sm:flex px-3 mt-3 pt-3 border-t border-[#bbf7d0] items-center">
        <button className="p-1 pr-3">
           <Smile size={20} className="text-gray-600 hover:text-black" />
        </button>
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="flex-1 text-sm bg-transparent outline-none placeholder-gray-500 text-black"
        />
        <button className="text-black font-semibold text-sm opacity-50 cursor-default hover:opacity-100 transition-opacity">
          Post
        </button>
      </div>
    </div>
  );
};

const Suggestions = () => {
  return (
    <div className="hidden lg:block w-[320px] pt-8 pl-8 pr-4 text-black font-sans">
      {/* Current User Profile Mini */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 cursor-pointer">
          <img src="https://i.pravatar.cc/150?u=1" alt="Your profile" className="w-11 h-11 rounded-full border border-[#bbf7d0]" />
          <div>
            <p className="text-sm font-semibold">your_username</p>
            <p className="text-sm text-gray-500">Your Name</p>
          </div>
        </div>
        <button className="text-xs font-semibold text-black hover:text-gray-600">Switch</button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-gray-500">Suggested for you</p>
        <button className="text-xs font-semibold hover:text-gray-600">See All</button>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {mockSuggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer">
              <img src={user.avatar} alt={user.username} className="w-8 h-8 rounded-full border border-[#bbf7d0]" />
              <div>
                 <p className="text-sm font-semibold hover:text-gray-600">{user.username}</p>
                 <p className="text-xs text-gray-500 truncate w-[160px]">{user.reason}</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-black hover:text-gray-600">Follow</button>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="mt-8">
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-400">
          <a href="#" className="hover:underline">About</a>
          <span>·</span>
          <a href="#" className="hover:underline">Help</a>
          <span>·</span>
          <a href="#" className="hover:underline">Press</a>
          <span>·</span>
          <a href="#" className="hover:underline">API</a>
          <span>·</span>
          <a href="#" className="hover:underline">Jobs</a>
          <span>·</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span>·</span>
          <a href="#" className="hover:underline">Terms</a>
          <span>·</span>
          <a href="#" className="hover:underline">Locations</a>
          <span>·</span>
          <a href="#" className="hover:underline">Language</a>
          <span>·</span>
          <a href="#" className="hover:underline">Meta Verified</a>
        </div>
        <p className="text-xs text-gray-400 mt-4 uppercase">
          © 2026 goGULF.online by Rabbani's
        </p>
      </div>
    </div>
  );
};

const TopNavMobile = () => {
  return (
    <div className="sm:hidden fixed top-0 w-full bg-white border-b border-[#bbf7d0] h-14 z-50 flex items-center justify-between px-4 text-black font-sans">
      {/* Brand Logo */}
      <div className="flex flex-col select-none pt-1">
        <span className="font-extrabold text-xl tracking-tight text-black leading-none">
          goGULF.online
        </span>
        <span className="text-[10px] italic text-gray-600 mt-1 font-semibold leading-none">
          naukri 9 minute me !
        </span>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Heart size={24} />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
        <MessageCircle size={24} />
      </div>
    </div>
  );
};

export default function App() {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleSave = (postId) => {
     setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, isSaved: !post.isSaved };
      }
      return post;
    }));
  };

  return (
    <div className="bg-[#f0fdf4] min-h-screen text-black font-sans antialiased flex selection:bg-black selection:text-white">
      {/* Mobile Top Navigation */}
      <TopNavMobile />

      {/* Sidebar Navigation (Hidden on Mobile) */}
      <Sidebar isMobile={false} />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-14 sm:pt-0 sm:ml-[72px] xl:ml-64 flex justify-center">
        <div className="flex w-full max-w-4xl justify-center xl:justify-start">
          
          {/* Feed Column */}
          <div className="w-full max-w-[470px] flex flex-col items-center">
            <Stories />
            <div className="w-full flex flex-col items-center space-y-4 pb-20 sm:pb-8">
              {posts.map(post => (
                <Post 
                  key={post.id} 
                  post={post} 
                  onLike={handleLike} 
                  onSave={handleSave} 
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar (Suggestions - Hidden on smaller screens) */}
          <Suggestions />
          
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <Sidebar isMobile={true} />
    </div>
  );
}