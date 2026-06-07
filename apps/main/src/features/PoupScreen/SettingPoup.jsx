import { useReadReceipts, useShareHistory, useUserSetting, useAuthStore, useThemeStore } from "@/stores";
import { CheckCheck, Eye, History, UserRoundSearch, X, LogOut, SquareArrowOutUpRight, Smartphone, Palette, Smile } from "lucide-react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { SonnerError, SonnerSuccess } from "@/components/ui/SonnerToast";
import { useApp } from "@/context/AppContext";

import ThemeSelector from "@/pages/LocketCameraBeta/MainHomeScreen/ThemeSelector";

const SettingPoup = ({ open, onClose }) => {
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [activeView, setActiveView] = useState("main"); // "main" or "theme"
  
  const user = useAuthStore((state) => state.user);
  const clearAndlogout = useAuthStore((state) => state.clearAndlogout);
  const navigate = useNavigate();
  const { navigation } = useApp();
  const { setIsToolsOpen, setToolsActiveTab, setIsSidebarOpen } = navigation;

  const handleLogout = async () => {
    try {
      clearAndlogout();
      SonnerSuccess(
        "Đăng xuất thành công!",
        `Tạm biệt ${user?.displayName || "người dùng"}!`
      );
      navigate("/login");
    } catch (error) {
      SonnerError("error", "Đăng xuất thất bại!");
      console.error("❌ Lỗi khi đăng xuất:", error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [showModal]);

  useEffect(() => {
    if (open) {
      setShowModal(true);
      setActiveView("main");
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setShowModal(false), 500);
    }
  }, [open]);

  const showSeenMoments = useUserSetting((s) => s.showSeenMoments);
  const toggleSeenMoments = useUserSetting((s) => s.toggleSeenMoments);

  const allowSearch = useUserSetting((s) => s.allowSearch);
  const toggleAllowSearch = useUserSetting((s) => s.toggleAllowSearch);

  const { sendReadReceipts, toggleReadReceipts } = useReadReceipts();
  const { shareHistoryOn, toggleShareHistoryOn } = useShareHistory();

  if (!showModal) return null;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-base-100/30 backdrop-blur-[4px] transition-opacity duration-500 z-[62] text-base-content ${
        animate ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[85vh] md:h-[70%] bg-base-100 rounded-t-4xl shadow-xl
        transition-all duration-500 z-[63] flex flex-col
        ${animate ? "translate-y-0" : "translate-y-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex items-center justify-center border-b border-base-300 px-4 py-3">
          {activeView !== "main" && (
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 hover:bg-base-200 rounded-full transition-colors"
              onClick={() => setActiveView("main")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            </button>
          )}
          <h3 className="text-xl font-semibold">
            {activeView === "theme" ? "Camera Theme" : "Cài đặt"}
          </h3>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={onClose}
          >
            <X className="w-8 h-8 btn btn-circle p-1" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto relative">
          {activeView === "theme" ? (
            <ThemeSelector embedded={true} isOpen={true} />
          ) : (
            <div className="px-4 py-4 space-y-6">
              <div>
                <p className="text-sm text-base-content/60 mb-2">Hiển thị</p>

                <div className="bg-base-200 rounded-2xl divide-y divide-base-300">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-base-300">
                        <Eye className="w-5 h-5" />
                      </div>

                      <div>
                        <p className="font-medium flex items-center gap-2">Trạng thái xem Moments</p>
                        <p className="text-sm text-base-content/60">
                          Khi bật, người khác sẽ biết bạn đã xem Moments của họ.
                        </p>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={showSeenMoments}
                      onChange={(e) => toggleSeenMoments()}
                      className="toggle"
                      style={showSeenMoments ? { backgroundColor: '#00c3ff', borderColor: '#00c3ff' } : {}}
                    />
                  </div>


                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-base-300">
                        <CheckCheck className="w-5 h-5" />
                      </div>

                      <div>
                        <p className="font-medium flex items-center gap-2">Hiển thị đã đọc</p>
                        <p className="text-sm text-base-content/60">
                          Khi bật, người khác sẽ biết bạn đã đọc tin nhắn của họ.
                        </p>
                      </div>
                    </div>

                    <input
                      type="checkbox"
                      checked={sendReadReceipts}
                      onChange={toggleReadReceipts}
                      className="toggle"
                      style={sendReadReceipts ? { backgroundColor: '#00c3ff', borderColor: '#00c3ff' } : {}}
                    />
                  </div>

                </div>
              </div>

              <div>
                <p className="text-sm text-base-content/60 mb-2">Tính năng</p>
                <div className="bg-base-200 rounded-2xl divide-y divide-base-300 overflow-hidden">
                  <Link to="/download" className="flex items-center gap-3 px-4 py-3 hover:bg-base-300 transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-base-300">
                      <SquareArrowOutUpRight className="w-5 h-5" />
                    </div>
                    <p className="font-medium">Cài đặt WebApp</p>
                  </Link>

                  <button 
                    onClick={() => setActiveView("theme")} 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-base-300 transition-colors"
                  >
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-base-300">
                      <Palette className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-medium">Camera Theme</p>
                  </button>

                  <button 
                    onClick={() => {
                      setToolsActiveTab("custom-crush");
                      setIsToolsOpen(true);
                      onClose();
                    }} 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-base-300 transition-colors"
                  >
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-base-300">
                      <Palette className="w-5 h-5" />
                    </div>
                    <p className="font-medium">Tùy chỉnh Crush</p>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setToolsActiveTab("custom-emoji");
                      setIsToolsOpen(true);
                      onClose();
                    }} 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-base-300 transition-colors"
                  >
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-base-300">
                      <Smile className="w-5 h-5" />
                    </div>
                    <p className="font-medium">Tùy Chỉnh Emoji</p>
                  </button>
                </div>
              </div>

              <div>
                <div className="bg-base-200 rounded-2xl divide-y divide-base-300 overflow-hidden">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-base-300 transition-colors text-error">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-error/10">
                      <LogOut className="w-5 h-5 text-error" />
                    </div>
                    <p className="font-medium">Đăng xuất</p>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SettingPoup;
