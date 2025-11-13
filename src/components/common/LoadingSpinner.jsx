export default function CenteredSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen absolute inset-0 z-40" aria-disabled>
      <style jsx>{`
        .loader {
          width: 48px;
          height: 48px;
          border: 3px dotted #fff;
          border-style: solid solid dotted dotted;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 2s linear infinite;
          position: relative;
        }

        .loader::after {
          content: "";
          box-sizing: border-box;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          border: 3px dotted #8000ff;
          border-style: solid solid dotted;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          animation: rotationBack 1s linear infinite;
          transform-origin: center center;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes rotationBack {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
      `}</style>
      <span className="loader"></span>
    </div>
  );
}
