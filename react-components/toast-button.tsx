import React from "react";
import { toast, Toaster } from "sonner";

export default function ToastButton() {
  return (
    <div>
      <Toaster
        richColors
        theme="dark"
        toastOptions={{
          style: {
            padding: "12px",
          },
        }}
      />
      <button
        class="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 px-8 py-4"
        onClick={() =>
          toast.success("Event has been created", {
            description: "Sunday, August 05, 1994 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Give me a toast
      </button>
    </div>
  );
}
