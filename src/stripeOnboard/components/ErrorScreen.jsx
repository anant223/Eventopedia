import { Card } from "@/components/ui/card";



const ErrorScreen = ({ onRetry, onBack }) => (
  <Card>
    <IconRing bg="#FCEBEB">
      <svg
        width="28"
        height="28"
        viewBox="0 0 16 16"
        fill="none"
        stroke="#A32D2D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="8" r="6" />
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" />
      </svg>
    </IconRing>

    <p className="text-[18px] font-medium text-[#1a1814] mb-2">
      Something went wrong
    </p>
    <p className="text-[13px] text-[#6b6966] leading-relaxed mb-6">
      We couldn't verify your Stripe account. This is usually temporary — please
      try again.
    </p>

    <PrimaryBtn onClick={onRetry}>Try again</PrimaryBtn>
    <div className="mt-2.5">
      <GhostBtn onClick={onBack}>Back to settings</GhostBtn>
    </div>
  </Card>
);
export default ErrorScreen;

const IncompleteScreen = ({ onContinue, onLater }) => (
  <Card>
    <IconRing bg="#FAEEDA">
      <svg
        width="28"
        height="28"
        viewBox="0 0 16 16"
        fill="none"
        stroke="#BA7517"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="8" r="6" />
        <path d="M8 5v3M8 11v.5" />
      </svg>
    </IconRing>

    <p className="text-[18px] font-medium text-[#1a1814] mb-2">
      Setup incomplete
    </p>
    <p className="text-[13px] text-[#6b6966] leading-relaxed mb-6">
      Your Stripe account needs a bit more information before you can receive
      payouts.
    </p>

    <StatusRow
      items={[
        { label: "Account status", value: "Pending", valueColor: "#BA7517" },
        { label: "Payouts", value: "Not yet enabled", valueColor: "#BA7517" },
      ]}
    />

    <PrimaryBtn onClick={onContinue}>Continue setup</PrimaryBtn>
    <GhostBtn onClick={onLater}>Do this later</GhostBtn>
  </Card>
);

const SuccessScreen = ({ onGoToSettings, onCreateEvent }) => (
  <Card>
    <IconRing bg="#EAF3DE">
      <svg
        width="28"
        height="28"
        viewBox="0 0 16 16"
        fill="none"
        stroke="#3B6D11"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8l3.5 3.5L13 4" />
      </svg>
    </IconRing>

    <p className="text-[18px] font-medium text-[#1a1814] mb-2">
      Stripe connected
    </p>
    <p className="text-[13px] text-[#6b6966] leading-relaxed mb-6">
      Your payout account is active. You can now sell tickets and receive
      payments directly to your bank.
    </p>

    <StatusRow
      items={[
        { label: "Account status", value: "Active", valueColor: "#3B6D11" },
        { label: "Payouts", value: "Enabled", valueColor: "#3B6D11" },
        {
          label: "Payout schedule",
          value: "Every 2 days",
          valueColor: "#1a1814",
        },
      ]}
    />

    <PrimaryBtn onClick={onGoToSettings}>Go to settings</PrimaryBtn>
    <GhostBtn onClick={onCreateEvent}>Create an event</GhostBtn>
  </Card>
);