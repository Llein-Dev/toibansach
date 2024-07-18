// src/app/categories/page.js
import CategoryComponent from "../components/category";

async function fetchCategories() {
    const res = await fetch('http://localhost:3001/categories');
    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }
    const data = await res.json();
    return data;
}

const Categories = async () => {
    const categories = await fetchCategories();

    return (
        <section className="catagory_section layout_padding">
            <div className="catagory_container">
                <div className="container">
                    <div className="heading_container heading_center">
                        <h2>Books Categories</h2>
                        <p>Explore a variety of book categories with something for everyone.</p>
                    </div>
                    <div className="row">
                        {categories.map((category) => (
                            <CategoryComponent key={category._id} category={category} />  // Truyền danh mục cho component
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;
