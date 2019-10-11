import React, {useState} from 'react';
import './ConversationLocalSearch.css';

const ConversationLocalSearch = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    return (
        <div className="conversation-search">
            <input
                type="search"
                className="conversation-search-input"
                placeholder="Search Messages"
                value={searchQuery}
                onChange={handleSearch}
            />
        </div>
    );
};

export default ConversationLocalSearch
