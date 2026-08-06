import { useEffect, useMemo, useState } from "react";
import "./styles.css";

type User = {
  login: {
    uuid: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  picture: {
    thumbnail: string;
  };
};

type ApiResponse = {
  results: User[];
};

const Autocomplete = () => {
  const [inputValue, setInputValue] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://randomuser.me/api/?results=1000");
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const data = (await response.json()) as ApiResponse;

        if (!cancelled) {
          setAllUsers(data.results || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Unable to load suggestions right now.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!inputValue.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    const timeout = window.setTimeout(() => {
      setLoading(true);
      setError(null);

      const normalizedQuery = inputValue.trim().toLowerCase();
      const filtered = allUsers
        .filter((user) => {
          const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
          const email = user.email.toLowerCase();
          return (
            fullName.includes(normalizedQuery) ||
            email.includes(normalizedQuery)
          );
        })
        .slice(0, 8);

      setSuggestions(filtered);
      setActiveIndex(filtered.length > 0 ? 0 : -1);
      setIsOpen(filtered.length > 0);
      setLoading(false);
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [inputValue, allUsers]);

  const selectedText = useMemo(() => {
    if (!suggestions[activeIndex]) {
      return inputValue;
    }

    const user = suggestions[activeIndex];
    return `${user.name.first} ${user.name.last}`;
  }, [activeIndex, inputValue, suggestions]);

  const handleSelect = (value: string) => {
    setInputValue(value);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
      setIsOpen(true);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
      setIsOpen(true);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = suggestions[activeIndex >= 0 ? activeIndex : 0];
      if (selected) {
        handleSelect(`${selected.name.first} ${selected.name.last}`);
      }
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <section className="autocomplete">
      <label className="autocomplete__label" htmlFor="autocomplete-input">
        Search users
      </label>
      <div className="autocomplete__input-wrapper">
        <input
          id="autocomplete-input"
          className="autocomplete__input"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.trim() && setIsOpen(true)}
          placeholder="Type a name or email"
        />

        {isOpen && (
          <ul className="autocomplete__list" role="listbox">
            {loading && (
              <li className="autocomplete__status">
                <span className="autocomplete__spinner" aria-hidden="true" />
                <span>Loading suggestions...</span>
              </li>
            )}
            {error && (
              <li className="autocomplete__status autocomplete__status--error">
                {error}
              </li>
            )}
            {!loading && !error && suggestions.length === 0 && (
              <li className="autocomplete__status">No suggestions found</li>
            )}
            {!loading &&
              !error &&
              suggestions.map((user, index) => {
                const label = `${user.name.first} ${user.name.last}`;
                const isActive = index === activeIndex;

                return (
                  <li
                    key={user.login.uuid}
                    className={`autocomplete__item ${
                      isActive ? "autocomplete__item--active" : ""
                    }`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelect(label)}
                    role="option"
                    aria-selected={isActive}
                  >
                    <img
                      src={user.picture.thumbnail}
                      alt={label}
                      className="autocomplete__avatar"
                    />
                    <span className="autocomplete__name">{label}</span>
                  </li>
                );
              })}
          </ul>
        )}
      </div>

      <p className="autocomplete__hint">
        {loading
          ? "Loading suggestions..."
          : selectedText
          ? `Selected: ${selectedText}`
          : "Start typing to search users"}
      </p>
    </section>
  );
};

export default Autocomplete;
