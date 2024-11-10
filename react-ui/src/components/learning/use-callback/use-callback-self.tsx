import { memo, useCallback, useEffect, useState } from "react";
import "./use-callback-self.css";

const analyticsService = {
  track: (trackingInfo) => {
    console.log("Send UI Logs: trackingProps: ", trackingInfo);
  },
};

const ChildComponent = ({ text }) => {
  return <p className="note">{text}</p>;
};

const FiltersComponent = ({ onMount }) => {
  useEffect(() => {
    console.log("FiltersComponent Mounted");
    onMount("FiltersComponent Mounted", { filters: 10 });
  }, [onMount]);

  console.log("FiltersComponent re-rendered");
  return <ChildComponent text="Filters Component" />;
};

const FiltersComponentMemo = memo(FiltersComponent);

const RecommendationsComponent = ({ onMount }) => {
  useEffect(() => {
    console.log("RecommendationsComponent Mounted");
    onMount("RecommendationsComponent Mounted", {
      recomendations: ["Cricket", "Basketball", "Soccer", "Tennis", "Football"],
    });
  }, [onMount]);

  console.log("RecommendationsComponent re-rendered");

  return <ChildComponent text="Recommendations Component" />;
};

const RecommendationsComponentMemo = memo(RecommendationsComponent);

const UseCallBackDetailedComponent = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const [showFiltersUseCallback, setShowFiltersUseCallback] = useState(false);
  const [showRecommendationsUseCallback, setShowRecommendationsUseCallback] =
    useState(false);

  const [showFiltersMemo, setShowFiltersMemo] = useState(false);
  const [showRecommendationsMemo, setShowRecommendationsMemo] = useState(false);

  const trackComponentMount = (eventName, eventProperties) => {
    const trackingInfo = {
      event: eventName,
      parent: "UseCallBackSelfComponent",
      area: "Main",
      ...eventProperties,
    };
    analyticsService.track(trackingInfo);
  };

  const trackComponentMountWithUseCallback = useCallback(
    trackComponentMount,
    []
  );

  return (
    <div className="use-callback-self">
      {" "}
      {/* Scoped styles under this class */}
      <details className="collapsible-section">
        <summary>1. Non-Memorized Components</summary>
        <div className="description">
          <p>
            <strong>Goal:</strong> Observe Mounting and Re-rendering of both
            Filters and Recommendations (when visible) when toggled.
          </p>
          <p>
            <strong>Action:</strong> Click the buttons to show/hide Filters and
            Recommendations. Check the console to see both components
            re-rendering each time.
          </p>
          <div className="button-container">
            <button onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? "Hide" : "Show"} Filters
            </button>
            <button
              onClick={() => setShowRecommendations(!showRecommendations)}
            >
              {showRecommendations ? "Hide" : "Show"} Recommendations
            </button>
          </div>
          {showFilters && <FiltersComponent onMount={trackComponentMount} />}
          {showRecommendations && (
            <RecommendationsComponent onMount={trackComponentMount} />
          )}
        </div>
      </details>
      <details className="collapsible-section">
        <summary>2. Using useCallback</summary>
        <div className="description">
          <p>
            <strong>Goal:</strong> See how `useCallback` ensures callback
            functions are only created once.
          </p>
          <p>
            <strong>Action:</strong> Click the buttons to show/hide Filters and
            Recommendations. Notice that components are mounted only once
            however they re-render always when visible even if we click on other
            child component.
          </p>
          <div className="button-container">
            <button
              onClick={() => setShowFiltersUseCallback(!showFiltersUseCallback)}
            >
              {showFiltersUseCallback ? "Hide" : "Show"} Filters + useCallback
            </button>
            <button
              onClick={() =>
                setShowRecommendationsUseCallback(
                  !showRecommendationsUseCallback
                )
              }
            >
              {showRecommendationsUseCallback ? "Hide" : "Show"} Recommendations
              + useCallback
            </button>
          </div>
          {showFiltersUseCallback && (
            <FiltersComponent onMount={trackComponentMountWithUseCallback} />
          )}
          {showRecommendationsUseCallback && (
            <RecommendationsComponent
              onMount={trackComponentMountWithUseCallback}
            />
          )}
        </div>
      </details>
      <details className="collapsible-section">
        <summary>3. Using useCallback + Memorized Components</summary>
        <div className="description">
          <p>
            <strong>Goal:</strong> Watch how memorized components only re-render
            when their visibility changes.
          </p>
          <p>
            <strong>Action:</strong> Click the buttons to show/hide Filters and
            Recommendations. Both components are mounted once, and only the
            visible component re-renders.
          </p>
          <div className="button-container">
            <button onClick={() => setShowFiltersMemo(!showFiltersMemo)}>
              {showFiltersMemo ? "Hide" : "Show"} Filters + useCallback + Memo
            </button>
            <button
              onClick={() =>
                setShowRecommendationsMemo(!showRecommendationsMemo)
              }
            >
              {showRecommendationsMemo ? "Hide" : "Show"} Recommendations +
              useCallback + Memo
            </button>
          </div>
          {showFiltersMemo && (
            <FiltersComponentMemo
              onMount={trackComponentMountWithUseCallback}
            />
          )}
          {showRecommendationsMemo && (
            <RecommendationsComponentMemo
              onMount={trackComponentMountWithUseCallback}
            />
          )}
        </div>
      </details>
    </div>
  );
};

export default UseCallBackDetailedComponent;
