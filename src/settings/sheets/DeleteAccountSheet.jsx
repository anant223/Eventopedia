import ResponsiveModal from "@/components/my-ui/Sheet";
import { useState } from "react";

const DeleteAccountSheet = ({ open, onClose, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await onDelete?.();
      
      onClose();
    } catch (e) {
      setError(e?.message ?? "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveModal open={open} onOpenChange={onClose}>
      <div style={{ padding: "20px 20px 0" }}>
        {/* icon */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#FAECE7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "8px auto 14px",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#D85A30"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 4 14 12 14 13 6" />
            <path d="M1 6h14M6 6V3h4v3" />
          </svg>
        </div>

        <p
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: "#1a1814",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Delete account?
        </p>

        <p
          style={{
            fontSize: 13,
            color: "#6b6966",
            textAlign: "center",
            lineHeight: 1.65,
            marginBottom: 20,
          }}
        >
          This will permanently remove your profile, events, and all your data.
          This action cannot be undone.
        </p>

        {/* what gets deleted */}
        <div
          style={{
            background: "#FCEBEB",
            borderRadius: 10,
            padding: "4px 14px",
            marginBottom: 20,
          }}
        >
          {[
            "Your profile & username",
            "All events you organised",
            "Your tickets & event history",
          ].map((item, i, arr) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
                borderBottom:
                  i < arr.length - 1
                    ? "0.5px solid rgba(226,75,74,.15)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#D85A30",
                  flexShrink: 0,
                }}
              />
              <p style={{ fontSize: 13, color: "#791F1F", margin: 0 }}>
                {item}
              </p>
            </div>
          ))}
        </div>

        {error && (
          <p
            style={{
              fontSize: 12,
              color: "#D85A30",
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={handleDelete}
          disabled={loading}
          style={{
            width: "100%",
            padding: 13,
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            background: "#D85A30",
            color: "#fff",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            marginBottom: 10,
          }}
        >
          {loading ? "Deleting…" : "Yes, delete my account"}
        </button>

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: 13,
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            background: "transparent",
            border: "0.5px solid rgba(0,0,0,.15)",
            color: "#1a1814",
            cursor: "pointer",
            marginBottom: 8,
          }}
        >
          Cancel
        </button>
      </div>
    </ResponsiveModal>
  );
};

export default DeleteAccountSheet;