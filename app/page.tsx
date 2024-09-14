"use client";

import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import {
  Facebook,
  Instagram,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  Edit,
  Share2,
  Palette,
  Image as ImageIcon,
  Music,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const dummyPictures = [
  "/images/img-city.jpg?height=1080&width=19200&text=City",
  "/images/img-nature.jpg?height=1080&width=19200&text=Nature",
  "/images/img-abstract.jpg?height=1080&width=19200&text=Abstract",
  "/images/img-desk.jpg?height=1080&width=19200&text=Desk",
];

const dummyMusic = [
  { name: "Relaxing Melody", src: "/music/music-relaxing.mp3" },
  { name: "Upbeat Rhythm", src: "/music/music-upbeat.mp3" },
  { name: "Nature Sounds", src: "/music/music-nature.mp3" },
];

const gradients = [
  "bg-gradient-to-r from-blue-100 to-blue-400",
  "bg-gradient-to-r from-pink-500 to-yellow-500",
  "bg-gradient-to-r from-green-400 to-blue-500",
  "bg-gradient-to-r from-purple-500 to-indigo-500",
];

export default function PDFProcessor() {
  const [pdfLink, setPdfLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [cardStyle, setCardStyle] = useState(
    "bg-gradient-to-r from-blue-100 to-white"
  );
  const [backgroundImage, setBackgroundImage] = useState("");
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSwipedUp, setHasSwipedUp] = useState(false);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfLink(e.target.value);
    setErrorMessage("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setErrorMessage("");
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleProcess = () => {
    if (!file) {
      setErrorMessage("Please provide a PDF link or file");
      return;
    }
    if (pdfLink && file) {
      setErrorMessage("Please provide a PDF link or file. Not both.");
      return;
    }
    if (pdfLink && !isValidUrl(pdfLink)) {
      setErrorMessage("Please provide a valid URL");
      return;
    }
    setErrorMessage("");
    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      setCards([
        "Did you know that scientists can use large language models to extract complex information from scientific papers, including relationships between materials and their properties? Scientists discovered a way to teach AI to read and understand complex scientific texts, unlocking a potential treasure trove of new discoveries!",
        "How can we automatically extract structured information from scientific text to advance our understanding of materials science? Can AI learn to accurately extract complex scientific information from large amounts of text data? Can artificial intelligence help us accelerate the discovery of new materials and reactions in chemistry.",
        "Researchers at Lawrence Berkeley National Laboratory, the Materials Science and Engineering Department at the University of California, Berkeley, and other institutions have developed a new approach to extracting information from scientific text.",
        "They used a large language model to simultaneously extract named entities and their relationships from text passages, and fine-tuned the model on a small set of annotated examples. The study used a combination of machine learning models, including GPT-3 and Llama-2, to extract information from scientific texts and predict new chemical reactions.",
        "The results showed that the model was able to accurately extract structured information from scientific text, including relationships between materials and their properties, and that the performance of the model improved with the size of the training set. The AI models were able to accurately extract information from scientific texts and predict new chemical reactions, with some models achieving accuracy rates of over 90%.",
        "This approach has the potential to revolutionize the way we extract information from scientific text, and could be used to advance our understanding of a wide range of fields, including materials science, chemistry, and biology.",
        "What are your thoughts on the potential of large language models to extract complex information from scientific text? Could this approach change the way we do research in the future? What do you think about the potential of AI in scientific discovery? Share your thoughts on how AI can help unlock new scientific breakthroughs!"
      ]);
      setIsLoading(false);
    }, 3000);
  };

  const handlers = useSwipeable({
    onSwipedUp: () => {
      setCurrentCard((prev) => Math.min(prev + 1, cards.length - 1));
      setHasSwipedUp(true);
    },
    onSwipedDown: () => setCurrentCard((prev) => Math.max(prev - 1, 0)),
  });

  const handleEdit = (index: number, newText: string) => {
    setCards((prev) => prev.map((card, i) => (i === index ? newText : card)));
  };

  const navigateCard = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentCard((prev) => Math.min(prev + 1, cards.length - 1));
    } else {
      setCurrentCard((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleColorChange = (gradient: string) => {
    setCardStyle(gradient);
    setBackgroundImage("");
  };

  const handlePictureChange = (picture: string) => {
    setBackgroundImage(picture);
    setCardStyle("");
  };

  const handleMusicChange = (music: string) => {
    setCurrentMusic(music);
  };

  const defaultUrl = "https://www.nature.com/articles/s41467-024-45563-x.pdf";

  const openSourceDocument = () => {
    // In a real application, you would open the actual source document here
    // window.open(pdfLink, "_blank");
    window.open(
      "https://inria.hal.science/hal-01702159/file/396007_1_En_47_Chapter.pdf",
      "_blank"
    );
  };

  // Reset hasSwipedUp when cards change
  useEffect(() => {
    setHasSwipedUp(false);
  }, [cards]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-white">
        <div className="relative">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500 font-semibold text-center">
            Doing
            <br />
            Llama
            <br />
            Magic
          </div>
        </div>
      </div>
    );
  }

  if (cards.length > 0) {
    return (
      <div
        {...handlers}
        className="min-h-screen w-full overflow-hidden bg-gradient-to-r from-blue-100 to-white flex flex-col items-center justify-center p-4"
      >
        <div className="w-full max-w-3xl mb-4 flex justify-between items-center">
          <Button
            variant="link"
            onClick={() => {
              setCards([]);
              setPdfLink("");
              setFile(null);
            }}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="text-sm text-blue-600 mr-4">
            Card {currentCard + 1} of {cards.length}
          </div>
        </div>
        <div className="w-full max-w-3xl flex flex-col items-center">
          <Card
            className={`w-full h-[80vh] shadow-xl border border-blue-200 flex flex-col justify-center p-8 sm:p-12 relative ${cardStyle} card-container`}
            style={
              backgroundImage
                ? {
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : {}
            }
          >
            <TransitionGroup>
              <CSSTransition
                key={currentCard}
                timeout={300}
                classNames={{
                  enter: "card-enter",
                  enterActive: "card-enter-active",
                  exit: "card-exit",
                  exitActive: "card-exit-active",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  {editMode ? (
                    <Textarea
                      value={cards[currentCard]}
                      onChange={(e) => handleEdit(currentCard, e.target.value)}
                      className="text-xl sm:text-3xl font-bold w-full h-full resize-none bg-transparent leading-relaxed"
                    />
                  ) : (
                    <div className="text-xl sm:text-3xl font-bold overflow-auto leading-relaxed">
                      {cards[currentCard]}
                    </div>
                  )}
                </div>
              </CSSTransition>
            </TransitionGroup>

            {!hasSwipedUp && (
              <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center text-blue-500 animate-bounce pointer-events-none">
                <ChevronUp size={24} />
                <p className="text-sm">Swipe Up</p>
              </div>
            )}
          </Card>

          <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
            <Button
              size="icon"
              onClick={() => setEditMode(!editMode)}
              aria-label={editMode ? "Save" : "Edit"}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Share"
                  className="border-blue-500 text-blue-500 hover:bg-blue-100"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
<FacebookShareButton
  url={window.location.href}
  hashtag={`#${cards[currentCard].split(' ').slice(0, 3).join('')}`}
>
  <div className="flex items-center">
    <Facebook className="w-4 h-4 mr-2" />
    Facebook
  </div>
</FacebookShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <WhatsappShareButton
                    url={window.location.href}
                    title={cards[currentCard]}
                  >
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </div>
                  </WhatsappShareButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Change color"
                  className="border-blue-500 text-blue-500 hover:bg-blue-100"
                >
                  <Palette className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {gradients.map((gradient, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleColorChange(gradient)}
                  >
                    <div className={`w-full h-8 ${gradient} rounded`}></div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Change background image"
                  className="border-blue-500 text-blue-500 hover:bg-blue-100"
                >
                  <ImageIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {dummyPictures.map((picture, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handlePictureChange(picture)}
                  >
                    <img
                      src={picture}
                      alt={`Background ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Change background music"
                  className="border-blue-500 text-blue-500 hover:bg-blue-100"
                >
                  <Music className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {dummyMusic.map((music, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => handleMusicChange(music.src)}
                  >
                    {music.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="icon"
              onClick={openSourceDocument}
              aria-label="Open source document"
              className="border-blue-500 text-blue-500 hover:bg-blue-100"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateCard("prev")}
            disabled={currentCard === 0}
            aria-label="Previous card"
            className="border-blue-500 text-blue-500 hover:bg-blue-100"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateCard("next")}
            disabled={currentCard === cards.length - 1}
            aria-label="Next card"
            className="border-blue-500 text-blue-500 hover:bg-blue-100"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {currentMusic && (
          <audio src={currentMusic} autoPlay loop className="hidden">
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-white p-4">
      <Card className="w-full max-w-md p-6 space-y-4 shadow-lg border border-blue-200">
        <div className="flex flex-col items-center mb-4">
          <img
            src="/images/llama-logo.png?text=Logo"
            alt="Llama Science Creator Logo"
            className="w-24 h-24 md:w-32 md:h-32 object-contain mb-2"
          />
          <h1 className="text-2xl font-bold text-center text-blue-600">
            Llama Science Creator
          </h1>
          <h6 className="text-s text-center text-blue-600">
            Turn Science Paper into Media Content
          </h6>
        </div>
        <Input
          type="text"
          placeholder="Paste a .pdf link here"
          value={pdfLink || defaultUrl}
          onChange={handleLinkChange}
          className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <h6 className="text-s text-center text-blue-600">or </h6>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-blue-500 text-center">
                <span className="font-semibold">Click </span> or <span className="font-semibold"> drag
                and drop </span><br/>
                to upload .pdf file.
              </p>
              <p className="text-xs text-blue-500"></p>
            </div>
            <Input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf"
            />
          </label>
        </div>
        {file && (
          <p className="text-sm text-blue-500">Selected file: {file.name}</p>
        )}
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
        <p className="text-xs text-center text-red-400">
          This is a UI mockup to demonstrate the concept.<br />
          To try the working app, try our <a href="https://llama-creator-git-dev-alharkan7s-projects.vercel.app/" className="text-blue-500 underline">Alpha Prototype</a>.
        </p>
<Button
  onClick={handleProcess}
  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
   // disabled={Boolean((!pdfLink && !file) || (pdfLink && file))}
>
  Transform PDF
</Button>
      </Card>
    </div>
  );
}
