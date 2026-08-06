import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";

type User = {
  login: {
    uuid: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  picture: {
    thumbnail: string;
  };
};

type ApiResponse = {
  results: User[];
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const escapedQuery = escapeRegExp(query);
  const lowerQuery = query.toLowerCase();
  const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));

  return parts.map((part, index) =>
    part.toLowerCase() === lowerQuery ? (
      <mark key={index}>{part}</mark>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};

const UserRow = React.memo(({ user, query }: { user: User; query: string }) => {
  const fullName = `${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.state}, ${user.location.country}`;

  return (
    <li className="searchable-list__item">
      <img
        src={user.picture.thumbnail}
        alt={fullName}
        className="searchable-list__avatar"
      />
      <div className="searchable-list__details">
        <div className="searchable-list__name">
          {highlightText(fullName, query)}
        </div>
        <div className="searchable-list__meta searchable-list__meta--email">
          {highlightText(user.email, query)}
        </div>
        <div className="searchable-list__meta searchable-list__meta--location">
          {highlightText(location, query)}
        </div>
      </div>
    </li>
  );
});

const SearchableList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("https://randomuser.me/api/?results=100");
        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }

        const data = (await response.json()) as ApiResponse;
        if (!cancelled) {
          setUsers(data.results || []);
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError("Unable to load users. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 250);

    return () => {
      window.clearTimeout(handler);
    };
  }, [searchText]);

  const filteredUsers = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      const location =
        `${user.location.city}, ${user.location.state}, ${user.location.country}`.toLowerCase();

      return (
        fullName.includes(query) ||
        email.includes(query) ||
        location.includes(query)
      );
    });
  }, [users, debouncedSearch]);

  const results = filteredUsers;

  return (
    <section className="searchable-list">
      <div className="searchable-list__search-box">
        <label htmlFor="search-input" className="searchable-list__label">
          Search users
        </label>
        <input
          id="search-input"
          type="search"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Type name, email, city, state or country"
          className="searchable-list__input"
        />
      </div>

      {loading && <p className="searchable-list__status">Loading users...</p>}
      {error && <p className="searchable-list__error">{error}</p>}

      {!loading && !error && (
        <>
          <p className="searchable-list__results">
            {results.length} result{results.length === 1 ? "" : "s"} found
          </p>
          <ul className="searchable-list__list">
            {results.map((user) => (
              <UserRow
                key={user.login.uuid}
                user={user}
                query={debouncedSearch}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default SearchableList;
