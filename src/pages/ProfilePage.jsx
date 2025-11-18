// src/pages/ProfilePage.jsx
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Mail, Phone, MapPin, Calendar, Instagram, Github, Linkedin, User, Camera, Edit2, Heart, Clock, ChefHat, Star } from 'lucide-react';
import { getUserProfile, updateAvatar, updateUsername } from '../services/userService';
import { getFavorites } from '../utils/favorites';

function ProfilePage({ onRecipeClick }) {
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const fileInputRef = useRef(null);

  // Sample static data - in a real app, this would come from state/API
  const staticData = {
    email: "nabilbintang17@email.com",
    phone: "+62 815-9840-8501",
    location: "Semarang, Indonesia",
    joinDate: "Januari 2024",
    bio: "Pecinta kuliner Nusantara dan penggemar masakan tradisional. Senang berbagi resep dan tips memasak dengan komunitas.",
    stats: {
      recipes: 12,
      followers: 234
    },
    social: {
      instagram: "@nabilbintangg",
      github: "nabilbintangg",
      linkedin: "Nabil Bintang Ardiansyah Purwanto"
    }
  };

  useEffect(() => {
    loadProfile();
    loadFavorites();
  }, []);

  const loadProfile = () => {
    const userProfile = getUserProfile();
    setProfile(userProfile);
    setNewUsername(userProfile.username);
  };

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar yang valid');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 5MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = updateAvatar(reader.result);
      if (result.success) {
        loadProfile();
      } else {
        alert('Gagal mengupload foto: ' + result.message);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUsernameEdit = () => {
    setIsEditingUsername(true);
  };

  const handleUsernameSave = () => {
    if (!newUsername.trim()) {
      alert('Username tidak boleh kosong');
      return;
    }
    const result = updateUsername(newUsername);
    if (result.success) {
      setIsEditingUsername(false);
      loadProfile();
    } else {
      alert('Gagal mengubah username: ' + result.message);
    }
  };

  const handleUsernameCancel = () => {
    setNewUsername(profile.username);
    setIsEditingUsername(false);
  };

  const handleFavoriteClick = (recipe) => {
    if (onRecipeClick) {
      onRecipeClick(recipe.id, recipe.type);
    }
  };

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Memuat...</div>;
  }

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
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 md:border-6 border-white shadow-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  {profile.avatar ? (
                    <img 
                      src={profile.avatar}
                      alt={profile.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-12 h-12 md:w-16 md:h-16 text-purple-400" />
                    </div>
                  )}
                </div>
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-8 h-8 md:w-10 md:h-10 bg-purple-500 hover:bg-purple-600 rounded-full border-2 md:border-4 border-white flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-lg"
                  title="Upload foto profil"
                >
                  <Camera className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Name and Bio */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                {isEditingUsername ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="text-2xl md:text-3xl font-bold text-slate-800 bg-white/60 border-2 border-purple-300 rounded-lg px-3 py-1 focus:outline-none focus:border-purple-500"
                      autoFocus
                    />
                    <button
                      onClick={handleUsernameSave}
                      className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={handleUsernameCancel}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-slate-800 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      Batal
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                      {profile.username}
                    </h2>
                    <button
                      onClick={handleUsernameEdit}
                      className="p-2 hover:bg-purple-100 rounded-lg transition-colors duration-200"
                      title="Edit username"
                    >
                      <Edit2 className="w-5 h-5 text-purple-500" />
                    </button>
                  </>
                )}
              </div>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl">
                {staticData.bio}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6 md:mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-3 md:p-4 text-center border border-blue-200/50">
                <p className="text-xl md:text-3xl font-bold text-blue-600">{staticData.stats.recipes}</p>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Resep</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl p-3 md:p-4 text-center border border-pink-200/50">
                <p className="text-xl md:text-3xl font-bold text-pink-600">{favorites.length}</p>
                <p className="text-xs md:text-sm text-slate-600 font-medium">Favorit</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-3 md:p-4 text-center border border-purple-200/50">
                <p className="text-xl md:text-3xl font-bold text-purple-600">{staticData.stats.followers}</p>
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
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{staticData.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Telepon</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{staticData.phone}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Lokasi</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{staticData.location}</p>
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm border border-white/80 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-medium">Bergabung</p>
                    <p className="text-sm md:text-base text-slate-800 font-medium truncate">{staticData.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl shadow-purple-500/10 p-4 md:p-8 mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-4 md:mb-6 flex items-center space-x-2">
            <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-500" />
            <span>Resep Favorit</span>
          </h3>
          
          {favorites.length === 0 ? (
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Belum ada resep favorit</p>
              <p className="text-slate-400 text-sm mt-1">Mulai tandai resep favorit Anda dari halaman Makanan atau Minuman</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {favorites.slice(0, 6).map((recipe) => (
                <div 
                  key={`${recipe.id}-${recipe.type}`}
                  onClick={() => handleFavoriteClick(recipe)}
                  className="group transform transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className={`relative bg-white/40 backdrop-blur-xl border border-white/40 rounded-2xl overflow-hidden shadow-lg ${
                    recipe.type === 'makanan' 
                      ? 'hover:shadow-blue-500/15' 
                      : 'hover:shadow-green-500/15'
                  } transition-all duration-300`}>
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={recipe.image_url}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      
                      {/* Favorite indicator */}
                      <div className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-lg">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                      </div>
                    </div>
                    
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          recipe.type === 'makanan'
                            ? 'text-blue-700 bg-blue-100/90'
                            : 'text-green-700 bg-green-100/90'
                        }`}>
                          {recipe.type === 'makanan' ? 'Makanan' : 'Minuman'}
                        </span>
                        <div className="flex items-center space-x-1 bg-white/90 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-semibold text-slate-700">
                            {recipe.type === 'makanan' ? '4.8' : '4.7'}
                          </span>
                        </div>
                      </div>
                      
                      <h4 className={`font-bold text-slate-800 mb-2 text-sm line-clamp-2 ${
                        recipe.type === 'makanan' ? 'group-hover:text-blue-600' : 'group-hover:text-green-600'
                      } transition-colors duration-200`}>
                        {recipe.name}
                      </h4>
                      
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <div className="flex items-center space-x-1 bg-white/70 px-2 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span className="font-medium">{recipe.ingredients?.length || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-white/70 px-2 py-1 rounded-full">
                          <ChefHat className="w-3 h-3" />
                          <span className="font-medium">{recipe.steps?.length || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {favorites.length > 6 && (
            <div className="text-center mt-4">
              <p className="text-slate-500 text-sm">
                Menampilkan 6 dari {favorites.length} resep favorit. Lihat semua di halaman Favorit.
              </p>
            </div>
          )}
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
              href={`https://instagram.com/${staticData.social.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-3 md:p-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-medium text-sm md:text-base">{staticData.social.instagram}</span>
            </a>

            {/* GitHub */}
            <a 
              href={`https://github.com/${staticData.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl p-3 md:p-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Github className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-medium text-sm md:text-base">{staticData.social.github}</span>
            </a>

            {/* LinkedIn */}
            <a 
              href={`https://linkedin.com/in/${staticData.social.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-3 md:p-4 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              <span className="font-medium text-sm md:text-base">{staticData.social.linkedin}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  onRecipeClick: PropTypes.func
};

export default ProfilePage;