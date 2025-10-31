// src/pages/ProfilePage.jsx
import { Mail, Phone, MapPin, Calendar, Instagram, Github, Linkedin, User } from 'lucide-react';

export default function ProfilePage() {
  // Sample user data - in a real app, this would come from state/API
  const userData = {
    name: "Nabil Bintang",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrjZjAJAKvSVt8X_gojpEhTtdO_EXae04W_w&s",
    email: "nabilbintang17@email.com",
    phone: "+62 815-9840-8501",
    location: "Semarang, Indonesia",
    joinDate: "Januari 2024",
    bio: "Pecinta kuliner Nusantara dan penggemar masakan tradisional. Senang berbagi resep dan tips memasak dengan komunitas.",
    stats: {
      recipes: 12,
      favorites: 48,
      followers: 234
    },
    social: {
      instagram: "@nabilbintangg",
      github: "nabilbintangg",
      linkedin: "Nabil Bintang Ardiansyah Purwanto"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 md:mb-8">
          Profil Pengguna
        </h1>

        {/* Profile Card */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-purple-500/10 overflow-hidden mb-6">
          {/* Cover Background */}
          <div className="h-32 md:h-48 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
          </div>

          {/* Profile Info */}
          <div className="px-4 md:px-8 pb-6 md:pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 md:-mt-20 mb-4">
              <div className="relative inline-block">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 md:border-6 border-white shadow-xl overflow-hidden bg-white">
                  <img 
                    src={userData.photo}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full border-2 md:border-4 border-white" />
              </div>
            </div>

            {/* Name and Bio */}
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                {userData.name}
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
                {userData.bio}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 md:mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-3 md:p-4 text-center border border-blue-200/50">
                <p className="text-xl md:text-3xl font-bold text-blue-600">{userData.stats.recipes}</p>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Resep</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl p-3 md:p-4 text-center border border-pink-200/50">
                <p className="text-xl md:text-3xl font-bold text-pink-600">{userData.stats.favorites}</p>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Favorit</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-3 md:p-4 text-center border border-purple-200/50">
                <p className="text-xl md:text-3xl font-bold text-purple-600">{userData.stats.followers}</p>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Pengikut</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-3 md:mb-4">
                Informasi Kontak
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {/* Email */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Email</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{userData.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Telepon</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{userData.phone}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Lokasi</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{userData.location}</p>
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Bergabung</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{userData.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-purple-500/10 p-4 md:p-8">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 md:mb-6 flex items-center space-x-2">
            <User className="w-5 h-5 md:w-6 md:h-6" />
            <span>Media Sosial</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {/* Instagram */}
            <a 
              href={`https://instagram.com/${userData.social.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-3 md:p-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-medium text-sm md:text-base">{userData.social.instagram}</span>
            </a>

            {/* GitHub */}
            <a 
              href={`https://github.com/${userData.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl p-3 md:p-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Github className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-medium text-sm md:text-base">{userData.social.github}</span>
            </a>

            {/* LinkedIn */}
            <a 
              href={`https://linkedin.com/in/${userData.social.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-3 md:p-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-medium text-sm md:text-base">{userData.social.linkedin}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}