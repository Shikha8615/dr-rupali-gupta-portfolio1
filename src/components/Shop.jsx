import { useState } from 'react'
import { Arrow, ArrowUR, Leaf, Shield, Heart } from './Icons'
import { MEDICAL_SHOP_URL, SHOP_PRODUCTS } from '../config'

const externalUrl = url => /^https?:\/\//i.test(url || '') ? url : null

export default function Shop({ onBook }) {
  const [selected, setSelected] = useState(null)
  const shopUrl = externalUrl(MEDICAL_SHOP_URL)
  return (
    <section id="shop" className="wellness-shop" aria-labelledby="shop-heading">
      <div className="shop-leaf shop-leaf-top" aria-hidden="true"><Leaf s={170} /></div>
      <div className="shop-leaf shop-leaf-bottom" aria-hidden="true"><Leaf s={110} /></div>
      <div className="w">
        <div className="shop-heading"><p className="shop-eyebrow">Our Wellness Store</p><h2 id="shop-heading">Shop <span>Wellness</span> Products</h2><p>Ayurvedic wellness choices for women’s wellbeing and balanced living,<br className="shop-break" /> guided by personalised consultation.</p></div>
        <div className="shop-values">{[[Leaf, 'Thoughtful wellness choices'], [Shield, 'Guidance before you choose'], [Heart, 'Care for every stage of life']].map(([Icon, title]) => <div key={title}><span><Icon s={26} /></span><p>{title}</p></div>)}</div>
        <div className="shop-products">{SHOP_PRODUCTS.map((product, index) => {
          const url = externalUrl(product.url)
          return <article className="shop-product" key={product.name} style={{ '--product-accent': ['#2563eb', '#148763', '#5469bc', '#138b91'][index] }}>
            <div className="shop-product-visual"><img src={product.image} alt={`${product.name} illustrative product preview`} width="400" height="400" loading="lazy" /><span className="shop-preview">Product preview</span><span className="shop-bottle-label" aria-hidden="true"><small>WELLNESS COLLECTION</small><strong>{product.name}</strong><Leaf s={22} /></span></div>
            <div className="shop-product-copy"><p className="shop-category">{product.category}</p><h3>{product.name}</h3><p>{product.description}</p>{url ? <a className="shop-product-button" href={url} target="_blank" rel="noopener noreferrer">View Product <ArrowUR s={17} /></a> : <button className="shop-product-button" type="button" aria-expanded={selected === product.name} aria-controls="shop-preview-details" onClick={() => setSelected(product.name)}>View Product <Arrow s={17} /></button>}</div>
          </article>
        })}</div>
        {selected && <div className="shop-details" id="shop-preview-details" role="status"><div><h3>{selected} — Coming soon</h3><p>Product information and online shopping will be available here soon. Ask Dr. Rupali about suitability before choosing supplements.</p></div><button type="button" className="shop-product-button" onClick={onBook}>Consult Dr. Rupali</button><button type="button" className="shop-close" aria-label="Close product preview" onClick={() => setSelected(null)}>×</button></div>}
        <div className="shop-footer">{shopUrl ? <a className="shop-explore appointment-highlight" href={shopUrl} target="_blank" rel="noopener noreferrer"><Cart />Explore Shop Now <Arrow s={22} /></a> : <><button className="shop-explore appointment-highlight" type="button" onClick={() => setSelected('Wellness Store')}><Cart />Explore to Shop Now <Arrow s={22} /></button><p>Online store coming soon</p></>}</div>
        <p className="shop-note">Illustrative product previews. Product details will be added when available. Supplements do not replace prescribed treatment.</p>
      </div>
    </section>
  )
}

function Cart() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 3h3l3 13h11l3-9H6M9 20h.01M18 20h.01" /></svg>
}
