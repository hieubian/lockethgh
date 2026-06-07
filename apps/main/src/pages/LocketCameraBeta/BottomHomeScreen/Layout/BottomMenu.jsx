import { CalendarHeart, LayoutGrid, Share } from "lucide-react";
import InputForMoment from "./InputForMoment";
import { SonnerInfo } from "@/components/ui/SonnerToast";
import { useMomentActivityStore, useSelectedStore, useThemeStore, CAMERA_THEMES } from "@/stores";

const BottomMenu = ({ setIsBottomOpen, setOptionModalOpen }) => {
  const selectedMoment = useSelectedStore((s) => s.selectedMoment);
  const selectedQueue = useSelectedStore((s) => s.selectedQueue);
  const { currentThemeId } = useThemeStore();
  const activeTheme = CAMERA_THEMES.find(t => t.id === currentThemeId) || CAMERA_THEMES[0];

  const setSelectedMoment = useSelectedStore((s) => s.setSelectedMoment);
  const setSelectedQueue = useSelectedStore((s) => s.setSelectedQueue);

  const setSelectedMomentId = useSelectedStore((s) => s.setSelectedMomentId);
  const setSelectedQueueId = useSelectedStore((s) => s.setSelectedQueueId);

  const clearActivity = useMomentActivityStore((s) => s.clearActive);

  const resetSelection = () => {
    setSelectedMoment(null);
    setSelectedQueue(null);
    setSelectedMomentId(null);
    setSelectedQueueId(null);
    clearActivity();
  };

  const handleReturnHome = () => {
    resetSelection();
    setIsBottomOpen(false);
  };

  const handleClose = () => {
    resetSelection();
  };

  return (
    <>
      <div 
        className="fixed z-70 w-full max-w-7xl left-1/2 transform -translate-x-1/2 bottom-0 px-5 text-base-content space-y-3"
        style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
      >
        {typeof selectedMoment === "number" && <InputForMoment />}

        <div className="grid grid-cols-3 items-center">
          <div className="flex justify-start">
            {(selectedMoment !== null || selectedQueue !== null) && (
              <button
                className="p-2 text-base-content cursor-pointer hover:bg-base-200/50 rounded-full transition-colors"
                onClick={handleClose}
              >
                <LayoutGrid size={28} />
              </button>
            )}
          </div>

          <div className="flex justify-center scale-75 sm:scale-65">
            <button
              onClick={handleReturnHome}
              className={`relative flex items-center justify-center w-20 h-20 aspect-square transition-all duration-300 ${
                selectedMoment === null && selectedQueue === null 
                  ? "opacity-0 scale-0 pointer-events-none" 
                  : "opacity-100 scale-100"
              }`}
            >
              <div 
                className="absolute w-[68px] h-[68px] aspect-square ring-4 rounded-full z-10 opacity-80"
                style={{ color: activeTheme.primaryColor }}
              ></div>
              <div className="absolute rounded-full w-16 h-16 aspect-square camera-inner-circle z-0 hover:scale-105 transition-transform"></div>
            </button>
          </div>

          <div className="flex justify-end">
            {(selectedMoment !== null || selectedQueue !== null) && (
              <button
                onClick={() => setOptionModalOpen(true)}
                className="p-2 text-base-content cursor-pointer hover:bg-base-200/50 rounded-full transition-colors"
              >
                <Share size={28} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomMenu;
