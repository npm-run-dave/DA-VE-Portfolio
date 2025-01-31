import { useEffect, useState } from "react";

export default function Downloadapp() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setIsInstallable(true);
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <div className="bg-black">
      <main className="container flex flex-col justify-center">
        {isInstallable && (
          <div
            className="install-prompt fixed left-0 bottom-[60%] bg-gray-800 text-white p-2 rounded-r-lg shadow-lg flex justify-between items-center transition-all duration-300 ease-in-out transform group"
            style={{
              zIndex: 9999,
              backgroundSize: "200% 100%",
              backgroundPosition: "right center",
            }}
          >
            <div className="flex items-center gap-2">
              <span role="img" aria-label="install"></span>
            </div>
            <button onClick={handleInstallClick} className="relative group">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 360.000000 360.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,360.000000) scale(0.100000,-0.100000)"
                  fill="#FFFFFF"
                  stroke="none"
                >
                  <path
                    d="M1588 2831 c-7 -2 -16 -9 -20 -15 -5 -6 -8 -240 -8 -520 1 -280 -3
                    -513 -8 -518 -4 -4 -142 -9 -307 -10 -284 -3 -300 -4 -303 -22 -2 -10 0 -16 5
                    -13 5 3 33 -21 62 -53 30 -33 58 -57 64 -53 5 3 7 2 4 -4 -5 -8 73 -93 86 -93
                    3 0 40 -34 81 -75 41 -41 78 -75 81 -75 2 0 46 -40 97 -90 51 -49 96 -90 101
                    -90 4 0 5 -5 1 -12 -5 -8 -2 -9 9 -5 9 3 16 2 14 -3 -2 -10 81 -90 94 -90 5 0
                    9 -8 9 -17 0 -9 3 -14 6 -10 4 3 17 -8 29 -26 12 -18 27 -31 34 -29 7 1 10 -1
                    7 -6 -7 -12 54 -57 78 -58 20 -1 153 121 148 137 -1 5 4 8 10 7 7 -2 12 3 10
                    10 -1 8 2 11 7 8 10 -7 141 120 141 137 0 6 3 8 6 5 3 -4 25 13 49 35 23 23
                    75 71 114 107 40 36 107 98 149 139 42 40 95 89 117 109 22 19 33 32 25 28 -8
                    -4 -6 -1 5 8 79 60 104 92 73 93 -7 1 -146 2 -310 3 -220 1 -297 4 -300 13 -3
                    7 -4 109 -3 227 3 253 -6 831 -13 812 -3 -10 -7 -10 -18 -1 -13 11 -395 20
                    -426 10z"
                  />
                  <path
                    d="M798 830 c-28 -23 -10 -65 32 -73 53 -11 1936 -8 1964 3 27 10 35 41
                    17 68 -6 10 -200 13 -1001 15 -881 2 -995 1 -1012 -13z"
                  />
                </g>
              </svg>
              <span className="absolute bottom-[-5px] left-[100px] transform -translate-x-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Download App?
              </span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
