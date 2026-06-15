import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ProductImage } from '../components/ProductImage';
import { Search, SlidersHorizontal, Check, Star, RefreshCw } from 'lucide-react';

export const CatalogView = ({ navigate, initialFilters = {}, searchQuery, onSearchChange }) => {
  const { products } = useData();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState(initialFilters.subCategory || 'all');
  const [maxRent, setMaxRent] = useState(100);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  // Sync state if navigate sends new filters
  useEffect(() => {
    if (initialFilters.category) {
      setSelectedCategory(initialFilters.category);
    }
    if (initialFilters.subCategory) {
      setSelectedSubCategory(initialFilters.subCategory);
    }
  }, [initialFilters]);

  // Derived categories & subcategories from active list
  const subCategoriesByCategory = {
    all: ['bed', 'sofa', 'table', 'fridge', 'washing-machine', 'tv'],
    furniture: ['bed', 'sofa', 'table'],
    appliance: ['fridge', 'washing-machine', 'tv']
  };

  // Reset category will also reset subcategory if incompatible
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedSubCategory('all');
  };

  // Filter & Sort Logic
  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = searchQuery 
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Category filter
    const matchesCategory = selectedCategory === 'all' ? true : product.category === selectedCategory;

    // Subcategory filter
    const matchesSubCategory = selectedSubCategory === 'all' ? true : product.subCategory === selectedSubCategory;

    // Price filter
    const matchesPrice = product.baseRent <= maxRent;

    // Stock filter
    const matchesStock = onlyInStock ? product.stock > 0 : true;

    return matchesSearch && matchesCategory && matchesSubCategory && matchesPrice && matchesStock;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.baseRent - b.baseRent;
    if (sortBy === 'price-desc') return b.baseRent - a.baseRent;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // popular
  });

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setMaxRent(100);
    setOnlyInStock(false);
    onSearchChange('');
    setSortBy('popular');
  };

  return (
    <div className="container animate-fade" style={{ minHeight: '80vh', paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ margin: '30px 0 10px 0' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Outfit' }}>Search Rental Catalog</h1>
        <p className="text-muted">Choose your rental length and lock in custom rates.</p>
      </div>

      <div className="catalog-container">
        {/* Filter Sidebar */}
        <aside className="filter-sidebar">
          <div className="glass-card" style={{ padding: '20px', cursor: 'default' }}>
            <div className="flex-between" style={{ marginBottom: '20px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                <SlidersHorizontal size={18} />
                Filters
              </h3>
              <button 
                onClick={clearAllFilters} 
                className="btn-link"
                style={{ fontSize: '0.8rem', textDecoration: 'none' }}
              >
                Reset All
              </button>
            </div>

            {/* Category selection */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>Product Type</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['all', 'furniture', 'appliance'].map(cat => (
                  <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer', textTransform: 'capitalize' }}>
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => handleCategoryChange(cat)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    {cat === 'all' ? 'All Products' : cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Sub-Category filter */}
            <div style={{ marginBottom: '24px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>Sub-Category</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="subcategory"
                    checked={selectedSubCategory === 'all'}
                    onChange={() => setSelectedSubCategory('all')}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  All Sub-Categories
                </label>
                {subCategoriesByCategory[selectedCategory].map(sub => (
                  <label key={sub} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer', textTransform: 'capitalize' }}>
                    <input 
                      type="radio" 
                      name="subcategory"
                      checked={selectedSubCategory === sub}
                      onChange={() => setSelectedSubCategory(sub)}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                    {sub.replace('-', ' ')}
                  </label>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div style={{ marginBottom: '24px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <div className="flex-between" style={{ marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Max Monthly Rent</h4>
                <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>${maxRent}/mo</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={maxRent}
                onChange={(e) => setMaxRent(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
              <div className="flex-between" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                <span>$10/mo</span>
                <span>$100/mo</span>
              </div>
            </div>

            {/* Availability Filter */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
                />
                Show In Stock Only
              </label>
            </div>
          </div>
        </aside>

        {/* Main List */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Sort Header */}
          <div className="glass-card" style={{ padding: '12px 20px', cursor: 'default', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>
              Showing <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{filteredProducts.length}</span> matching products
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Sort By:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-control"
                style={{ width: '160px', padding: '6px 12px', fontSize: '0.85rem', height: '34px' }}
              >
                <option value="popular">Popularity</option>
                <option value="rating">Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  className="glass-card" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%', 
                    cursor: 'pointer',
                    opacity: product.stock === 0 ? 0.75 : 1
                  }}
                  onClick={() => navigate('product-detail', { productId: product.id })}
                >
                  <div style={{ position: 'relative' }}>
                    <ProductImage subCategory={product.subCategory} />
                    {product.stock === 0 && (
                      <span className="badge badge-danger" style={{ position: 'absolute', top: '10px', left: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        Out of Stock
                      </span>
                    )}
                    {product.stock > 0 && product.stock <= 3 && (
                      <span className="badge badge-warning" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                        Only {product.stock} Left
                      </span>
                    )}
                  </div>

                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div className="flex-between" style={{ marginBottom: '8px' }}>
                      <span className="badge badge-primary">{product.category}</span>
                      <div className="star-rating">
                        <Star size={14} fill="currentColor" />
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="star-rating-count">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                      {product.name}
                    </h4>

                    <p className="text-muted" style={{ fontSize: '0.85rem', flexGrow: 1, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {product.description}
                    </p>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }} className="flex-between">
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Rents from</span>
                        <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)', fontWeight: '800' }}>
                          ${product.baseRent}<span style={{ fontSize: '0.85rem', fontWeight: 'normal' }}>/mo</span>
                        </h3>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Deposit: ${product.securityDeposit}</span>
                      </div>
                      <button 
                        className={`btn ${product.stock === 0 ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Read Details' : 'Rent Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '60px 20px', textAlign: 'center', cursor: 'default' }}>
              <div style={{ fontSize: '3rem', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
                <RefreshCw size={48} className="animate-spin" style={{ margin: '0 auto', opacity: 0.5 }} />
              </div>
              <h3 style={{ marginBottom: '8px' }}>No Products Found</h3>
              <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto 20px auto', fontSize: '0.9rem' }}>
                We couldn't find any items matching your filters or search keyword. Try clearing filters or searching for something else.
              </p>
              <button className="btn btn-primary" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CatalogView;
