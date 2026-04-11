import styles from './Cards.module.css';

export function SkillCard({ name, icon }) {
  return (
    <div className={styles.skillCard}>
      <img src={icon} alt={`Icono de ${name}`} width="48" height="48" loading="lazy" />
      <span className={styles.skillName}>{name}</span>
    </div>
  );
}

export function CertCard({ name, image, onPreview }) {
  return (
    <article className={styles.certCard}>
      <img src={image} alt={name} loading="lazy" />
      <div className={styles.certOverlay}>
        <p className={styles.certName}>{name}</p>
        <div className={styles.certActions}>
          <button className={styles.certBtn} onClick={() => onPreview(image)}>
            Previsualizar
          </button>
          <a className={styles.certBtn} href={image} download>
            Descargar
          </a>
        </div>
      </div>
    </article>
  );
}
