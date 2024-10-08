import { useState, useEffect } from "react";
import "./index.css";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessge] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  async function fetchData(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(getUrl);
      const data = await response.json();
      console.log(data.products);
      setData(data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessge(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  function handleScrollPercentage() {
    const howMuchScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((howMuchScroll / height) * 100);
  }
  console.log(scrollPercentage);
  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (loading) {
    return <div>Loading... Please wait...</div>;
  }
  return (
    <div className="main-wraper">
      <div className="top-container">
        <h1 className="title">SCROLL INDICATOR APP</h1>
        <div className="scroll-progress-tracking-container">
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="data-container">
        {data && data.length > 0
          ? data.map((item, index) => (
              <div className="cards" key={index}>
                <h3>{item.title}</h3>
                <img src={item.thumbnail} alt={item.brand} />
                <p>{item.description}</p>
                <p>${item.price}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
