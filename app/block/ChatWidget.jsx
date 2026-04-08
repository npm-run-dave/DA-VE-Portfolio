import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ChatWidget() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const recaptchaRef = useRef(null);

  const sendMessage = async (token = null) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, recaptchaToken: token }),
    });
    const data = await res.json();

    if (data.error === "captcha_required") {
      recaptchaRef.current.execute();
    } else {
      setChat([...chat, { user: message, bot: data.reply }]);
      setMessage("");
    }
  };

  const onRecaptchaChange = (token) => {
    if (token) sendMessage(token);
  };

  return (
    <div>
      <div className="chat-box">
        {chat.map((c, i) => (
          <div key={i}>
            <p>
              <b>You:</b> {c.user}
            </p>
            <p>
              <b>Bot:</b> {c.bot}
            </p>
          </div>
        ))}
      </div>

      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => sendMessage()}>Send</button>

      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        size="invisible"
        ref={recaptchaRef}
        onChange={onRecaptchaChange}
      />
    </div>
  );
}
