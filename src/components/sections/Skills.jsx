import { useState } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { skillCategories } from '../../data/skills';
import SectionTitle from '../ui/SectionTitle';
import { SkillCard } from '../ui/Cards';
import styles from './Skills.module.css';

export default function Skills() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);
  const [ref, isVisible] = useIntersectionObserver();

  const activeCategory = skillCategories.find((c) => c.id === activeTab);

  return (
    <section id="habilidades" className={styles.section}>
      <div className="container">
        <div className={styles.header} ref={ref}>
          <SectionTitle>{t('titulo-habilidades')}</SectionTitle>
          <p className={`${styles.desc} ${isVisible ? styles.descVisible : ''}`}>
            {t('desc-habilidades')}
          </p>
        </div>

        <div className={`${styles.tabs} ${isVisible ? styles.tabsVisible : ''}`}>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.tab} ${activeTab === cat.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        <div className={`${styles.grid} ${isVisible ? styles.gridVisible : ''}`}>
          {activeCategory?.skills.map((skill) => (
            <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
