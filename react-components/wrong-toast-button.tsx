import React from "react";
import { toast, Toaster } from "sonner";

export default function WrongToastButton() {
  return (
    <div>
      <style>{`
        [data-sonner-toast].wrong-toast-no-animation {
          animation: none !important;
          transition: none !important;
        }
        [data-sonner-toast].wrong-toast-no-animation[data-state="open"] {
          animation: none !important;
          transition: none !important;
        }
        [data-sonner-toast].wrong-toast-no-animation[data-state="closed"] {
          animation: none !important;
          transition: none !important;
        }
        [data-sonner-toast].wrong-toast-no-animation[data-swipe-direction] {
          animation: none !important;
          transition: none !important;
        }
      `}</style>
      <Toaster
        id="wrong-toast-button-toast"
        richColors
        theme="dark"
        toastOptions={{
          style: {
            padding: "12px",
          },
          className: "wrong-toast-no-animation",
        }}
      />
      <button
        className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 px-8 py-4"
        onClick={() =>
          toast.error("Event has been created", {
            toasterId: "wrong-toast-button-toast",
            description: "Sunday, August 05, 1994 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Give me a toast (錯誤示範)
      </button>
    </div>
  );
}
