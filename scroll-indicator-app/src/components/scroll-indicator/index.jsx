import { useState, useEffect } from "react";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessge] = useState("");

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
  if (loading) {
    return <div>Loading... Please wait...</div>;
  }
  return (
    <div>
      <h1>SCROLL INDICATOR APP</h1>
      <div>
        {data && data.length > 0
          ? data.map((item, index) => <p key={index}>{item.title}</p>)
          : null}
      </div>
    </div>
  );
}
