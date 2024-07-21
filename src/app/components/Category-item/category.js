import Link from "next/link";

// src/app/components/Category.js

export default function CategoryComponent({ category }) {
    return (
        <Link href={`/categories/${category._id}`} legacyBehavior >
            <div className="col-sm-6 col-md-4">
                <div className="box">
                    <div className="img-box">
                        <img   src={`http://localhost:3001/img/Categories-image/${category.image}`} alt={category.name} />
                    </div>
                    <div className="detail-box">
                        <h5>{category.name}</h5>
                        <p>{category.description}</p>
                    </div>
                </div>
            </div>
        </Link >
    );
}
