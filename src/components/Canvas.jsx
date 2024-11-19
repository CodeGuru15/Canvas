import { LuUndo2 } from "react-icons/lu";
import { LuRedo2 } from "react-icons/lu";
import { RxText } from "react-icons/rx";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { PiTextItalicBold } from "react-icons/pi";
import { PiTextUnderlineBold } from "react-icons/pi";
import { PiTextBBold } from "react-icons/pi";
import { BsTextCenter } from "react-icons/bs";

import { useState, useRef, useEffect } from "react";

const Canvas = () => {
  const [fontSize, setFontSize] = useState(15);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [fontStyle, setFontStyle] = useState("Font");
  const [isAddText, setIsAddText] = useState(false);
  const [userText, setUserText] = useState("");

  const [allNotes, setAllNotes] = useState([]);

  const initialPosition = { x: 0, y: 0 };

  const fontStyles = ["Sans-serif", "Monospace", "Serif"];

  const handleSubmitText = () => {
    const newNote = { id: 1, text: userText, position: initialPosition };

    allNotes.push(newNote);
    setUserText("");
    setIsAddText(false);
  };

  useEffect(() => {
    console.log(allNotes);
  }, [allNotes.length]);

  const Notes = ({ text, newposition }) => {
    const [position, setPosition] = useState(newposition);
    const noteRef = useRef(null);

    const handleMouseDown = (e) => {
      const rect = noteRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const onMouseMove = (e) => {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        const updatePosition = { x: newX, y: newY };
        setPosition(updatePosition);
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const customStyle = `bg-slate-300 flex cursor-move text-slate-800 p-2 rounded-md absolute  ${
      isBold ? "font-bold" : null
    } ${isItalic ? "italic" : null}`;

    return (
      <div
        ref={noteRef}
        className={customStyle}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          fontFamily: `${fontStyle}`,
          fontSize: `${fontSize}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        {text}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-screen h-screen text-slate-500 place-items-center">
      {isAddText ? (
        <div className="absolute top-[50%]">
          <div className="border-2 border-slate-500">
            <input
              type="text"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              className="p-1 outline-none"
              placeholder="Add Text"
            />
          </div>
          <div className="flex justify-around ">
            <button className="p-1 hover:text-black" onClick={handleSubmitText}>
              Done
            </button>
            <button
              className="p-1 hover:text-black"
              onClick={() => setIsAddText(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      <div className="flex flex-row justify-center w-full gap-5 py-3 shadow-md grow-0">
        <button className="flex flex-col font-semibold place-items-center hover:text-black">
          <span>
            <LuUndo2 />
          </span>
          <span>undo</span>
        </button>
        <button className="flex flex-col font-semibold place-items-center hover:text-black">
          <span>
            <LuRedo2 />
          </span>
          <span>redo</span>
        </button>
      </div>
      <div className="flex justify-center w-full bg-slate-100 grow">
        <div className=" bg-slate-200 md:w-1/2 lg:w-1/3 w-[80%]">
          {allNotes.map((note) => {
            return (
              <div key={note.id}>
                <Notes text={note.text} newposition={note.position} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center w-full font-semibold shadow-md grow-0">
        <div className=" md:w-1/2 lg:w-1/3 w-[80%] gap-1 sm:gap-2 flex flex-row justify-around  py-3 text-xs sm:text-base">
          <div className="flex px-2 py-1 border shadow-sm basis-1/3 rounded-xl shadow-slate-300">
            <select
              className="w-full outline-none"
              onChange={(e) => setFontStyle(e.target.value)}
            >
              {fontStyles.map((item, i) => {
                return (
                  <option
                    key={i}
                    value={item}
                    className=""
                    defaultValue={fontStyle}
                  >
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 shadow-sm rounded-xl shadow-slate-300">
            {fontSize > 10 ? (
              <button
                onClick={() => {
                  setFontSize((size) => size - 1);
                }}
                className="p-1 "
              >
                <FaMinus />
              </button>
            ) : (
              <button className="p-1 cursor-not-allowed text-slate-300">
                <FaMinus />
              </button>
            )}
            <span className="flex justify-center ">{fontSize}</span>
            {fontSize < 20 ? (
              <button
                onClick={() => setFontSize((size) => size + 1)}
                className="p-1 "
              >
                <FaPlus />
              </button>
            ) : (
              <button className="p-1 cursor-not-allowed text-slate-300">
                <FaPlus />
              </button>
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-1 ">
            <button
              className="p-1 hover:bg-slate-200"
              onClick={() => setIsBold(!isBold)}
            >
              {isBold ? (
                <span className="text-black ">
                  <PiTextBBold />
                </span>
              ) : (
                <PiTextBBold />
              )}
            </button>
            <button
              className="p-1 hover:bg-slate-200"
              onClick={() => setIsItalic(!isItalic)}
            >
              {isItalic ? (
                <span className="text-black ">
                  <PiTextItalicBold />
                </span>
              ) : (
                <span>
                  <PiTextItalicBold />
                </span>
              )}
            </button>
            <button className="p-1 hover:bg-slate-200">
              <BsTextCenter />
            </button>
            <button className="p-1 hover:bg-slate-200">
              <PiTextUnderlineBold />
            </button>
          </div>
        </div>
      </div>
      <div className="py-3 md:py-5">
        <button
          onClick={() => setIsAddText(true)}
          className="flex items-center justify-center gap-1 px-4 py-1 text-xs font-semibold border text-slate-600 sm:text-base rounded-2xl bg-slate-200"
        >
          <span className="text-base sm:text-xl">
            <RxText />
          </span>
          <span>Add text</span>
        </button>
      </div>
    </div>
  );
};

export default Canvas;
