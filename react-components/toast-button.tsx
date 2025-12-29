import React from "react";
import { toast, Toaster } from "sonner";

type ToastButtonProps = {
  variant: "appropriate" | "excessive";
};

export default function ToastButton({ variant }: ToastButtonProps) {
  const isExcessive = variant === "excessive";
  const toasterId = isExcessive ? "wrong-toast-button-toast" : undefined;

  return (
    <div>
      {isExcessive && (
        <style>{`
          [data-sonner-toast].wrong-toast-no-animation {
            animation: none !important;
            transition: none !important;
            max-height: 80px !important;
            overflow: hidden !important;
          }
          [data-sonner-toast].wrong-toast-no-animation[data-state="open"] {
            animation: none !important;
            transition: none !important;
            max-height: 80px !important;
            overflow: hidden !important;
          }
          [data-sonner-toast].wrong-toast-no-animation[data-state="closed"] {
            animation: none !important;
            transition: none !important;
            max-height: 80px !important;
            overflow: hidden !important;
          }
          [data-sonner-toast].wrong-toast-no-animation[data-swipe-direction] {
            animation: none !important;
            transition: none !important;
            max-height: 80px !important;
            overflow: hidden !important;
          }
          [data-sonner-toast].wrong-toast-no-animation:hover {
            max-height: 80px !important;
            overflow: hidden !important;
          }
        `}</style>
      )}
      <style>{`
        [data-sonner-toast] {
          max-height: 80px !important;
          height: 80px !important;
          overflow: hidden !important;
        }
        [data-sonner-toast]:hover {
          max-height: 80px !important;
          height: 80px !important;
          overflow: hidden !important;
        }
      `}</style>
      <Toaster
        id={toasterId}
        richColors
        theme="dark"
        toastOptions={{
          style: {
            padding: "12px",
          },
          className: isExcessive ? "wrong-toast-no-animation" : undefined,
        }}
      />
      <button
        className={`cursor-pointer text-white px-4 py-2 rounded-md px-8 py-4 ${
          isExcessive
            ? "bg-red-600 hover:bg-red-500"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
        onClick={() => {
          const toastOptions = {
            description: "Sunday, August 05, 1994 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
            ...(isExcessive && { toasterId }),
          };

          if (isExcessive) {
            toast.error("Event has been created", toastOptions);
          } else {
            toast.success("Event has been created", toastOptions);
          }
        }}
      >
        {isExcessive ? "Give me a toast (錯誤示範)" : "Give me a toast"}
      </button>
    </div>
  );
}
