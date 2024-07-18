
export default function SearchComponent() {
    return (
        <div className="search-container ml-auto">
            <form action="/search" method="get" className="search-form d-flex">
                <input
                    type="text"
                    name="keyword"
                    className="search-input"
                    placeholder="Search..."
                />
                <button type="submit" className="search-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-search"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>
        </div>
    );
}
