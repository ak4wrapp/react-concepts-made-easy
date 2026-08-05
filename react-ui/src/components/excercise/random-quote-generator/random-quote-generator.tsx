import React, { useCallback, useEffect, useMemo, useState } from "react";
import throttle from "lodash/throttle";

const RandomStoryGenerator: React.FC = () => {
  const [story, setStory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStory = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://react-concepts-made-easy.onrender.com/api/random-story"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStory(data.story ?? "");
      setError(null);
    } catch (err: any) {
      setError(err?.message ?? "Failed to fetch story");
    } finally {
      setLoading(false);
    }
  }, []);

  const throttledFetchStory = useMemo(
    () =>
      throttle(() => {
        void fetchStory();
      }, 2000),
    [fetchStory]
  );

  useEffect(() => {
    void fetchStory();
  }, [fetchStory]);

  useEffect(() => {
    return () => {
      throttledFetchStory.cancel();
    };
  }, [throttledFetchStory]);

  return (
    <div>
      <button onClick={() => throttledFetchStory()} disabled={loading}>
        {loading ? "Loading..." : "New Story"}
      </button>

      {error && <div>Error: {error}</div>}
      {!loading && !error && <p>{story}</p>}
    </div>
  );
};

export default RandomStoryGenerator;
