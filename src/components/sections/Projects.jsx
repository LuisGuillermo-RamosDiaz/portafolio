import { useTranslation } from '../../context/LanguageContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { projects } from '../../data/projects';
import SectionTitle from '../ui/SectionTitle';
import Carousel from '../ui/Carousel';
import styles from './Projects.module.css';

function ProjectImage({ project }) {
  const { t } = useTranslation();

  if (project.carousel) {
    return (
      <Carousel
        slides={project.carousel}
        badge={project.inDevelopment ? t('etiqueta-en-desarrollo') : null}
      />
    );
  }

  if (project.responsive) {
    return (
      <figure className={styles.figureCover}>
        <picture>
          <source media="(max-width: 640px)" srcSet={project.responsive.mobile} />
          <source media="(max-width: 1024px)" srcSet={project.responsive.tablet} />
          <img src={project.responsive.desktop} alt={project.responsive.alt} loading="lazy" />
        </picture>
      </figure>
    );
  }

  if (project.image) {
    return (
      <figure className={styles.figureCover}>
        <img src={project.image.src} alt={project.image.alt} loading="lazy" />
      </figure>
    );
  }

  return null;
}

function ProjectCard({ project, index }) {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <article
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: `${(index + 1) * 150}ms` }}
    >
      <ProjectImage project={project} />
      <div className={styles.body}>
        <h3 className={styles.title}>{t(project.titleKey)}</h3>
        <span className={styles.role}>{t(project.roleKey)}</span>
        <p className={styles.desc}>{t(project.descKey)}</p>
        <div className={styles.tags}>
          {project.tech.map((tech) => (
            <span key={tech} className={styles.tag}>{tech}</span>
          ))}
        </div>
        {project.links.length > 0 && (
          <div className={styles.links}>
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={link.icon} alt="" width="20" height="20" />
                <span>{t(link.labelKey)}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="proyectos" className={styles.section}>
      <div className="container">
        <div className={styles.header} ref={ref}>
          <SectionTitle>{t('titulo-proyectos')}</SectionTitle>
          <p className={`${styles.headerDesc} ${isVisible ? styles.headerDescVisible : ''}`}>
            {t('desc-proyectos')}
          </p>
        </div>
        <div className={styles.grid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
