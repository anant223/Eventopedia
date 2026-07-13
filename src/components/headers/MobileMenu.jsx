import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Settings,
  User,
  Bookmark,
  Plus,
  Bell,
  MapPin,
} from "lucide-react";

const menuItems = [
  {
    label: "Create Event",
    icon: Plus,
    path: "/main/create-event",
    accent: true,
  },
  { label: "Notifications", icon: Bell, path: "/main/notifications" },
  { label: "Bookmarks", icon: Bookmark, path: "/main/bookmarks" },
  { label: "Profile", icon: User, path: (id) => `/main/user-profile/${id}` },
  { label: "Settings", icon: Settings, path: "/main/settings" },
];

const MobileMenu = ({ isOpened, onClose, user, onLogout, navigate }) => {
  const handleNavigate = (path) => {
    navigate(typeof path === "function" ? path(user?._id) : path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpened && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] md:hidden"
            style={{
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(2px)",
            }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-72 z-[70] md:hidden overflow-y-auto"
            style={{
              background: "rgba(242, 239, 232, 0.97)",
              borderLeft: "0.5px solid rgba(0,0,0,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="p-5">
              {/* User info */}
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-black/8">
                <div
                  className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center text-sm font-semibold text-white shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #378ADD, #534AB7)",
                  }}
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    user?.name?.charAt(0).toUpperCase() || "U"
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate capitalize">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Menu items */}
              <div className="space-y-1.5 mb-6">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    onClick={() => handleNavigate(item.path)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      item.accent
                        ? "text-white"
                        : "text-gray-700 hover:bg-white/60"
                    }`}
                    style={
                      item.accent
                        ? {
                            background:
                              "linear-gradient(135deg, #E24B4A, #c73b3a)",
                          }
                        : {}
                    }
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Sign out */}
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 border border-red-100 transition-all text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
