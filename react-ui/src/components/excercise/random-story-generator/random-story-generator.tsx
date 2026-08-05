import React, { useCallback, useEffect, useMemo, useState } from "react";
import throttle from "lodash/throttle";
import "./random-story-generator.css";

interface Story {
  _id: string;
  title: string;
  author: string;
  story: string;
  moral: string;
}

const RandomStory: React.FC = () => {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStory = useCallback(async () => {
    const url =
      "https://react-concepts-made-easy.onrender.com/api/random-story";

    setLoading(true);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setStory(result);
      setError(null);
    } catch (err: any) {
      setError(err.toString());
      setStory(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStory();
  }, [fetchStory]);

  const throttledFetchStory = useMemo(
    () =>
      throttle(() => {
        void fetchStory();
      }, 2000),
    [fetchStory]
  );

  useEffect(() => {
    return () => {
      throttledFetchStory.cancel();
    };
  }, [throttledFetchStory]);

  return (
    <div className="story-container">
      <div className="story-card">
        {loading && !story && (
          <p className="loading">Fetching a new story...</p>
        )}

        {error && !loading && (
          <p className="error">Error fetching story: {error}</p>
        )}

        {!loading && !error && story && (
          <>
            <h2 className="story-title">{story.title}</h2>
            <p className="story-author">By {story.author}</p>
            <p className="story-content">{story.story}</p>
            <p className="story-moral">
              <strong>Moral:</strong> {story.moral}
            </p>
          </>
        )}

        <button
          className="next-story-btn"
          onClick={() => {
            void throttledFetchStory();
          }}
          disabled={loading}
        >
          Next Story
        </button>
      </div>
    </div>
  );
};

export default RandomStory;
