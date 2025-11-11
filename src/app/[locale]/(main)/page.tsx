import { getTranslations } from 'next-intl/server';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 15+
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          🚀 {t('title')}
        </h1>

        <p className="text-muted-foreground mb-8 text-xl">{t('subtitle')}</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="⚡"
            title={t('features.react')}
            description={t('features.reactDesc')}
          />
          <FeatureCard
            icon="🌐"
            title={t('features.i18n')}
            description={t('features.i18nDesc')}
          />
          <FeatureCard
            icon="🔐"
            title={t('features.auth')}
            description={t('features.authDesc')}
          />
          <FeatureCard
            icon="📊"
            title={t('features.query')}
            description={t('features.queryDesc')}
          />
          <FeatureCard
            icon="🎨"
            title={t('features.ui')}
            description={t('features.uiDesc')}
          />
          <FeatureCard
            icon="📦"
            title={t('features.state')}
            description={t('features.stateDesc')}
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card text-card-foreground rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
