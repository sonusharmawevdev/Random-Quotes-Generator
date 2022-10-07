import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  FaTwitter,
  FaQuoteLeft,
  FaQuoteRight,
  FaRegCopy,
} from "react-icons/fa";
import "./App.css";

const App = () => {
  const [quotes, setQuotes] = useState("PLease Generate Quotes ...");

  // Calling Api's and convert into data as single object
  const getQuotes = async () => {
    await axios.get("https://type.fit/api/quotes").then((res) => {
      let dataQuotes = res.data;
      let randomNum = Math.floor(Math.random() * dataQuotes.length);
      setQuotes(dataQuotes[randomNum]);
    });
  };
  //define useEffect
  useEffect(() => {
    getQuotes();
  }, []);

  // initialized notify notification
  const notify = () =>
    toast.success("Copied !", {
      autoClose: 500,
    });

  return (
    <div className="container">
      <div className="header">
        <h1>Quotes</h1>
        <p>Random Quotes Generate</p>
      </div>
      <div className="card">
        <div className="card-warper">
          <div className="quotes">
            <FaQuoteLeft className="left-quotes-icon" />
            <p>{quotes.text}</p>
            <FaQuoteRight className="right-quotes-icon" />
            <CopyToClipboard text={`${quotes.text} ${quotes.author}`}>
              <div className="clipboard">
                <FaRegCopy onClick={notify} className="clipboard-btn" />
                <ToastContainer />
              </div>
            </CopyToClipboard>
          </div>
          <div className="author">
            Author : <span>{quotes.author}</span>
          </div>
          <div className="btn-box">
            <button onClick={getQuotes}>Generate Quotes</button>
            <div className="social">
              <a
                href={`https://twitter.com/intent/tweet?text=${quotes.text}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>
          Developer :
          <a href="https://github.com/sonusharmawevdev/Profile" target="_blank">
            @sonusharma.webdev
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
