import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import type { ProductCategory, Product } from '../../types/product';
import { PRESET_IMAGE_OPTIONS } from '../../data/defaultProducts';
import { RatingStars } from '../ui/RatingStars';
import { Sparkle } from '../decorations/Sparkle';
import { FloralSticker } from '../decorations/FloralSticker';
import { UploadSimple, CheckCircle, WarningCircle, Sparkle as PhosphorSparkle, ArrowLeft } from '@phosphor-icons/react';
import confetti from 'canvas-confetti';

interface FormErrors {
  name?: string;
  category?: string;
  price?: string;
  quantity?: string;
  image?: string;
  description?: string;
  specifications?: string;
  rating?: string;
}

export const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<string>('Home Essentials');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [image, setImage] = useState<string>(PRESET_IMAGE_OPTIONS[0].url);
  const [description, setDescription] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [rating, setRating] = useState<number>(5);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customImageMode, setCustomImageMode] = useState<'preset' | 'url' | 'upload'>('preset');

  const categories: ProductCategory[] = [
    'Electronics',
    'Accessories',
    'Home Essentials',
    'Office Supplies',
    'Other',
  ];

  // Image file upload handler (converts file to base64 Data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Please choose an image under 3MB.' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setErrors((prev) => ({ ...prev, image: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Product Name is required.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Product Name must be at least 3 characters.';
    }

    if (!category.trim()) {
      newErrors.category = 'Please select a Product Category.';
    }

    const numPrice = parseFloat(price);
    if (!price || isNaN(numPrice)) {
      newErrors.price = 'Valid Product Price is required.';
    } else if (numPrice <= 0) {
      newErrors.price = 'Price must be greater than ₱0.00.';
    }

    const numQuantity = parseInt(quantity, 10);
    if (quantity === '' || isNaN(numQuantity)) {
      newErrors.quantity = 'Initial Stock Quantity is required.';
    } else if (numQuantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative.';
    }

    if (!image.trim()) {
      newErrors.image = 'Feature Image is required.';
    }

    if (!description.trim()) {
      newErrors.description = 'Product Description is required.';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Please provide a more descriptive summary (at least 10 characters).';
    }

    if (!specifications.trim()) {
      newErrors.specifications = 'Product Specifications are required.';
    }

    if (!rating || rating < 1 || rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to the first error
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const productPayload: Omit<Product, 'id'> = {
      name: name.trim(),
      category: category.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      image: image.trim(),
      description: description.trim(),
      specifications: specifications.trim(),
      rating,
      isFeatured: false,
    };

    const createdProduct = addProduct(productPayload);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#08734B', '#F4A0C6', '#FAF9F4', '#A9C5B7'],
      });
    } catch {
      // Ignore if canvas-confetti is not supported
    }

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/products/${createdProduct.id}`);
    }, 600);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '28px',
        border: '2px solid var(--color-green)',
        boxShadow: '6px 6px 0px var(--color-pink)',
        padding: '36px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Preppy Header Stripe */}
      <div
        className="preppy-stripes-horizontal"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '10px',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <span className="boutique-tag">Boutique Inventory Form</span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.85rem',
              color: 'var(--color-green)',
              marginTop: '6px',
            }}
          >
            Add a New Lovely Product
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
            Complete all mandatory fields below to expand your stock collection.
          </p>
        </div>

        <FloralSticker size={48} petalColor="#F4A0C6" centerColor="#08734B" className="anim-float-gentle" />
      </div>

      {/* Field 1: Feature Image Selection */}
      <div style={{ marginBottom: '26px' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--color-green-dark)',
            marginBottom: '8px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkle size={14} color="#F4A0C6" />
            1. Feature Image of the Product *
          </span>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-sans)', color: 'var(--color-text-muted)' }}>
            Preset, Custom URL, or File Upload
          </span>
        </label>

        {/* Tab Switcher for Image Source */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {(['preset', 'url', 'upload'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setCustomImageMode(mode)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: '1.5px solid var(--color-green)',
                backgroundColor: customImageMode === mode ? 'var(--color-green)' : '#FAF9F4',
                color: customImageMode === mode ? '#ffffff' : 'var(--color-green)',
                boxShadow: customImageMode === mode ? '2px 2px 0px var(--color-pink)' : 'none',
              }}
            >
              {mode === 'preset' ? 'Curated Presets' : mode === 'url' ? 'Image Web URL' : 'Upload File'}
            </button>
          ))}
        </div>

        {/* Preset Selector */}
        {customImageMode === 'preset' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '10px',
              padding: '12px',
              backgroundColor: '#FAF9F4',
              borderRadius: '16px',
              border: '1px solid var(--color-green-sage)',
              marginBottom: '10px',
            }}
          >
            {PRESET_IMAGE_OPTIONS.map((item) => (
              <button
                key={item.url}
                type="button"
                onClick={() => {
                  setImage(item.url);
                  setErrors((prev) => ({ ...prev, image: undefined }));
                }}
                style={{
                  padding: '4px',
                  borderRadius: '12px',
                  border: image === item.url ? '2.5px solid var(--color-green)' : '1px solid rgba(8, 115, 75, 0.2)',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: image === item.url ? '2px 2px 0px var(--color-pink)' : 'none',
                  transition: 'all 0.15s ease',
                }}
                title={item.name}
              >
                <img
                  src={item.url}
                  alt={item.name}
                  style={{ width: '100%', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: 'var(--color-text-dark)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginTop: '4px',
                  }}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Custom URL Input */}
        {customImageMode === 'url' && (
          <input
            type="url"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              setErrors((prev) => ({ ...prev, image: undefined }));
            }}
            placeholder="https://images.unsplash.com/photo-..."
            className="preppy-input"
            style={{ marginBottom: '10px' }}
          />
        )}

        {/* File Upload Area */}
        {customImageMode === 'upload' && (
          <div
            style={{
              padding: '24px',
              border: '2px dashed var(--color-green-sage)',
              borderRadius: '16px',
              backgroundColor: '#FAF9F4',
              textAlign: 'center',
              marginBottom: '10px',
              cursor: 'pointer',
            }}
          >
            <UploadSimple size={32} color="var(--color-green)" weight="bold" />
            <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-green-dark)', marginTop: '6px' }}>
              Click to select an image from your computer
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ marginTop: '10px', fontSize: '0.85rem' }}
            />
          </div>
        )}

        {/* Image Preview Box */}
        {image && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
            <img
              src={image}
              alt="Feature preview"
              onError={() => setErrors((prev) => ({ ...prev, image: 'Image URL failed to load. Please verify the URL.' }))}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '14px',
                objectFit: 'cover',
                border: '2px solid var(--color-green)',
                backgroundColor: 'var(--color-pink-soft)',
              }}
            />
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-green)', fontWeight: 700 }}>
                <CheckCircle size={16} weight="fill" />
                Image Loaded Successfully
              </div>
              <span>This image will be displayed on the card and details page.</span>
            </div>
          </div>
        )}

        {errors.image && (
          <div style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <WarningCircle size={14} weight="bold" />
            {errors.image}
          </div>
        )}
      </div>

      {/* Field 2 & 3: Product Name & Category */}
      <div
        className="form-grid-columns"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '20px',
          marginBottom: '22px',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: '0.98rem',
              color: 'var(--color-green-dark)',
              marginBottom: '6px',
            }}
          >
            2. Product Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            placeholder="e.g. Vintage Leather Desk Organizer"
            className="preppy-input"
            style={{ borderColor: errors.name ? '#DC2626' : undefined }}
          />
          {errors.name && (
            <div style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <WarningCircle size={14} weight="bold" />
              {errors.name}
            </div>
          )}
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: '0.98rem',
              color: 'var(--color-green-dark)',
              marginBottom: '6px',
            }}
          >
            3. Product Category *
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setErrors((prev) => ({ ...prev, category: undefined }));
            }}
            className="preppy-input"
            style={{ borderColor: errors.category ? '#DC2626' : undefined, cursor: 'pointer' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <div style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <WarningCircle size={14} weight="bold" />
              {errors.category}
            </div>
          )}
        </div>
      </div>

      {/* Field 4: Description */}
      <div style={{ marginBottom: '22px' }}>
        <label
          style={{
            display: 'block',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '0.98rem',
            color: 'var(--color-green-dark)',
            marginBottom: '6px',
          }}
        >
          4. Product Description *
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          placeholder="Detailed boutique summary describing craftsmanship, design aesthetics, use cases, and appeal..."
          className="preppy-input"
          style={{ borderColor: errors.description ? '#DC2626' : undefined, resize: 'vertical' }}
        />
        {errors.description && (
          <div style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <WarningCircle size={14} weight="bold" />
            {errors.description}
          </div>
        )}
      </div>

      {/* Field 5: Product Specifications */}
      <div style={{ marginBottom: '22px' }}>
        <label
          style={{
            display: 'block',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            fontSize: '0.98rem',
            color: 'var(--color-green-dark)',
            marginBottom: '6px',
          }}
        >
          5. Product Specifications *
        </label>
        <textarea
          rows={2}
          value={specifications}
          onChange={(e) => {
            setSpecifications(e.target.value);
            setErrors((prev) => ({ ...prev, specifications: undefined }));
          }}
          placeholder="e.g. Dimensions: 20 x 15 cm | Material: 100% Solid Beechwood | Connectivity: Bluetooth 5.3"
          className="preppy-input"
          style={{ borderColor: errors.specifications ? '#DC2626' : undefined, resize: 'vertical' }}
        />
        {errors.specifications && (
          <div style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <WarningCircle size={14} weight="bold" />
            {errors.specifications}
          </div>
        )}
      </div>

      {/* Field 6, 7, 8: Rating, Price, Quantity */}
      <div
        className="form-grid-columns"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {/* Rating */}
        <div>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: '0.98rem',
              color: 'var(--color-green-dark)',
              marginBottom: '6px',
            }}
          >
            6. Product Rating *
          </label>
          <div
            style={{
              padding: '8px 12px',
              backgroundColor: '#FAF9F4',
              borderRadius: '12px',
              border: '1.5px solid rgba(8, 115, 75, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '46px',
            }}
          >
            <RatingStars rating={rating} size={20} interactive={true} onChange={(val) => setRating(val)} />
          </div>
          {errors.rating && (
            <div style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <WarningCircle size={14} weight="bold" />
              {errors.rating}
            </div>
          )}
        </div>

        {/* Price in PHP */}
        <div>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: '0.98rem',
              color: 'var(--color-green-dark)',
              marginBottom: '6px',
            }}
          >
            7. Price (PHP ₱) *
          </label>
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontWeight: 800,
                color: 'var(--color-green)',
                fontFamily: 'var(--font-serif)',
              }}
            >
              ₱
            </span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setErrors((prev) => ({ ...prev, price: undefined }));
              }}
              placeholder="1250.00"
              className="preppy-input"
              style={{ paddingLeft: '32px', borderColor: errors.price ? '#DC2626' : undefined }}
            />
          </div>
          {errors.price && (
            <div style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <WarningCircle size={14} weight="bold" />
              {errors.price}
            </div>
          )}
        </div>

        {/* Initial Stock Quantity */}
        <div>
          <label
            style={{
              display: 'block',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: '0.98rem',
              color: 'var(--color-green-dark)',
              marginBottom: '6px',
            }}
          >
            8. Initial Quantity *
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setErrors((prev) => ({ ...prev, quantity: undefined }));
            }}
            placeholder="e.g. 10 (< 5 is Low Stock)"
            className="preppy-input"
            style={{ borderColor: errors.quantity ? '#DC2626' : undefined }}
          />
          {errors.quantity && (
            <div style={{ color: '#DC2626', fontSize: '0.8rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <WarningCircle size={14} weight="bold" />
              {errors.quantity}
            </div>
          )}
        </div>
      </div>

      {/* Form Submission Actions */}
      <div
        style={{
          borderTop: '1.5px dashed var(--color-green-sage)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="btn-secondary"
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Back to Products</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{
            padding: '14px 32px',
            fontSize: '1.02rem',
          }}
        >
          <PhosphorSparkle size={18} weight="bold" />
          <span>{isSubmitting ? 'Adding to Inventory...' : 'Add Product to Inventory'}</span>
        </button>
      </div>
    </form>
  );
};
