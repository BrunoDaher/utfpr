import type { ReactNode } from 'react'
import styles from './PropertyCard.module.css'

export interface PropertyCardProps {
  title: string
  location: string
  pricePerNight: number
  imageUrl: string
  isAvailable: boolean
  tags: string[]
  children?: ReactNode
}

export function PropertyCard({
  title,
  location,
  pricePerNight,
  imageUrl,
  isAvailable,
  tags,
  children,
}: PropertyCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} />
        <span
          className={`${styles.badge} ${
            isAvailable ? styles.badgeAvailable : styles.badgeUnavailable
          }`}
        >
          {isAvailable ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={styles.badgeIcon}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={styles.badgeIcon}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
          {isAvailable ? 'Disponível' : 'Indisponível'}
        </span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        
        <div className={styles.locationPriceRow}>
          <p className={styles.location}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.pinIcon}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location}
          </p>
          <p className={styles.price}>
            R$ {pricePerNight} <span>/noite</span>
          </p>
        </div>

        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {children && <div className={styles.childrenArea}>{children}</div>}
      </div>
    </div>
  )
}

export default PropertyCard
