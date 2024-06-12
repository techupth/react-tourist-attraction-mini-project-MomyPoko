import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [keepMessage, setKeepMessage] = useState([]);

  const searchLocation = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${message}`
    );
    setKeepMessage(result.data.data);
    console.log(result.data.data);
  };

  useEffect(() => {
    searchLocation();
  }, [message]);

  return (
    <div className="App">
      <div className="app-wrap">
        <header className="app-title">
          <h1>เที่ยวไหนดี</h1>
        </header>

        <section className="app-search">
          <p>ค้นหาที่เที่ยว</p>
          <input
            id="search"
            name="search"
            type="text"
            placeholder="ค้นหาที่เที่ยวแล้วไปกัน ..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </section>

        <main className="app-show-data">
          {keepMessage.map((messages) => {
            return (
              <div className="data-box">
                <img className="big-picture" src={messages.photos[0]} alt="" />
                <div className="box">
                  <h2 className="box-title">{messages.title}</h2>
                  <p className="box-description">
                    {messages.description.slice(0, 100)}...
                  </p>
                  <a className="box-button-description" href={messages.url}>
                    อ่านต่อ
                  </a>

                  <div className="box-arrange">
                    <p>หมวด:</p>
                    {messages.tags.map((tag, index) => {
                      if (index === messages.tags.length - 1) {
                        return (
                          <>
                            <p>และ</p>
                            <button
                              className="box-tag"
                              key={index}
                              onClick={() => {
                                setMessage(tag);
                              }}
                            >
                              {tag}
                            </button>
                          </>
                        );
                      } else {
                        // console.log(index);
                        return (
                          <button
                            className="box-tag"
                            key={index}
                            onClick={() => {
                              setMessage(tag);
                            }}
                          >
                            {tag}
                          </button>
                        );
                      }
                    })}
                  </div>

                  <div className="box-picture">
                    <img src={messages.photos[1]} alt="" />
                    <img src={messages.photos[2]} alt="" />
                    <img src={messages.photos[3]} alt="" />
                    <button
                      className="box-icon"
                      onClick={() => {
                        navigator.clipboard.writeText(messages.url);
                      }}
                    >
                      <i class="fa-solid fa-link"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
