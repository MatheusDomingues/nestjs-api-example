import { Injectable } from '@nestjs/common';

abstract class RandomInterface {
  abstract min?: number;
  abstract max: number;
  abstract floating?: boolean;
}

@Injectable()
export class CommonUtils {
  debounce<T extends unknown[], U>(
    callback: (...props: T) => PromiseLike<U> | U,
    wait: number,
  ): (...props: T) => Promise<U> {
    let timer: NodeJS.Timeout;

    return (...props: T): Promise<U> => {
      clearTimeout(timer);
      return new Promise((resolve) => {
        timer = setTimeout(() => resolve(callback(...props)), wait);
      });
    };
  }

  camelCase(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  random({ min = 0, max, floating = false }: RandomInterface): number {
    let upper: number;
    let lower: number;

    if (floating) {
      lower = min;
      upper = max;
      return lower + Math.random() * (upper - lower);
    }
    lower = Math.ceil(min);
    upper = Math.floor(max);
    return Math.floor(lower + Math.random() * (upper - lower + 1));
  }

  round = (number: number, decimal = 0): number => {
    const roundedNumber = Number(`${number}e+${decimal}`);

    const exponentialNumber = `${Math.round(roundedNumber)}e-${decimal}`;

    return +`${exponentialNumber}`;
  };
}
