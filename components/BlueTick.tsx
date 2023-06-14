import Image from "next/image";

function BlueTick() {
  return (
    <div>
      <Image
        className="w-4 h-4"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
        alt="Blue Tick"
        width={1000}
        height={1000}
      />
    </div>
  );
}

export default BlueTick;
