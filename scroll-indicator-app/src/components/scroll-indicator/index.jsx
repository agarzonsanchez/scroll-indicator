import { useState, useEffect } from "react";

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
    <div>
      <div className="top-container">
        <h1>SCROLL INDICATOR APP</h1>
        <div className="scroll-progress-tracking-container">
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="data-container">
        {data && data.length > 0
          ? data.map((item, index) => <p key={index}>{item.title}</p>)
          : null}
      </div>
    </div>
  );
}
