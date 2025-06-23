import React from 'react';
import { Film, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <Film className="h-8 w-8 text-blue-400" />
              <h2 className="ml-2 text-2xl font-bold">
                strea<span className="text-blue-400">MN</span>
              </h2>
            </div>
            <p className="text-blue-300 mb-4">
              Your ultimate destination for movies in English, Tamil, Telugu, and Malayalam.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-300 hover:text-blue-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-300 hover:text-blue-400">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-300 hover:text-blue-400">Home</a></li>
              <li><a href="#" className="text-blue-300 hover:text-blue-400">Movies</a></li>
              <li><a href="#" className="text-blue-300 hover:text-blue-400">TV Shows</a></li>
              <li><a href="#" className="text-blue-300 hover:text-blue-400">New Releases</a></li>
              <li><a href="#" className="text-blue-300 hover:text-blue-400">My List</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-300 hover:text-blue-400">English</a></li>
              <li><a href="#" className="text-blue-300 hover:text-blue-400">Tamil</a></li>
              <li><a href="#" className="text-blue-300 hover:text-blue-400">Telugu</a></li>
              <li><a href="#" className="text-blue-300 hover:text-blue-400">Malayalam</a></li>
              <li><a href="#" className="text-blue-300 hover:text-blue-400">Top Rated</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-blue-300">support@streamn.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-blue-300">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-blue-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} streaMN. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-blue-300 hover:text-blue-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-blue-300 hover:text-blue-400 text-sm">Terms of Service</a>
            <a href="#" className="text-blue-300 hover:text-blue-400 text-sm">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;