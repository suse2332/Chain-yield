import React from "react";

interface Notification {
  id: string;
  message: string;
  type: "info" | "success" | "error";
}

interface NotificationsProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50 max-w-sm">
      {notifications.map(({ id, message, type }) => (
        <div
          key={id}
          className={`cursor-pointer rounded px-4 py-3 shadow-md text-white ${
            type === "success"
              ? "bg-green-600"
              : type === "error"
              ? "bg-red-600"
              : "bg-blue-600"
          }`}
          onClick={() => onDismiss(id)}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
