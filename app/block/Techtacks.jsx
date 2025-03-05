import Image from "next/image";
export default function Carousel() {
  return (
    <div className="slider">
      <div className="slide-track">
        <div className="slide">
          <Image src="/vue.png" height="40" width="40" alt="" />
        </div>

        <div className="slide">
          <Image src="/nextjs.png" height="40" width="40" alt="" />
        </div>
        <div className="slide">
          <Image src="/express.png" height="40" width="40" alt="" />
        </div>

        <div className="slide">
          <Image src="/mongodb-icon.png" height="40" width="40" alt="" />
        </div>
        <div className="slide">
          <Image src="/tailwind.png" height="40" width="40" alt="" />
        </div>
        <div className="slide">
          <Image src="/vue.png" height="40" width="40" alt="" />
        </div>

        <div className="slide">
          <Image src="/nextjs.png" height="40" width="40" alt="" />
        </div>
        <div className="slide">
          <Image src="/express.png" height="40" width="40" alt="" />
        </div>

        <div className="slide">
          <Image src="/mongodb-icon.png" height="40" width="40" alt="" />
        </div>
        <div className="slide">
          <Image src="/tailwind.png" height="40" width="40" alt="" />
        </div>
      </div>
    </div>
  );
}
