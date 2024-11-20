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
  const [isUnderLined, setIsUnderLined] = useState(false);
  const [fontStyle, setFontStyle] = useState("");
  const [isAddText, setIsAddText] = useState(false);
  const [userText, setUserText] = useState("");
  const [currentindex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const initialPosition = { x: 500, y: 300 };

  const [position, setPosition] = useState(initialPosition);

  const [textElement, setTextElement] = useState({
    elementText: "",
    elementPosition: position,
    elementFont: fontStyle,
    elementSize: fontSize,
    elementBold: isBold,
    elementItalic: isItalic,
    elementUnderline: isUnderLined,
  });

  const historyElement = useRef([textElement]);

  const currentElement = historyElement.current[currentindex];

  useEffect(() => {
    if (textElement.elementText != "") {
      historyElement.current = [...historyElement.current, { ...textElement }];
      setCurrentIndex(historyElement.current.length - 1);
    }
  }, [
    textElement.elementText,
    textElement.elementPosition,
    textElement.elementFont,
    textElement.elementSize,
    textElement.elementBold,
    textElement.elementItalic,
    textElement.elementUnderline,
  ]);

  useEffect(() => {
    if (textElement.elementText != "") {
      setTextElement((element) => ({
        ...element,
        elementBold: isBold,
      }));
      setTextElement((element) => ({
        ...element,
        elementItalic: isItalic,
      }));
      setTextElement((element) => ({
        ...element,
        elementUnderline: isUnderLined,
      }));
    }
  }, [isBold, isItalic, isUnderLined]);

  useEffect(() => {
    if (textElement.elementText != "") {
      setTextElement((element) => ({
        ...element,
        elementFont: fontStyle,
      }));
    }
  }, [fontStyle]);

  useEffect(() => {
    if (textElement.elementText != "") {
      setTextElement((element) => ({
        ...element,
        elementSize: fontSize,
      }));
    }
  }, [fontSize]);

  useEffect(() => {
    if (!isDragging) {
      setTextElement((element) => ({
        ...element,
        elementPosition: position,
      }));
    }
  }, [isDragging]);

  const fontStyles = ["Sans-serif", "Monospace", "Serif"];

  const handleSubmitText = () => {
    setTextElement((element) => ({
      ...element,
      elementText: userText,
    }));
    setIsAddText(false);
  };

  const handleUndo = () => {
    if (currentindex > 0) {
      setCurrentIndex(currentindex - 1);
    }
  };

  const handleRedo = () => {
    if (currentindex < historyElement.current.length - 1) {
      setCurrentIndex(currentindex + 1);
    }
  };

  const Notes = () => {
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
        setIsDragging(true);
      };

      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        setIsDragging(false);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    };

    const customStyle = `bg-slate-300 flex cursor-move text-slate-800 p-2 rounded-md absolute  ${
      currentElement.elementBold ? "font-bold" : null
    } ${currentElement.elementItalic ? "italic" : null} ${
      currentElement.elementUnderline ? "underline" : null
    }`;

    return (
      <>
        {isDragging ? (
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
            {historyElement.current[currentindex].elementText}
          </div>
        ) : (
          <div
            ref={noteRef}
            className={customStyle}
            style={{
              left: `${currentElement.elementPosition.x}px`,
              top: `${currentElement.elementPosition.y}px`,
              fontFamily: `${currentElement.elementFont}`,
              fontSize: `${currentElement.elementSize}px`,
            }}
            onMouseDown={handleMouseDown}
          >
            {currentElement.elementText}
          </div>
        )}
      </>
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
              className="p-1 outline-none text-slate-900"
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
        <button
          onClick={handleUndo}
          className="flex flex-col font-semibold place-items-center hover:text-black"
        >
          <span>
            <LuUndo2 />
          </span>
          <span>undo</span>
        </button>
        <button
          onClick={handleRedo}
          className="flex flex-col font-semibold place-items-center hover:text-black"
        >
          <span>
            <LuRedo2 />
          </span>
          <span>redo</span>
        </button>
      </div>
      <div className="flex justify-center w-full bg-slate-100 grow">
        <div className=" bg-slate-200 md:w-1/2 lg:w-1/3 w-[80%]">
          {currentElement.elementText != "" ? <Notes /> : null}
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
            {fontSize < 25 ? (
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
            {/* <button className="p-1 hover:bg-slate-200">
              <BsTextCenter />
            </button> */}
            <button
              className="p-1 hover:bg-slate-200"
              onClick={() => setIsUnderLined(!isUnderLined)}
            >
              {isUnderLined ? (
                <span className="text-black ">
                  <PiTextUnderlineBold />
                </span>
              ) : (
                <span>
                  <PiTextUnderlineBold />
                </span>
              )}
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
