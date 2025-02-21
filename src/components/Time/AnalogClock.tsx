import React, { useEffect, useState } from 'react';

interface AnalogClockProps {
  time: string; // Time passed as formatted "HH:mm:ss"
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time }) => {
  const [hAngle, setHAngle] = useState('00');
  const [mAngle, setMAngle] = useState('00');
  const [sAngle, setSAngle] = useState('00');

  const rotate = (time: string) => {
    const [h, m, s] = time.split(':').map(Number);
    let hangle = Math.floor(30 * h + m / 2);
    if (hangle > 360) {
      hangle = hangle - 360;
    }
    let mangle = 6 * m;
    let sangle = 6 * s;
    setHAngle(hangle.toString());
    setMAngle(mangle.toString());
    setSAngle(sangle.toString());
  };

  useEffect(() => {
    rotate(time);
  }, [time]);

  return (
    <div className="">
      <div
        id="clock"
        className="flex h-32 w-32 justify-center items-center bg-slate-900 rounded-full border-2 border-white shadow-xl shadow-blue-900 font-bold text-center relative text-white"
      >
        <div id="hand" className="flex justify-center items-center">
          <div
            className="hand absolute w-1 h-12 top-4 bg-slate-300 rounded-lg transform origin-bottom"
            style={{ transform: `rotate(${parseInt(sAngle)}deg)` }}
          ></div>

          <div
            className="hand absolute w-1 h-10 top-[1.4rem] bg-blue-300 rounded-lg transform origin-bottom"
            style={{ transform: `rotate(${parseInt(mAngle)}deg)` }}
          ></div>
          <div
            className="hand absolute w-1 h-6 top-[2.4rem] bg-red-300 rounded-lg transform origin-bottom"
            style={{ transform: `rotate(${parseInt(hAngle)}deg)` }}
          ></div>

          <div className="center h-2 w-2 bg-white z-10 rounded-full"></div>
        </div>
        <div id="number">
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[75deg]`}
          >
            <div className={`num absolute -rotate-[75deg]`}>{1}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[105deg]`}
          >
            <div className={`num absolute -rotate-[105deg]`}>{2}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[135deg]`}
          >
            <div className={`num absolute -rotate-[135deg]`}>{3}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[165deg]`}
          >
            <div className={`num absolute -rotate-[165deg]`}>{4}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[195deg]`}
          >
            <div className={`num absolute -rotate-[195deg]`}>{5}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[225deg]`}
          >
            <div className={`num absolute -rotate-[225deg]`}>{6}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[255deg]`}
          >
            <div className={`num absolute -rotate-[255deg]`}>{7}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[285deg]`}
          >
            <div className={`num absolute -rotate-[285deg]`}>{8}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[315deg]`}
          >
            <div className={`num absolute -rotate-[315deg]`}>{9}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[345deg]`}
          >
            <div className={`num absolute -rotate-[345deg]`}>{10}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[15deg]`}
          >
            <div className={`num absolute -rotate-[15deg]`}>{11}</div>
          </div>
          <div
            className={`numbers absolute top-4 bottom-4 left-5 right-5 rotate-[45deg]`}
          >
            <div className={`num absolute -rotate-[45deg]`}>{12}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalogClock;
