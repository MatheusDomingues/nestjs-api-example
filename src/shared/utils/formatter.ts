import { Injectable } from '@nestjs/common';
import { format, Locale } from 'date-fns';
import { enUS, es, ptBR } from 'date-fns/locale';

const DECIMAL_DIVISOR = 100;

@Injectable()
export class Formatter {
  dateLocales: { [key: string]: Locale } = {
    enUS,
    ptBR,
    esCO: es,
    esDO: es,
    esEC: es,
    esAR: es,
  };

  currency(num: number): string {
    const options = {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    };
    const formatValue = new Intl.NumberFormat('pt-BR', options);
    return formatValue.format(num);
  }

  cnpj(cnpj: string): string {
    return cnpj?.replace(/\D/g, '')?.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5') ?? '';
  }

  percentage(num: number, allowNegative = false): string {
    const browserLocale = navigator.language;
    const language = browserLocale === 'en-US' || browserLocale === 'en-ZA' ? 'en' : 'pt';
    const number = !allowNegative ? Math.abs(num) / DECIMAL_DIVISOR : num / DECIMAL_DIVISOR;
    return new Intl.NumberFormat(language, {
      style: 'percent',
      maximumFractionDigits: 2,
    })
      .format(number)
      .replace(/\s/g, '');
  }

  number(num: number, opt?: Intl.NumberFormatOptions): string {
    const browserLocale = navigator.language;
    const language = browserLocale === 'en-US' || browserLocale === 'en-ZA' ? 'en' : 'pt';
    return new Intl.NumberFormat(language, opt).format(num);
  }

  formatDate(
    date: Date,
    options: {
      formatStr: string;
      isCapitalizedPtBr?: boolean;
      isLocaleTime?: boolean;
    },
  ): string {
    const { formatStr, isCapitalizedPtBr, isLocaleTime } = options;
    const browserLocale = navigator.language;
    const utcDate = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
    );
    const formattedDate = format(isLocaleTime ? new Date(utcDate) : date, formatStr, {
      locale: this.dateLocales[browserLocale.replace('-', '') as keyof typeof this.dateLocales],
    });
    if (!isCapitalizedPtBr && browserLocale === 'pt-BR') return formattedDate;
    return this.dateCapitalize(browserLocale, formattedDate);
  }

  dateCapitalize(locale: string | number, date: string): string {
    if (locale === 'pt-BR') return this.capitalize(date);
    const dateSplit = date.split(' ');
    const capitalizeDate = dateSplit.map((datePart) => this.capitalize(datePart));
    return capitalizeDate.join(' ');
  }

  capitalize(text: string): string {
    const splitWordsRegex = new RegExp(/([A-Z])/g);

    const result = text.replace(splitWordsRegex, '$1');

    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  }

  capitalizeWords(text: string): string {
    return text
      ?.split(' ')
      ?.map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
      ?.join(' ');
  }

  truncate(str: string, num: number): string {
    if (str.length <= num) {
      return str;
    }
    return `${str.slice(0, num)}...`;
  }

  slugify(text: string): string {
    return text
      ?.normalize('NFD') // Normaliza a string (remove acentos)
      ?.replace(/[\u0300-\u036f]/g, '') // Remove caracteres acentuados
      ?.toLowerCase() // Converter para minúsculas
      ?.replace(/ /g, '_') // Substituir espaços por underscores
      ?.replace(/[^a-z0-9_.]/g, '') // Remover caracteres não alfanuméricos (exceto ponto, underscore e hífen)
      ?.replace(/_+/g, '_'); // Substituir múltiplos underscores por um único underscore
  }
}
