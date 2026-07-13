import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Settings, LogOut, User, Bookmark } from "lucide-react";

const quickActions = [
  {
    label: "Profile",
    icon: User,
    color: "from-blue-500/20 to-blue-600/20",
    path: (id) => `/main/user-profile/${id}`,
  },
  {
    label: "Saved",
    icon: Bookmark,
    color: "from-amber-500/20 to-amber-600/20",
    path: () => "/main/bookmarks",
  },
  {
    label: "Settings",
    icon: Settings,
    color: "from-gray-500/20 to-gray-600/20",
    path: () => "/main/settings",
  },
];

const UserMenu = ({
  user,
  isExpanded,
  onToggle,
  onLogout,
  navigate,
  onClose,
}) => {
  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onToggle}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-all"
        style={{
          background: isExpanded
            ? "rgba(255,255,255,0.9)"
            : "rgba(255,255,255,0.6)",
          border: "0.5px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* Avatar */}
        <div
          className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center text-xs font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #378ADD, #534AB7)" }}
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

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-11 right-0 w-64 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(245, 242, 236, 0.97)",
              border: "0.5px solid rgba(0,0,0,0.09)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.12), inset 0 0.5px 0 rgba(255,255,255,0.8)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-black/5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center text-sm font-semibold text-white shrink-0"
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
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="p-3 grid grid-cols-3 gap-2 border-b border-black/5">
              {quickActions.map((action, i) => (
                <motion.button
                  key={action.label}
                  onClick={() => handleNavigate(action.path(user?._id))}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-gradient-to-br ${action.color} hover:opacity-80 transition-opacity`}
                >
                  <action.icon className="w-4 h-4 text-gray-700" />
                  <span className="text-[11px] font-medium text-gray-700">
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Sign out */}
            <div className="p-2">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
