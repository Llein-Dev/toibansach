// src/components/NoResults.js

export default function NoResults({ keyword }) {
    return (
        <div className="no-results">
            <h3>Không tìm thấy sản phẩm nào.</h3>
            <p>Chúng tôi không tìm thấy sách nào phù hợp với từ khóa <strong>{keyword}</strong>. Vui lòng thử lại với từ khóa khác.</p>
        </div>
    );
}
