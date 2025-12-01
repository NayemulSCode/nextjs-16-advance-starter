'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/routing';
import { locales, type Locale } from '@/locales/config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Select value={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <Globe className="mr-2 h-4 w-4" />
        <SelectValue>
          {locales[locale].flag} {locales[locale].nativeName}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(locales).map(([key, config]) => (
          <SelectItem key={key} value={key}>
            <div className="flex items-center gap-2">
              <span>{config.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{config.nativeName}</span>
                <span className="text-muted-foreground text-xs">
                  {config.name}
                </span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
