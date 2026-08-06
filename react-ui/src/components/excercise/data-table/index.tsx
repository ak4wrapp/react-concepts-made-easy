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
  location: {
    city: string;
    state: string;
    country: string;
  };
  phone: string;
};

type ApiResponse = {
  results: User[];
};

type SortKey = "name" | "email" | "location" | "phone";
type SortDirection = "asc" | "desc";

const DEFAULT_PAGE_SIZE = 10;

const DataTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

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
      } catch (err) {
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

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return users.filter((user) => {
      if (!normalizedQuery) return true;

      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      const location =
        `${user.location.city}, ${user.location.state}, ${user.location.country}`.toLowerCase();
      const phone = user.phone.toLowerCase();

      return (
        fullName.includes(normalizedQuery) ||
        email.includes(normalizedQuery) ||
        location.includes(normalizedQuery) ||
        phone.includes(normalizedQuery)
      );
    });
  }, [users, query]);

  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers];

    sorted.sort((a, b) => {
      let left: string;
      let right: string;

      switch (sortKey) {
        case "email":
          left = a.email;
          right = b.email;
          break;
        case "location":
          left = `${a.location.city}, ${a.location.country}`;
          right = `${b.location.city}, ${b.location.country}`;
          break;
        case "phone":
          left = a.phone;
          right = b.phone;
          break;
        case "name":
        default:
          left = `${a.name.first} ${a.name.last}`;
          right = `${b.name.first} ${b.name.last}`;
      }

      const comparison = left.localeCompare(right);
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [filteredUsers, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [query, sortKey, sortDirection, pageSize]);

  const pagedUsers = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return sortedUsers.slice(startIndex, startIndex + pageSize);
  }, [sortedUsers, page, pageSize]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDirection("asc");
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return "↕";
    }

    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <section className="data-table">
      <div className="data-table__toolbar">
        <input
          className="data-table__search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, email, location or phone"
        />

        <div className="data-table__controls">
          <label className="data-table__label" htmlFor="page-size">
            Rows per page
          </label>
          <select
            id="page-size"
            className="data-table__select"
            value={pageSize}
            onChange={(event) => setPageSize(Number(event.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>
      </div>

      {loading && <div className="data-table__status">Loading users...</div>}
      {error && <div className="data-table__empty">{error}</div>}

      {!loading && !error && (
        <>
          <div className="data-table__table-wrapper">
            {sortedUsers.length === 0 ? (
              <div className="data-table__empty">
                No users found for this filter.
              </div>
            ) : (
              <table className="data-table__table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort("name")}>
                      <span className="data-table__header-content">
                        <span>Name</span>
                        <span className="data-table__sort-icon">
                          {renderSortIcon("name")}
                        </span>
                      </span>
                    </th>
                    <th onClick={() => handleSort("email")}>
                      <span className="data-table__header-content">
                        <span>Email</span>
                        <span className="data-table__sort-icon">
                          {renderSortIcon("email")}
                        </span>
                      </span>
                    </th>
                    <th onClick={() => handleSort("location")}>
                      <span className="data-table__header-content">
                        <span>Location</span>
                        <span className="data-table__sort-icon">
                          {renderSortIcon("location")}
                        </span>
                      </span>
                    </th>
                    <th onClick={() => handleSort("phone")}>
                      <span className="data-table__header-content">
                        <span>Phone</span>
                        <span className="data-table__sort-icon">
                          {renderSortIcon("phone")}
                        </span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pagedUsers.map((user) => (
                    <tr key={user.login.uuid}>
                      <td>{`${user.name.first} ${user.name.last}`}</td>
                      <td>{user.email}</td>
                      <td>{`${user.location.city}, ${user.location.state}, ${user.location.country}`}</td>
                      <td>{user.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="data-table__pagination">
            <span>
              Showing {pagedUsers.length} of {sortedUsers.length} users
            </span>
            <div className="data-table__controls">
              <button
                className="data-table__button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                className="data-table__button"
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default DataTable;
